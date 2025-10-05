"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Music, Download, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const timelineData = [
  {
    time: "6:00 AM",
    hour: 6,
    title: "Morning Routine",
    mood: "Energized",
    songs: ["Sunrise Melody", "Morning Coffee Jazz"],
    summary: "Started the day with a refreshing walk and meditation session.",
    image: "/video-thumb-morning.jpg",
  },
  {
    time: "9:00 AM",
    hour: 9,
    title: "Work Focus",
    mood: "Focused",
    songs: ["Deep Work", "Concentration Flow"],
    summary: "High productivity session with deep focus on project tasks.",
    image: "/video-thumb-afternoon.jpg",
  },
  {
    time: "12:00 PM",
    hour: 12,
    title: "Lunch Break",
    mood: "Relaxed",
    songs: ["Midday Chill", "Peaceful Pause"],
    summary: "Enjoyed a healthy lunch and short walk outside.",
    image: "/captured-moment-.jpg",
  },
  {
    time: "3:00 PM",
    hour: 15,
    title: "Afternoon Session",
    mood: "Motivated",
    songs: ["Afternoon Energy", "Creative Boost"],
    summary: "Collaborative meetings and creative brainstorming.",
    image: "/video-thumb-afternoon.jpg",
  },
  {
    time: "6:00 PM",
    hour: 18,
    title: "Evening Wind Down",
    mood: "Calm",
    songs: ["Sunset Vibes", "Evening Reflection"],
    summary: "Wrapped up work and transitioned to personal time.",
    image: "/video-thumb-evening.jpg",
  },
  {
    time: "9:00 PM",
    hour: 21,
    title: "Night Routine",
    mood: "Peaceful",
    songs: ["Night Meditation", "Sleep Preparation"],
    summary: "Relaxing evening with reading and light stretching.",
    image: "/video-thumb-today.jpg",
  },
]

const timeOptions = Array.from({ length: 24 }, (_, i) => ({
  value: i.toString(),
  label: `${i.toString().padStart(2, "0")}:00`,
}))

export default function TimelinePage() {
  const [startTime, setStartTime] = useState("6")
  const [endTime, setEndTime] = useState("21")

  const filteredData = timelineData.filter((item) => {
    const startHour = Number.parseInt(startTime)
    const endHour = Number.parseInt(endTime)
    return item.hour >= startHour && item.hour <= endHour
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-20 pb-12">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-5xl font-bold text-foreground mb-3">Timeline</h1>
            <p className="text-muted-foreground text-lg">Your day in music and moments</p>
          </div>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Download className="w-5 h-5 mr-2" />
            Export
          </Button>
        </div>

        <Card className="p-6 bg-card border-border mb-12">
          <div className="flex items-end gap-6">
            <div className="flex-1">
              <Label htmlFor="start-time" className="text-sm mb-3 block font-semibold">
                Start Time
              </Label>
              <Select value={startTime} onValueChange={setStartTime}>
                <SelectTrigger id="start-time" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="end-time" className="text-sm mb-3 block font-semibold">
                End Time
              </Label>
              <Select value={endTime} onValueChange={setEndTime}>
                <SelectTrigger id="end-time" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="lg">
              <Calendar className="w-5 h-5 mr-2" />
              Today
            </Button>
          </div>
        </Card>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary/30 -translate-x-1/2" />

          <div className="space-y-16">
            {filteredData.map((item, index) => {
              const isLeft = index % 2 === 0

              return (
                <div key={index} className="relative">
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center z-10">
                    <div className="w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/50" />
                    <span className="text-base font-bold text-foreground mt-3 bg-card px-4 py-2 rounded-lg border border-border">
                      {item.time}
                    </span>
                  </div>

                  <div className={`flex ${isLeft ? "justify-start pr-[56%]" : "justify-end pl-[56%]"}`}>
                    <Card className="p-6 bg-card border-border w-full hover:border-primary/50 transition-colors">
                      <div className="flex gap-5">
                        <div className="w-28 h-28 rounded-lg overflow-hidden flex-shrink-0 border-2 border-primary/20">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-bold text-xl text-foreground mb-2">{item.title}</h3>
                              <span className="text-sm px-3 py-1 rounded-full bg-secondary/20 text-secondary font-semibold inline-block">
                                {item.mood}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.summary}</p>
                          <div className="flex items-center gap-3 text-sm">
                            <Music className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-foreground font-medium">{item.songs.join(" • ")}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
