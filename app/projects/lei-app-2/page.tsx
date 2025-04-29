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
      "LEI Application 2 is a student assessment and progress tracking system designed to help teachers monitor student performance and provide personalized learning recommendations. The system needed to present complex data in an accessible way while offering actionable insights.",
  },
  {
    id: "research-discovery",
    title: "Research & Discovery",
    content:
      "I conducted user research with teachers and educational administrators to understand their needs for assessment data visualization and analysis. This included card sorting exercises to organize information effectively and usability testing of existing assessment tools.",
  },
  {
    id: "design-process",
    title: "Design Process",
    content:
      "I created wireframes and prototypes for the assessment dashboard, focusing on clear data visualization and intuitive navigation. The design went through multiple iterations based on user feedback, with particular attention to making complex data accessible to non-technical users.",
  },
  {
    id: "implementation",
    title: "Implementation",
    content:
      "In addition to designing the interface, I contributed to front-end development using React and D3.js for data visualization. This dual role allowed me to ensure that the design vision was maintained throughout implementation and to make informed design decisions based on technical considerations.",
  },
  {
    id: "results-impact",
    title: "Results & Impact",
    content:
      "The system has been implemented in over 150 classrooms, with teachers reporting a 40% increase in their ability to identify struggling students early and a 25% reduction in time spent analyzing assessment data.",
  },
]

// Project metadata
const projectInfo = {
  id: "project2",
  slug: "lei-app-2",
  title: "LEI Application 2",
  subtitle: "Student Assessment & Progress Tracking System",
  description:
    "An innovative system for tracking student progress and providing personalized learning recommendations based on assessment data.",
  role: "UX Designer & Front-end Developer",
  duration: "6 months",
  team: "Team of 8 (designers, developers, data scientists)",
  color: "blue",
  tags: ["UI Design", "User Testing", "Accessibility"],
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
}

export default function LEIApp2Page() {
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
