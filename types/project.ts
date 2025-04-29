import type { ReactNode } from "react"

export interface ProjectSection {
  id: string
  title: string
  content: ReactNode | string
}

export interface ProjectContent {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  role: string
  duration: string
  team: string
  color: string
  featured?: boolean
  tags?: string[]
  sections: ProjectSection[]
  images?: string[]
  videos?: string[]
}
