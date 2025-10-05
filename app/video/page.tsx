"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Download, X, Loader2, Trash2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ImageItem {
  id: string
  url: string
  timestamp: string
}

const sampleImages: ImageItem[] = [
  { id: "1", url: "/video-thumb-morning.jpg", timestamp: "6:00 AM" },
  { id: "2", url: "/video-thumb-afternoon.jpg", timestamp: "7:30 AM" },
  { id: "3", url: "/captured-moment-.jpg", timestamp: "9:15 AM" },
  { id: "4", url: "/video-thumb-evening.jpg", timestamp: "11:00 AM" },
  { id: "5", url: "/video-thumb-today.jpg", timestamp: "12:30 PM" },
  { id: "6", url: "/calm-music-album.jpg", timestamp: "2:00 PM" },
  { id: "7", url: "/classical-piano-album.jpg", timestamp: "3:45 PM" },
  { id: "8", url: "/electronic-chill-album.jpg", timestamp: "5:00 PM" },
  { id: "9", url: "/sunset-music-album.jpg", timestamp: "6:30 PM" },
  { id: "10", url: "/piano-peaceful-album.jpg", timestamp: "8:00 PM" },
]

type GenerationState = "idle" | "generating" | "complete"

export default function VideoPage() {
  const [timelineImages, setTimelineImages] = useState<ImageItem[]>(sampleImages)
  const [generationState, setGenerationState] = useState<GenerationState>("idle")
  const [progress, setProgress] = useState(0)
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null)
  const [previousVideos, setPreviousVideos] = useState<Array<{ id: string; url: string; date: string }>>([])
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set())
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const removeFromTimeline = (id: string) => {
    setTimelineImages((prev) => prev.filter((img) => img.id !== id))
    setSelectedImages((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const toggleSelection = (id: string) => {
    setSelectedImages((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const deleteSelected = () => {
    setTimelineImages((prev) => prev.filter((img) => !selectedImages.has(img.id)))
    setSelectedImages(new Set())
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newImages = [...timelineImages]
    const draggedImage = newImages[draggedIndex]
    newImages.splice(draggedIndex, 1)
    newImages.splice(index, 0, draggedImage)

    setTimelineImages(newImages)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const generateVideo = () => {
    setGenerationState("generating")
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setGenerationState("complete")
          setGeneratedVideoUrl("/video-thumb-today.jpg")
          setPreviousVideos((prev) => [
            { id: Date.now().toString(), url: "/video-thumb-today.jpg", date: new Date().toLocaleDateString() },
            ...prev,
          ])
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  const resetVideo = () => {
    setGenerationState("idle")
    setProgress(0)
    setGeneratedVideoUrl(null)
    setTimelineImages(sampleImages)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 flex flex-col pt-14">
        {generationState === "generating" && (
          <div className="flex-1 flex items-center justify-center p-8">
            <Card className="p-12 bg-card border-border max-w-md w-full">
              <div className="text-center">
                <Loader2 className="w-20 h-20 text-primary animate-spin mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-foreground mb-3">Generating Video</h2>
                <p className="text-muted-foreground mb-8">Processing your SoundTrack...</p>
                <Progress value={progress} className="mb-3 h-3" />
                <p className="text-lg font-semibold text-primary">{progress}%</p>
              </div>
            </Card>
          </div>
        )}

        {generationState === "complete" && generatedVideoUrl && (
          <div className="flex-1 p-8">
            <div className="max-w-5xl mx-auto">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-4xl font-bold text-foreground">Video Ready</h2>
                <div className="flex gap-3">
                  <Button onClick={resetVideo} variant="outline" size="lg">
                    Create New
                  </Button>
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Download className="w-5 h-5 mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              <Card className="p-6 bg-card border-border mb-12">
                <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                  <img
                    src={generatedVideoUrl || "/placeholder.svg"}
                    alt="Generated video"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="lg" className="rounded-full w-20 h-20 bg-primary hover:bg-primary/90">
                      <Play className="w-10 h-10" />
                    </Button>
                  </div>
                </div>
              </Card>

              {previousVideos.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">Previous Videos</h3>
                  <div className="grid grid-cols-3 gap-6">
                    {previousVideos.map((video) => (
                      <Card
                        key={video.id}
                        className="p-4 bg-card border-border group cursor-pointer hover:border-primary transition-colors"
                      >
                        <div className="aspect-video bg-black rounded-lg overflow-hidden mb-3 relative">
                          <img
                            src={video.url || "/placeholder.svg"}
                            alt="Previous video"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Play className="w-12 h-12 text-white" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{video.date}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {generationState === "idle" && (
          <>
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                  <h2 className="text-4xl font-bold text-foreground mb-2">Video Playground</h2>
                  <p className="text-muted-foreground text-lg">Remove any images you don't want in your video</p>
                </div>

                <div className="grid grid-cols-5 gap-6">
                  {timelineImages.map((image) => (
                    <div
                      key={image.id}
                      className="relative aspect-square rounded-lg overflow-hidden border-2 border-border hover:border-primary transition-colors group"
                    >
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.timestamp}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeFromTimeline(image.id)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:scale-110"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                        <p className="text-sm font-medium text-white">{image.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t-2 border-border bg-card">
              <div className="container mx-auto px-8 py-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Timeline</h2>
                    <p className="text-sm text-muted-foreground">
                      {timelineImages.length} {timelineImages.length === 1 ? "image" : "images"} total
                      {selectedImages.size > 0 && ` • ${selectedImages.size} selected`}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    {selectedImages.size > 0 && (
                      <Button
                        onClick={deleteSelected}
                        variant="destructive"
                        size="lg"
                      >
                        <Trash2 className="w-5 h-5 mr-2" />
                        Delete Selected
                      </Button>
                    )}
                    <Button
                      onClick={generateVideo}
                      disabled={timelineImages.length === 0}
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Generate Video
                    </Button>
                  </div>
                </div>

                <div className="relative bg-muted/50 rounded-lg p-4 overflow-x-auto min-h-[120px] border border-border">
                  {timelineImages.length === 0 ? (
                    <div className="flex items-center justify-center h-24 text-muted-foreground">
                      All images removed. Add some back to generate a video.
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      {timelineImages.map((image, index) => {
                        const isSelected = selectedImages.has(image.id)
                        return (
                          <div
                            key={`${image.id}-${index}`}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDragEnd={handleDragEnd}
                            onClick={() => toggleSelection(image.id)}
                            className={`relative h-24 w-36 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer select-none ${
                              isSelected
                                ? "border-primary shadow-lg shadow-primary/30 scale-105"
                                : "border-primary/50 hover:border-primary"
                            } ${draggedIndex === index ? "opacity-50" : ""}`}
                          >
                            <img
                              src={image.url || "/placeholder.svg"}
                              alt={image.timestamp}
                              className="w-full h-full object-cover pointer-events-none"
                              draggable={false}
                            />
                            {isSelected && (
                              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                  <svg
                                    className="w-4 h-4 text-white"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path d="M5 13l4 4L19 7"></path>
                                  </svg>
                                </div>
                              </div>
                            )}
                            <div className="absolute bottom-2 left-2 right-2">
                              <div className="text-xs font-semibold text-white bg-black/70 px-2 py-1 rounded">
                                {image.timestamp}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
