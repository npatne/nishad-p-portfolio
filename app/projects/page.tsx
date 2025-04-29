import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Define projects for the index page
const projects = [
  {
    id: "project1",
    slug: "lei-app-1",
    title: "LEI Application 1",
    subtitle: "Educational Platform for K-12 Teachers",
    description:
      "A comprehensive platform designed to help K-12 teachers create, manage, and deliver interactive lessons to their students.",
    role: "Lead UX Designer & Researcher",
    color: "purple",
    tags: ["UX Research", "Design Systems", "Prototyping"],
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "project2",
    slug: "lei-app-2",
    title: "LEI Application 2",
    subtitle: "Student Assessment & Progress Tracking System",
    description:
      "An innovative system for tracking student progress and providing personalized learning recommendations based on assessment data.",
    role: "UX Designer & Front-end Developer",
    color: "blue",
    tags: ["UI Design", "User Testing", "Accessibility"],
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "project3",
    slug: "lei-app-3",
    title: "LEI Application 3",
    subtitle: "Educational Content Management System",
    description:
      "A scalable content management system for creating, organizing, and distributing educational materials across multiple platforms.",
    role: "UX Designer & Design System Architect",
    color: "green",
    tags: ["Design Systems", "Component Libraries", "Documentation"],
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "project4",
    slug: "desktop-app",
    title: "Desktop Application",
    subtitle: "Cross-platform Educational Tool",
    description:
      "A desktop application for creating interactive educational content that works seamlessly across Windows, macOS, and Linux.",
    role: "UX Designer & Front-end Engineer",
    color: "orange",
    tags: ["Electron", "Cross-platform", "Performance Optimization"],
    image: "/placeholder.svg?height=600&width=800",
  },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen py-12 px-6 md:px-10">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          A collection of UX design and engineering projects showcasing my experience in creating intuitive, scalable,
          and elegant user experiences.
        </p>
      </header>

      <div className="space-y-12">
        {projects.map((project) => (
          <div key={project.id} className="card overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-3">{project.title}</h2>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags?.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center text-primary hover:underline font-medium"
                >
                  View Case Study
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
