"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Pause, Heart, MoreVertical } from "lucide-react"

const songs = [
  {
    id: 1,
    title: "Peaceful Morning",
    artist: "Ambient Collective",
    duration: "3:45",
    mood: "Calm",
    image: "/calm-music-album.jpg",
  },
  {
    id: 2,
    title: "Focus Flow",
    artist: "Study Beats",
    duration: "4:12",
    mood: "Focused",
    image: "/classical-piano-album.jpg",
  },
  {
    id: 3,
    title: "Evening Unwind",
    artist: "Chill Vibes",
    duration: "3:28",
    mood: "Relaxed",
    image: "/electronic-chill-album.jpg",
  },
  {
    id: 4,
    title: "Sunset Dreams",
    artist: "Lo-Fi Collective",
    duration: "4:01",
    mood: "Peaceful",
    image: "/sunset-music-album.jpg",
  },
  {
    id: 5,
    title: "Night Reflection",
    artist: "Piano Serenity",
    duration: "5:15",
    mood: "Contemplative",
    image: "/piano-peaceful-album.jpg",
  },
]

export default function PlaylistPage() {
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [likedSongs, setLikedSongs] = useState<Set<number>>(new Set())

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-20 pb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Playlist</h1>
          <p className="text-muted-foreground">Songs matched to your mood and activities</p>
        </div>

        <div className="space-y-2">
          {songs.map((song) => (
            <Card key={song.id} className="p-4 bg-card border-border hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={song.image || "/placeholder.svg"} alt={song.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{song.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{song.mood}</span>
                  <span className="text-sm text-muted-foreground tabular-nums">{song.duration}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      setLikedSongs((prev) => {
                        const next = new Set(prev)
                        if (next.has(song.id)) {
                          next.delete(song.id)
                        } else {
                          next.add(song.id)
                        }
                        return next
                      })
                    }
                  >
                    <Heart className={`w-4 h-4 ${likedSongs.has(song.id) ? "fill-primary text-primary" : ""}`} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setPlayingId(playingId === song.id ? null : song.id)}
                  >
                    {playingId === song.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button size="sm" variant="ghost">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
