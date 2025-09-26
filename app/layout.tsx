import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/sidebar/sidebar"
import Chatbot from "@/components/chatbot/chatbot"
import MobileNav from "@/components/mobile-nav"
import { ThemeProvider } from "@/components/theme-provider"
import { PasswordProtectionProvider } from "@/contexts/password-protection-context"

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
              {/* Sidebar */}
              <Sidebar />

              {/* Main content - full width on mobile, with dynamic margin based on sidebar state */}
              <main className="flex-1 w-full md:w-6/12 min-h-screen overflow-auto pb-16 md:pb-0 transition-all duration-300">
                <div className="w-full">
                  {children}
                </div>
              </main>

              {/* Chatbot - hidden on mobile, visible on tablet/desktop */}
              <div className="hidden md:block">
                <Chatbot />
              </div>
            </div>
            {/* Mobile navigation */}
            <MobileNav />
          </PasswordProtectionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
