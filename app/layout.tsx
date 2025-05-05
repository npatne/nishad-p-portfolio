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
  title: "UX Designer & Engineer Portfolio",
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
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true} disableTransitionOnChange={false}>
          <PasswordProtectionProvider>
            <div className="flex min-h-screen">
              {/* Sidebar - 2 columns */}
              {/* <Sidebar projects={projects} /> */}
              <Sidebar />

              {/* Main content - 6 columns */}
              <main className="flex-1 w-full md:w-6/12 min-h-screen overflow-auto pb-16 md:pb-0 flex justify-center">{children}</main>

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
