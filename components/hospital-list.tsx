"use client"
import useSWR from "swr"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Activity, Ambulance, Stethoscope, Droplet, Navigation, MapPin } from "lucide-react"

export type Hospital = {
  id: string
  name: string
  lat: number
  lng: number
  distanceKm?: number
  bedsTotal: number
  bedsOccupied: number
  opdQueue: number
  doctorsAvailable: number
  bloodBank: Record<string, number>
  icuAvailable: boolean
  updatedAt: string
  city?: string
  type?: string
  specializations?: string[]
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function HospitalList({
  onSelect,
  userCoords,
  mode,
  hospitals: externalHospitals,
}: {
  onSelect: (h: Hospital) => void
  userCoords?: { lat: number; lng: number }
  mode: "driving" | "walking" | "bicycling"
  hospitals?: Hospital[]
}) {
  const { data, error, isLoading } = useSWR<{ hospitals: Hospital[] }>(
    externalHospitals ? null : "/api/hospitals",
    (url: string) => fetch(url).then((r) => r.json()),
    { refreshInterval: 15000 },
  )

  const hospitals = externalHospitals ?? data?.hospitals ?? []

  if (!externalHospitals) {
    if (isLoading) return <div className="text-sm text-muted-foreground">Loading hospitals…</div>
    if (error) return <div className="text-sm text-destructive">Failed to load hospitals.</div>
  }

  return (
    <div className="grid gap-4">
      {hospitals.map((h) => {
        const available = h.bedsTotal - h.bedsOccupied
        const critical = h.icuAvailable || available <= 3 || h.opdQueue >= 20
        const gmaps = userCoords
          ? `https://www.google.com/maps/dir/?api=1&origin=${userCoords.lat},${userCoords.lng}&destination=${h.lat},${h.lng}&travelmode=${mode}`
          : `https://www.google.com/maps/search/?api=1&query=${h.lat},${h.lng}`

        return (
          <Card
            key={h.id}
            className="group relative overflow-hidden border-2 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold">{h.name}</h3>
                    {critical && (
                      <Badge variant="destructive" className="gap-1">
                        <AlertCircle className="size-3" /> Alert
                      </Badge>
                    )}
                    {typeof h.distanceKm === "number" && (
                      <Badge variant="secondary" className="gap-1">
                        <MapPin className="size-3" /> {h.distanceKm.toFixed(1)} km
                      </Badge>
                    )}
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    {h.city && <span className="font-medium">{h.city}</span>}
                    {h.type && (
                      <>
                        <span>•</span>
                        <span>{h.type}</span>
                      </>
                    )}
                    <span>•</span>
                    <span>Updated {new Date(h.updatedAt).toLocaleTimeString()}</span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:bg-primary/10"
                  onClick={() => onSelect(h)}
                >
                  View on Map
                </Button>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
                <div className="rounded-xl border-2 bg-background p-3 transition-colors hover:border-chart-3/50">
                  <div className="flex items-center gap-2 text-chart-3">
                    <Activity className="size-5" />
                    <span className="font-semibold">Beds</span>
                  </div>
                  <p className="mt-2 text-base font-bold text-foreground">
                    {available} <span className="text-sm font-normal text-muted-foreground">/ {h.bedsTotal}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">available</p>
                </div>

                <div className="rounded-xl border-2 bg-background p-3 transition-colors hover:border-primary/50">
                  <div className="flex items-center gap-2 text-primary">
                    <Stethoscope className="size-5" />
                    <span className="font-semibold">Doctors</span>
                  </div>
                  <p className="mt-2 text-base font-bold text-foreground">{h.doctorsAvailable}</p>
                  <p className="text-xs text-muted-foreground">on duty</p>
                </div>

                <div className="rounded-xl border-2 bg-background p-3 transition-colors hover:border-chart-4/50">
                  <div className="flex items-center gap-2 text-chart-4">
                    <Ambulance className="size-5" />
                    <span className="font-semibold">OPD Queue</span>
                  </div>
                  <p className="mt-2 text-base font-bold text-foreground">{h.opdQueue}</p>
                  <p className="text-xs text-muted-foreground">waiting</p>
                </div>

                <div className="rounded-xl border-2 bg-background p-3 md:col-span-2 transition-colors hover:border-chart-5/50">
                  <div className="flex items-center gap-2 text-chart-5">
                    <Droplet className="size-5" />
                    <span className="font-semibold">Blood Bank</span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    {Object.entries(h.bloodBank)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join("  •  ")}
                  </p>
                </div>

                <div className="flex items-center justify-center md:justify-end">
                  <a href={gmaps} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md hover:shadow-lg">
                      <Navigation className="mr-2 size-4" />
                      Get Directions
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
