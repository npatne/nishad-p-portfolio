import type { ProjectContent } from "@/types/project";

export const projects: ProjectContent[] = [
  {
    id: "project1",
    slug: "wat-researcher",
    title: "WAT Researcher",
    subtitle: "Desktop-First Text Analytics",
    description:
      "A case study in strategic product pivoting, describing the design & redesign and engineering of a desktop-first academic NLP tool to replace an aging desktop tool.",
    role: "Sole UX Designer & Engineer",
    duration: "6 months",
    team: "Me (UX designer and Engineer ), Project Manager, Principal Investigator",
    color: "#008394",
    featured: true, // Keep featured
    image:
      "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/WAT%20Researcher/iMac%2024%20inch.png", // Add image
    tags: [
      "Desktop App UX",
      "UX Engineering",
      "NLP",
      "Electron",
      "Strategic Pivot",
    ],
    sections: [
      {
        id: "tldr",
        title: "TL;DR",
      },
      {
        id: "Challenge",
        title: "Challenge",
      },
      {
        id: "role",
        title: "Role & Contributions",
      },
      {
        id: "process",
        title: "Process",
      },
      {
        id: "solution",
        title: "Solution",
      },
      {
        id: "outcome",
        title: "Outcomes and Impact",
      },
      {
        id: "tech",
        title: "Tech Stack",
      },
      {
        id: "career",
        title: "Growth",
      },
    ],
  },
  {
    id: "project2",
    slug: "wat",
    title: "WAT",
    subtitle:
      "Writing Analytics Tool (WAT): Designing for Data-Driven Educational Transformation",
    description:
      "A full UX redesign and design system implementation for an NLP-based educational platform, backed by teacher focus groups and iterative prototyping.",
    role: "Lead UX Designer",
    duration: "July 2023 - Present",
    team: "Me (UX designer), Project Manager, Software Engineers (x2), Principal Investigator",
    color: "#008394",
    featured: true, // Keep featured
    image:
      "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/wat/mockup.png", // Add image
    tags: [
      "Writing Analytics",
      "UX Research",
      "Design Systems",
      "Focus Groups",
      "Education Technology",
    ],
    sections: [
      {
        id: "tldr",
        title: "TL;DR",
      },
      {
        id: "problem",
        title: "Challenge",
      },
      {
        id: "role",
        title: "Role",
      },
      {
        id: "process",
        title: "Process",
      },
      {
        id: "solution1",
        title: "Design System",
      },
      {
        id: "solution2",
        title: "Rubric System",
      },
      {
        id: "solution3",
        title: "Feedback System",
      },
      {
        id: "solution4",
        title: "Performance Dashboards",
      },
      {
        id: "impact",
        title: "Impact and Outcome",
      },
      {
        id: "techstack",
        title: "Tech Stack",
      },
      {
        id: "career",
        title: "Growth",
      }
    ],
  },
  {
    id: "project3",
    slug: "allie-skaimart",
    title: "Allie from Skaimart",
    subtitle:
      "Envisioning the Next Generation of E‑Commerce Chatbots",
    description:
      "Allie is a next-gen e-commerce assistant that gives shoppers real control through personalized, extensible profiles and enhanced UX for deeper AI integration.",
    role: "Lead UX Designer",
    duration: "Sept 2025",
    team: "Me (UX Lead), Gaurav Basantani (collaborating UX Designer)",
    color: "#078FC5",
    featured: true, // Keep featured
    image:
      "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/allie/card%20image.png", // Add image
    tags: ["UX Design", "E-Commerce", "Chatbot", "User Agency", "Personalization"],
        sections: [
      {
        id: "tldr",
        title: "TL;DR",
      },
      {
        id: "problem",
        title: "Challenge",
      },
      {
        id: "role",
        title: "Role",
      },
      {
        id: "inquiry",
        title: "Inquiry",
      },
      {
        id: "research",
        title: "Research",
      },
      {
        id: "solution",
        title: "Ideation and Solution",
      },
      {
        id: "prototypes1",
        title: "Prototype #1",
      },
       {
        id: "prototypes2",
        title: "Prototype #2",
      },
      {
        id: "testing",
        title: "A/B Testing",
      },
      {
        id: "impact",
        title: "Impact",
      },
      {
        id: "growth",
        title: "Reflection and Growth",
      },
    ],
  },
  {
    id: "project4",
    slug: "istart",
    title: "iSTART Early",
    subtitle:
      "Gamified Learning Ecosystem",
    description:
      "A comprehensive case study of a large-scale EdTech platform redesign, covering student and teacher UX, module development, and AI integration.",
    role: "Lead UX Designer",
    duration: "July 2023 - Present",
    team: "Me (UX designer), Project Manager, Software Engineers (x2), Principal Investigator",
    color: "#7F47A6",
    featured: true, // Keep featured
    image:
      "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/istart/updated%20cover%20image.png", // Add image
    tags: ["UX Design", "Gamification", "Education Technology", "NLP", "AI Integration"],
        sections: [
      {
        id: "tldr",
        title: "TL;DR",
      },
      {
        id: "problem",
        title: "Challenge",
      },
      {
        id: "role",
        title: "Role",
      },
      {
        id: "process",
        title: "Process",
      },
      {
        id: "solution1",
        title: "Avatar System",
      },
      {
        id: "solution2",
        title: "Mobile App",
      },
      {
        id: "impact",
        title: "Impact and Outcome",
      },
      {
        id: "techstack",
        title: "Tech Stack",
      },
      {
        id: "career",
        title: "Growth",
      }
    ],
  },
  {
    id: "project5",
    slug: "meta-portfolio",
    title: "this Portfolio AI",
    subtitle:
      "AI-Powered Portfolio Chatbot",
    description:
      "A technical deep dive into building a conversational RAG AI chatbot integrated in this portfolio,  using Gemini API, Oracle Free cloud and Qdrant, with detailed engineering trade-offs and design decisions.",
    role: "personal project",
    duration: "3 months",
    team: "Me (UX designer, Engineer)",
    color: "#663399",
    featured: true, // Keep featured
    image:
      "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/meta-portfolio/Mac%20Studio.png", // Add image
    tags: ["RAG", "LLM", "Qdrant", "Haystack", "AI Portfolio"],
        sections: [
      {
        id: "tldr",
        title: "TL;DR",
      },
      {
        id: "problem",
        title: "Challenge",
      },
      {
        id: "role",
        title: "Role",
      },
      {
        id: "process",
        title: "Process",
      },
      {
        id: "outcome",
        title: "Outcome and Impact",
      },
      {
        id: "tech",
        title: "Tech Stack",
      },
      {
        id: "career",
        title: "Growth",
      }
    ],
  },
  {
    id: "project6",
    slug: "legacy",
    title: "Legacy and TBAs",
    subtitle:
      "Legacy work and Underconstruction projects.",
    description:
      "This project card and page currently serve as a placeholder, providing links to my previous works and portfolios until I can migrate them to this new location.",
    role: "personal projects",
    duration: "never ending process",
    team: "Me",
    color: "#352038",
    featured: false, // Keep featured
    image:
      "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/legacy-tba/picture%20combo.png", // Add image
    tags: ["Previous portfolios and work", "Legacy Projects", "under construction"],
        sections: [
      {
        id: "CTA",
        title: "Highlights",
      },
    ],
  },
];

export const getActiveCaseStudyLiteral = (slug: string): string => {
  let literal = "";
  switch (slug) {
    case "wat-researcher":
      literal = "WAT Researcher: Desktop-First Text Analytics";
      break;
    case "wat":
      literal = "Writing Analytics Tool (WAT)";
      break;
    case "istart":
      literal = "iSTART Early: Gamified Learning Ecosystem";
      break;
    case "meta-portfolio":
      literal = "AI-Powered Portfolio Chatbot";
      break;
    case "legacy":
      literal = "Legacy and TBAs";
      break;
    case "allie-skaimart":
      literal = "Allie from Skaimart";
      break;
  }
  return literal;
};
