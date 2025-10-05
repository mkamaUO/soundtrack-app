"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ChevronRight, Loader2 } from "lucide-react"

const questions = [
  "You want to lock-in on your homework.",
  "You got back your exam mark and it was lower than expected.",
  "You're hitting the gym.",
  "You just wrapped up a stressful job interview.",
  "You just received a job offer from a company you really like.",
]

export default function QuestionnairePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const totalSteps = 5

  const handleComplete = async () => {
    setIsSubmitting(true)
    try {
      // Format the answers as qa_pairs
      const qa_pairs = questions.map((question, index) => ({
        question,
        answer: answers[index + 1] || "",
      }))

      const response = await fetch("https://htv2025-production.up.railway.app/api/questionnaire/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qa_pairs }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit questionnaire")
      }

      // Redirect to playlist page on success
      router.push("/playlist")
    } catch (error) {
      console.error("Error submitting questionnaire:", error)
      alert("Failed to submit questionnaire. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-20 pb-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Calibration</h1>
            <p className="text-muted-foreground">Imagine you are in the following scenario. What kind of music would you want to listen to?</p>
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
                  <Label className="text-base font-semibold mb-4 block">You want to lock-in on your homework.</Label>
                  <RadioGroup value={answers[1]} onValueChange={(value) => setAnswers({ ...answers, 1: value })}>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="lofi" id="lofi" />
                      <Label htmlFor="lofi" className="flex-1 cursor-pointer">
                        🎧 Lo-fi beats or instrumental chillhop
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="classical" id="classical" />
                      <Label htmlFor="classical" className="flex-1 cursor-pointer">
                        🎻 Classical or piano music
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="ambient" id="ambient" />
                      <Label htmlFor="ambient" className="flex-1 cursor-pointer">
                        🎶 Ambient or focus-enhancing electronic
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="silence" id="silence" />
                      <Label htmlFor="silence" className="flex-1 cursor-pointer">
                        🔇 Silence or white noise (no music)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-4 block">You got back your exam mark and it was lower than expected.</Label>
                  <RadioGroup value={answers[2]} onValueChange={(value) => setAnswers({ ...answers, 2: value })}>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="sad" id="sad" />
                      <Label htmlFor="sad" className="flex-1 cursor-pointer">
                        😔 Sad indie or acoustic to match the mood
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="emo" id="emo" />
                      <Label htmlFor="emo" className="flex-1 cursor-pointer">
                        🎸 Emo rock or alternative to let it all out
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="motivational" id="motivational" />
                      <Label htmlFor="motivational" className="flex-1 cursor-pointer">
                        🎵 Motivational pop to pick yourself back up
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="calming" id="calming" />
                      <Label htmlFor="calming" className="flex-1 cursor-pointer">
                        🧘♂️ Calming or meditative music to decompress
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-4 block">You're hitting the gym.</Label>
                  <RadioGroup value={answers[3]} onValueChange={(value) => setAnswers({ ...answers, 3: value })}>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="hiphop" id="hiphop" />
                      <Label htmlFor="hiphop" className="flex-1 cursor-pointer">
                        💪 High-energy hip-hop or rap
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="edm" id="edm" />
                      <Label htmlFor="edm" className="flex-1 cursor-pointer">
                        ⚡ EDM or techno with a heavy beat
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="rock" id="rock" />
                      <Label htmlFor="rock" className="flex-1 cursor-pointer">
                        🎸 Rock or metal to get pumped
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="pop" id="pop" />
                      <Label htmlFor="pop" className="flex-1 cursor-pointer">
                        🎧 Upbeat pop or dance anthems
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-4 block">You just wrapped up a stressful job interview.</Label>
                  <RadioGroup value={answers[4]} onValueChange={(value) => setAnswers({ ...answers, 4: value })}>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="chillhop" id="chillhop" />
                      <Label htmlFor="chillhop" className="flex-1 cursor-pointer">
                        🌿 Chillhop or jazz to wind down
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="ambient-relax" id="ambient-relax" />
                      <Label htmlFor="ambient-relax" className="flex-1 cursor-pointer">
                        🧘♀️ Ambient or lo-fi to decompress
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="soft-pop" id="soft-pop" />
                      <Label htmlFor="soft-pop" className="flex-1 cursor-pointer">
                        🎶 Soft pop or indie to relax
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="quiet" id="quiet" />
                      <Label htmlFor="quiet" className="flex-1 cursor-pointer">
                        🔉 Quiet sounds to reflect
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-4 block">You just received a job offer from a company you really like.</Label>
                  <RadioGroup value={answers[5]} onValueChange={(value) => setAnswers({ ...answers, 5: value })}>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="upbeat" id="upbeat" />
                      <Label htmlFor="upbeat" className="flex-1 cursor-pointer">
                        🎉 Upbeat pop or party anthems
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="throwback" id="throwback" />
                      <Label htmlFor="throwback" className="flex-1 cursor-pointer">
                        🕺 Throwback hits that make you dance
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="happy-indie" id="happy-indie" />
                      <Label htmlFor="happy-indie" className="flex-1 cursor-pointer">
                        🎶 Happy indie or feel-good folk
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                      <RadioGroupItem value="intense" id="intense" />
                      <Label htmlFor="intense" className="flex-1 cursor-pointer">
                        🎧 Intense music as if you're preparing for a challenge
                      </Label>
                    </div>
                  </RadioGroup>
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
                  } else {
                    handleComplete()
                  }
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    {step === totalSteps ? "Complete" : "Next"}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
