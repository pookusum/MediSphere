"use client"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Hospital } from "@/components/hospital-list"
import Link from "next/link"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function Dashboard() {
  const { data, mutate } = useSWR<{ hospitals: Hospital[] }>("/api/hospitals", fetcher)
  const [selected, setSelected] = useState<Hospital | null>(null)

  useEffect(() => {
    if (data?.hospitals?.[0] && !selected) setSelected(data.hospitals[0])
  }, [data, selected])

  async function save() {
    if (!selected) return
    await fetch("/api/hospitals", { method: "PUT", body: JSON.stringify({ hospital: selected }) })
    await mutate()
    alert("Updated! Public map will reflect changes shortly.")
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Hospital Dashboard</h1>
        <Link href="/" className="text-sm text-primary underline">
          ← Back to site
        </Link>
      </div>

      <Card className="p-5">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="md:col-span-1">
            <h3 className="mb-2 font-medium">Select Hospital</h3>
            <div className="grid gap-2">
              {data?.hospitals?.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setSelected({ ...h })}
                  className={`rounded border p-2 text-left text-sm ${selected?.id === h.id ? "border-primary" : ""}`}
                >
                  {h.name}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            {selected ? (
              <div className="grid gap-3">
                <h3 className="font-medium">Edit Availability</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Total Beds</Label>
                    <Input
                      type="number"
                      value={selected.bedsTotal}
                      onChange={(e) => setSelected({ ...selected, bedsTotal: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Occupied Beds</Label>
                    <Input
                      type="number"
                      value={selected.bedsOccupied}
                      onChange={(e) => setSelected({ ...selected, bedsOccupied: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>OPD Queue</Label>
                    <Input
                      type="number"
                      value={selected.opdQueue}
                      onChange={(e) => setSelected({ ...selected, opdQueue: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Doctors on Duty</Label>
                    <Input
                      type="number"
                      value={selected.doctorsAvailable}
                      onChange={(e) => setSelected({ ...selected, doctorsAvailable: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <Button onClick={save} className="bg-primary text-primary-foreground hover:opacity-90 w-fit">
                  Save Changes
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Select a hospital to edit.</p>
            )}
          </div>
        </div>
      </Card>
      <p className="mt-3 text-xs text-muted-foreground">
        Demo only: Data updates an in-memory store for preview. Connect a real database for production (e.g.,
        Supabase/MongoDB).
      </p>
    </main>
  )
}
