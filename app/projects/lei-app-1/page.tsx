"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
// Make sure the import path is correct
import { PasswordProtection } from "@/components/password-protection"

// Define the sections for this specific project
const projectSections = [
  {
    id: "project-overview",
    title: "Project Overview",
    content:
      "LEI Application 1 is a comprehensive educational platform designed to help K-12 teachers create, manage, and deliver interactive lessons to their students. The platform needed to be intuitive for teachers with varying levels of technical expertise while providing powerful features for content creation and student engagement tracking.",
  },
  {
    id: "research-discovery",
    title: "Research & Discovery",
    content:
      "I led a series of user interviews, contextual inquiries, and surveys with over 50 teachers across different grade levels and subject areas. This research revealed key pain points in existing educational tools and opportunities for innovation in our platform.",
  },
  {
    id: "design-process",
    title: "Design Process",
    content:
      "Based on our research findings, I created user personas, journey maps, and information architecture for the platform. I then developed wireframes and interactive prototypes, which were tested with teachers in multiple iterations to refine the user experience.",
  },
  {
    id: "implementation",
    title: "Implementation",
    content:
      "Working closely with developers, I ensured that the design vision was implemented accurately while making pragmatic adjustments based on technical constraints. I created a comprehensive design system to maintain consistency across the platform and facilitate future development.",
  },
  {
    id: "results-impact",
    title: "Results & Impact",
    content:
      "The platform was successfully launched and adopted by over 200 schools in the first year. User satisfaction scores were 30% higher than the previous system, and teacher productivity (measured by time spent creating lessons) improved by 45%.",
  },
]

// Project metadata
const projectInfo = {
  id: "project1",
  slug: "lei-app-1",
  title: "LEI Application 1",
  subtitle: "Educational Platform for K-12 Teachers",
  description:
    "A comprehensive platform designed to help K-12 teachers create, manage, and deliver interactive lessons to their students.",
  role: "Lead UX Designer & Researcher",
  duration: "8 months",
  team: "Cross-functional team of 12 (designers, developers, educators)",
  color: "purple",
  tags: ["UX Research", "Design Systems", "Prototyping"],
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
}

export default function LEIApp1Page() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  // Set up intersection observer to track active section
  useEffect(() => {
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

            // Update the sidebar section highlight via custom event
            window.dispatchEvent(
              new CustomEvent("section-visible", {
                detail: { sectionId: entry.target.id, projectSlug: projectInfo.slug },
              }),
            )
          }
        })
      },
      { rootMargin: "-100px 0px -80% 0px" },
    )

    // Observe all section elements
    projectSections.forEach((section) => {
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
  }, [])

  // Handle AI prompt
  const handleAskAI = (sectionId: string) => {
    const section = projectSections.find((s) => s.id === sectionId)
    if (section) {
      // Create and dispatch a custom event
      const event = new CustomEvent("ai-prompt", {
        detail: {
          section: section.title,
          project: projectInfo.title,
        },
      })
      window.dispatchEvent(event)
    }
  }

  // Wrap the content with password protection
  return (
    <PasswordProtection>
      <div className="min-h-screen pb-16">
        {/* Project header */}
        <div
          className="py-16 px-6 md:px-10 text-white transition-colors duration-300"
          style={{
            backgroundColor: `var(--${projectInfo.color}, var(--primary))`,
          }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{projectInfo.title}</h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">{projectInfo.subtitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-white/80">
            <div>
              <h3 className="text-sm font-medium text-white">Role</h3>
              <p>{projectInfo.role}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">Duration</h3>
              <p>{projectInfo.duration}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">Team</h3>
              <p>{projectInfo.team}</p>
            </div>
          </div>
        </div>

        {/* Project description */}
        <div className="px-6 md:px-10 py-8">
          <p className="text-xl max-w-4xl mx-auto">{projectInfo.description}</p>
        </div>

        {/* Project content sections */}
        <div className="px-6 md:px-10 max-w-4xl mx-auto">
          {projectSections.map((section, index) => (
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
                <p>{section.content}</p>
              </div>

              {/* Display section image if available */}
              {projectInfo.images && projectInfo.images[index] && (
                <div className="mt-8">
                  <img
                    src={projectInfo.images[index] || "/placeholder.svg"}
                    alt={`${projectInfo.title} - ${section.title}`}
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </PasswordProtection>
  )
}
