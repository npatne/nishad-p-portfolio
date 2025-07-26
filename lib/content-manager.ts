// Simple file-based content management system
// This could be replaced with a headless CMS integration later

import { ImagePosition } from "@/components/projectSection"; // Import ImagePosition
import { blogData } from "./blogs.data";

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
export const blogPosts: BlogPostContent[] = blogData as BlogPostContent[];

export function getAllBlogPosts(): BlogPostContent[] {
  // Ensure content is always an array, even if empty in source data
  return blogPosts.map(post => ({ ...post, content: post.content || [] }));
}

export function getBlogPostBySlug(slug: string): BlogPostContent | undefined {
  const post = blogPosts.find((post) => post.slug === slug);
  // Ensure content is always an array if post is found
  return post ? { ...post, content: post.content || [] } : undefined;
}
