"use client"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme") as "light" | "dark" | null
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(stored || (prefersDark ? "dark" : "light"))
    } catch {}
  }, [])

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
    try {
      localStorage.setItem("theme", theme)
    } catch {}
  }, [theme])

  return (
    <Button
      variant="ghost"
      className="rounded-full"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </Button>
  )
}
