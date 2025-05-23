"use client"

import { Menu, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function MobileNav() {
  // Toggle sidebar
  const toggleSidebar = () => {
    window.dispatchEvent(new CustomEvent("toggle-sidebar"))
  }

  // Toggle chatbot
  const toggleChatbot = () => {
    window.dispatchEvent(new CustomEvent("toggle-chatbot"))
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden">
      <div className="flex justify-between items-center p-3">
        <Button onClick={toggleSidebar} variant="ghost" size="icon" className="h-10 w-10">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </Button>

        {/* Theme toggle */}
        <ThemeToggle />

        <Button onClick={toggleChatbot} variant="ghost" size="icon" className="h-10 w-10">
          <MessageSquare className="h-6 w-6" />
          <span className="sr-only">Chat</span>
        </Button>
      </div>
    </div>
  )
}
