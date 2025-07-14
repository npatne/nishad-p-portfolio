import type { ProjectContent } from "@/types/project"

export const projects: ProjectContent[] = [
  {
    id: "project1",
    slug: "wat-researcher",
    title: "WAT Researcher",
    subtitle: "Desktop-First Text Analytics",
    description:
      "A case study in strategic product pivoting, describing the redesign and engineering of a desktop-first academic NLP tool to replace an aging desktop tool.",
    role: "Sole UX Designer & Engineer",
    duration: "6 months",
    team: "Team of 3 (UX Designer & Engineer - Me, Project Manager, Principal Investigator)",
    color: "#008394",
    featured: true, // Keep featured
    image: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/WAT%20Researcher/iMac%2024%20inch.jpg", // Add image
    tags: ["Desktop App UX", "UX Engineering", "NLP", "Electron", "Strategic Pivot"],
    sections: [
      {
        id: "tldr",
        title: "TL;DR",
        
      },
      {
        id: "problem",
        title: "The Problem",
        
      },
      {
        id: "role",
        title: "Role & Contributions",
        
      },
      {
        id: "process",
        title: "The Process",
        
      },
      {
        id: "solution",
        title: "The Solution",
        
      },
      {
        id: "outcome",
        title: "Outcomes and Impact",
        
      },
      {
        id:"tech",
        title:"Tech Stack",
      },
      {
        id:'career',
        title:"Career Alignment"

      }
      
    ],
  },
  {
    id: "project2",
    slug: "lei-app-2",
    title: "LEI Application 2",
    subtitle: "Student Assessment & Progress Tracking System",
    description:
      "An innovative system for tracking student progress and providing personalized learning recommendations based on assessment data.",
    role: "UX Designer & Front-end Developer",
    duration: "6 months",
    team: "Team of 8 (designers, developers, data scientists)",
    color: "blue",
    featured: true, // Keep featured
    image: "/placeholder.svg?height=600&width=800", // Add image
    tags: ["UI Design", "User Testing", "Accessibility"],
    sections: [
      {
        id: "project-overview",
        title: "Project Overview",
        // content removed
      },
      {
        id: "research-discovery",
        title: "Research & Discovery",
        // content removed
      },
      {
        id: "design-process",
        title: "Design Process",
        // content removed
      },
      {
        id: "implementation",
        title: "Implementation",
        // content removed
      },
      {
        id: "results-impact",
        title: "Results & Impact",
        // content removed
      },
    ],
   
  },
  {
    id: "project3",
    slug: "lei-app-3",
    title: "LEI Application 3",
    subtitle: "Educational Content Management System",
    description:
      "A scalable content management system for creating, organizing, and distributing educational materials across multiple platforms.",
    role: "UX Designer & Design System Architect",
    duration: "10 months",
    team: "Team of 15 (designers, developers, content specialists)",
    color: "green",
    featured: true, // Set featured to false
    image: "/placeholder.svg?height=600&width=800", // Add image
    tags: ["Design Systems", "Component Libraries", "Documentation"],
    sections: [
      {
        id: "project-overview",
        title: "Project Overview",
        // content removed
      },
      {
        id: "research-discovery",
        title: "Research & Discovery",
        // content removed
      },
      {
        id: "design-process",
        title: "Design Process",
        // content removed
      },
      {
        id: "implementation",
        title: "Implementation",
        // content removed
      },
      {
        id: "results-impact",
        title: "Results & Impact",
        // content removed
      },
    ],
  },
  {
    id: "project4",
    slug: "desktop-app",
    title: "Desktop Application",
    subtitle: "Cross-platform Educational Tool",
    description:
      "A desktop application for creating interactive educational content that works seamlessly across Windows, macOS, and Linux.",
    role: "UX Designer & Front-end Engineer",
    duration: "12 months",
    team: "Team of 6 (designers, developers)",
    color: "orange",
    featured: false, // Set featured to false
    image: "/placeholder.svg?height=600&width=800", // Add image
    tags: ["Electron", "Cross-platform", "Performance Optimization"],
    sections: [
      {
        id: "project-overview",
        title: "Project Overview",
        // content removed
      },
      {
        id: "research-discovery",
        title: "Research & Discovery",
        // content removed
      },
      {
        id: "design-process",
        title: "Design Process",
        // content removed
      },
      {
        id: "implementation",
        title: "Implementation",
        // content removed
      },
      {
        id: "results-impact",
        title: "Results & Impact",
        // content removed
      },
    ],
    
  },
]

export const getActiveCaseStudyLiteral = (slug: string): string => {
  let literal = "";
   switch (slug) {
    case "wat-researcher":
      literal = "WAT Researcher: Desktop-First Text Analytics";
      break;
    case "lei-app-2":
      literal = "LEI Application 2";
      break;
   }
  return literal  
}