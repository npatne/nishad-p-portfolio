"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PasswordProtection } from "@/components/password-protection"
import { projects } from "@/data/projects" 
import { ProjectSection, ImagePosition, ImageData } from "@/components/projectSection"

// Define the sections for this specific project with the enhanced structure
const projectSectionsContent = [
  {
    content:
      "LEI Application 1 is a comprehensive educational platform designed to help K-12 teachers create, manage, and deliver interactive lessons to their students. The platform needed to be intuitive for teachers with varying levels of technical expertise while providing powerful features for content creation and student engagement tracking.",
    image: "/placeholder.svg?height=600&width=800",
    imagePosition: "right" // Single image example
  },
  {
    content:
      "I led a series of user interviews, contextual inquiries, and surveys with over 50 teachers across different grade levels and subject areas. This research revealed key pain points in existing educational tools and opportunities for innovation in our platform.",
    // Example with multiple images (carousel)
    images: [
      {
        src: "/placeholder.svg?height=600&width=800",
        alt: "User interview session",
        caption: "Conducting user interviews with K-12 teachers"
      },
      {
        src: "/placeholder.svg?height=600&width=800",
        alt: "Survey results visualization",
        caption: "Survey results showing teacher pain points"
      },
      {
        src: "/placeholder.svg?height=600&width=800",
        alt: "Research findings summary",
        caption: "Key findings from our research phase"
      }
    ],
    imagePosition: "left"
  },
  {
    content:
      "## Research Findings\n\nBased on our research findings, I created user personas, journey maps, and information architecture for the platform. I then developed wireframes and interactive prototypes, which were tested with teachers in multiple iterations to refine the user experience.\n\n* **Pain point 1:** Existing tools were too complex\n* **Pain point 2:** Lack of student engagement tracking\n* **Pain point 3:** Poor content organization",
    // Another carousel example
    images: [
      {
        src: "/placeholder.svg?height=600&width=800",
        alt: "User personas",
        caption: "Teacher personas based on research"
      },
      {
        src: "/placeholder.svg?height=600&width=800",
        alt: "User journey map",
        caption: "Journey map showing teacher workflow"
      },
      {
        src: "/placeholder.svg?height=600&width=800",
        alt: "Information architecture",
        caption: "Platform information architecture"
      },
      {
        src: "/placeholder.svg?height=600&width=800",
        alt: "Wireframes",
        caption: "Low-fidelity wireframes"
      }
    ],
    imagePosition: "top"
  },
  {
    content:
      "Working closely with developers, I ensured that the design vision was implemented accurately while making pragmatic adjustments based on technical constraints. I created a comprehensive design system to maintain consistency across the platform and facilitate future development.",
    image: "/placeholder.svg?height=600&width=800",
    imagePosition: "bottom" // Single image example
  },
  {
    content:
      "### Results\n\nThe platform was successfully launched and adopted by over 200 schools in the first year. User satisfaction scores were 30% higher than the previous system, and teacher productivity (measured by time spent creating lessons) improved by 45%.",
    imagePosition: "none" // Example with no image
  },
]

const projectInfo = projects.find((project) => project.slug === "lei-app-1");

const projectSections = projectInfo?.sections.map(
  (section, index) => ({
    id: section.id,
    title: section.title,
    content: projectSectionsContent[index].content,
    image: projectSectionsContent[index].image,
    images: projectSectionsContent[index].images,
    imagePosition: projectSectionsContent[index].imagePosition || "bottom",
  })
);

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
                detail: { sectionId: entry.target.id, projectSlug: projectInfo?.slug },
              }),
            )
          }
        })
      },
      { rootMargin: "-100px 0px -80% 0px" },
    )

    // Observe all section elements
    projectSections?.forEach((section) => {
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
    const section = projectSections?.find((s) => s.id === sectionId)
    if (section) {
      // Create and dispatch a custom event
      const event = new CustomEvent("ai-prompt", {
        detail: {
          section: section.title,
          project: projectInfo?.title,
        },
      })
      window.dispatchEvent(event)
    }
  }

  // Wrap the content with password protection
  return (
    <PasswordProtection>
      <div className="min-h-screen pb-16 max-w-full">
        {/* Project header */}
        <div
          className="py-16 px-6 md:px-10 text-white transition-colors duration-300 max-w-full"
          style={{
            backgroundColor: `${projectInfo?.color}`,
          }}
        >
          <div className="md:max-w-5xl 	lg:max-w-7xl">

          
          <Link
            href="/projects"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{projectInfo?.title}</h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">{projectInfo?.subtitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-white/80">
            <div>
              <h3 className="text-sm font-medium text-white">Role</h3>
              <p>{projectInfo?.role}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">Duration</h3>
              <p>{projectInfo?.duration}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">Team</h3>
              <p>{projectInfo?.team}</p>
            </div>
          </div>
          </div>
        </div>

        {/* Project description */}
        <div className="px-6 md:px-10 py-8">
          <p className="text-xl md:max-w-5xl 	lg:max-w-7xl mx-auto">{projectInfo?.description}</p>
        </div>

        {/* Project content sections */}
        <div className="px-6 md:px-10 md:max-w-5xl 	lg:max-w-7xl mx-auto">
          {projectSections?.map((section, index) => (
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
              
              {/* Using the enhanced ProjectSection component */}
              <ProjectSection
                title={section.title}
                content={section.content}
                image={section.image}
                images={section.images}
                imageAlt={`${projectInfo?.title} - ${section.title}`}
                imagePosition={section.imagePosition as ImagePosition}
                projectTitle={projectInfo?.title}
              />
            </section>
          ))}
        </div>
      </div>
    </PasswordProtection>
  )
}