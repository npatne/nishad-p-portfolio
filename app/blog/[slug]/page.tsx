import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, Clock } from "lucide-react"
import { getBlogPostBySlug } from "@/lib/content-manager"
import { ProjectSection, ImagePosition } from "@/components/projectSection" // Import ProjectSection and ImagePosition

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Post header */}
      <div className="relative h-64 md:h-96">
        {/* Use post.image for the header */}
        <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-end p-6 md:p-10">
          <div className="md:max-w-5xl lg:max-w-7xl mx-auto w-full"> {/* Constrain width */}
            <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{post.title}</h1>
            <div className="flex items-center text-sm text-white/80">
              <div className="flex items-center mr-4">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Post content - Use ProjectSection */}
      <div className="px-6 md:px-10 py-12 md:max-w-5xl lg:max-w-7xl mx-auto space-y-12"> {/* Add space between sections */}
        {post.content.map((section, index) => (
          <section key={section.id || index} id={section.id}> {/* Add section tag and ID */}
            {/* Optionally render the section title if it exists */}
            {section.title && (
              <h2 className="text-2xl md:text-3xl font-bold mb-6 mt-8 first:mt-0"> {/* Add styling for title */}
                {section.title}
              </h2>
            )}
            <ProjectSection
              // Pass an empty string for title prop in ProjectSection if section.title is used above
              title="" 
              content={section.content}
              image={section.image}
              imageAlt={section.imageAlt || `${post.title} - Section ${index + 1}`}
              imagePosition={section.imagePosition as ImagePosition} // Cast type if needed
              projectTitle={post.title} // Pass blog post title as projectTitle
            />
          </section>
        ))}
      </div>
    </div>
  )
}
