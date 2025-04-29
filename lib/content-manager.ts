// Simple file-based content management system
// This could be replaced with a headless CMS integration later

// Types for our content
export type ProjectContent = {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  role: string
  duration: string
  team: string
  color: string
  sections: {
    title: string
    content: string
  }[]
  images: string[]
  featured?: boolean
  tags?: string[]
}

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

// Projects data
export const projects: ProjectContent[] = [
  {
    id: "project1",
    slug: "lei-app-1",
    title: "LEI Application 1",
    subtitle: "Educational Platform for K-12 Teachers",
    description:
      "A comprehensive platform designed to help K-12 teachers create, manage, and deliver interactive lessons to their students.",
    role: "Lead UX Designer & Researcher",
    duration: "8 months",
    team: "Cross-functional team of 12 (designers, developers, educators)",
    color: "purple",
    featured: true,
    tags: ["UX Research", "Design Systems", "Prototyping"],
    sections: [
      {
        title: "Project Overview",
        content:
          "LEI Application 1 is a comprehensive educational platform designed to help K-12 teachers create, manage, and deliver interactive lessons to their students. The platform needed to be intuitive for teachers with varying levels of technical expertise while providing powerful features for content creation and student engagement tracking.",
      },
      {
        title: "Research & Discovery",
        content:
          "I led a series of user interviews, contextual inquiries, and surveys with over 50 teachers across different grade levels and subject areas. This research revealed key pain points in existing educational tools and opportunities for innovation in our platform.",
      },
      {
        title: "Design Process",
        content:
          "Based on our research findings, I created user personas, journey maps, and information architecture for the platform. I then developed wireframes and interactive prototypes, which were tested with teachers in multiple iterations to refine the user experience.",
      },
      {
        title: "Implementation",
        content:
          "Working closely with developers, I ensured that the design vision was implemented accurately while making pragmatic adjustments based on technical constraints. I created a comprehensive design system to maintain consistency across the platform and facilitate future development.",
      },
      {
        title: "Results & Impact",
        content:
          "The platform was successfully launched and adopted by over 200 schools in the first year. User satisfaction scores were 30% higher than the previous system, and teacher productivity (measured by time spent creating lessons) improved by 45%.",
      },
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
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
    featured: true,
    tags: ["UI Design", "User Testing", "Accessibility"],
    sections: [
      {
        title: "Project Overview",
        content:
          "LEI Application 2 is a student assessment and progress tracking system designed to help teachers monitor student performance and provide personalized learning recommendations. The system needed to present complex data in an accessible way while offering actionable insights.",
      },
      {
        title: "Research & Discovery",
        content:
          "I conducted user research with teachers and educational administrators to understand their needs for assessment data visualization and analysis. This included card sorting exercises to organize information effectively and usability testing of existing assessment tools.",
      },
      {
        title: "Design Process",
        content:
          "I created wireframes and prototypes for the assessment dashboard, focusing on clear data visualization and intuitive navigation. The design went through multiple iterations based on user feedback, with particular attention to making complex data accessible to non-technical users.",
      },
      {
        title: "Implementation",
        content:
          "In addition to designing the interface, I contributed to front-end development using React and D3.js for data visualization. This dual role allowed me to ensure that the design vision was maintained throughout implementation and to make informed design decisions based on technical considerations.",
      },
      {
        title: "Results & Impact",
        content:
          "The system has been implemented in over 150 classrooms, with teachers reporting a 40% increase in their ability to identify struggling students early and a 25% reduction in time spent analyzing assessment data.",
      },
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
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
    featured: true,
    tags: ["Design Systems", "Component Libraries", "Documentation"],
    sections: [
      {
        title: "Project Overview",
        content:
          "LEI Application 3 is a content management system designed specifically for educational materials. The system needed to support various content types, complex metadata, and distribution across multiple platforms while remaining intuitive for content creators.",
      },
      {
        title: "Research & Discovery",
        content:
          "I led research with content creators, educators, and students to understand their needs and workflows. This included content audits, workflow analysis, and competitive research to identify best practices and opportunities for innovation.",
      },
      {
        title: "Design Process",
        content:
          "Based on research findings, I developed the information architecture and user flows for the system. I created wireframes and prototypes for key user journeys, focusing on content creation, organization, and discovery. The design was refined through multiple rounds of usability testing.",
      },
      {
        title: "Design System Development",
        content:
          "I architected a comprehensive design system for the platform, including component libraries, design tokens, and documentation. This system ensured consistency across the platform and facilitated collaboration between designers and developers.",
      },
      {
        title: "Results & Impact",
        content:
          "The system has been used to manage over 10,000 educational resources, with content creation efficiency improved by 35% and content discovery (measured by user search success rate) improved by 50%.",
      },
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
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
    featured: true,
    tags: ["Electron", "Cross-platform", "Performance Optimization"],
    sections: [
      {
        title: "Project Overview",
        content:
          "This desktop application is a cross-platform tool for creating interactive educational content. The application needed to provide powerful content creation capabilities while maintaining a consistent user experience across Windows, macOS, and Linux.",
      },
      {
        title: "Research & Discovery",
        content:
          "I conducted user research with educators who create educational content, focusing on their workflows, pain points, and feature requirements. This included competitive analysis of existing desktop tools and identification of platform-specific considerations.",
      },
      {
        title: "Design Process",
        content:
          "I created wireframes and prototypes for the application, focusing on a consistent experience across platforms while respecting platform-specific conventions. The design was refined through multiple rounds of usability testing on different operating systems.",
      },
      {
        title: "Implementation",
        content:
          "I worked closely with the development team to implement the front-end using Electron and React. My dual role as designer and engineer allowed me to make informed decisions about technical feasibility and to ensure that the design vision was maintained throughout implementation.",
      },
      {
        title: "Results & Impact",
        content:
          "The application has been downloaded over 50,000 times, with users reporting a 40% increase in content creation efficiency compared to previous tools. The application has received positive reviews for its intuitive interface and cross-platform consistency.",
      },
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
]

// Blog posts data
export const blogPosts: BlogPostContent[] = [
  {
    id: "post1",
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
    id: "post2",
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
    id: "post3",
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
    id: "post4",
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

// Helper functions to get content
export function getAllProjects(): ProjectContent[] {
  return projects
}

export function getFeaturedProjects(): ProjectContent[] {
  return projects.filter((project) => project.featured)
}

export function getProjectBySlug(slug: string): ProjectContent | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getAllBlogPosts(): BlogPostContent[] {
  return blogPosts
}

export function getBlogPostBySlug(slug: string): BlogPostContent | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
