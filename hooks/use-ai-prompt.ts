"use client"

import { useEffect } from "react"

type AiPromptHandler = (detail: { section?: string; project?: string; page?: string }) => void

export function useAiPrompt(handler: AiPromptHandler) {
  useEffect(() => {
    const handleAiPrompt = (event: Event) => {
      const customEvent = event as CustomEvent
      handler(customEvent.detail)
    }

    window.addEventListener("ai-prompt", handleAiPrompt)
    return () => {
      window.removeEventListener("ai-prompt", handleAiPrompt)
    }
  }, [handler])
}
