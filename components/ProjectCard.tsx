import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ProjectContent } from "@/types/project"

interface ProjectCardProps {
  project: ProjectContent
  layout?: "horizontal" | "vertical" // Optional layout prop
}

export default function ProjectCard({ project, layout = "horizontal" }: ProjectCardProps) {
  if (layout === "horizontal") {
    // Layout similar to home page (p2)
    return (
      <div
        key={project.id}
        className="project-card flex flex-col lg:flex-row gap-8 rounded-xl overflow-hidden border border-border shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div className="lg:w-1/2 h-80 lg:h-auto overflow-hidden">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="lg:w-1/2 p-8 flex flex-col justify-between items-end">
          <div>
            <h3 className="text-3xl font-bold mb-3">{project.title}</h3>
            <p className="text-xl mb-4">{project.subtitle}</p>
            <p className="text-muted-foreground mb-6">{project.description}</p>
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <Button
            asChild
            className="self-start-to-remove border-2 border-primary bg-transparent text-primary hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors duration-300"
          >
            <Link href={`/projects/${project.slug}`} className="flex items-center">
              View Case Study
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    )
  } else {
    // Layout similar to projects page (p1)
    return (
      <div key={project.id} className="card overflow-hidden border border-border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="grid md:grid-cols-2 gap-0"> {/* Removed gap-6 */}
          <div className="aspect-video-not-needed overflow-hidden">
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 flex flex-col justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold mb-3">{project.title}</h2>
              {/* Subtitle can be added if desired */}
              {/* <p className="text-lg text-muted-foreground mb-4">{project.subtitle}</p> */}
              <p className="text-muted-foreground mb-4">{project.description}</p>
              {project.tags && project.tags.length > 0 && (
                 <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
              )}
            </div>
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center text-primary hover:underline font-medium self-start-to-remove mt-4" // Added self-start and mt-4
            >
              View Case Study
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}