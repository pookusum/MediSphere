import type { NextRequest } from "next/server"
import { generateText } from "ai"

export async function POST(req: NextRequest) {
  const { message } = await req.json()
  if (!message || typeof message !== "string") {
    return new Response(JSON.stringify({ error: "Missing message" }), { status: 400 })
  }

  const { text } = await generateText({
    model: "openai/gpt-5-mini",
    system:
      "You are MediBot, an assistant for MediSphere. Provide concise, helpful answers about finding hospitals, live availability, smart routing, onboarding, and safety. If asked for medical advice, suggest contacting professionals and using emergency services responsibly.",
    prompt: message,
  })

  return Response.json({ answer: text })
}
