"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ChevronRight } from "lucide-react"

export default function QuestionnairePage() {
  const [step, setStep] = useState(1)
  const totalSteps = 4

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-20 pb-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Daily Check-In</h1>
            <p className="text-muted-foreground">Help us understand your day</p>
            <div className="flex gap-2 mt-4">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full ${i < step ? "bg-primary" : "bg-muted"}`} />
              ))}
            </div>
          </div>

          <Card className="p-6 bg-card border-border">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-4 block">How are you feeling today?</Label>
                  <RadioGroup defaultValue="good">
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="great" id="great" />
                      <Label htmlFor="great" className="flex-1 cursor-pointer">
                        Great - Full of energy
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="good" id="good" />
                      <Label htmlFor="good" className="flex-1 cursor-pointer">
                        Good - Feeling positive
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="okay" id="okay" />
                      <Label htmlFor="okay" className="flex-1 cursor-pointer">
                        Okay - Neutral
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="tired" id="tired" />
                      <Label htmlFor="tired" className="flex-1 cursor-pointer">
                        Tired - Low energy
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="stressed" id="stressed" />
                      <Label htmlFor="stressed" className="flex-1 cursor-pointer">
                        Stressed - Overwhelmed
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-4 block">What activities did you do today?</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Work", "Exercise", "Social", "Creative", "Rest", "Learning", "Outdoor", "Other"].map(
                      (activity) => (
                        <Button key={activity} variant="outline" className="justify-start h-auto py-3 bg-transparent">
                          {activity}
                        </Button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="sleep" className="text-base font-semibold mb-4 block">
                    How many hours did you sleep?
                  </Label>
                  <Input id="sleep" type="number" placeholder="8" min="0" max="24" className="text-lg" />
                </div>
                <div>
                  <Label htmlFor="water" className="text-base font-semibold mb-4 block">
                    Glasses of water consumed
                  </Label>
                  <Input id="water" type="number" placeholder="8" min="0" className="text-lg" />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="notes" className="text-base font-semibold mb-4 block">
                    Any additional notes about your day?
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Share anything else about your day..."
                    className="min-h-32 resize-none"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              )}
              <Button
                className="ml-auto"
                onClick={() => {
                  if (step < totalSteps) {
                    setStep(step + 1)
                  }
                }}
              >
                {step === totalSteps ? "Complete" : "Next"}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
