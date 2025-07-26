import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/sidebar/sidebar"
import Chatbot from "@/components/chatbot/chatbot"
import MobileNav from "@/components/mobile-nav"
import { ThemeProvider } from "@/components/theme-provider"
import { PasswordProtectionProvider } from "@/contexts/password-protection-context"
import { projects } from "@/data/projects" // Import projects for sidebar

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nishad Patne",
  description: "Portfolio showcasing UX design and engineering work",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" /> 
        <link rel="icon" href="/icon.svg" type="image/svg+xml" /> 
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> 
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true} disableTransitionOnChange={false}>
          <PasswordProtectionProvider>
            <div className="flex min-h-screen">
              {/* Mobile banner */}
              <div className="md:hidden fixed top-40 left-0 right-0 bg-yellow-100 dark:bg-yellow-900 p-4 text-center z-50 w-screen">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-100">
                  Apologies,
                  <br />
                  Mobile site is under construction. Please enjoy my work on a larger screen, tablet or desktop.
                </p>
              </div>
              
              {/* Sidebar - 2 columns */}
              <Sidebar />

              {/* Main content - 6 columns */}
              <main className="flex-1 w-full md:w-6/12 min-h-screen overflow-auto pb-16 md:pb-0 flex justify-center">
                {/* Add padding top for mobile to account for banner */}
                <div className="w-full md:w-auto pt-16 md:pt-0">
                  {children}
                </div>
              </main>

              {/* Chatbot - 4 columns */}
              <Chatbot />
            </div>
            {/* Mobile navigation */}
            <MobileNav />
          </PasswordProtectionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
