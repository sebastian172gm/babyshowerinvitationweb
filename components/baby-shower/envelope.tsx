"use client"

import { useState } from "react"

interface EnvelopeProps {
  onOpen: () => void
}

export function Envelope({ onOpen }: EnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false)

  const handleClick = () => {
    setIsOpening(true)
    setTimeout(() => {
      onOpen()
    }, 1200)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-baby-cream transition-opacity duration-700 ${
        isOpening ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-slow"
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z"
                fill="#C9956B"
                opacity="0.4"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Cloud decorations */}
      <div className="absolute top-[15%] left-[5%] opacity-20 animate-drift">
        <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
          <ellipse cx="60" cy="40" rx="50" ry="20" fill="#E0C4B0" />
          <ellipse cx="40" cy="30" rx="30" ry="20" fill="#E0C4B0" />
          <ellipse cx="80" cy="30" rx="25" ry="18" fill="#E0C4B0" />
        </svg>
      </div>
      <div className="absolute top-[20%] right-[8%] opacity-[0.15] animate-drift" style={{ animationDelay: "2s" }}>
        <svg width="100" height="50" viewBox="0 0 100 50" fill="none">
          <ellipse cx="50" cy="35" rx="40" ry="15" fill="#E0C4B0" />
          <ellipse cx="35" cy="25" rx="25" ry="15" fill="#E0C4B0" />
          <ellipse cx="65" cy="25" rx="20" ry="13" fill="#E0C4B0" />
        </svg>
      </div>

      <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-8 animate-pulse font-sans">
        Tienes una invitacion especial
      </p>

      {/* Envelope */}
      <button
        onClick={handleClick}
        className="relative cursor-pointer group focus:outline-none"
        aria-label="Abrir invitacion"
      >
        <div
          className={`relative transition-transform duration-500 ${
            isOpening ? "scale-110" : "group-hover:scale-105"
          }`}
        >
          {/* Envelope body */}
          <svg
            width="220"
            height="160"
            viewBox="0 0 220 160"
            fill="none"
            className="drop-shadow-lg"
          >
            {/* Envelope back */}
            <rect x="10" y="30" width="200" height="130" rx="8" fill="#D4A0A8" />
            {/* Envelope front */}
            <rect x="10" y="30" width="200" height="130" rx="8" fill="#F0D4D8" />
            {/* Envelope flap */}
            <path
              d={isOpening
                ? "M10 30 L110 -20 L210 30"
                : "M10 30 L110 90 L210 30"
              }
              fill="#D4A0A8"
              stroke="#C8A2A8"
              strokeWidth="1"
              className="transition-all duration-700"
            />
            {/* Card peek */}
            <rect
              x="30"
              y={isOpening ? "0" : "45"}
              width="160"
              height="100"
              rx="4"
              fill="#FFFFFF"
              className="transition-all duration-700"
            />
            {/* Heart on card */}
            <path
              d="M100 60 C100 52 88 48 88 56 C88 64 100 72 100 72 C100 72 112 64 112 56 C112 48 100 52 100 60Z"
              fill="#C8A2A8"
              className={`transition-all duration-700 ${isOpening ? "opacity-0" : "opacity-80"}`}
              style={{ transform: isOpening ? "translateY(-30px)" : "translateY(0)" }}
            />
            {/* Lines on card */}
            <line x1="70" y1="80" x2="130" y2="80" stroke="#E8D6C8" strokeWidth="1.5" opacity={isOpening ? 0 : 0.6} />
            <line x1="80" y1="88" x2="120" y2="88" stroke="#E8D6C8" strokeWidth="1.5" opacity={isOpening ? 0 : 0.6} />
          </svg>

          {/* Gold seal */}
          <div
            className={`absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-baby-gold flex items-center justify-center shadow-md transition-all duration-500 ${
              isOpening ? "opacity-0 scale-50" : "opacity-100"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2C10 2 12 6 14 8C16 10 20 10 20 10C20 10 16 12 14 14C12 16 10 20 10 20C10 20 8 16 6 14C4 12 0 10 0 10C0 10 4 8 6 6C8 4 10 2 10 2Z"
                fill="#FDF6F0"
                opacity="0.9"
              />
            </svg>
          </div>
        </div>
      </button>

      <p className="text-muted-foreground text-xs mt-8 animate-bounce font-sans">
        Toca para abrir
      </p>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(20px); }
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        .animate-drift {
          animation: drift 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
