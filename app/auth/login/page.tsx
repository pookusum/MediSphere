"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Mail, Lock, User, Phone, ArrowLeft, CheckCircle2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setShowSuccess(true)

    // Redirect after success
    setTimeout(() => {
      router.push("/")
    }, 1500)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setShowSuccess(true)

    // Redirect after success
    setTimeout(() => {
      router.push("/")
    }, 1500)
  }

  if (showSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-emerald-100 p-4">
              <CheckCircle2 className="size-16 text-emerald-600" />
            </div>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-emerald-600">
            {activeTab === "login" ? "Login Successful!" : "Account Created!"}
          </h2>
          <p className="text-muted-foreground">Redirecting you to the homepage...</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-background p-4">
      {/* Background decorative elements */}
      <div className="absolute left-0 top-1/4 size-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 size-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Back to home link */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>

        <Card className="border-2 p-8 shadow-2xl">
          {/* Logo and title */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-2xl bg-background">
                  <Activity className="size-8 text-primary" />
                </div>
              </div>
            </div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight">Welcome to MediSphere</h1>
            <p className="text-sm text-muted-foreground">Access your healthcare dashboard</p>
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")} className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="login" className="text-base">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-base">
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="flex items-center gap-2 font-semibold">
                    <Mail className="size-4" />
                    Email Address
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="flex items-center gap-2 font-semibold">
                    <Lock className="size-4" />
                    Password
                  </Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="h-11"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="size-4 rounded border-gray-300" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <button type="button" className="font-medium text-primary hover:underline">
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-11 w-full bg-gradient-to-r from-primary to-accent text-base font-semibold shadow-md hover:shadow-lg"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>

            {/* Signup Form */}
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="flex items-center gap-2 font-semibold">
                    <User className="size-4" />
                    Full Name
                  </Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="flex items-center gap-2 font-semibold">
                    <Mail className="size-4" />
                    Email Address
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-phone" className="flex items-center gap-2 font-semibold">
                    <Phone className="size-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="signup-phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    required
                    value={signupData.phone}
                    onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="flex items-center gap-2 font-semibold">
                    <Lock className="size-4" />
                    Password
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a strong password"
                    required
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm" className="flex items-center gap-2 font-semibold">
                    <Lock className="size-4" />
                    Confirm Password
                  </Label>
                  <Input
                    id="signup-confirm"
                    type="password"
                    placeholder="Re-enter your password"
                    required
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    className="h-11"
                  />
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <input type="checkbox" required className="mt-1 size-4 rounded border-gray-300" />
                  <span className="text-muted-foreground">
                    I agree to the{" "}
                    <button type="button" className="font-medium text-primary hover:underline">
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button type="button" className="font-medium text-primary hover:underline">
                      Privacy Policy
                    </button>
                  </span>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-11 w-full bg-gradient-to-r from-primary to-accent text-base font-semibold shadow-md hover:shadow-lg"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Social login options */}
          <div className="space-y-3">
            <Button type="button" variant="outline" className="h-11 w-full bg-transparent">
              <svg className="mr-2 size-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
          </div>
        </Card>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Protected by industry-standard encryption and security measures
        </p>
      </div>
    </div>
  )
}
