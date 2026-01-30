"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Target, Brain, ChevronDown, ChevronUp, Star } from "lucide-react"
import { useState } from "react"

export type FilterValues = {
  city: string
  type: string
  specialization: string
  emergencyLevel: string
  facilities: string[]
  doctorType: string
  insuranceAccepted: boolean
  cashlessFacility: boolean
  minRating: string
  maxDistance: string
  showOnlyAvailable: boolean
  showShortestQueue: boolean
  genderSpecific: string
  language: string
  is24x7: boolean
}

const CITY_OPTIONS = ["Delhi", "Mumbai", "Thane", "Noida", "Gurugram"]
const TYPE_OPTIONS = ["Government", "Private", "Trust"]
const SPECIALIZATION_OPTIONS = ["General", "Orthopedics", "Pediatrics", "Cardiology", "Multi-speciality"]
const EMERGENCY_LEVELS = ["Critical", "Urgent", "Routine"]
const FACILITIES = ["ICU", "Ventilator Support", "Blood Bank", "Operation Theater", "Pharmacy"]
const DOCTOR_TYPES = ["General Physician", "Cardiologist", "Neurologist", "Pediatrician", "Orthopedic", "Gynecologist"]
const RATING_OPTIONS = ["4+ Stars", "3+ Stars", "2+ Stars", "Any"]
const DISTANCE_OPTIONS = ["Within 5 km", "Within 10 km", "Within 20 km", "Any"]
const GENDER_SPECIFIC = ["Any", "Women's Health/Gynecology", "Pediatrics/Children's Hospital"]
const LANGUAGES = ["Any", "Hindi", "English", "Regional Languages"]

export function SearchFilters({
  values,
  onChange,
  onUseMyLocation,
  onApply,
  isApplying = false,
}: {
  values: FilterValues
  onChange: (next: FilterValues) => void
  onUseMyLocation: () => void
  onApply: () => void
  isApplying?: boolean
}) {
  const [manualLocation, setManualLocation] = useState("")
  const [showAdvanced, setShowAdvanced] = useState(false)

  const toggleFacility = (facility: string) => {
    const current = values.facilities || []
    const updated = current.includes(facility) ? current.filter((f) => f !== facility) : [...current, facility]
    onChange({ ...values, facilities: updated })
  }

  return (
    <div className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-card via-background to-primary/5 p-8 shadow-2xl">
      <div className="mb-6 text-center">
        <h2 className="mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-3xl font-bold text-transparent">
          Find Emergency Hospital Care
        </h2>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your requirements below and we'll instantly predict available beds and recommend the best hospitals near
          you
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="grid gap-2">
          <Label htmlFor="city" className="font-semibold text-foreground">
            Select City
          </Label>
          <Select value={values.city} onValueChange={(v) => onChange({ ...values, city: v })}>
            <SelectTrigger id="city" className="h-12 border-2 bg-background shadow-sm">
              <SelectValue placeholder="Choose city" />
            </SelectTrigger>
            <SelectContent>
              {CITY_OPTIONS.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="type" className="font-semibold text-foreground">
            Hospital Type
          </Label>
          <Select value={values.type} onValueChange={(v) => onChange({ ...values, type: v })}>
            <SelectTrigger id="type" className="h-12 border-2 bg-background shadow-sm">
              <SelectValue placeholder="Any type" />
            </SelectTrigger>
            <SelectContent>
              {TYPE_OPTIONS.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="specialization" className="font-semibold text-foreground">
            Specialization
          </Label>
          <Select value={values.specialization} onValueChange={(v) => onChange({ ...values, specialization: v })}>
            <SelectTrigger id="specialization" className="h-12 border-2 bg-background shadow-sm">
              <SelectValue placeholder="Any specialization" />
            </SelectTrigger>
            <SelectContent>
              {SPECIALIZATION_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="emergency" className="font-semibold text-foreground">
            Emergency Level
          </Label>
          <Select value={values.emergencyLevel} onValueChange={(v) => onChange({ ...values, emergencyLevel: v })}>
            <SelectTrigger id="emergency" className="h-12 border-2 bg-background shadow-sm">
              <SelectValue placeholder="Select urgency" />
            </SelectTrigger>
            <SelectContent>
              {EMERGENCY_LEVELS.map((e) => (
                <SelectItem key={e} value={e}>
                  {e}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2 lg:col-span-4 grid gap-2">
          <Label htmlFor="location" className="font-semibold text-foreground">
            Your Location (Optional)
          </Label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="location"
                placeholder="e.g. Thane Railway Station or 19.1863,72.9750"
                className="h-12 border-2 bg-background pl-11 shadow-sm"
                value={manualLocation}
                onChange={(e) => setManualLocation(e.target.value)}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              className="h-12 border-2 bg-background px-6 shadow-sm hover:bg-accent"
              onClick={onUseMyLocation}
            >
              <Target className="mr-2 size-5" />
              Use My Location
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Enter a landmark, address, or coordinates to find hospitals near you
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Button
          type="button"
          variant="outline"
          className="w-full border-2 h-12 font-semibold bg-transparent"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? (
            <>
              <ChevronUp className="mr-2 size-5" />
              Hide Advanced Filters
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 size-5" />
              Show Advanced Filters
            </>
          )}
        </Button>

        {showAdvanced && (
          <div className="mt-6 space-y-6 rounded-xl border-2 border-muted bg-muted/20 p-6">
            <div className="grid gap-3">
              <Label className="font-semibold text-foreground">Facilities Required</Label>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {FACILITIES.map((facility) => (
                  <div key={facility} className="flex items-center gap-2">
                    <Checkbox
                      id={facility}
                      checked={values.facilities?.includes(facility)}
                      onCheckedChange={() => toggleFacility(facility)}
                    />
                    <Label htmlFor={facility} className="cursor-pointer text-sm font-normal">
                      {facility}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="doctor" className="font-semibold text-foreground">
                  Doctor Availability
                </Label>
                <Select value={values.doctorType} onValueChange={(v) => onChange({ ...values, doctorType: v })}>
                  <SelectTrigger id="doctor" className="h-11 border-2 bg-background">
                    <SelectValue placeholder="Any doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {DOCTOR_TYPES.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="rating" className="font-semibold text-foreground">
                  Minimum Rating
                </Label>
                <Select value={values.minRating} onValueChange={(v) => onChange({ ...values, minRating: v })}>
                  <SelectTrigger id="rating" className="h-11 border-2 bg-background">
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {RATING_OPTIONS.map((r) => (
                      <SelectItem key={r} value={r}>
                        <div className="flex items-center gap-1">
                          <Star className="size-3 fill-yellow-500 text-yellow-500" />
                          {r}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="distance" className="font-semibold text-foreground">
                  Maximum Distance
                </Label>
                <Select value={values.maxDistance} onValueChange={(v) => onChange({ ...values, maxDistance: v })}>
                  <SelectTrigger id="distance" className="h-11 border-2 bg-background">
                    <SelectValue placeholder="Any distance" />
                  </SelectTrigger>
                  <SelectContent>
                    {DISTANCE_OPTIONS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="gender" className="font-semibold text-foreground">
                  Gender-Specific Care
                </Label>
                <Select value={values.genderSpecific} onValueChange={(v) => onChange({ ...values, genderSpecific: v })}>
                  <SelectTrigger id="gender" className="h-11 border-2 bg-background">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    {GENDER_SPECIFIC.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="language" className="font-semibold text-foreground">
                  Language Support
                </Label>
                <Select value={values.language} onValueChange={(v) => onChange({ ...values, language: v })}>
                  <SelectTrigger id="language" className="h-11 border-2 bg-background">
                    <SelectValue placeholder="Any language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((l) => (
                      <SelectItem key={l} value={l}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="insurance"
                  checked={values.insuranceAccepted}
                  onCheckedChange={(checked) => onChange({ ...values, insuranceAccepted: checked as boolean })}
                />
                <Label htmlFor="insurance" className="cursor-pointer text-sm font-medium">
                  Insurance Accepted
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="cashless"
                  checked={values.cashlessFacility}
                  onCheckedChange={(checked) => onChange({ ...values, cashlessFacility: checked as boolean })}
                />
                <Label htmlFor="cashless" className="cursor-pointer text-sm font-medium">
                  Cashless Facility Available
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="available"
                  checked={values.showOnlyAvailable}
                  onCheckedChange={(checked) => onChange({ ...values, showOnlyAvailable: checked as boolean })}
                />
                <Label htmlFor="available" className="cursor-pointer text-sm font-medium">
                  Show Only Available Beds
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="queue"
                  checked={values.showShortestQueue}
                  onCheckedChange={(checked) => onChange({ ...values, showShortestQueue: checked as boolean })}
                />
                <Label htmlFor="queue" className="cursor-pointer text-sm font-medium">
                  Shortest OPD Queue
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="24x7"
                  checked={values.is24x7}
                  onCheckedChange={(checked) => onChange({ ...values, is24x7: checked as boolean })}
                />
                <Label htmlFor="24x7" className="cursor-pointer text-sm font-medium">
                  24x7 Availability Only
                </Label>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          className="h-14 w-full max-w-md bg-gradient-to-r from-destructive via-destructive/90 to-destructive text-lg font-bold text-destructive-foreground shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all md:w-auto md:px-12"
          onClick={onApply}
          disabled={isApplying}
          size="lg"
        >
          <Brain className="mr-3 size-6" />
          {isApplying ? "Searching..." : "Search & Predict Available Beds"}
        </Button>
      </div>
    </div>
  )
}
