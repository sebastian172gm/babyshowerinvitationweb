"use client"

import { useState, useRef, useEffect } from "react"
import { Music, Pause } from "lucide-react"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Create a simple lullaby-like tone using Web Audio API
    // Since we don't have an audio file, we'll just show the player
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(() => {
          // Autoplay blocked by browser
        })
      }
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-baby-pink/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-baby-pink transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-baby-gold/50"
      aria-label={isPlaying ? "Pausar musica" : "Reproducir musica"}
    >
      {isPlaying ? (
        <Pause className="w-5 h-5 text-foreground" />
      ) : (
        <Music className="w-5 h-5 text-foreground" />
      )}
      {isPlaying && (
        <span className="absolute inset-0 rounded-full border-2 border-baby-pink animate-ping opacity-30" />
      )}
      {/* Audio element - replace src with actual lullaby music URL */}
      <audio ref={audioRef} loop preload="none">
        <source src="/bella evangeline.mp3" type="audio/mpeg" />
      </audio>
    </button>
  )
}
