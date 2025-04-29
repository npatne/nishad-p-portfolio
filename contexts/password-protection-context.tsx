"use client"

import { createContext, useContext, type ReactNode } from "react"

// Define the structure for protected pages
export type ProtectedPage = {
  path: string
  password: string
  title?: string
  description?: string
}

// Define the context type
type PasswordProtectionContextType = {
  isAuthenticated: (path: string) => boolean
  authenticate: (path: string, password: string) => boolean
  logout: (path: string) => void
  protectedPages: ProtectedPage[]
}

// Create the context
const PasswordProtectionContext = createContext<PasswordProtectionContextType | undefined>(undefined)

// Define the protected pages and their passwords
const protectedPages: ProtectedPage[] = [
  {
    path: "/projects/lei-app-1",
    password: "project1pass",
    title: "LEI Application 1",
    description: "This project contains confidential information about our educational platform.",
  },
  {
    path: "/projects/lei-app-2",
    password: "project2pass",
    title: "LEI Application 2",
    description: "Access to this project requires authorization.",
  },
  {
    path: "/blog/scaling-design-systems",
    password: "blog1pass",
    title: "Scaling Design Systems",
    description: "This article contains proprietary information.",
  },
]

// Provider component
export function PasswordProtectionProvider({ children }: { children: ReactNode }) {
  // Check if a path is authenticated
  const isAuthenticated = (path: string): boolean => {
    // First check if the path is protected
    const protectedPage = protectedPages.find((page) => path.startsWith(page.path))
    if (!protectedPage) return true // Not a protected page

    // Check if authenticated in localStorage
    if (typeof window !== "undefined") {
      const authenticatedPaths = JSON.parse(localStorage.getItem("authenticatedPaths") || "[]")
      return authenticatedPaths.includes(protectedPage.path)
    }
    return false
  }

  // Authenticate a path with a password
  const authenticate = (path: string, password: string): boolean => {
    const protectedPage = protectedPages.find((page) => path.startsWith(page.path))
    if (!protectedPage) return false

    const isCorrect = protectedPage.password === password

    if (isCorrect && typeof window !== "undefined") {
      const authenticatedPaths = JSON.parse(localStorage.getItem("authenticatedPaths") || "[]")
      if (!authenticatedPaths.includes(protectedPage.path)) {
        authenticatedPaths.push(protectedPage.path)
        localStorage.setItem("authenticatedPaths", JSON.stringify(authenticatedPaths))
      }
    }

    return isCorrect
  }

  // Logout from a protected path
  const logout = (path: string): void => {
    if (typeof window !== "undefined") {
      const protectedPage = protectedPages.find((page) => path.startsWith(page.path))
      if (!protectedPage) return

      const authenticatedPaths = JSON.parse(localStorage.getItem("authenticatedPaths") || "[]")
      const updatedPaths = authenticatedPaths.filter((p: string) => p !== protectedPage.path)
      localStorage.setItem("authenticatedPaths", JSON.stringify(updatedPaths))
    }
  }

  return (
    <PasswordProtectionContext.Provider value={{ isAuthenticated, authenticate, logout, protectedPages }}>
      {children}
    </PasswordProtectionContext.Provider>
  )
}

// Custom hook to use the password protection context
export function usePasswordProtection() {
  const context = useContext(PasswordProtectionContext)
  if (context === undefined) {
    throw new Error("usePasswordProtection must be used within a PasswordProtectionProvider")
  }
  return context
}
