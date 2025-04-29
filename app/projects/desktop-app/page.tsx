"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Define the sections for this specific project
const projectSections = [
  {
    id: "project-overview",
    title: "Project Overview",
    content:
      "This desktop application is a cross-platform tool for creating interactive educational content. The application needed to provide powerful content creation capabilities while maintaining a consistent user experience across Windows, macOS, and Linux.",
  },
  {
    id: "research-discovery",
    title: "Research & Discovery",
    content:
      "I conducted user research with educators who create educational content, focusing on their workflows, pain points, and feature requirements. This included competitive analysis of existing desktop tools and identification of platform-specific considerations.",
  },
  {
    id: "design-process",
    title: "Design Process",
    content:
      "I created wireframes and prototypes for the application, focusing on a consistent experience across platforms while respecting platform-specific conventions. The design was refined through multiple rounds of usability testing on different operating systems.",
  },
  {
    id: "implementation",
    title: "Implementation",
    content:
      "I worked closely with the development team to implement the front-end using Electron and React. My dual role as designer and engineer allowed me to make informed decisions about technical feasibility and to ensure that the design vision was maintained throughout implementation.",
  },
  {
    id: "results-impact",
    title: "Results & Impact",
    content:
      "The application has been downloaded over 50,000 times, with users reporting a 40% increase in content creation efficiency compared to previous tools. The application has received positive reviews for its intuitive interface and cross-platform consistency.",
  },
]

// Project metadata
const projectInfo = {
  id: "project4",
  slug: "desktop-app",
  title: "Desktop Application",
  subtitle: "Cross-platform Educational Tool",
  description:
    "A desktop application for creating interactive educational content that works seamlessly across Windows, macOS, and Linux.",
  role: "UX Designer & Front-end Engineer",
  duration: "12 months",
  team: "Team of 6 (designers, developers)",
  color: "orange",
  tags: ["Electron", "Cross-platform", "Performance Optimization"],
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
}

export default function DesktopAppPage() {
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

  return (
    <div className="min-h-screen pb-16">
      {/* Project header */}
      <div
        className="py-16 px-6 md:px-10"
        style={{
          backgroundColor: `var(--${projectInfo.color}, var(--primary))`,
          color: "white",
        }}
      >
        <Link href="/projects" className="inline-flex items-center text-white/80 hover:text-white mb-6">
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
  )
}
