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
import { projectSlug, projectContent } from "./project.data";


// Define the sections for this specific project with the enhanced structure


// Define the sections for this specific project with the enhanced structure
const projectSectionsContent = projectContent;

const projectInfo = projects.find(
  (project) => project.slug === projectSlug
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

export default function WATPage() {
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
                  className="flex items-center gap-2 block [@media(max-width:480px)]:hidden"
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
