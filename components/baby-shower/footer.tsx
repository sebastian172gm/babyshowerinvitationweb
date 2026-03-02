"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Heart } from "lucide-react"

export function Footer() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <footer ref={ref} className="py-16 px-4">
      <div
        className={`max-w-md mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-12 bg-baby-gold/30" />
          <Heart className="w-4 h-4 text-baby-pink" fill="currentColor" strokeWidth={1} />
          <div className="h-px w-12 bg-baby-gold/30" />
        </div>
        <p
          className="text-2xl text-foreground mb-2"
          style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
        >
          Te esperamos con mucho amor
        </p>
        <p className="text-xs text-muted-foreground tracking-[0.2em] uppercase font-sans mt-4">
          Con amor, los futuros papis
        </p>

        {/* Decorative bottom */}
        <div className="mt-12 flex items-center justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="8" height="8" viewBox="0 0 16 16" fill="none" className="opacity-20">
              <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" fill="#C9956B" />
            </svg>
          ))}
        </div>
      </div>
    </footer>
  )
}
