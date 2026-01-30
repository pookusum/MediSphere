"use client"
import { useState } from "react"
import type React from "react"
import Image from "next/image"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Building2 } from "lucide-react"

export function Contact() {
  const [status1, setStatus1] = useState<string>("")
  const [status2, setStatus2] = useState<string>("")

  async function submitContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus1("Thanks! We will get back to you soon.")
    ;(e.currentTarget as HTMLFormElement).reset()
  }
  async function submitOnboard(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus2("Request received! Our team will contact you.")
    ;(e.currentTarget as HTMLFormElement).reset()
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background py-16"
    >
      <div className="absolute left-0 top-1/4 size-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 size-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight">Contact & Feedback</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Have questions or want to join our network? We're here to help.
          </p>
        </div>

        <div className="mb-12 overflow-hidden rounded-2xl border-2 border-primary/20 shadow-xl">
          <Image
            src="/placeholder.svg?key=9xk2p"
            alt="Customer support team"
            width={400}
            height={300}
            className="w-full object-cover"
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="relative overflow-hidden border-2 p-6 shadow-lg">
            <div className="absolute right-0 top-0 size-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />

            <div className="relative">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <MessageSquare className="size-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Patient Contact</h3>
              </div>

              <form onSubmit={submitContact} className="grid gap-4">
                <Input name="name" placeholder="Your name" required className="border-2" />
                <Input type="email" name="email" placeholder="Your email" required className="border-2" />
                <Textarea name="message" placeholder="How can we help?" required className="border-2 min-h-[120px]" />
                <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md hover:shadow-lg">
                  Send Message
                </Button>
                {status1 && <p className="text-sm font-medium text-chart-3">{status1}</p>}
              </form>
            </div>
          </Card>

          <Card className="relative overflow-hidden border-2 p-6 shadow-lg" id="onboard">
            <div className="absolute right-0 top-0 size-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-accent/20 to-chart-3/20 blur-2xl" />

            <div className="relative">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-accent/10 p-2">
                  <Building2 className="size-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold">Hospital Onboarding</h3>
              </div>

              <form onSubmit={submitOnboard} className="grid gap-4">
                <Input name="hospital" placeholder="Hospital name" required className="border-2" />
                <Input name="city" placeholder="City" required className="border-2" />
                <Input type="email" name="adminEmail" placeholder="Admin email" required className="border-2" />
                <Textarea
                  name="details"
                  placeholder="Existing systems, data availability, etc."
                  className="border-2 min-h-[120px]"
                />
                <Button className="bg-gradient-to-r from-accent to-chart-3 text-accent-foreground shadow-md hover:shadow-lg">
                  Request Access
                </Button>
                {status2 && <p className="text-sm font-medium text-chart-3">{status2}</p>}
              </form>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
