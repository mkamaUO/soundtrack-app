"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ClipboardList, Film, Music, Clock, Activity, Home } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/questionnaire", label: "Questionnaire", icon: ClipboardList },
  { href: "/video", label: "Video Playground", icon: Film },
  { href: "/playlist", label: "Playlist", icon: Music },
  { href: "/timeline", label: "Timeline", icon: Clock },
  { href: "/biometrics", label: "Biometrics", icon: Activity },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/60 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl gradient-primary flex items-center justify-center glow-primary group-hover:scale-110 transition-transform">
              <Music className="w-6 h-6 text-white" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-bold text-xl text-gradient">Soundtrack</span>
          </Link>
          <div className="flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all text-sm font-semibold relative overflow-hidden group",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/20" />
                  )}
                  <Icon className={cn("w-4 h-4 relative z-10", isActive && "text-primary")} />
                  <span className="hidden lg:inline relative z-10">{item.label}</span>
                  {!isActive && (
                    <div className="absolute inset-0 bg-muted/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
