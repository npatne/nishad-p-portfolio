import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { getAllBlogPosts } from "@/lib/content-manager"

export default function BlogPage() {
  const blogPosts = getAllBlogPosts()

  return (
    <div className="min-h-screen py-12 px-6 md:px-10">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Thoughts, insights, and explorations on UX design, engineering, and the intersection of both disciplines.
        </p>
      </header>

      <div className="space-y-12">
        {blogPosts.map((post) => (
          <article key={post.id} className="border border-border rounded-lg overflow-hidden">
            <Link href={`/blog/${post.slug}`} className="block hover:opacity-90 transition-opacity">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-48 md:h-64 object-cover"
              />
            </Link>
            <div className="p-6">
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <div className="flex items-center mr-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-3">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-primary hover:underline font-medium"
              >
                Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
