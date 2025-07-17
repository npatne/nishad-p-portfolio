"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PasswordProtection } from "@/components/password-protection";
import { projects } from "@/data/projects";
import {
  ProjectSection,
  ImagePosition,
  ImageData,
} from "@/components/projectSection";

// Define the sections for this specific project with the enhanced structure
const projectSectionsContent = [
  {
    content:
      "When a web-first approach for a critical research tool proved too costly and complex, I spearheaded a strategic pivot to a desktop application.\n\nI led the **end-to-end UX strategy, design, and full-stack engineering** for this new solution, single-handedly developing a powerful platform using Angular, Django, and Electron.\n\nThis move not only solved critical scalability issues but also delivered a vastly superior feature set for **thousands of researchers** and established the organization's renewed desktop development capability.",
    images: [
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/WAT%20Researcher/Analysis%20List%20Page.jpg",
        alt: "Desktop WAT Researcher",
        caption: "Desktop app mockup",
      },
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/WAT%20Researcher/Desktop%20research%20dashboard%20-%20version%203.jpg",
        alt: "Desktop WAT Researcher",
        caption: "Web app Mockup",
      },
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/WAT%20Researcher/image%201.jpg",
        alt: "Desktop WAT Researcher Legacy",
        caption: "Legacy desktop app",
      },
    ],
    imagePosition: "right",
  },
  {
    content:
      "The **Learning Engineering Institute (LEI)** needed to replace **Coh-Metrix**, a legacy tool essential to over **5,000 global researchers** *(and counting)*. I was initially tasked with designing and developing a modern, web-based replacement.\n\nWhile I successfully **designed and delivered the front-end interface** with Angular, the project hit a strategic wall: the backend analysis was so **computationally intensive** that a web-based service would be **prohibitively expensive** and **unscalable** for our servers. The project was at risk.\n\nRecognizing this critical flaw, I **took the initiative**. I **researched, prototyped, and championed** a pivot to a **desktop-first strategy**, shifting the computational load to the user's machine. This move was approved, **transforming the project's trajectory and scope**.",
    image:
      "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/WAT%20Researcher/Screenshot%202025-07-13%20at%206.22.55%E2%80%AFPM.png",
    imagePosition: "left",
    singleImageCaption: "Coh-Meteric App, recorded citations",
  },
  {
    content:
      "As the **sole UX Designer and Engineer**, I went far beyond the initial project scope to ensure its success.\n\n- **Spearheaded a Strategic Pivot**: We identified the risks of the web-first approach, and I proactively **researched**, **proposed**, and **championed** the shift to a desktop application, solving a foundational business and technical challenge.\n\n- **Architected the Superior Solution**: I designed the complete **user experience** and **technical architecture** for the desktop app, introducing a **robust project-based workflow** that was a significant upgrade over the original concept.\n\n- **Engineered the Full-Stack Application**: I single-handedly developed the entire desktop application, building the **frontend in Angular**, the **backend in Django/Python**, and packaging it for **macOS and Windows** using **Electron** and **PyInstaller**.\n\n- **Delivered the Initial Web App**: I designed and developed the original **3-page web interface** using Angular, which, after the pivot, was re-scoped to serve as a complementary tool for **quick, ad-hoc analyses**.\n\n- **Mentored and Led**: I am currently **supervising junior team members** in creating comprehensive **user guides** and executing the **Quality Assurance plan** (functional, stress, and usability testing).",
    image:
      "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/WAT%20Researcher/Frame%20238.png",
    imagePosition: "bottom", // Single image example
    singleImageCaption: "Figma Design document and Github commits overview.",
  },
  {
    content:
      "- **Web App Delivery**: I quickly designed and developed the initial web interface, meeting the project's first milestone and demonstrating my **front-end capabilities**.\n\n- **Identifying the Core Problem**: As backend integration began, I identified the **unsustainable server costs and complexity** and initiated the conversation about an alternative path.\n\n- **Proposing the Desktop Solution**: I created a **proof-of-concept** for a desktop application, demonstrating how it could offer **superior features** (like project management and local file handling) while solving the core **scalability problem**.\n\n- **Designing a Richer Experience**: With the pivot approved, I designed a new, **feature-rich UX** centered on a researcher's workflow, including **project creation**, **bulk corpus management**, and a **local task queue**.\n\n- **Building and Delivering**: I took full ownership of **desktop development**, navigating the complexities of **cross-platform packaging** with Electron and PyInstaller and producing **distributable versions for both macOS and Windows**.",
    images: [
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/WAT%20Researcher/WAT%20Researcher%20ia.png",
        alt: "Information Architecture",
        caption: "Information Architecture",
      },
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/WAT%20Researcher/WAT%20Researcher%20erd.png",
        alt: "Entity Relation Diagram WAT Researcher Desktop",
        caption: "Entity Relation Diagram Desktop",
      },
    ],
    imagePosition: "bottom",
  },
  {
    content:
      "**The Solution: A Dual-Platform Ecosystem**\n\nThe result is a **two-pronged solution** that serves different user needs:\n\n- **WAT Researcher (Desktop)**: The flagship application. A powerful, **feature-rich tool** for serious research, enabling **project management**, **bulk data handling**, and **complex, customizable analyses**—all processed on the user's **local machine**.\n\n- **WAT Researcher (Web)**: A **lightweight**, streamlined tool for **quick, ad-hoc analysis** of single texts or smaller corpora. It provides **easy access to the core analysis engine** without requiring installation.",
    imagePosition: "bottom",
    images: [
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/WAT%20Researcher/desktop%20interface.png",
        alt: "WAT Researcher Desktop hight fedility mockup",
        caption: "WAT Researcher Desktop high fedility mockup",
      },
      {
        src: "https://4kpakrtcc8hsoxno.public.blob.vercel-storage.com/WAT%20Researcher/web%20interface.png",
        alt: "WAT Researcher Web high fedility Mockup",
        caption: "WAT Researcher Web high fedility Mockup",
      },
    ],
  },
  {
    content:"This project is scheduled for launch, replacing a **critical tool** for a **large academic community**.\n\n- **Strategic Impact**: Solved a critical business challenge by **pivoting away from a costly and unscalable architecture**. This move will save the institute **significant server and maintenance costs**.\n\n- **Organizational Impact**: Established the **LEI's first-ever desktop application development and distribution pipeline**, a capability directly attributable to my **initiative and execution**.\n\n- **Product Impact**: Delivered a **product ecosystem** that is significantly more **powerful and versatile** than the original plan, better meeting the needs of both **casual and power users**.\n\n- **Career Impact**: This project solidified my transition to a **strategic leadership and mentorship role**, proving my ability to **guide complex technical products** from conception to launch."

  },
  {
    content:"**Tech & Methods**\n\n- **Frontend**: Angular, HTML5, CSS3\n- **Backend**: Django, Python, SQLite\n- **Desktop**: Electron, PyInstaller, Shell Scripting\n- **Design**: Figma, Wireframing, Prototyping, User Flow Mapping\n- **Process**: Strategic Pivoting, Agile Development, Stakeholder Management"

  },
  {
    content:"This project demonstrates my ability to **lead complex, multi-platform product development from conception to launch**—exactly the **strategic thinking** and **technical execution** expected of senior **Design Engineer** and **UX Engineer** roles in **product-focused organizations**."

  }

];

const projectInfo = projects.find(
  (project) => project.slug === "wat-researcher"
);

const projectSections = projectInfo?.sections.map((section, index) => ({
  id: section.id,
  title: section.title,
  content: projectSectionsContent[index].content,
  image: projectSectionsContent[index].image,
  images: projectSectionsContent[index].images,
  imagePosition: projectSectionsContent[index].imagePosition || "bottom",
  singleImageCaption: projectSectionsContent[index]?.singleImageCaption, // Add this line
}));

export default function LEIApp1Page() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Set up intersection observer to track active section
  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create a new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);

            // Update the sidebar section highlight via custom event
            window.dispatchEvent(
              new CustomEvent("section-visible", {
                detail: {
                  sectionId: entry.target.id,
                  projectSlug: projectInfo?.slug,
                },
              })
            );
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    // Observe all section elements
    projectSections?.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        sectionRefs.current[section.id] = element;
        observerRef.current?.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Handle AI prompt
  const handleAskAI = (sectionId: string) => {
    const section = projectSections?.find((s) => s.id === sectionId);
    if (section) {
      // Create and dispatch a custom event
      const event = new CustomEvent("ai-prompt", {
        detail: {
          section: section.title,
          project: projectInfo?.title,
        },
      });
      window.dispatchEvent(event);
    }
  };

  // Wrap the content with password protection
  return (
    <PasswordProtection>
      <div className="min-h-screen pb-16 max-w-full">
        {/* Project header */}
        <div
          className="py-16 px-6 md:px-10 text-white transition-colors duration-300 max-w-full"
          style={{
            backgroundColor: `${projectInfo?.color}`,
          }}
        >
          <div className="md:max-w-5xl 	lg:max-w-7xl">
            <Link
              href="/projects"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors duration-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
            <h1 className="text-4xl md:text-5xl text-white font-bold mb-3">
              {projectInfo?.title}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              {projectInfo?.subtitle}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-white/80">
              <div>
                <h3 className="text-sm font-medium text-white">Role</h3>
                <p>{projectInfo?.role}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">Duration</h3>
                <p>{projectInfo?.duration}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">Team</h3>
                <p>{projectInfo?.team}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Project description */}
        <div className="px-6 md:px-10 py-8">
          <p className="text-xl md:max-w-5xl 	lg:max-w-7xl mx-auto">
            {projectInfo?.description}
          </p>
        </div>

        {/* Project content sections */}
        <div className="px-6 md:px-10 md:max-w-5xl 	lg:max-w-7xl mx-auto">
          {projectSections?.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="py-12 scroll-mt-16 border-t border-border"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{section.title}</h2>
                <Button
                  onClick={() => handleAskAI(section.id)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Ask AI about - {section.title}</span>
                </Button>
              </div>

              {/* Using the enhanced ProjectSection component */}
              <ProjectSection
                title={section.title}
                content={section.content}
                image={section.image}
                images={section.images}
                imageAlt={`${projectInfo?.title} - ${section.title}`}
                imagePosition={section.imagePosition as ImagePosition}
                projectTitle={projectInfo?.title}
                singleImageCaption={section.singleImageCaption} // Add this line
              />
            </section>
          ))}
        </div>
      </div>
    </PasswordProtection>
  );
}
