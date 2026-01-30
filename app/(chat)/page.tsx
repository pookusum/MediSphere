import { NavBar } from "@/components/nav-bar"
import { Chatbot } from "@/components/chatbot"

export default function ChatPage() {
  return (
    <main>
      <NavBar />
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Ask MediBot</h1>
        <p className="text-sm text-muted-foreground">
          Get quick answers about hospitals, availability, and onboarding.
        </p>
      </div>
      <Chatbot />
    </main>
  )
}
