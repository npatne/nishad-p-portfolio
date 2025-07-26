import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllBlogPosts } from "@/lib/content-manager"
import { projects } from "@/data/projects" // Import centralized projects
import ProjectCard from "@/components/ProjectCard" // Import the new component

// Remove local featuredProjects definition
// const featuredProjects = [ ... ]

export default function Home() {
  const recentBlogPosts = getAllBlogPosts().slice(0, 3)
  const featuredProjectsData = projects.filter(p => p.featured) // Filter from centralized data

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="py-16 px-16 md:px-10 animate-fadeIn">
        <div className="md:max-w-5xl 	lg:max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-primary">Nishad Patne,</h1>
          <h2 className="text-2xl md:text-3xl  font-semibold text-muted-foreground mb-8 animate-fadeIn animation-delay-100">
            UX Designer & Engineer
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fadeIn animation-delay-100">
            Creating intuitive, scalable, and elegant user experiences through research-driven design and engineering
            excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 animate-fadeIn animation-delay-200">

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
        <div className="md:max-w-5xl 	lg:max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>

          {/* One project per line */}
          <div className="space-y-16">
            {/* Use ProjectCard component */}
            {featuredProjectsData.map((project) => (
              <ProjectCard key={project.id} project={project} layout="horizontal" />
            ))}
          </div>

          {/* More prominent "View All Projects" button */}
          <div className="mt-16 text-center">
            <Button
              asChild
              size="lg"
              className="text-md border-2 border-primary bg-transparent text-primary hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors duration-300 shadow-lg"
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
        <div className="md:max-w-5xl 	lg:max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Featured Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentBlogPosts.map((post) => (
              <article key={post.id} className="card p-6 hover:shadow-md transition-shadow duration-300">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold me-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">{post.readTime}</div>
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
        <div className="md:max-w-5xl 	lg:max-w-7xl mx-auto text-center">
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
