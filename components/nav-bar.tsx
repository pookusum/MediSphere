"use client"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X, Activity, LogIn } from "lucide-react"

export function NavBar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-accent p-0.5 transition-transform group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-background">
              <Activity className="size-5 text-primary" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            MediSphere
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <a href="#finder" className="text-sm font-medium transition-colors hover:text-primary">
            Find Hospitals
          </a>
          <a href="#ai" className="text-sm font-medium transition-colors hover:text-primary">
            AI Predictions
          </a>
          <a href="#features" className="text-sm font-medium transition-colors hover:text-primary">
            Features
          </a>
          <a href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact
          </a>
          <Link href="/auth/login">
            <Button variant="outline" className="gap-2 bg-transparent">
              <LogIn className="size-4" />
              Login
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md hover:shadow-lg">
              Dashboard
            </Button>
          </Link>
          <ThemeToggle />
        </nav>

        <button
          className="rounded-lg p-2 transition-colors hover:bg-secondary md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-card md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            <a
              href="#finder"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 font-medium transition-colors hover:bg-secondary"
            >
              Find Hospitals
            </a>
            <a
              href="#ai"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 font-medium transition-colors hover:bg-secondary"
            >
              AI Predictions
            </a>
            <a
              href="#features"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 font-medium transition-colors hover:bg-secondary"
            >
              Features
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 font-medium transition-colors hover:bg-secondary"
            >
              Contact
            </a>
            <Link
              href="/auth/login"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 font-medium transition-colors hover:bg-secondary"
            >
              Login
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 font-medium transition-colors hover:bg-secondary"
            >
              Dashboard
            </Link>
            <div className="px-3 py-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
