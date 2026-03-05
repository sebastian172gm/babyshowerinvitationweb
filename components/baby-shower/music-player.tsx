"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Play, Pause, SkipBack, SkipForward, Music } from "lucide-react"

const FLOATING_NOTES = [
  { char: "♪", left: "-4px", delay: "0s", duration: "2.4s" },
  { char: "♫", left: "24px", delay: "0.8s", duration: "2.8s" },
  { char: "♪", left: "40px", delay: "1.6s", duration: "2.2s" },
]

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

interface MusicPlayerProps {
  shouldPlay?: boolean
  onPlayingChange?: (playing: boolean) => void
}

export function MusicPlayer({ shouldPlay = false, onPlayingChange }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const hasAutoPlayed = useRef(false)

  const updatePlaying = useCallback(
    (playing: boolean) => {
      setIsPlaying(playing)
      onPlayingChange?.(playing)
    },
    [onPlayingChange]
  )

  useEffect(() => {
    if (shouldPlay && !hasAutoPlayed.current && audioRef.current) {
      hasAutoPlayed.current = true
      audioRef.current
        .play()
        .then(() => updatePlaying(true))
        .catch(() => {})
    }
  }, [shouldPlay, updatePlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onLoadedMetadata = () => setDuration(audio.duration)
    const onEnded = () => updatePlaying(false)

    audio.addEventListener("timeupdate", onTimeUpdate)
    audio.addEventListener("loadedmetadata", onLoadedMetadata)
    audio.addEventListener("ended", onEnded)

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate)
      audio.removeEventListener("loadedmetadata", onLoadedMetadata)
      audio.removeEventListener("ended", onEnded)
    }
  }, [updatePlaying])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      updatePlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      updatePlaying(true)
    }
  }

  const restart = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = 0
    if (!isPlaying) {
      audioRef.current.play().catch(() => {})
      updatePlaying(true)
    }
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current || !duration) return
    const rect = progressRef.current.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    audioRef.current.currentTime = ratio * duration
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="relative py-2 px-4 flex flex-col items-center w-full">
      <p
        className="text-2xl md:text-3xl text-baby-gold mb-4 text-center"
        style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
      >
        Dale play para escuchar nuestra canción.
      </p>

      <div className="w-full max-w-xs flex flex-col items-center gap-4">
        {/* Progress bar */}
        <div className="w-full flex items-center gap-3">
          <span className="text-[10px] text-muted-foreground font-sans tabular-nums w-8 text-right">
            {formatTime(currentTime)}
          </span>
          <div
            ref={progressRef}
            onClick={seek}
            className="flex-1 h-1.5 rounded-full bg-baby-pink-light cursor-pointer relative group"
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-baby-gold transition-[width] duration-150"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-baby-gold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>
          <span className="text-[10px] text-muted-foreground font-sans tabular-nums w-8">
            {formatTime(duration)}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button
            onClick={restart}
            className="text-baby-rose/70 hover:text-baby-rose transition-colors"
            aria-label="Reiniciar"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-baby-pink/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-baby-pink transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-baby-gold/50"
            aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-foreground" />
            ) : (
              <Play className="w-6 h-6 text-foreground ml-0.5" />
            )}
          </button>

          <button
            onClick={restart}
            className="text-baby-rose/70 hover:text-baby-rose transition-colors"
            aria-label="Siguiente"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>

      <audio ref={audioRef} loop preload="metadata">
        <source src="/bella evangeline.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating button (bottom-right) */}
      <button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-baby-pink/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-baby-pink transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-baby-gold/50"
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-foreground" />
        ) : (
          <Music className="w-5 h-5 text-foreground" />
        )}
        {isPlaying && (
          <>
            <span className="absolute inset-0 rounded-full border-2 border-baby-pink animate-ping opacity-30" />
            {FLOATING_NOTES.map((note, i) => (
              <span
                key={i}
                className="absolute text-baby-gold/70 pointer-events-none select-none"
                style={{
                  bottom: "100%",
                  left: note.left,
                  fontSize: "0.75rem",
                  animation: `floatNoteBtn ${note.duration} ease-in-out ${note.delay} infinite`,
                }}
              >
                {note.char}
              </span>
            ))}
          </>
        )}
      </button>

      {isPlaying && (
        <style jsx>{`
          @keyframes floatNoteBtn {
            0% {
              opacity: 0;
              transform: translateY(0) rotate(0deg);
            }
            15% {
              opacity: 0.9;
            }
            80% {
              opacity: 0.5;
            }
            100% {
              opacity: 0;
              transform: translateY(-40px) rotate(15deg);
            }
          }
        `}</style>
      )}
    </div>
  )
}
