"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2 } from "lucide-react"

type AppointmentModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  hospitalName: string
}

export function AppointmentModal({ open, onOpenChange, hospitalName }: AppointmentModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    department: "",
    reason: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate appointment booking
    setTimeout(() => {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        onOpenChange(false)
        setFormData({
          name: "",
          phone: "",
          email: "",
          date: "",
          time: "",
          department: "",
          reason: "",
        })
      }, 2000)
    }, 800)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Book Online Appointment</DialogTitle>
          <DialogDescription className="text-base">
            Schedule your appointment at <span className="font-semibold text-foreground">{hospitalName}</span>
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-emerald-100 p-4">
              <CheckCircle2 className="size-16 text-emerald-600" />
            </div>
            <h3 className="mb-2 text-2xl font-bold text-emerald-600">Appointment Confirmed!</h3>
            <p className="text-muted-foreground">
              Your appointment has been successfully booked. You will receive a confirmation message shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name" className="flex items-center gap-2 font-semibold">
                  <User className="size-4" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-11"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone" className="flex items-center gap-2 font-semibold">
                  <Phone className="size-4" />
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-11"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="flex items-center gap-2 font-semibold">
                  <Mail className="size-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-11"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="department" className="flex items-center gap-2 font-semibold">
                  <FileText className="size-4" />
                  Department *
                </Label>
                <Select value={formData.department} onValueChange={(v) => setFormData({ ...formData, department: v })}>
                  <SelectTrigger id="department" className="h-11">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Medicine</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="gynecology">Gynecology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="date" className="flex items-center gap-2 font-semibold">
                  <Calendar className="size-4" />
                  Preferred Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="h-11"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="time" className="flex items-center gap-2 font-semibold">
                  <Clock className="size-4" />
                  Preferred Time *
                </Label>
                <Select value={formData.time} onValueChange={(v) => setFormData({ ...formData, time: v })}>
                  <SelectTrigger id="time" className="h-11">
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">09:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="14:00">02:00 PM</SelectItem>
                    <SelectItem value="15:00">03:00 PM</SelectItem>
                    <SelectItem value="16:00">04:00 PM</SelectItem>
                    <SelectItem value="17:00">05:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="reason" className="font-semibold">
                Reason for Visit (Optional)
              </Label>
              <Textarea
                id="reason"
                placeholder="Briefly describe your symptoms or reason for appointment..."
                rows={4}
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="resize-none"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-accent">
                Confirm Appointment
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
