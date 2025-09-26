"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FolderKanban, FileText, User, Mail, ChevronDown, X, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ThemeToggle } from "@/components/theme-toggle"
import { projects } from "@/data/projects"

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const isFirstRender = useRef<boolean>(true)
  
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      if (pathname !== "/") {
        setIsOpen(true)
      }
    }
  }, [pathname])
  
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(true)
  const [openProjectSlugs, setOpenProjectSlugs] = useState<string[]>(
    pathname === "/" ? [] : projects.map((project) => project.slug)
  )
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null)

  // Listen for custom event from mobile nav
  useEffect(() => {
    const handleToggleSidebar = () => {
      setIsOpen(!isOpen)
    }

    window.addEventListener("toggle-sidebar", handleToggleSidebar)
    return () => {
      window.removeEventListener("toggle-sidebar", handleToggleSidebar)
    }
  }, [isOpen])

  // Listen for section visibility events
  useEffect(() => {
    const handleSectionVisible = (event: Event) => {
      const customEvent = event as CustomEvent
      const { sectionId, projectSlug } = customEvent.detail

      setActiveSection(sectionId)
      setActiveProjectSlug(projectSlug)
    }

    window.addEventListener("section-visible", handleSectionVisible)
    return () => {
      window.removeEventListener("section-visible", handleSectionVisible)
    }
  }, [])

  // Update document with sidebar collapsed state
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width', 
      isCollapsed ? '5rem' : '16rem'
    );
    
    // Dispatch an event that the layout can listen to
    const event = new CustomEvent('sidebar-collapse-change', { 
      detail: { isCollapsed } 
    });
    window.dispatchEvent(event);
  }, [isCollapsed]);

  // Auto-open projects submenu if on a project page
  useEffect(() => {
    setProjectsOpen(true);

    if (pathname.startsWith("/projects/")) {
      const projectSlug = pathname.split("/")[2]

      if (projectSlug) {
        const projectExists = projects.some(p => p.slug === projectSlug);
        if (projectExists) {
          setOpenProjectSlugs((prev) => (prev.includes(projectSlug) ? prev : [...prev, projectSlug]))
          setActiveProjectSlug(projectSlug)
        }
      }
    }
  }, [pathname])

  // Toggle project sections visibility
  const toggleProjectSections = (slug: string) => {
    setOpenProjectSlugs((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug)
      }
      return [slug]
    })
  }

  // Check if a project is the current one
  const isCurrentProject = (slug: string) => {
    return pathname === `/projects/${slug}`
  }

  // Check if a section is active
  const isSectionActive = (projectSlug: string, sectionId: string) => {
    return activeProjectSlug === projectSlug && activeSection === sectionId
  }

  return (
    <>
      {/* Removed the mobile menu button */}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-background border-r border-border transition-all duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-20" : "w-64",
          "md:fixed md:translate-x-0",
          isCollapsed ? "md:w-20" : "md:w-64",
        )}
        style={{ 
          // Add this to ensure the main content can reference it
          '--sidebar-width': isCollapsed ? '5rem' : '16rem' 
        } as React.CSSProperties}
      >
        <div className="flex flex-col h-[100vh]">
          {/* Top section - Logo/Branding */}
          <div className="p-4 border-b border-border flex justify-between items-center gap-2">
            {!isCollapsed && (
              <Link href="/" className="flex items-center space-x-2 text-foreground">
                <span className="font-bold text-xl">Nishad</span>
              </Link>
            )}
            {isCollapsed && (
              <Link href="/" className="flex items-center justify-center w-full text-foreground">
                <span className="font-bold text-xl">N</span>
              </Link>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex text-foreground p-2 h-8 w-8"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
            </Button>
          </div>

          {/* Middle section - Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            <Link
              href="/"
              className={cn(
                "flex items-center space-x-2 p-2 rounded-md hover:bg-secondary transition-colors text-foreground",
                pathname === "/" && "bg-secondary font-medium",
                isCollapsed && "justify-center",
              )}
            >
              <Home className="h-5 w-5" />
              {!isCollapsed && <span>Home</span>}
            </Link>

            {/* Projects section */}
            <div className="w-full">
              {/* Projects main link */}
              <Link
                href="/projects"
                className={cn(
                  "flex items-center space-x-2 p-2 rounded-md hover:bg-secondary transition-colors w-full text-foreground",
                  pathname === "/projects" && "bg-secondary font-medium",
                  isCollapsed && "justify-center",
                )}
              >
                <FolderKanban className="h-5 w-5" />
                {!isCollapsed && <span>Projects</span>}
              </Link>

              {/* Projects submenu */}
              {!isCollapsed && (
                // Keep this controlled by projectsOpen state, which defaults to true
                <Collapsible open={projectsOpen} onOpenChange={setProjectsOpen} className="w-full"> 
                  <CollapsibleTrigger asChild>
                    <button
                      className={cn(
                        "flex items-center w-full p-2 rounded-md hover:bg-secondary transition-colors mt-1 text-foreground",
                        // Highlight if the main list is open OR if on a project page (redundant if always open, but safe)
                        (projectsOpen || pathname.startsWith("/projects/")) && "bg-secondary font-medium", 
                      )}
                    >
                      <span className="ml-5 flex-1 text-left text-sm font-medium">Project List</span>
                      <ChevronDown
                        className={cn("h-4 w-4 transition-transform", projectsOpen && "transform rotate-180")}
                      />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-8 space-y-1 mt-1">
                    {/* Map over the imported projects data */}
                    {projects.map((project) => (
                      <div key={project.id}>
                        {/* Project link */}
                        <div className="flex items-center">
                          <Link
                            href={`/projects/${project.slug}`}
                            className={cn(
                              "flex-1 block p-2 rounded-md hover:bg-secondary/40 transition-colors text-sm text-foreground",
                              isCurrentProject(project.slug) && "bg-secondary/80 font-medium",
                            )}
                          >
                            {project.title}
                          </Link>
                          <button
                            onClick={() => toggleProjectSections(project.slug)}
                            className="p-1 hover:bg-secondary/60 rounded-md text-foreground"
                            aria-label={
                              openProjectSlugs.includes(project.slug) ? "Collapse sections" : "Expand sections"
                            }
                          >
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 transition-transform",
                                openProjectSlugs.includes(project.slug) && "transform rotate-180",
                              )}
                            />
                          </button>
                        </div>

                        {/* Project sections - Modified highlight color */}
                        {openProjectSlugs.includes(project.slug) && (
                          <div className="pl-4 space-y-1 mt-1">
                            {project.sections.map((section) => (
                              <Link
                                key={section.id}
                                href={`/projects/${project.slug}#${section.id}`}
                                className={cn(
                                  "block p-2 rounded-md hover:bg-secondary/80 transition-colors text-xs text-foreground",
                                  isSectionActive(project.slug, section.id) && "bg-secondary/40 font-medium"
                                )}
                              >
                                {section.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>

            <Link
              href="/blog"
              className={cn(
                "flex items-center space-x-2 p-2 rounded-md hover:bg-secondary transition-colors text-foreground",
                pathname === "/blog" && "bg-secondary font-medium",
                isCollapsed && "justify-center",
              )}
            >
              <FileText className="h-5 w-5" />
              {!isCollapsed && <span>Blogs</span>}
            </Link>

            <Link
              href="/about"
              className={cn(
                "flex items-center space-x-2 p-2 rounded-md hover:bg-secondary transition-colors text-foreground",
                pathname === "/about" && "bg-secondary font-medium",
                isCollapsed && "justify-center",
              )}
            >
              <User className="h-5 w-5" />
              {!isCollapsed && <span>About Me</span>}
            </Link>
          </nav>

          {/* Bottom section - Contact links */}
          <div className="p-4 border-t border-border space-y-2">
            
           
            {/* <Link
              href="/report"
              className={cn(
                "flex items-center space-x-2 p-2 rounded-md hover:bg-secondary transition-colors text-foreground",
                pathname === "/report" && "bg-secondary font-medium",
                isCollapsed && "justify-center",
              )}
            >
              <AlertCircle className="h-5 w-5" />
              {!isCollapsed && <span>Report a Problem</span>}
            </Link> */}

            <Link
              href="/contact"
              className={cn(
                "flex items-center space-x-2 p-2 rounded-md hover:bg-secondary transition-colors text-foreground",
                pathname === "/contact" && "bg-secondary font-medium",
                isCollapsed && "justify-center",
              )}
            >
              <Mail className="h-5 w-5" />
              {!isCollapsed && <span>Contact</span>}
            </Link>

            {/* Theme toggle */}
            <div className={cn("flex items-center p-2 text-foreground", isCollapsed ? "justify-center" : "space-x-2")}>
              {!isCollapsed && <div className="text-sm">Theme</div>}
              <ThemeToggle size={isCollapsed ? "icon" : "sm"} />
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/20 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
