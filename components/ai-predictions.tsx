import { Card } from "@/components/ui/card"
import { Brain, BellRing, Route, Hospital } from "lucide-react"
import Image from "next/image"

export function AIPredictions() {
  const items = [
    {
      icon: Brain,
      title: "Predict Crowd Levels",
      desc: "Anticipate busy hours at each hospital using historical and live data analytics.",
      gradient: "from-primary/20 to-accent/20",
    },
    {
      icon: Route,
      title: "Recommend Best Hospital",
      desc: "Get AI-powered suggestions based on condition, distance, and specialist availability.",
      gradient: "from-accent/20 to-chart-3/20",
    },
    {
      icon: BellRing,
      title: "Emergency Alerts",
      desc: "Instant notifications for ICU capacity changes or critical blood bank updates.",
      gradient: "from-chart-4/20 to-chart-5/20",
    },
    {
      icon: Hospital,
      title: "Smart Triage",
      desc: "Guide patients to the right facility to reduce wait times and prevent overload.",
      gradient: "from-chart-3/20 to-primary/20",
    },
  ]

  return (
    <section
      id="ai"
      className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background py-16"
    >
      <div className="absolute left-1/4 top-0 size-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 size-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Brain className="size-4" />
            <span>Powered by Machine Learning</span>
          </div>

          <h2 className="text-4xl font-bold tracking-tight">AI-Powered Predictions</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            MediSphere uses advanced machine learning to predict crowd levels, recommend optimal hospitals, and issue
            time-critical alerts that save lives.
          </p>
        </div>

        <div className="mb-12 overflow-hidden rounded-2xl border-2 border-primary/20 shadow-2xl">
          <Image
            src="/ai-neural-network-analyzing-hospital-data-with-gra.jpg"
            alt="AI analyzing healthcare data"
            width={250}
            height={200}
            className="w-200 h-200r"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((it) => (
            <Card
              key={it.title}
              className="group relative overflow-hidden border-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${it.gradient} opacity-0 transition-opacity group-hover:opacity-100`}
              />

              <div className="relative flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <it.icon className="size-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{it.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{it.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
