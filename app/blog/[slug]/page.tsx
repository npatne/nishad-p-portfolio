import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, Clock } from "lucide-react"
import { getBlogPostBySlug } from "@/lib/content-manager"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Post header */}
      <div className="relative h-64 md:h-96">
        <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-end p-6 md:p-10 md:max-w-5xl 	lg:max-w-7xl">
          <div>
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

      {/* Post content */}
      <div className="px-6 md:px-10 py-12 md:max-w-5xl 	lg:max-w-7xl mx-auto">
        {post.content.map((block, index) => {
          switch (block.type) {
            case "paragraph":
              return (
                <p key={index} className="text-muted-foreground mb-6">
                  {block.text}
                </p>
              )
            case "heading":
              return (
                <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                  {block.text}
                </h2>
              )
            case "list":
              return (
                <ul key={index} className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                  {block.items?.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              )
            default:
              return null
          }
        })}
      </div>
    </div>
  )
}
