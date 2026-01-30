import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <MapPin className="size-4" />
            <span>AI-Powered Healthcare Navigation</span>
          </div>

          <h1 className="text-pretty text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            MediSphere – Smart Healthcare,{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Anytime, Anywhere
            </span>
          </h1>

          <p className="text-balance text-lg text-muted-foreground md:text-xl">
            Find hospitals nearby, check live availability, and get the fastest route during emergencies. Your health,
            our priority.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#finder">
              <Button
                size="lg"
                className="group bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
              >
                Find Hospitals
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <a href="#onboard">
              <Button size="lg" variant="outline" className="border-2 bg-transparent">
                Join as Hospital Partner
              </Button>
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/20 to-accent/20 blur-2xl" />
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 border-primary/20 shadow-2xl">
            <Image
              src="/modern-hospital-building-with-ambulance-and-medica.jpg"
              alt="Modern hospital with digital healthcare technology"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute -bottom-6 -left-6 rounded-xl border bg-card p-4 shadow-lg">
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">Live Updates</div>
          </div>

          <div className="absolute -right-6 -top-6 rounded-xl border bg-card p-4 shadow-lg">
            <div className="text-3xl font-bold text-accent">AI</div>
            <div className="text-sm text-muted-foreground">Powered</div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
