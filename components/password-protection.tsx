"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { usePasswordProtection } from "@/contexts/password-protection-context"

interface PasswordProtectionProps {
  children: React.ReactNode
}

export function PasswordProtection({ children }: PasswordProtectionProps) {
  const pathname = usePathname()
  const { isAuthenticated, authenticate, logout, protectedPages } = usePasswordProtection()
  const [password, setPassword] = useState("")
  const [isProtected, setIsProtected] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(true)

  useEffect(() => {
    setIsProtected(protectedPages.some((page) => pathname?.startsWith(page.path)))
    setIsAuthorized(isAuthenticated(pathname))
  }, [pathname, isAuthenticated, protectedPages])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const authorized = authenticate(pathname, password)
    setIsAuthorized(authorized)
  }

  if (!isProtected || isAuthorized) {
    return <>{children}</>
  }

  const pageInfo = protectedPages.find((page) => pathname?.startsWith(page.path))

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12">
      <Card className="max-w-md w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Password Required</CardTitle>
          {pageInfo?.description && <CardDescription className="text-center">{pageInfo.description}</CardDescription>}
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {!isAuthorized && <p className="text-destructive text-sm">Incorrect password</p>}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
