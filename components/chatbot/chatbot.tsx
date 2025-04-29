"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import { MessageSquare, X, Minimize, Send, Globe, FileText, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Types for chatbot
type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

type ChatMode = "general" | "page-specific"

type ChatbotState = {
  isOpen: boolean
  isMinimized: boolean
  isCollapsed: boolean
  messages: Record<ChatMode, Message[]>
  sessionId: string
  userId: string
  mode: ChatMode
}

// Starter questions based on page
const starterQuestions: Record<string, string[]> = {
  "/": [
    "Tell me about your UX design experience",
    "What projects are you most proud of?",
    "What technologies do you work with?",
  ],
  "/projects": [
    "What was your role in these projects?",
    "What challenges did you face?",
    "Can you explain your design process?",
  ],
  "/blog": [
    "What topics do you write about?",
    "How often do you publish new content?",
    "Can you summarize your latest post?",
  ],
  "/about": ["Tell me more about your education", "What are your key skills?", "What are your career goals?"],
}

// Mock API response function (to be replaced with actual API)
const mockApiResponse = async (query: string, sessionId: string, page: string, mode: ChatMode, context?: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const contextPrefix = context ? `about ${context}` : ""

  return {
    answer:
      mode === "general"
        ? `This is a simulated general response to your query: "${query}". In a real implementation, this would come from your backend API.`
        : `This is a simulated page-specific response ${contextPrefix} to your query: "${query}". In a real implementation, this would come from your backend API with context from the current page.`,
    sources: ["Mock Source 1", "Mock Source 2"],
    mode,
    fallback: false,
    steps: [`Retrieval Mode: ${mode}`, "Initial Filters: none"],
    gifUrl: null, // This would be populated with a real GIF URL in production
  }
}

export default function Chatbot() {
  const pathname = usePathname()
  const [state, setState] = useState<ChatbotState>({
    isOpen: false,
    isMinimized: false,
    isCollapsed: false,
    messages: {
      general: [],
      "page-specific": [],
    },
    sessionId: "",
    userId: "",
    mode: "general",
  })
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [promptContext, setPromptContext] = useState<string | undefined>()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize user ID and session ID
  useEffect(() => {
    // Get or create user ID
    let userId = localStorage.getItem("portfolio_user_id")
    if (!userId) {
      userId = uuidv4()
      localStorage.setItem("portfolio_user_id", userId)
    }

    // Create session ID based on page and user ID
    const sessionId = `${pathname}_${userId}`

    setState((prev) => ({
      ...prev,
      userId,
      sessionId,
    }))
  }, [pathname])

  // Listen for custom event from mobile nav
  useEffect(() => {
    const handleToggleChatbot = () => {
      setState((prev) => ({
        ...prev,
        isOpen: !prev.isOpen,
        isMinimized: false,
      }))
    }

    window.addEventListener("toggle-chatbot", handleToggleChatbot)
    return () => {
      window.removeEventListener("toggle-chatbot", handleToggleChatbot)
    }
  }, [])

  // Listen for AI prompts
  useEffect(() => {
    const handleAiPrompt = (event: Event) => {
      const customEvent = event as CustomEvent
      const { section, project, page } = customEvent.detail

      // Open chatbot and set to page-specific mode
      setState((prev) => ({
        ...prev,
        isOpen: true,
        isMinimized: false,
        isCollapsed: false,
        mode: "page-specific",
      }))

      // Set context for the prompt
      let context = ""
      if (section && project) {
        context = `the ${section} section of ${project}`
        setPromptContext(context)
      } else if (section) {
        context = `the ${section} section`
        setPromptContext(context)
      } else if (project) {
        context = project
        setPromptContext(context)
      } else if (page) {
        context = page
        setPromptContext(context)
      }

      // Construct a prompt based on the details
      let prompt = ""
      if (section && project) {
        prompt = `Tell me about the ${section} section of the ${project} project.`
      } else if (section) {
        prompt = `Tell me about the ${section} section.`
      } else if (project) {
        prompt = `Tell me about the ${project} project.`
      } else if (page) {
        prompt = `Tell me about the ${page} page.`
      }

      if (prompt) {
        handleSendMessage(prompt)
      }
    }

    window.addEventListener("ai-prompt", handleAiPrompt)
    return () => {
      window.removeEventListener("ai-prompt", handleAiPrompt)
    }
  }, [])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [state.messages, state.mode])

  // Get starter questions for current page
  const getStarterQuestions = () => {
    if (state.mode === "general") {
      return starterQuestions["/"]
    }

    // For page-specific mode
    // Find exact match first
    if (starterQuestions[pathname]) {
      return starterQuestions[pathname]
    }

    // Find partial match
    for (const path in starterQuestions) {
      if (pathname.startsWith(path) && path !== "/") {
        return starterQuestions[path]
      }
    }

    // Default to home page questions
    return starterQuestions["/"]
  }

  // Handle sending a message
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const mode = state.mode

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content,
    }

    setState((prev) => ({
      ...prev,
      messages: {
        ...prev.messages,
        [mode]: [...prev.messages[mode], userMessage],
      },
    }))

    setInput("")
    setIsLoading(true)

    try {
      // Call API (mock for now)
      const response = await mockApiResponse(content, state.sessionId, pathname, mode, promptContext)

      // Add assistant message
      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: response.answer,
      }

      setState((prev) => ({
        ...prev,
        messages: {
          ...prev.messages,
          [mode]: [...prev.messages[mode], assistantMessage],
        },
      }))

      // Clear prompt context after use
      setPromptContext(undefined)
    } catch (error) {
      console.error("Error sending message:", error)

      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again later.",
      }

      setState((prev) => ({
        ...prev,
        messages: {
          ...prev.messages,
          [mode]: [...prev.messages[mode], errorMessage],
        },
      }))
    } finally {
      setIsLoading(false)
    }
  }

  // Handle starter question click
  const handleStarterQuestionClick = (question: string) => {
    handleSendMessage(question)
  }

  // Toggle chatbot open/closed
  const toggleChatbot = () => {
    setState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
      isMinimized: false,
    }))
  }

  // Toggle chatbot minimized/maximized
  const toggleMinimize = () => {
    setState((prev) => ({
      ...prev,
      isMinimized: !prev.isMinimized,
    }))
  }

  // Toggle chatbot collapsed/expanded
  const toggleCollapse = () => {
    setState((prev) => ({
      ...prev,
      isCollapsed: !prev.isCollapsed,
    }))
  }

  // Change chat mode
  const handleModeChange = (mode: ChatMode) => {
    setState((prev) => ({
      ...prev,
      mode,
    }))
  }

  // Get current messages based on mode
  const currentMessages = state.messages[state.mode]

  return (
    <>
      {/* Chatbot toggle button (mobile) */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <Button onClick={toggleChatbot} size="icon" className="rounded-full h-12 w-12 shadow-lg">
          {state.isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chatbot container */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-40 bg-background border-l border-border transition-all duration-300 ease-in-out flex flex-col",
          !state.isOpen && "translate-x-full",
          state.isMinimized && "h-auto inset-y-auto bottom-0",
          state.isCollapsed ? "w-16" : "w-full sm:w-96",
          "md:relative md:translate-x-0",
          state.isCollapsed ? "md:w-16" : "md:w-4/12",
        )}
        style={{ height: "100vh" }}
      >
        {/* Chatbot header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center space-x-2 text-foreground">
            <MessageSquare className="h-5 w-5" />
            {!state.isCollapsed && <h2 className="font-medium">AI Assistant</h2>}
          </div>
          <div className="flex items-center space-x-1">
            {!state.isCollapsed && (
              <Button variant="ghost" size="icon" onClick={toggleMinimize} className="h-8 w-8 text-foreground">
                {state.isMinimized ? <Minimize className="h-4 w-4 rotate-180" /> : <Minimize className="h-4 w-4" />}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCollapse}
              className="h-8 w-8 hidden md:flex text-foreground"
              aria-label={state.isCollapsed ? "Expand chatbot" : "Collapse chatbot"}
            >
              <ChevronRight className={cn("h-4 w-4 transition-transform", state.isCollapsed && "rotate-180")} />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleChatbot} className="h-8 w-8 md:hidden text-foreground">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chatbot content */}
        {!state.isMinimized && !state.isCollapsed && (
          <>
            {/* Mode tabs */}
            <div className="border-b border-border">
              <Tabs
                value={state.mode}
                onValueChange={(value) => handleModeChange(value as ChatMode)}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="general" className="flex items-center gap-2 text-foreground">
                    <Globe className="h-4 w-4" />
                    <span>General</span>
                  </TabsTrigger>
                  <TabsTrigger value="page-specific" className="flex items-center gap-2 text-foreground">
                    <FileText className="h-4 w-4" />
                    <span>Page Specific</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Messages container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Welcome message */}
              {currentMessages.length === 0 && (
                <div className="text-center space-y-4 py-8 animate-fadeIn">
                  <h3 className="font-medium text-lg text-foreground">Welcome to my portfolio!</h3>
                  <p className="text-muted-foreground">
                    I'm an AI assistant that can help answer questions about Nishad's work, experience, and projects.
                  </p>

                  {/* Starter questions */}
                  <div className="space-y-2 mt-6">
                    <p className="text-sm font-medium text-foreground">Try asking:</p>
                    <div className="flex flex-col space-y-2">
                      {getStarterQuestions().map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-start text-left h-auto py-2 text-foreground"
                          onClick={() => handleStarterQuestionClick(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Chat messages */}
              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex animate-fadeIn", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3 transition-colors duration-300",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground",
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start animate-fadeIn">
                  <div className="bg-secondary text-secondary-foreground max-w-[80%] rounded-lg p-3">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce delay-75" />
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce delay-150" />
                    </div>
                  </div>
                </div>
              )}

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-4 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage(input)
                }}
                className="flex space-x-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-background text-foreground"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        )}

        {/* Collapsed view */}
        {!state.isMinimized && state.isCollapsed && (
          <div className="flex flex-col items-center justify-center h-full">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCollapse}
              className="h-10 w-10 rounded-full text-foreground"
              aria-label="Expand chatbot"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
