// Simple file-based content management system
// This could be replaced with a headless CMS integration later

import { ImagePosition } from "@/components/projectSection"; // Import ImagePosition

// Define the structure for a single section within a blog post
export type BlogSection = {
  id: string; // Unique ID for the section (e.g., for linking)
  title?: string; // Optional title for the section (can be rendered as h2 or similar)
  content: string; // Markdown content for the section
  image?: string; // Optional image URL
  images?: { src: string; alt?: string; caption?: string }[]; // Add support for multiple images
  imageAlt?: string; // Optional image alt text
  imagePosition?: ImagePosition; // Optional image position
  singleImageCaption?: string; // Optional single image caption
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
        images: [
          { src: "/placeholder.svg?height=200&width=300", alt: "Image 1",caption: "Caption 1" },
          { src: "/placeholder.svg?height=200&width=300", alt: "Image 2" , caption: "Caption 2"},
          { src: "/placeholder.svg?height=200&width=300", alt: "Image 3", caption: "Caption 3"}
        ], // Multiple images
        imagePosition: "right",
      },
      {
        id: "common-types",
        title: "Common Types of Dark Patterns",
        content: "Dark patterns come in many forms, and spotting them is the first step toward fighting back. Some of the most notorious types include:\n\n*   **Roach motels:** Easy to get into, hard to get out of (e.g., canceling subscriptions)\n*   **Forced continuity:** Automatically charging users after a free trial without clear notice\n*   **Trick questions:** Misleading language to confuse users into opting in\n*   **Hidden costs:** Unexpected fees appearing at the last step of checkout\n*   **Confirmshaming:** Guilt-tripping users for declining an offer or opting out",
        image: "/placeholder.svg?height=300&width=500",
        singleImageCaption: "Caption 1",
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
