"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { MessageSquare, Sparkles, X, Minimize, Send, Globe, FileText, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getActiveCaseStudyLiteral } from "@/data/projects" 
import ReactMarkdown from "react-markdown"
// Import Tooltip components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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

// Starter questions: Restructured for mode and path
const starterQuestions: Record<
  string,
  { general?: string[]; specific?: string[] } // Corrected type
> = {
  "/": {
    general: [
      "Tell me about Nishad's UX design and engineering experience",
      "Tell me about projects and type of work Nishad has on this portfolio?",
      "What technologies does Nishad work with?",
    ],
  },
  "/projects": {
    general: [
      "What types of projects has Nishad worked on?",
      "Which project shows the strongest UX research?",
      "Tell me about Nishad's design process",
    ],
  },
  "/projects/": {
    // Base for specific project pages
    specific: [
      "Summarize the key features of this project",
      "What was Nishad's role in this project?",
      "What were the key deliverables from this project?",
      "What was the impact of this project?",
    ],
  },
  "/blog": {
    general: [
      "What topics does Nishad write about?",
      "How often does Nishad publish new content?",
      "What's the latest blog post about?",
    ],
  },
  "/blog/": {
    // Base for specific blog pages
    specific: [
      "Why did Nishad choose to write about this topic?",
      "What are the key insights from this post?",
      "Can you summarize this post for me?",
    ],
  },
  "/about": {
    general: [
      "What is Nishad's professional background?",
      "What skills does Nishad specialize in?",
      "Tell me about Nishad's education",
    ],
  },
  "/contact": {
    general: [
      "What's the best way to contact Nishad?",
      "What information should I include when reaching out?",
    ],
  },
};


// api base url
// const apiBaseURL = "http://137.131.30.181:8000/";
const apiBaseURL = "/api/";

// Function to determine if path is a project or blog detail page
const isDetailPage = (path: string): boolean => {
  // Ensure path is defined and is a string before calling startsWith for now only project.
  // return typeof path === 'string' && (path.startsWith("/projects/") || path.startsWith("/blog/"));
  return typeof path === 'string' && (path.startsWith("/projects/"));
}

// Function to extract active case study from pathname
const getActiveCaseStudyFromPath = (path: string): string | undefined => {
  if (typeof path !== 'string') return undefined; // Add type check
  if (path.startsWith("/projects/")) {
    const subpath= path.split("/").pop() || path;
    return getActiveCaseStudyLiteral(subpath);
  }
  // if (path.startsWith("/blog/")) {  // no blog ai for now.
  //   return path.split("/").pop() || path;
  // }
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
    // Return null on error
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

    // Return a structured error response
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
  // Keep isOpen initialized to false
  const [state, setState] = useState<ChatbotState>({
    isOpen: false,
    isCollapsed: false,
    messages: { general: [], specific: [] },
    sessionId: null,
    mode: "general",
  })
  
  // Use a ref to track if this is the first render
  const isFirstRender = useRef(true)
  
  // Add this effect to handle path-based opening, but only after first render
  useEffect(() => {
    // Only run this effect after the first render to avoid hydration mismatch
    if (isFirstRender.current) {
      isFirstRender.current = false
      // Only open the chatbot if we're not on the homepage
      if (pathname !== "/") {
        setState(prev => ({
          ...prev,
          isOpen: true
        }))
      }
    }
  }, [pathname])
  
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(false) // For session creation feedback
  const [promptContext, setPromptContext] = useState<string | undefined>()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const prevPathRef = useRef<string>(pathname)

  // Initialize chatbot state based on path, but don't create session yet
  useEffect(() => {
    const isDetail = isDetailPage(pathname)
    const initialMode = isDetail ? "specific" : "general"
    const activeCaseStudy = getActiveCaseStudyFromPath(pathname)

    setState(prev => ({
      ...prev,
      mode: initialMode,
      activeCaseStudy,
      sessionId: null, // Ensure session is null on initial load
      messages: { general: [], specific: [] } // Ensure messages are cleared
    }))

    prevPathRef.current = pathname
  }, []) // Run only once on mount

  // Handle path changes: update mode, clear messages, RESET session ID
  useEffect(() => {
    const handlePathChange = () => {
      const currentPathBase = pathname?.split('#')[0] ?? ''; // Handle potential null pathname
      const prevPathBase = prevPathRef.current?.split('#')[0] ?? ''; // Handle potential null prevPathRef.current

      if (currentPathBase !== prevPathBase) {
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

  // Listen for AI prompts - handle session creation via handleSendMessage
  useEffect(() => {
    const handleAiPrompt = async (event: Event) => {
      const customEvent = event as CustomEvent
      const { section, project, page } = customEvent.detail
      console.log("AI Prompt received:", section, project, page)

      const newMode = project ? "specific" : "general"
      let activeCaseStudy = project || undefined

      // Update state if mode or case study changes, clear target mode messages
      if (newMode !== state.mode || activeCaseStudy !== state.activeCaseStudy) {
        setState((prev) => ({
          ...prev,
          isOpen: true,
          isCollapsed: false,
          mode: newMode,
          activeCaseStudy,
          messages: {
            ...prev.messages,
            [newMode]: [] // Clear messages only for the *new* mode
          }
          // No session ID change here
        }))
      } else {
        // Just open the chatbot if mode/case study are the same
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

      // Trigger message sending (which handles session creation if needed)
      if (prompt) {
         // Use setTimeout to ensure state updates (like mode change) are processed
         setTimeout(() => handleStarterQuestionClick(prompt), 0);
      }
    }

    window.addEventListener("ai-prompt", handleAiPrompt)
    return () => {
      window.removeEventListener("ai-prompt", handleAiPrompt)
    }
  }, [state.mode, state.activeCaseStudy]) // Dependencies: mode and activeCaseStudy trigger re-evaluation if prompt logic depends on them

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [state.messages, state.mode]) // Add state.mode dependency

  // Get starter questions for current page and mode
  const getStarterQuestions = (): string[] => {
    const currentMode = state.mode;
    let questions: string[] | undefined;
    const currentPathname = pathname || "/"; // Default to "/" if pathname is null/undefined

    // 1. Try exact path match for the current mode
    if (starterQuestions[currentPathname]?.[currentMode]) {
      questions = starterQuestions[currentPathname]?.[currentMode];
    }

    // 2. Try base path match for projects/blogs for the current mode
    if (!questions) {
      if (currentPathname.startsWith("/projects/") && starterQuestions["/projects/"]?.[currentMode]) {
        questions = starterQuestions["/projects/"]?.[currentMode];
      } else if (currentPathname.startsWith("/blog/") && starterQuestions["/blog/"]?.[currentMode]) {
        questions = starterQuestions["/blog/"]?.[currentMode];
      }
    }

    // 3. Try the listing page for the current mode (e.g., /projects for /projects/lei-app-1)
     if (!questions) {
       const listingPath = currentPathname.split('/')[1]; // e.g., 'projects' or 'blog'
       if (listingPath && starterQuestions[`/${listingPath}`]?.[currentMode]) {
         questions = starterQuestions[`/${listingPath}`]?.[currentMode];
       }
     }

    // 4. Fallback to home page general questions if still nothing found
    if (!questions) {
      questions = starterQuestions["/"]?.general;
    }

    // 5. Final fallback if even home general is missing
    return questions || ["Ask me anything about Nishad's portfolio."];
  };

  // Add message to state helper
  const addMessageToState = (
    role: "user" | "assistant",
    content: string,
    responseTime?: number
  ) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      role,
      content,
      timestamp: Date.now(),
      responseTime,
    };

    setState((prev) => {
      const currentModeMessages = prev.messages[prev.mode] || [];
      return {
        ...prev,
        messages: {
          ...prev.messages,
          [prev.mode]: [...currentModeMessages, newMessage],
        },
      };
    });
  };

  // Internal function to handle the actual sending logic after session is confirmed
  const handleSendMessageInternal = async (
    content: string,
    sessionId: string // Expects a valid session ID
  ) => {
    if (!content.trim() || isLoading) return; // Prevent sending empty/during loading

    const currentMode = state.mode;
    const currentCaseStudy = state.activeCaseStudy;
    const currentSectionContext = promptContext; // Capture context before clearing

    // Add user message optimistically
    addMessageToState("user", content);

    setInput(""); // Clear input field
    setIsLoading(true); // Set loading state for API call
    setPromptContext(undefined); // Clear section context after use

    try {
      const response = await callChatApi(
        content,
        sessionId, // Use the confirmed session ID
        currentMode,
        currentCaseStudy,
        currentSectionContext
      );

      // Add assistant message
      addMessageToState(
        "assistant",
        response.answer,
        parseFloat(response.responseTime) // Ensure responseTime is a number
      );
    } catch (error) {
      console.error("Error sending message:", error);
      addMessageToState(
        "assistant",
        "Sorry, I encountered an error processing your request. Please try again later."
      );
    } finally {
      setIsLoading(false); // Clear loading state
      setIsInitializing(false); // Ensure initializing state is also cleared
    }
  };

  // Handle sending a message / starter question click (handles session creation)
  const handleStarterQuestionClick = (question: string) => {
    if (!question.trim()) return;

    if (!state.sessionId) {
      setIsInitializing(true); // Show initializing state for session request
      setIsLoading(true); // Also set loading as we'll proceed to send message
      console.log("No session ID found, requesting new one...");
      requestNewSession(state.mode, state.activeCaseStudy)
        .then((newSessionId) => {
          if (newSessionId) {
            console.log("Obtained new session ID:", newSessionId);
            setState((prev) => ({ ...prev, sessionId: newSessionId }));
            // Now send the message with the new session ID
            handleSendMessageInternal(question, newSessionId); // Pass the new ID
          } else {
            // Handle session creation failure
            console.error("Failed to get session ID, cannot send message.");
            addMessageToState(
              "assistant",
              "Sorry, I couldn't start a session. Please try again."
            );
            setIsInitializing(false); // Clear initializing state on failure
            setIsLoading(false); // Clear loading state on failure
          }
        })
        .catch((error) => {
          console.error("Error during session request:", error);
          addMessageToState(
            "assistant",
            "Sorry, an error occurred while starting a session."
          );
          setIsInitializing(false); // Clear initializing state on error
          setIsLoading(false); // Clear loading state on error
        });
    } else {
      // Session already exists, send message directly
      console.log("Session ID exists:", state.sessionId, "Sending message.");
      handleSendMessageInternal(question, state.sessionId); // Pass existing ID
    }
  };


  // Toggle chatbot open/closed
  const toggleChatbot = () => {
    setState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
      isCollapsed: prev.isOpen ? prev.isCollapsed : false // Optionally un-collapse when opening
    }));
  };

  // Toggle chatbot collapsed/expanded
  const toggleCollapse = () => {
    setState((prev) => ({
      ...prev,
      isCollapsed: !prev.isCollapsed
    }));
  };

  // Change chat mode - No session creation, just switch mode
  const handleModeChange = (mode: ChatMode) => {
    if (mode === state.mode) return

    // Just update the mode in the state
    setState(prev => ({
      ...prev,
      mode,
      // messages remain as they are, we just switch the view
    }))
  }

  // Determine if mode selection should be shown
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
          state.isCollapsed ? "md:w-20" : "md:w-4/16", // Adjust width as needed
        )}
        // Use max-height and height to ensure it fits viewport
        style={{ height: "100vh", maxHeight: "100vh", position: "sticky", top: 0 }}
      >
        {/* Chatbot header */}
        <div className="p-4 border-b border-border flex items-center justify-between flex-shrink-0">
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
        {!state.isCollapsed && (
          <>
            {/* Mode tabs with Tooltips */}
            <div className="border-b border-border flex-shrink-0">
              {/* Wrap with TooltipProvider and set delay */}
              <TooltipProvider delayDuration={1000}>
                <Tabs
                  value={state.mode}
                  onValueChange={(value) => handleModeChange(value as ChatMode)}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-2">
                    {/* General Tab */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TabsTrigger
                          value="general"
                          className={cn(
                            "flex items-center gap-2 text-foreground",
                            state.mode === "general" ? "text-primary border-b-2 border-primary font-medium" : "opacity-70"
                          )}
                        >
                          <Globe className="h-4 w-4" />
                          <span>General</span>
                        </TabsTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ask general questions about Nishad and his portfolio.</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Specific Tab */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className={cn(
                          !isDetailPage(pathname) && "cursor-not-allowed w-full"
                        )}>
                          <TabsTrigger
                            value="specific"
                            className={cn(
                              "flex items-center gap-2 text-foreground w-full",
                              state.mode === "specific" ? "text-primary border-b-2 border-primary font-medium" : "opacity-70",
                              !isDetailPage(pathname) && "opacity-50"
                            )}
                            disabled={!isDetailPage(pathname)}
                          >
                            <FileText className="h-4 w-4" />
                            <span>Project Deepdive</span>
                          </TabsTrigger>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ask questions specifically about the content on the current page.</p>
                        {!isDetailPage(pathname) && <p className="text-xs text-muted-foreground">(Only available on project pages)</p>}
                      </TooltipContent>
                    </Tooltip>
                  </TabsList>
                </Tabs>
              </TooltipProvider>
            </div>

            {/* Messages container */}
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Initializing indicator - Shown during session request */}
              {isInitializing && (
                 <div className="flex justify-center items-center h-full">
                   <div className="text-muted-foreground text-sm flex items-center gap-2">
                     <div className="h-4 w-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
                     Initializing chat...
                   </div>
                 </div>
              )}

              {/* Welcome message & Starter Questions - Shown only if not initializing and no messages */}
              {!isInitializing && currentMessages.length === 0 && (
                <div className="text-center space-y-4 py-8 animate-fadeIn">
                  <div className="inline-block bg-secondary p-3 rounded-full">
                    <Sparkles className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Welcome!</h3>
                  <p className="text-sm text-muted-foreground">
                    Ask me anything about Nishad's portfolio, projects, or experience.
                  </p>

                  {/* Starter questions */}
                  <div className="space-y-2 mt-6">
                    <p className="text-sm font-medium text-foreground">Try asking:</p>
                    <div className="flex flex-col space-y-2">
                      {getStarterQuestions().map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-start text-left h-auto py-2 text-foreground whitespace-normal break-words"
                          onClick={() => handleStarterQuestionClick(question)} // Use updated handler
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Chat messages - Shown only if not initializing */}
              {!isInitializing && currentMessages.map((message) => (
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
                    {/* Render message content - consider using a markdown renderer if needed */}
                    <ReactMarkdown>
                    {message.content}
                    </ReactMarkdown>
                     {/* Optionally display response time for assistant messages */}
                     {message.role === 'assistant' && message.responseTime && (
                       <div className="text-xs opacity-70 mt-1 text-right">
                         {message.responseTime}s
                       </div>
                     )}
                  </div>
                </div>
              ))}

              {/* Loading indicator for API call - Shown only if not initializing */}
              {isLoading && !isInitializing && (
                 <div className="flex justify-start">
                   <div className="bg-secondary text-secondary-foreground rounded-lg p-3 inline-flex items-center space-x-2">
                     <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
                     <div className="h-2 w-2 rounded-full bg-current animate-bounce delay-75" />
                     <div className="h-2 w-2 rounded-full bg-current animate-bounce delay-150" />
                   </div>
                 </div>
              )}
              
              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-4 border-t border-border flex-shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleStarterQuestionClick(input); // Use the unified handler
                }}
                className="flex items-center space-x-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    isLoading || isInitializing
                      ? "Thinking..."
                      : "Ask me anything..."
                  }
                  className="flex-1 bg-input text-foreground placeholder:text-muted-foreground"
                  disabled={isLoading || isInitializing} // Disable input when loading or initializing
                  aria-label="Chat input"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading || isInitializing} // Disable button when no input or loading/initializing
                  className="h-9 w-9"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              {/* Add the disclaimer text here */}
              <p className="text-xs text-muted-foreground text-center px-4 pb-2 pt-1 mt-2">
                This is an experimental personal chatbot - may hallucinate or be slow at times! 😊
              </p>
            </div>
          </>
        )}

        {/* Collapsed view */}
        {state.isCollapsed && (
          <div className="p-2 flex justify-center items-center h-full">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCollapse}
              className="text-foreground hover:text-accent-foreground hover:bg-accent"
            >
              <Sparkles className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </>
  );
}