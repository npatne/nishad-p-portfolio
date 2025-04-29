"use client"

import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"
import Sidebar from "@/components/sidebar/sidebar"
import Chatbot from "@/components/chatbot/chatbot"
import { Button } from "@/components/ui/button"
import { projects } from "@/data/projects"
import type { ProjectContent } from "@/types/project"

export default function ProjectPage() {
  const { slug } = useParams() as { slug: string }
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [project, setProject] = useState<ProjectContent | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  // Find the project based on slug
  useEffect(() => {
    const foundProject = projects.find((p) => p.slug === slug)
    if (foundProject) {
      setProject(foundProject)
      // Set the first section as active by default
      if (foundProject.sections.length > 0) {
        setActiveSection(foundProject.sections[0].id)
      }
    }
  }, [slug])

  // Set up intersection observer to track active section
  useEffect(() => {
    if (!project) return

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Create a new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -80% 0px" },
    )

    // Observe all section elements
    project.sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        sectionRefs.current[section.id] = element
        observerRef.current?.observe(element)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [project])

  // Handle AI prompt
  const handleAskAI = (sectionId: string) => {
    const section = project?.sections.find((s) => s.id === sectionId)
    if (section && project) {
      // Create and dispatch a custom event
      const event = new CustomEvent("ai-prompt", {
        detail: {
          section: section.title,
          project: project.title,
        },
      })
      window.dispatchEvent(event)
    }
  }

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar with project navigation */}
      <Sidebar projects={projects} currentProject={project} currentSection={activeSection} />

      {/* Main content */}
      <main className="flex-1 min-h-screen overflow-auto pb-16 md:pb-0">
        {/* Project header */}
        <div
          className="py-16 px-6 md:px-10"
          style={{
            backgroundColor: `var(--${project.color}, var(--primary))`,
            color: "white",
          }}
        >
          <Link href="/projects" className="inline-flex items-center text-white/80 hover:text-white mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{project.title}</h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">{project.subtitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-white/80">
            <div>
              <h3 className="text-sm font-medium text-white">Role</h3>
              <p>{project.role}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">Duration</h3>
              <p>{project.duration}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">Team</h3>
              <p>{project.team}</p>
            </div>
          </div>
        </div>

        {/* Project description */}
        <div className="px-6 md:px-10 py-8">
          <p className="text-xl max-w-4xl mx-auto">{project.description}</p>
        </div>

        {/* Project content sections */}
        <div className="px-6 md:px-10 max-w-4xl mx-auto">
          {project.sections.map((section) => (
            <section key={section.id} id={section.id} className="py-12 scroll-mt-16 border-t border-border">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{section.title}</h2>
                <Button
                  onClick={() => handleAskAI(section.id)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Ask AI about {section.title}</span>
                </Button>
              </div>
              <div className="prose prose-gray max-w-none">
                {typeof section.content === "string" ? <p>{section.content}</p> : section.content}
              </div>

              {/* Display section image if available */}
              {project.images && project.images[project.sections.indexOf(section)] && (
                <div className="mt-8">
                  <img
                    src={project.images[project.sections.indexOf(section)] || "/placeholder.svg"}
                    alt={`${project.title} - ${section.title}`}
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              )}
            </section>
          ))}
        </div>
      </main>

      {/* Chatbot */}
      <Chatbot />
    </div>
  )
}
