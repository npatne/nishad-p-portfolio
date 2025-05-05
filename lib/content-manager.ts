// Simple file-based content management system
// This could be replaced with a headless CMS integration later

import { ImagePosition } from "@/components/projectSection"; // Import ImagePosition

// Define the structure for a single section within a blog post
export type BlogSection = {
  id: string; // Unique ID for the section (e.g., for linking)
  title?: string; // Optional title for the section (can be rendered as h2 or similar)
  content: string; // Markdown content for the section
  image?: string; // Optional image URL
  imageAlt?: string; // Optional image alt text
  imagePosition?: ImagePosition; // Optional image position
};


export type BlogPostContent = {
  id: string
  slug: string
  title: string
  date: string
  readTime: string
  image: string // Main header image for the blog post
  excerpt: string
  // Update content to be an array of BlogSection objects
  content: BlogSection[] 
}

// Blog posts data - Updated structure
export const blogPosts: BlogPostContent[] = [
  {
    id: "post1",
    slug: "ux-dark-patterns",
    title: "Exposing UX Dark Patterns in Modern Interfaces",
    excerpt:
      "A critical look at how some digital products manipulate users through deceptive design, and why ethical UX matters more than ever.",
    date: "April 15, 2023",
    readTime: "7 min read",
    image: "/placeholder.svg?height=300&width=600", // Main header image
    content: [
      {
        id: "intro",
        content: "Dark patterns are deceptive UX/UI practices used to trick users into doing things they might not otherwise do—like signing up for recurring payments or giving up personal data. These manipulative tactics are baked into the interfaces of many modern apps and websites, often under the guise of 'optimizing conversions.'",
        image: "/placeholder.svg?height=400&width=600", // Section image
        imagePosition: "right",
      },
      {
        id: "common-types",
        title: "Common Types of Dark Patterns",
        content: "Dark patterns come in many forms, and spotting them is the first step toward fighting back. Some of the most notorious types include:\n\n*   **Roach motels:** Easy to get into, hard to get out of (e.g., canceling subscriptions)\n*   **Forced continuity:** Automatically charging users after a free trial without clear notice\n*   **Trick questions:** Misleading language to confuse users into opting in\n*   **Hidden costs:** Unexpected fees appearing at the last step of checkout\n*   **Confirmshaming:** Guilt-tripping users for declining an offer or opting out",
        image: "/placeholder.svg?height=300&width=500",
        imagePosition: "left",
      },
      {
        id: "why-matters",
        title: "Why It Matters",
        content: "These patterns erode trust and damage user relationships. Ethical design is not just good practice—it's good business. As regulations tighten and users become more aware, companies using dark patterns may face reputational and legal consequences.",
        imagePosition: "none", // No image for this section
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
        id: "intro-scaling",
        content: "Design systems have become an essential tool for organizations building multiple products across different platforms. They provide a single source of truth for design and development teams, ensuring consistency and efficiency. However, scaling a design system for enterprise applications presents unique challenges that require careful planning and execution.",
        image: "/placeholder.svg?height=400&width=600",
        imagePosition: "bottom",
      },
      {
        id: "challenges-scaling",
        title: "The Challenges of Enterprise Design Systems",
        content: "Enterprise applications often have complex requirements, diverse user groups, and multiple teams working on different parts of the system. This complexity can make it difficult to maintain consistency and efficiency across the organization. Some common challenges include:\n\n*   Multiple products with different requirements and constraints\n*   Diverse user groups with varying needs and preferences\n*   Large teams with different workflows and processes\n*   Legacy systems that need to be integrated with new design patterns\n*   Balancing consistency with the need for customization",
        imagePosition: "top",
        image: "/placeholder.svg?height=350&width=550",
      },
      // Add more sections as needed...
    ],
  },
  // Add updated structures for post3, post4, post5 similarly...
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
        id: "edu-intro",
        content: "Educational applications present unique challenges for UX researchers. They must consider diverse user groups (students, teachers, administrators), varying educational contexts, and complex learning objectives. In this article, I'll share specialized research methods that have proven effective in understanding the needs of educational users.",
        image: "/placeholder.svg?height=400&width=600",
        imagePosition: "right",
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
        id: "collab-intro",
        content: "The relationship between designers and developers is crucial for creating successful digital products. Yet, these two disciplines often operate with different mindsets, tools, and priorities, leading to friction and inefficiency. As someone who has worked in both roles, I've experienced these challenges firsthand and developed strategies for improving collaboration.",
        image: "/placeholder.svg?height=400&width=600",
        imagePosition: "left",
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
        id: "a11y-intro",
        content: "Accessibility is often treated as an afterthought in web development, but it should be a fundamental consideration from the start. Creating inclusive web experiences isn't just about compliance with regulations—it's about ensuring that everyone, regardless of ability, can use and benefit from your application.",
        image: "/placeholder.svg?height=400&width=600",
        imagePosition: "bottom",
      },
      // More content...
    ],
  },
]

export function getAllBlogPosts(): BlogPostContent[] {
  // Ensure content is always an array, even if empty in source data
  return blogPosts.map(post => ({ ...post, content: post.content || [] }));
}

export function getBlogPostBySlug(slug: string): BlogPostContent | undefined {
  const post = blogPosts.find((post) => post.slug === slug);
  // Ensure content is always an array if post is found
  return post ? { ...post, content: post.content || [] } : undefined;
}
