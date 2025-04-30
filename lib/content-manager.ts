// Simple file-based content management system
// This could be replaced with a headless CMS integration later

export type BlogPostContent = {
  id: string
  slug: string
  title: string
  date: string
  readTime: string
  image: string
  excerpt: string
  content: {
    type: "paragraph" | "heading" | "list"
    text?: string
    items?: string[]
  }[]
}

// Blog posts data
export const blogPosts: BlogPostContent[] = [
  {
    id: "post1",
    slug: "ux-dark-patterns",
    title: "Exposing UX Dark Patterns in Modern Interfaces",
    excerpt:
      "A critical look at how some digital products manipulate users through deceptive design, and why ethical UX matters more than ever.",
    date: "April 15, 2023",
    readTime: "7 min read",
    image: "/placeholder.svg?height=300&width=600",
    content: [
      {
        type: "paragraph",
        text: "Dark patterns are deceptive UX/UI practices used to trick users into doing things they might not otherwise do—like signing up for recurring payments or giving up personal data. These manipulative tactics are baked into the interfaces of many modern apps and websites, often under the guise of 'optimizing conversions.'",
      },
      {
        type: "heading",
        text: "Common Types of Dark Patterns",
      },
      {
        type: "paragraph",
        text: "Dark patterns come in many forms, and spotting them is the first step toward fighting back. Some of the most notorious types include:",
      },
      {
        type: "list",
        items: [
          "Roach motels: Easy to get into, hard to get out of (e.g., canceling subscriptions)",
          "Forced continuity: Automatically charging users after a free trial without clear notice",
          "Trick questions: Misleading language to confuse users into opting in",
          "Hidden costs: Unexpected fees appearing at the last step of checkout",
          "Confirmshaming: Guilt-tripping users for declining an offer or opting out",
        ],
      },
      {
        type: "heading",
        text: "Why It Matters",
      },
      {
        type: "paragraph",
        text: "These patterns erode trust and damage user relationships. Ethical design is not just good practice—it's good business. As regulations tighten and users become more aware, companies using dark patterns may face reputational and legal consequences.",
      }
    ],
  },
  {
    id: "post2",
    slug: "scaling-design-systems",
    title: "Scaling Design Systems for Enterprise Applications",
    excerpt:
      "How to create and maintain design systems that scale across multiple products and teams while maintaining consistency and flexibility.",
    date: "April 15, 2023",
    readTime: "8 min read",
    image: "/placeholder.svg?height=300&width=600",
    content: [
      {
        type: "paragraph",
        text: "Design systems have become an essential tool for organizations building multiple products across different platforms. They provide a single source of truth for design and development teams, ensuring consistency and efficiency. However, scaling a design system for enterprise applications presents unique challenges that require careful planning and execution.",
      },
      {
        type: "heading",
        text: "The Challenges of Enterprise Design Systems",
      },
      {
        type: "paragraph",
        text: "Enterprise applications often have complex requirements, diverse user groups, and multiple teams working on different parts of the system. This complexity can make it difficult to maintain consistency and efficiency across the organization. Some common challenges include:",
      },
      {
        type: "list",
        items: [
          "Multiple products with different requirements and constraints",
          "Diverse user groups with varying needs and preferences",
          "Large teams with different workflows and processes",
          "Legacy systems that need to be integrated with new design patterns",
          "Balancing consistency with the need for customization",
        ],
      },
      // More content...
    ],
  },
  {
    id: "post3",
    slug: "ux-research-educational-apps",
    title: "UX Research Methods for Educational Applications",
    excerpt:
      "A deep dive into specialized research methods for understanding the needs of teachers, students, and educational administrators.",
    date: "March 2, 2023",
    readTime: "12 min read",
    image: "/placeholder.svg?height=300&width=600",
    content: [
      {
        type: "paragraph",
        text: "Educational applications present unique challenges for UX researchers. They must consider diverse user groups (students, teachers, administrators), varying educational contexts, and complex learning objectives. In this article, I'll share specialized research methods that have proven effective in understanding the needs of educational users.",
      },
      // More content...
    ],
  },
  {
    id: "post4",
    slug: "design-development-collaboration",
    title: "Bridging the Gap Between Design and Development",
    excerpt:
      "Strategies for improving collaboration between designers and developers to create more cohesive and efficient product development cycles.",
    date: "January 18, 2023",
    readTime: "10 min read",
    image: "/placeholder.svg?height=300&width=600",
    content: [
      {
        type: "paragraph",
        text: "The relationship between designers and developers is crucial for creating successful digital products. Yet, these two disciplines often operate with different mindsets, tools, and priorities, leading to friction and inefficiency. As someone who has worked in both roles, I've experienced these challenges firsthand and developed strategies for improving collaboration.",
      },
      // More content...
    ],
  },
  {
    id: "post5",
    slug: "accessibility-web-applications",
    title: "Accessibility in Modern Web Applications",
    excerpt:
      "Best practices for creating inclusive web experiences that work for users of all abilities and with various assistive technologies.",
    date: "December 5, 2022",
    readTime: "9 min read",
    image: "/placeholder.svg?height=300&width=600",
    content: [
      {
        type: "paragraph",
        text: "Accessibility is often treated as an afterthought in web development, but it should be a fundamental consideration from the start. Creating inclusive web experiences isn't just about compliance with regulations—it's about ensuring that everyone, regardless of ability, can use and benefit from your application.",
      },
      // More content...
    ],
  },
]

export function getAllBlogPosts(): BlogPostContent[] {
  return blogPosts
}

export function getBlogPostBySlug(slug: string): BlogPostContent | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
