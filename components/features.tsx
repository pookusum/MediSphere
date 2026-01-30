import { Card } from "@/components/ui/card"
import { CheckCircle, Bell, Map, Cpu, Shield, Moon } from "lucide-react"
import Image from "next/image"

export function KeyFeatures() {
  const features = [
    {
      icon: CheckCircle,
      title: "Real-Time Updates",
      desc: "Instant bed and doctor availability with live data sync.",
      color: "text-chart-3",
    },
    {
      icon: Map,
      title: "Smart Routing",
      desc: "Shortest routes with real-time traffic awareness.",
      color: "text-primary",
    },
    {
      icon: Cpu,
      title: "AI Recommendations",
      desc: "Best hospital suggestions based on your needs.",
      color: "text-accent",
    },
    {
      icon: Bell,
      title: "Emergency Notifications",
      desc: "Instant ICU and blood bank critical alerts.",
      color: "text-chart-4",
    },
    {
      icon: Shield,
      title: "Hospital Registration",
      desc: "Secure portal for hospitals to update data.",
      color: "text-chart-3",
    },
    {
      icon: Moon,
      title: "Dark/Light Mode",
      desc: "Comfortable interface for day or night use.",
      color: "text-primary",
    },
  ]

  return (
    <section id="features" className="relative mx-auto max-w-7xl px-4 py-16">
      <div className="mx-auto mb-12 grid max-w-5xl items-center gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">Key Features</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Designed for critical moments with modern technology and intuitive interfaces.
          </p>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-xl border shadow-lg">
          <Image src="/doctor-using-tablet-with-medical-dashboard-and-rea.jpg" alt="Healthcare technology dashboard" fill className="object-cover" />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Card
            key={f.title}
            className="group relative overflow-hidden border-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
          >
            <div className="absolute right-0 top-0 size-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl transition-transform group-hover:scale-150" />

            <div className="relative flex items-start gap-4">
              <div className={`rounded-lg bg-secondary p-3 ${f.color}`}>
                <f.icon className="size-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
