"use client"

import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AiPromptButtonProps {
  section?: string
  project?: string
  page?: string
  label?: string
}

export function AiPromptButton({ section, project, page, label = "Ask AI about this section" }: AiPromptButtonProps) {
  const handleClick = () => {
    // Create and dispatch a custom event
    const event = new CustomEvent("ai-prompt", {
      detail: {
        section,
        project,
        page,
      },
    })
    window.dispatchEvent(event)
  }

  return (
    <Button variant="outline" size="sm" onClick={handleClick} className="flex items-center gap-2">
      <Sparkles className="h-4 w-4" />
      <span>{label}</span>
    </Button>
  )
}
