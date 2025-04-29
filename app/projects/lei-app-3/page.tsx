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
      "LEI Application 3 is a content management system designed specifically for educational materials. The system needed to support various content types, complex metadata, and distribution across multiple platforms while remaining intuitive for content creators.",
  },
  {
    id: "research-discovery",
    title: "Research & Discovery",
    content:
      "I led research with content creators, educators, and students to understand their needs and workflows. This included content audits, workflow analysis, and competitive research to identify best practices and opportunities for innovation.",
  },
  {
    id: "design-process",
    title: "Design Process",
    content:
      "Based on research findings, I developed the information architecture and user flows for the system. I created wireframes and prototypes for key user journeys, focusing on content creation, organization, and discovery. The design was refined through multiple rounds of usability testing.",
  },
  {
    id: "implementation",
    title: "Implementation",
    content:
      "I architected a comprehensive design system for the platform, including component libraries, design tokens, and documentation. This system ensured consistency across the platform and facilitated collaboration between designers and developers.",
  },
  {
    id: "results-impact",
    title: "Results & Impact",
    content:
      "The system has been used to manage over 10,000 educational resources, with content creation efficiency improved by 35% and content discovery (measured by user search success rate) improved by 50%.",
  },
]

// Project metadata
const projectInfo = {
  id: "project3",
  slug: "lei-app-3",
  title: "LEI Application 3",
  subtitle: "Educational Content Management System",
  description:
    "A scalable content management system for creating, organizing, and distributing educational materials across multiple platforms.",
  role: "UX Designer & Design System Architect",
  duration: "10 months",
  team: "Team of 15 (designers, developers, content specialists)",
  color: "green",
  tags: ["Design Systems", "Component Libraries", "Documentation"],
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
}

export default function LEIApp3Page() {
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
