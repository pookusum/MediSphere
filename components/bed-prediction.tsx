"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import {
  TrendingUp,
  MapPin,
  Phone,
  Navigation,
  Activity,
  Stethoscope,
  Ambulance,
  Droplet,
  AlertCircle,
  CalendarCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AppointmentModal } from "./appointment-modal"

type PredictionResult = {
  predictedBeds: number
  topHospitals: Array<{
    rank: number
    name: string
    availableBeds: number
    totalBeds: number
    address?: string
    distance?: string
    phone?: string
    type?: string
    doctorsOnDuty?: number
    opdQueue?: number
    bloodBank?: Record<string, number>
    lastUpdated?: string
  }>
}

export function BedPrediction({
  city,
  type,
  specialization,
  shouldPredict,
}: {
  city: string
  type: string
  specialization: string
  shouldPredict: boolean
}) {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [appointmentModal, setAppointmentModal] = useState<{ open: boolean; hospitalName: string }>({
    open: false,
    hospitalName: "",
  })

  useEffect(() => {
    if (shouldPredict) {
      handlePredict()
    }
  }, [shouldPredict, city, type, specialization])

  async function handlePredict() {
    setLoading(true)
    try {
      const res = await fetch(`/api/predict?city=${city}&type=${type}&specialization=${specialization}`)
      const data = await res.json()
      setPrediction(data)
    } catch (err) {
      console.error("[v0] Prediction error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (!shouldPredict && !prediction) {
    return null
  }

  if (loading) {
    return (
      <Card className="border-2 p-8">
        <div className="flex items-center justify-center gap-3 text-muted-foreground">
          <div className="size-6 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <span className="text-lg font-medium">Analyzing hospital data with AI...</span>
        </div>
      </Card>
    )
  }

  if (!prediction) return null

  return (
    <>
      <Card className="border-2 border-primary/30 bg-gradient-to-br from-card to-primary/5 p-8 shadow-2xl">
        <div className="mb-6 rounded-xl bg-gradient-to-r from-emerald-900/50 via-emerald-800/50 to-emerald-900/50 border-2 border-emerald-600/40 p-5 shadow-lg">
          <div className="flex items-center gap-3 text-emerald-50">
            <TrendingUp className="size-7" />
            <div>
              <p className="text-sm font-medium text-emerald-200">AI Prediction Result</p>
              <p className="text-2xl font-bold">Predicted Available Beds and Hospitals: {prediction.predictedBeds}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-bold">Top 5 Recommended Hospitals in {city} Based on Availability:</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Showing {type} hospitals specializing in {specialization}
          </p>

          <div className="space-y-4">
            {prediction.topHospitals.map((h, idx) => {
              const hasAlert = h.opdQueue && h.opdQueue > 15

              return (
                <Card key={h.rank} className="border-2 p-5 hover:border-primary/50 transition-all hover:shadow-lg">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <h4 className="text-lg font-bold">{h.name}</h4>
                        {hasAlert && (
                          <Badge variant="destructive" className="gap-1">
                            <AlertCircle className="size-3" /> Alert
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                        <span>{city}</span>
                        {h.type && (
                          <>
                            <span>•</span>
                            <span>{h.type}</span>
                          </>
                        )}
                        {h.distance && (
                          <>
                            <span>•</span>
                            <span>{h.distance}</span>
                          </>
                        )}
                      </div>
                      {h.lastUpdated && <p className="text-xs text-muted-foreground mt-1">Updated {h.lastUpdated}</p>}
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 shrink-0">
                      View on Map
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="rounded-lg bg-muted/50 p-3">
                      <div className="flex items-center gap-2 text-chart-3 mb-2">
                        <Activity className="size-4" />
                        <span className="text-sm font-semibold">Beds</span>
                      </div>
                      <p className="text-lg font-bold">
                        {h.availableBeds}{" "}
                        <span className="text-sm font-normal text-muted-foreground">/ {h.totalBeds}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">available</p>
                    </div>

                    {h.doctorsOnDuty !== undefined && (
                      <div className="rounded-lg bg-muted/50 p-3">
                        <div className="flex items-center gap-2 text-primary mb-2">
                          <Stethoscope className="size-4" />
                          <span className="text-sm font-semibold">Doctors</span>
                        </div>
                        <p className="text-lg font-bold">{h.doctorsOnDuty}</p>
                        <p className="text-xs text-muted-foreground">on duty</p>
                      </div>
                    )}

                    {h.opdQueue !== undefined && (
                      <div className="rounded-lg bg-muted/50 p-3">
                        <div className="flex items-center gap-2 text-chart-4 mb-2">
                          <Ambulance className="size-4" />
                          <span className="text-sm font-semibold">OPD Queue</span>
                        </div>
                        <p className="text-lg font-bold">{h.opdQueue}</p>
                        <p className="text-xs text-muted-foreground">waiting</p>
                      </div>
                    )}

                    {h.bloodBank && (
                      <div className="rounded-lg bg-muted/50 p-3 col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 text-chart-5 mb-2">
                          <Droplet className="size-4" />
                          <span className="text-sm font-semibold">Blood Bank</span>
                        </div>
                        <p className="text-xs font-medium">
                          {Object.entries(h.bloodBank)
                            .map(([k, v]) => `${k}:${v}`)
                            .join(" · ")}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-gradient-to-r from-primary to-accent"
                      onClick={() => {
                        const gmaps = h.address
                          ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.address + ", " + city)}`
                          : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name + ", " + city)}`
                        window.open(gmaps, "_blank")
                      }}
                    >
                      <Navigation className="mr-2 size-4" />
                      Get Directions
                    </Button>
                    {h.phone && (
                      <Button variant="outline" onClick={() => window.open(`tel:${h.phone}`, "_self")}>
                        <Phone className="mr-2 size-4" />
                        Call
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                      onClick={() => setAppointmentModal({ open: true, hospitalName: h.name })}
                    >
                      <CalendarCheck className="mr-2 size-4" />
                      Book Appointment
                    </Button>
                  </div>

                  {h.address && (
                    <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
                      <MapPin className="size-3 mt-0.5 shrink-0" />
                      <span>{h.address}</span>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>

          <div className="mt-6 rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
            <p className="font-medium">How to reach these hospitals:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Click "Get Directions" to navigate via Google Maps</li>
              <li>Click "Call" to contact the hospital directly</li>
              <li>Click "Book Appointment" to schedule an appointment at the hospital</li>
              <li>Bed availability and queue information is updated in real-time</li>
              <li>Blood bank inventory shows current units available</li>
            </ul>
          </div>
        </div>
      </Card>

      <AppointmentModal
        open={appointmentModal.open}
        onOpenChange={(open) => setAppointmentModal({ ...appointmentModal, open })}
        hospitalName={appointmentModal.hospitalName}
      />
    </>
  )
}
