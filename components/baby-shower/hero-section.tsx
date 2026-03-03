"use client"

import { BearWithBalloons } from "./bear-with-balloons"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

import type { ReactNode } from "react"

export function HeroSection({ isPlaying = false, musicPlayer }: { isPlaying?: boolean; musicPlayer?: ReactNode }) {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section ref={ref} className="relative flex flex-col items-center justify-start px-4 pt-12 pb-8 overflow-hidden">
      {/* Decorative stars */}
      <div className="absolute top-[10%] left-[8%] opacity-30 animate-pulse" style={{ animationDuration: "3s" }}>
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
          <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" fill="#C9956B" />
        </svg>
      </div>
      <div className="absolute top-[15%] right-[12%] opacity-20 animate-pulse" style={{ animationDuration: "4s", animationDelay: "1s" }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" fill="#C9956B" />
        </svg>
      </div>
      <div className="absolute bottom-[20%] left-[15%] opacity-25 animate-pulse" style={{ animationDuration: "5s", animationDelay: "2s" }}>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" fill="#C9956B" />
        </svg>
      </div>
      <div className="absolute top-[40%] right-[5%] opacity-20 animate-pulse" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}>
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
          <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" fill="#C8A2A8" />
        </svg>
      </div>

      <div
        className={`text-center transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Semicircle arc text */}
        <div className="flex items-center justify-center -mb-3">
          <svg viewBox="0 0 300 100" className="w-64 md:w-80 h-auto">
            <defs>
              <path id="textArc" d="M 10,90 A 160,160 0 0,1 290,90" />
            </defs>
            <text
              fill="#C9956B"
              fontSize="11"
              letterSpacing="4"
              fontFamily="var(--font-sans), sans-serif"
              textAnchor="middle"
              opacity="0.85"
            >
              <textPath href="#textArc" startOffset="50%">
                ESTAN CORDIALMENTE INVITADOS
              </textPath>
            </text>
          </svg>
        </div>
        <h1
          className="text-5xl md:text-7xl lg:text-8xl text-foreground mb-2 leading-tight"
          style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
        >
          Baby Shower
        </h1>
        <div className="flex items-center justify-center gap-4 my-6">
          <div className="h-px w-16 bg-baby-gold/40" />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" fill="#C9956B" opacity="0.6" />
          </svg>
          <div className="h-px w-16 bg-baby-gold/40" />
        </div>
      </div>

      <div
        className={`w-72 h-80 md:w-96 md:h-[26rem] transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <BearWithBalloons className="w-full h-full" isPlaying={isPlaying} />
      </div>

      {/* Music player */}
      {musicPlayer}

      {/* Scroll indicator */}
      <div
        className={`mt-4 flex flex-col items-center gap-2 transition-all duration-1000 delay-1000 ${
          isVisible ? "opacity-60" : "opacity-0"
        }`}
      >
        <span className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase font-sans">Desliza</span>
        <div className="w-5 h-8 rounded-full border border-baby-gold/40 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-baby-gold/60 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
