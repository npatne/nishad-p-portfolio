import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { projects } from "@/data/projects" // Import centralized projects
import ProjectCard from "@/components/ProjectCard" // Import the new component

// Remove local projects definition
// const projects = [ ... ]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen py-12 px-6 md:px-10 md:max-w-5xl 	lg:max-w-7xl">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          A collection of UX design and engineering projects showcasing my experience in creating intuitive, scalable,
          and elegant user experiences.
        </p>
      </header>

      <div className="space-y-12">
        {/* Use ProjectCard component */}
        {projects.map((project) => (
           <ProjectCard key={project.id} project={project} layout="horizontal" />
        ))}
      </div>
    </div>
  )
}
