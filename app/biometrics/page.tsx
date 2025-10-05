"use client"

import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Activity, Heart, Brain, Zap, Loader2, AlertCircle } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useBiometricData } from "@/hooks/use-biometric-data"

const eegData = [
  { time: "6:00", alpha: 8.2, beta: 15.3, theta: 5.1, delta: 2.3 },
  { time: "7:00", alpha: 9.1, beta: 16.2, theta: 4.8, delta: 2.1 },
  { time: "8:00", alpha: 10.5, beta: 18.1, theta: 4.2, delta: 1.9 },
  { time: "9:00", alpha: 11.2, beta: 20.5, theta: 3.8, delta: 1.7 },
  { time: "10:00", alpha: 10.8, beta: 19.8, theta: 4.0, delta: 1.8 },
  { time: "11:00", alpha: 9.5, beta: 17.2, theta: 4.5, delta: 2.0 },
  { time: "12:00", alpha: 8.8, beta: 15.8, theta: 5.0, delta: 2.2 },
  { time: "13:00", alpha: 9.2, beta: 16.5, theta: 4.7, delta: 2.1 },
  { time: "14:00", alpha: 10.1, beta: 18.9, theta: 4.1, delta: 1.9 },
  { time: "15:00", alpha: 11.0, beta: 20.2, theta: 3.9, delta: 1.8 },
  { time: "16:00", alpha: 10.3, beta: 18.5, theta: 4.3, delta: 1.9 },
  { time: "17:00", alpha: 9.0, beta: 16.0, theta: 4.8, delta: 2.1 },
  { time: "18:00", alpha: 8.5, beta: 14.5, theta: 5.2, delta: 2.3 },
  { time: "19:00", alpha: 7.8, beta: 13.2, theta: 5.5, delta: 2.5 },
  { time: "20:00", alpha: 7.2, beta: 12.0, theta: 5.8, delta: 2.7 },
  { time: "21:00", alpha: 6.5, beta: 10.5, theta: 6.2, delta: 3.0 },
]

const ecgData = [
  { time: "6:00", bpm: 65, hrv: 45 },
  { time: "7:00", bpm: 72, hrv: 42 },
  { time: "8:00", bpm: 68, hrv: 48 },
  { time: "9:00", bpm: 70, hrv: 46 },
  { time: "10:00", bpm: 75, hrv: 40 },
  { time: "11:00", bpm: 73, hrv: 43 },
  { time: "12:00", bpm: 68, hrv: 47 },
  { time: "13:00", bpm: 71, hrv: 45 },
  { time: "14:00", bpm: 76, hrv: 39 },
  { time: "15:00", bpm: 74, hrv: 41 },
  { time: "16:00", bpm: 72, hrv: 44 },
  { time: "17:00", bpm: 69, hrv: 46 },
  { time: "18:00", bpm: 66, hrv: 49 },
  { time: "19:00", bpm: 64, hrv: 51 },
  { time: "20:00", bpm: 62, hrv: 53 },
  { time: "21:00", bpm: 60, hrv: 55 },
]

const focusData = [
  { time: "6:00", focus: 45 },
  { time: "7:00", focus: 52 },
  { time: "8:00", focus: 65 },
  { time: "9:00", focus: 78 },
  { time: "10:00", focus: 82 },
  { time: "11:00", focus: 75 },
  { time: "12:00", focus: 60 },
  { time: "13:00", focus: 55 },
  { time: "14:00", focus: 70 },
  { time: "15:00", focus: 80 },
  { time: "16:00", focus: 72 },
  { time: "17:00", focus: 58 },
  { time: "18:00", focus: 45 },
  { time: "19:00", focus: 38 },
  { time: "20:00", focus: 30 },
  { time: "21:00", focus: 25 },
]

const happinessData = [
  { time: "6:00", happiness: 60 },
  { time: "7:00", happiness: 65 },
  { time: "8:00", happiness: 70 },
  { time: "9:00", happiness: 75 },
  { time: "10:00", happiness: 72 },
  { time: "11:00", happiness: 68 },
  { time: "12:00", happiness: 78 },
  { time: "13:00", happiness: 74 },
  { time: "14:00", happiness: 70 },
  { time: "15:00", happiness: 82 },
  { time: "16:00", happiness: 80 },
  { time: "17:00", happiness: 75 },
  { time: "18:00", happiness: 85 },
  { time: "19:00", happiness: 88 },
  { time: "20:00", happiness: 90 },
  { time: "21:00", happiness: 92 },
]

export default function BiometricsPage() {
  const { data, loading, error } = useBiometricData()

  // Use API data if available, otherwise fall back to mock data
  const currentEegData = data?.eegData || eegData
  const currentEcgData = data?.ecgData || ecgData
  const currentFocusData = data?.focusData || focusData
  const currentHappinessData = data?.happinessData || happinessData
  const currentChannelVoltageData = data?.channelVoltageData || []

  const avgHeartRate = Math.round(currentEcgData.reduce((sum, d) => sum + d.bpm, 0) / currentEcgData.length)
  const maxHeartRate = Math.max(...currentEcgData.map((d) => d.bpm))
  const minHeartRate = Math.min(...currentEcgData.map((d) => d.bpm))

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-20 pb-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-muted-foreground">Loading biometric data...</span>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-20 pb-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-6 h-6" />
              <span>Error loading biometric data: {error}</span>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-20 pb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Biometrics</h1>
          <p className="text-muted-foreground">Your health data throughout the day</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">ECG - Heart Rate</h2>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Avg</div>
                <div className="text-lg font-bold text-foreground">{avgHeartRate}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Max</div>
                <div className="text-lg font-bold text-foreground">{maxHeartRate}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Min</div>
                <div className="text-lg font-bold text-foreground">{minHeartRate}</div>
              </div>
            </div>

            <ChartContainer
              config={{
                bpm: {
                  label: "BPM",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentEcgData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[50, 85]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="bpm" stroke="var(--color-bpm)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-secondary" />
              <h2 className="text-xl font-semibold text-foreground">EEG - Brain Waves</h2>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Alpha</div>
                <div className="text-sm font-bold text-blue-400">8-13 Hz</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Beta</div>
                <div className="text-sm font-bold text-green-400">13-30 Hz</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Theta</div>
                <div className="text-sm font-bold text-yellow-400">4-8 Hz</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Delta</div>
                <div className="text-sm font-bold text-red-400">0.5-4 Hz</div>
              </div>
            </div>

            <ChartContainer
              config={{
                alpha: { label: "Alpha", color: "rgb(96, 165, 250)" },
                beta: { label: "Beta", color: "rgb(74, 222, 128)" },
                theta: { label: "Theta", color: "rgb(250, 204, 21)" },
                delta: { label: "Delta", color: "rgb(248, 113, 113)" },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentEegData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="alpha" stroke="var(--color-alpha)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="beta" stroke="var(--color-beta)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="theta" stroke="var(--color-theta)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="delta" stroke="var(--color-delta)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-semibold text-foreground">EEG - Channel Voltages</h2>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="text-center">
                <div className="text-xs text-muted-foreground">O1</div>
                <div className="text-sm font-bold text-blue-400">Voltage</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">O2</div>
                <div className="text-sm font-bold text-green-400">Voltage</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">T3</div>
                <div className="text-sm font-bold text-yellow-400">Voltage</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">T4</div>
                <div className="text-sm font-bold text-red-400">Voltage</div>
              </div>
            </div>

            <ChartContainer
              config={{
                channel_0: { label: "O1", color: "rgb(96, 165, 250)" },
                channel_1: { label: "O2", color: "rgb(74, 222, 128)" },
                channel_2: { label: "T3", color: "rgb(250, 204, 21)" },
                channel_3: { label: "T4", color: "rgb(248, 113, 113)" },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentChannelVoltageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="channel_0" stroke="var(--color-channel_0)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="channel_1" stroke="var(--color-channel_1)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="channel_2" stroke="var(--color-channel_2)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="channel_3" stroke="var(--color-channel_3)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h2 className="text-xl font-semibold text-foreground">Focus Level</h2>
            </div>

            <ChartContainer
              config={{
                focus: {
                  label: "Focus",
                  color: "rgb(250, 204, 21)",
                },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentFocusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="focus"
                    stroke="var(--color-focus)"
                    strokeWidth={3}
                    dot={{ fill: "var(--color-focus)", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-green-400" />
              <h2 className="text-xl font-semibold text-foreground">Happiness Level</h2>
            </div>

            <ChartContainer
              config={{
                happiness: {
                  label: "Happiness",
                  color: "rgb(74, 222, 128)",
                },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentHappinessData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="happiness"
                    stroke="var(--color-happiness)"
                    strokeWidth={3}
                    dot={{ fill: "var(--color-happiness)", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Card>
        </div>
      </main>
    </div>
  )
}
