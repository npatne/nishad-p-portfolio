import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllBlogPosts } from "@/lib/content-manager"

// Define featured projects
const featuredProjects = [
  {
    id: "project1",
    slug: "lei-app-1",
    title: "LEI Application 1",
    subtitle: "Educational Platform for K-12 Teachers",
    description:
      "A comprehensive platform designed to help K-12 teachers create, manage, and deliver interactive lessons to their students.",
    color: "purple",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "project2",
    slug: "lei-app-2",
    title: "LEI Application 2",
    subtitle: "Student Assessment & Progress Tracking System",
    description:
      "An innovative system for tracking student progress and providing personalized learning recommendations based on assessment data.",
    color: "blue",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "project3",
    slug: "lei-app-3",
    title: "LEI Application 3",
    subtitle: "Educational Content Management System",
    description:
      "A scalable content management system for creating, organizing, and distributing educational materials across multiple platforms.",
    color: "green",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: "project4",
    slug: "desktop-app",
    title: "Desktop Application",
    subtitle: "Cross-platform Educational Tool",
    description:
      "A desktop application for creating interactive educational content that works seamlessly across Windows, macOS, and Linux.",
    color: "orange",
    image: "/placeholder.svg?height=600&width=800",
  },
]

export default function Home() {
  const recentBlogPosts = getAllBlogPosts().slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="py-16 px-6 md:px-10 animate-fadeIn">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">UX Designer & Engineer</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fadeIn animation-delay-100">
            Creating intuitive, scalable, and elegant user experiences through research-driven design and engineering
            excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn animation-delay-200">
            <Button
              asChild
              size="lg"
              className="text-lg py-7 px-8 border-2 border-primary bg-transparent text-primary hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors duration-300 shadow-lg"
            >
              <Link href="/projects" className="flex items-center">
                View Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="hover:bg-accent hover:text-accent-foreground hover:border-accent"
            >
              <Link href="/about">About Me</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured projects - ONE PER LINE, MUCH LARGER */}
      <section className="px-6 md:px-10 py-20 animate-slideUp animation-delay-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>

          {/* One project per line */}
          <div className="space-y-16">
            {featuredProjects.map((project) => (
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
                <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-3xl font-bold mb-3">{project.title}</h3>
                    <p className="text-xl mb-4">{project.subtitle}</p>
                    <p className="text-muted-foreground mb-6">{project.description}</p>
                  </div>
                  <Button
                    asChild
                    className="self-start border-2 border-primary bg-transparent text-primary hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors duration-300"
                  >
                    <Link href={`/projects/${project.slug}`} className="flex items-center">
                      View Case Study
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* More prominent "View All Projects" button */}
          <div className="mt-16 text-center">
            <Button
              asChild
              size="lg"
              className="text-lg py-7 px-8 border-2 border-primary bg-transparent text-primary hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors duration-300 shadow-lg"
            >
              <Link href="/projects" className="flex items-center">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured blog posts - LARGER WITHOUT IMAGES */}
      <section className="px-6 md:px-10 py-16 bg-secondary/30 animate-slideUp animation-delay-400">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Featured Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentBlogPosts.map((post) => (
              <article key={post.id} className="card p-6 hover:shadow-md transition-shadow duration-300">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <span className="text-sm text-muted-foreground">{post.date}</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-primary hover:underline font-medium"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button
              asChild
              className="border-2 border-primary bg-transparent text-primary hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors duration-300"
            >
              <Link href="/blog" className="flex items-center">
                View All Blog Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Say Hi section */}
      <section className="px-6 md:px-10 py-16 animate-slideUp animation-delay-500">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Have a project in mind or just want to chat about UX design and engineering? I'd love to hear from you!
          </p>
          <Button
            asChild
            size="lg"
            className="text-lg py-6 px-8 border-2 border-primary bg-transparent text-primary hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors duration-300"
          >
            <Link href="/contact" className="flex items-center">
              Say Hi
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
