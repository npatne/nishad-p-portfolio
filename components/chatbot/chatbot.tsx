"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { MessageSquare, Sparkles, X, Minimize, Send, Globe, FileText, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Types for chatbot
type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp?: number
  responseTime?: number
}

type ChatMode = "general" | "specific"

type ChatbotState = {
  isOpen: boolean
  isCollapsed: boolean
  messages: { // Changed to object
    general: Message[]
    specific: Message[]
  }
  sessionId: string | null // Initialize as null
  mode: ChatMode
  activeCaseStudy?: string
}

// Starter questions based on page
const starterQuestions: Record<string, string[]> = {
  "/": [ // Home page
    "Tell me about Nishad's UX design and engineering experience",
    "Tell me about projects and type of work Nishad has on this portfolio?",
    "What technologies does Nishad work with?",
  ],
  "/projects": [ // Projects listing page
    "What types of projects has Nishad worked on?",
    "Which project shows the strongest UX research?",
    "Tell me about Nishad's design process",
  ],
  "/projects/": [ // Individual project pages
    "Summarize the key features of this project",
    "What was Nishad's role in this project?",
    "What were the key deliverables from this project?",
    "What was the impact of this project?",
  ],
  "/blog": [ // Blog listing page
    "What topics does Nishad write about?",
    "How often does Nishad publish new content?",
    "What's the latest blog post about?",
  ],
  "/blog/": [ // Individual blog pages
    "Why did Nishad choose to write about this topic?",
    "What are the key insights from this post?",
    "Can you summarize this post for me?",
  ],
  "/about": [
    "What is Nishad's professional background?",
    "What skills does Nishad specialize in?",
    "Tell me about Nishad's education",
  ],
  "/contact": [
    "What's the best way to contact Nishad?",
    "Is Nishad available for freelance work?",
    "What information should I include when reaching out?",
  ]
}

// api base url
const apiBaseURL = "http://137.131.30.181:8000/";

// Function to determine if path is a project or blog detail page
const isDetailPage = (path: string): boolean => {
  return path.startsWith("/projects/") || path.startsWith("/blog/")
}

// Function to extract active case study from pathname
const getActiveCaseStudyFromPath = (path: string): string | undefined => {
  if (path.startsWith("/projects/")) {
    return path.split("/").pop() || path;
  }
  if (path.startsWith("/blog/")) {
    return path.split("/").pop() || path;
  }
  return undefined;
}

// API call to get new session ID
const requestNewSession = async (mode: ChatMode, activeCaseStudy?: string) => {
  try {
    const response = await fetch(`${apiBaseURL}session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mode,
        active_case_study: activeCaseStudy
      }),
    });

    if (!response.ok) {
      throw new Error(`Session API responded with status ${response.status}`);
    }

    const data = await response.json();
    return data.session_id;
  } catch (error) {
    console.error("Error getting session ID:", error);
    // Return a fallback session ID or null
    return null;
  }
}

// API call function for chat
const callChatApi = async (query: string, sessionId: string, mode: ChatMode, activeCaseStudy?: string, sectionContext?: string) => {
  // Start timing the request
  const startTime = performance.now();
  
  try {
    // Replace with your actual API endpoint
    const response = await fetch(`${apiBaseURL}chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        session_id: sessionId,
        mode,
        active_case_study: activeCaseStudy,
        section_context: sectionContext
      }),
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    const responseTime = (performance.now() - startTime) / 1000; // Convert to seconds
    
    return {
      ...data,
      responseTime: responseTime.toFixed(2)
    };
  } catch (error) {
    console.error("Error calling chat API:", error);
    const responseTime = (performance.now() - startTime) / 1000;
    
    return {
      answer: "Sorry, I encountered an error connecting to the backend. Please try again later.",
      sources: [],
      mode,
      fallback: true,
      gif_url: null,
      steps: [],
      responseTime: responseTime.toFixed(2)
    };
  }
}

export default function Chatbot() {
  const pathname = usePathname()
  const [state, setState] = useState<ChatbotState>({
    isOpen: false,
    isCollapsed: false,
    messages: { general: [], specific: [] }, // Initialize both modes
    sessionId: null, // Start with null session ID
    mode: "general",
    // activeCaseStudy will be set in useEffect
  })
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(false) // Keep for visual cues if needed, but not for session
  const [promptContext, setPromptContext] = useState<string | undefined>()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const prevPathRef = useRef<string>(pathname)

  // Initialize chatbot state based on path, but don't create session yet
  useEffect(() => {
    // Determine initial mode and active case study based on path
    const isDetail = isDetailPage(pathname)
    const initialMode = isDetail ? "specific" : "general"
    const activeCaseStudy = getActiveCaseStudyFromPath(pathname)

    setState(prev => ({
      ...prev,
      mode: initialMode,
      activeCaseStudy,
      // No session ID requested here anymore
    }))

    // Update the prevPathRef
    prevPathRef.current = pathname
    // No longer waiting for session, so set initializing false sooner if needed,
    // or remove if initialization state isn't strictly tied to session anymore.
    // setIsInitializing(false); // Example: if you want to remove the spinner quickly
  }, []) // Run only once on mount

  // Handle path changes: update mode, clear messages, RESET session ID
  useEffect(() => {
    const handlePathChange = async () => {
      const currentPathBase = pathname.split('#')[0]
      const prevPathBase = prevPathRef.current.split('#')[0]

      if (currentPathBase !== prevPathBase) {
        // setIsInitializing(true); // Optional: show brief loading state

        const isDetail = isDetailPage(pathname)
        const newMode = isDetail ? "specific" : "general"
        const activeCaseStudy = getActiveCaseStudyFromPath(pathname)

        // Update state: change mode, case study, clear messages, RESET sessionId to null
        setState(prev => ({
          ...prev,
          messages: { general: [], specific: [] }, // Clear messages for both modes
          mode: newMode,
          activeCaseStudy,
          sessionId: null // Reset session ID on path change
        }))

        prevPathRef.current = pathname
        // setIsInitializing(false); // Optional: hide loading state
      }
    }

    handlePathChange()
  }, [pathname]) // Dependency remains pathname

  // Listen for custom event from mobile nav
  useEffect(() => {
    const handleToggleChatbot = () => {
      setState((prev) => ({
        ...prev,
        isOpen: !prev.isOpen,
      }))
    }

    window.addEventListener("toggle-chatbot", handleToggleChatbot)
    return () => {
      window.removeEventListener("toggle-chatbot", handleToggleChatbot)
    }
  }, [])

  // Listen for AI prompts - remove session creation logic
  useEffect(() => {
    const handleAiPrompt = async (event: Event) => {
      const customEvent = event as CustomEvent
      const { section, project, page } = customEvent.detail
      console.log("AI Prompt received:", section, project, page)

      const newMode = project ? "specific" : "general"
      let activeCaseStudy = project || undefined

      // If mode or case study is different, update state but don't request new session
      if (newMode !== state.mode || activeCaseStudy !== state.activeCaseStudy) {
        // setIsInitializing(true); // Optional visual cue
        setState((prev) => ({
          ...prev,
          isOpen: true,
          isCollapsed: false,
          mode: newMode,
          activeCaseStudy,
          // No session ID change here
          messages: { // Clear messages only for the *new* mode
            ...prev.messages,
            [newMode]: []
          }
        }))
        // setIsInitializing(false); // Optional visual cue
      } else {
        // Just open the chatbot
        setState((prev) => ({
          ...prev,
          isOpen: true,
          isCollapsed: false
        }))
      }

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


      // handleSendMessage will now handle session creation if needed
      if (prompt) {
         // Use a small timeout to ensure state update completes before sending message
         // This might be needed if setIsInitializing was used and needs to resolve
         setTimeout(() => handleSendMessage(prompt), 0);
      }
    }

    window.addEventListener("ai-prompt", handleAiPrompt)
    return () => {
      window.removeEventListener("ai-prompt", handleAiPrompt)
    }
    // Removed isInitializing from dependency array as session logic is moved
  }, [state.mode, state.activeCaseStudy, state.sessionId]) // Add sessionId dependency

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [state.messages, state.mode]) // Add state.mode dependency

  // Get starter questions for current page (no changes needed here)
  const getStarterQuestions = () => {
    // Try to find exact match first
    if (starterQuestions[pathname]) {
      return starterQuestions[pathname]
    }
    
    // For project or blog detail pages
    if (pathname.startsWith("/projects/")) {
      return starterQuestions["/projects/"]
    }
    
    if (pathname.startsWith("/blog/")) {
      return starterQuestions["/blog/"]
    }
    
    // For section pages
    for (const path in starterQuestions) {
      if (pathname.startsWith(path) && path !== "/") {
        return starterQuestions[path]
      }
    }
    
    // Default to home page questions
    return starterQuestions["/"]
  }

  // Handle sending a message - Session creation logic remains here
  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return // Allow sending even if initializing visually

    let currentSessionId = state.sessionId;
    const currentMode = state.mode; // Capture current mode

    // --- Session Creation Logic (No changes needed here) ---
    if (!currentSessionId) {
      setIsLoading(true); // Show loading while getting session
      setIsInitializing(true); // Use initializing state for session creation feedback
      try {
        console.log("Requesting new session ID for mode:", currentMode, "case study:", state.activeCaseStudy);
        currentSessionId = await requestNewSession(currentMode, state.activeCaseStudy);
        if (!currentSessionId) {
          throw new Error("Failed to obtain a session ID.");
        }
        // Update state immediately with the new session ID
        setState(prev => ({ ...prev, sessionId: currentSessionId }));
        console.log("Obtained new session ID:", currentSessionId);
      } catch (error) {
        console.error("Error creating session:", error);
        // Add error message directly to the current mode's message list
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Sorry, I couldn't start a chat session. Please try again later.",
          timestamp: Date.now()
        };
        setState(prev => ({
          ...prev,
          messages: {
            ...prev.messages,
            [currentMode]: [...prev.messages[currentMode], errorMessage]
          }
        }));
        setIsLoading(false);
        setIsInitializing(false);
        return; // Stop processing if session creation failed
      } finally {
         setIsInitializing(false); // Turn off initializing state after attempt
         // Keep setIsLoading(true) as we are now proceeding to call the chat API
      }
    }
    // --- End Session Creation Logic ---

    // Ensure we have a session ID before proceeding
    if (!currentSessionId) {
        console.error("Attempted to send message without a session ID.");
        // Optionally show an error message to the user
        return;
    }


    // Add user message to the correct mode's array
    const userMessageId = crypto.randomUUID()
    const userMessage: Message = {
      id: userMessageId,
      role: "user",
      content,
      timestamp: Date.now()
    }

    // Use functional update to ensure we're working with the latest state
    setState((prev) => ({
      ...prev,
      messages: {
        ...prev.messages,
        [currentMode]: [...prev.messages[currentMode], userMessage]
      },
    }))

    setInput("")
    setIsLoading(true) // Ensure loading is true

    try {
      // Call the API using the obtained/existing session ID and current mode
      const response = await callChatApi(
        content,
        currentSessionId, // Use the definite session ID
        currentMode,
        state.activeCaseStudy,
        promptContext
      )

      // Add assistant message to the correct mode's array
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.answer,
        timestamp: Date.now(),
        responseTime: parseFloat(response.responseTime)
      }

      setState((prev) => ({
        ...prev,
        messages: {
          ...prev.messages,
          [currentMode]: [...prev.messages[currentMode], assistantMessage]
        },
      }))

      setPromptContext(undefined) // Clear prompt context after use
    } catch (error) {
      console.error("Error sending message:", error)

      // Add error message to the correct mode's array
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again later.",
        timestamp: Date.now()
      }

      setState((prev) => ({
        ...prev,
        messages: {
          ...prev.messages,
          [currentMode]: [...prev.messages[currentMode], errorMessage]
        },
      }))
    } finally {
      setIsLoading(false)
    }
  }

  // Handle starter question click (no changes needed)
  const handleStarterQuestionClick = (question: string) => {
    // ... existing code ...
  }

  // Toggle chatbot open/closed (no changes needed)
  const toggleChatbot = () => {
    // ... existing code ...
  }

  // Toggle chatbot collapsed/expanded (no changes needed)
  const toggleCollapse = () => {
    // ... existing code ...
  }

  // Change chat mode - remove session creation, just switch mode
  const handleModeChange = async (mode: ChatMode) => {
    if (mode === state.mode) return

    // No need to set initializing or request new session
    // Just update the mode in the state
    setState(prev => ({
      ...prev,
      mode,
      // messages remain as they are, we just switch the view
    }))
  }

  // Determine if mode selection should be shown (no changes needed)
  const showModeSelection = isDetailPage(pathname)

  // Get messages for the current mode
  const currentMessages = state.messages[state.mode] || [];

  return (
    <>
      {/* Chatbot toggle button (mobile) */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <Button onClick={toggleChatbot} size="icon" className="rounded-full h-12 w-12 shadow-lg">
          {state.isOpen ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chatbot container */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-40 bg-background border-l border-border transition-all duration-300 ease-in-out flex flex-col",
          !state.isOpen && "translate-x-full",
          state.isCollapsed ? "w-20" : "w-full sm:w-96",
          "md:relative md:translate-x-0",
          state.isCollapsed ? "md:w-20" : "md:w-4/16",
        )}
        style={{ height: "100vh", position: "sticky" }}
      >
        {/* Chatbot header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center space-x-2 text-foreground">
            <Sparkles className="h-4 w-4" />
            {!state.isCollapsed && <h2 className="font-medium">AI Assistant</h2>}
          </div>
          <div className="flex items-center space-x-1 gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCollapse}
              className="h-6 w-6 hidden md:flex text-foreground"
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
        { !state.isCollapsed && (
          <>
            {/* Mode tabs - logic remains the same, but handleModeChange is updated */}
            {showModeSelection && (
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
                    <TabsTrigger value="specific" className="flex items-center gap-2 text-foreground">
                      <FileText className="h-4 w-4" />
                      <span>Page Specific</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            )}

            {/* Messages container */}
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Initializing indicator - Now potentially shown during first message send */}
              {isInitializing && (
                <div className="text-center py-8 animate-fadeIn">
                  <div className="flex justify-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                    <div className="h-2 w-2 rounded-full bg-primary animate-bounce delay-75" />
                    <div className="h-2 w-2 rounded-full bg-primary animate-bounce delay-150" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Initializing chat session...</p>
                </div>
              )}

              {/* Welcome message - Check current mode's messages */}
              {!isInitializing && currentMessages.length === 0 && (
                <div className="text-center space-y-4 py-8 animate-fadeIn">
                  {/* ... existing welcome message and starter questions ... */}
                  {/* Ensure starter questions call handleStarterQuestionClick */}
                   <div className="space-y-2 mt-6">
                    <p className="text-sm font-medium text-foreground">Try asking:</p>
                    <div className="flex flex-col space-y-2">
                      {getStarterQuestions().map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-start text-left h-auto py-2 text-foreground whitespace-normal break-words"
                          onClick={() => handleStarterQuestionClick(question)} // Corrected this line
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Chat messages - Render messages for the current mode */}
              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex flex-col animate-fadeIn", 
                    message.role === "user" ? "items-end" : "items-start"
                  )}
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
                  
                  {/* Response time and disclaimer for AI messages */}
                  {message.role === "assistant" && (
                    <div className="mt-1 space-y-1">
                      {message.responseTime && (
                        <p className="text-xs text-muted-foreground">
                          Response time: {message.responseTime}s
                        </p>
                      )}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground italic">
                      This is an experimental personal chatbot - may hallucinate or be slow at times! 😊
                      </p>
                </div>
              ))}
              <div ref={messagesEndRef} /> {/* For scrolling */}
            </div>

            {/* Input area */}
            <div className="p-4 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage(input)
                }}
                className="flex items-center space-x-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1"
                  disabled={isLoading || isInitializing} // Disable input during initial session creation too
                />
                <Button type="submit" size="icon" disabled={isLoading || isInitializing || !input.trim()}>
                  {isLoading ? (
                    <div className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  )
}