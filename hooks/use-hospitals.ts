"use client"

import useSWR from "swr"
import type { Hospital } from "@/components/hospital-list"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export type Query = {
  city?: string
  type?: string
  specialization?: string
  lat?: number
  lng?: number
  radiusKm?: number
}

export function buildHospitalsUrl(q: Query) {
  const u = new URL("/api/hospitals", window.location.origin)
  if (q.city) u.searchParams.set("city", q.city)
  if (q.type) u.searchParams.set("type", q.type)
  if (q.specialization) u.searchParams.set("specialization", q.specialization)
  if (typeof q.lat === "number" && typeof q.lng === "number") {
    u.searchParams.set("lat", String(q.lat))
    u.searchParams.set("lng", String(q.lng))
  }
  if (typeof q.radiusKm === "number") u.searchParams.set("radiusKm", String(q.radiusKm))
  return u.toString()
}

export function useHospitals(q: Query) {
  const url = typeof window !== "undefined" ? buildHospitalsUrl(q) : null
  const { data, error, isLoading, mutate } = useSWR<{ hospitals: Hospital[] }>(url, fetcher, {
    refreshInterval: 15000,
  })
  return { hospitals: data?.hospitals ?? [], error, isLoading, mutate }
}
