"use client"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Send } from "lucide-react"

type Msg = { role: "user" | "assistant"; content: string }

export function Chatbot() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I am MediBot. Ask me about finding hospitals, availability, or onboarding." },
  ])
  const [input, setInput] = useState("")

  async function ask() {
    if (!input.trim()) return
    const user = input.trim()
    setMessages((m) => [...m, { role: "user", content: user }])
    setInput("")
    try {
      const res = await fetch("/api/faq", { method: "POST", body: JSON.stringify({ message: user }) })
      const data = await res.json()
      setMessages((m) => [...m, { role: "assistant", content: data.answer ?? "Sorry, I had trouble answering that." }])
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Network error. Please try again." }])
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16">
      <Card className="p-5">
        <div className="mb-3 flex items-center gap-2">
          <Bot className="size-5 text-primary" />
          <h3 className="font-semibold">AI Assistant</h3>
        </div>
        <div className="max-h-64 space-y-3 overflow-y-auto rounded border p-3">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
              <span
                className={`inline-block rounded-lg px-3 py-2 text-sm ${m.role === "user" ? "bg-accent text-accent-foreground" : "bg-secondary"}`}
              >
                {m.content}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <Input
            placeholder="Ask a question…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && ask()}
            aria-label="Ask the assistant"
          />
          <Button onClick={ask} className="bg-primary text-primary-foreground hover:opacity-90" aria-label="Send">
            <Send className="size-4" />
          </Button>
        </div>
      </Card>
    </section>
  )
}
