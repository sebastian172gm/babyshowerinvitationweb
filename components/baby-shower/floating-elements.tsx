"use client"

import { useEffect, useState } from "react"

export function FloatingStars() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const stars = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 8 + Math.random() * 12,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 4,
    opacity: 0.15 + Math.random() * 0.25,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-twinkle"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            opacity: star.opacity,
          }}
        >
          <svg width={star.size} height={star.size} viewBox="0 0 16 16" fill="none">
            <path
              d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z"
              fill="#C9956B"
            />
          </svg>
        </div>
      ))}

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.8) rotate(0deg); }
          50% { opacity: 0.5; transform: scale(1.2) rotate(20deg); }
        }
        .animate-twinkle {
          animation: twinkle 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export function FloatingClouds() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      <div className="absolute top-[8%] -left-[5%] opacity-[0.08] animate-cloud-drift">
        <svg width="200" height="80" viewBox="0 0 200 80" fill="none">
          <ellipse cx="100" cy="55" rx="80" ry="25" fill="#E0C4B0" />
          <ellipse cx="70" cy="40" rx="50" ry="28" fill="#E0C4B0" />
          <ellipse cx="130" cy="38" rx="45" ry="25" fill="#E0C4B0" />
        </svg>
      </div>
      <div className="absolute top-[35%] -right-[8%] opacity-[0.06] animate-cloud-drift-reverse" style={{ animationDelay: "3s" }}>
        <svg width="180" height="70" viewBox="0 0 180 70" fill="none">
          <ellipse cx="90" cy="50" rx="70" ry="20" fill="#E0C4B0" />
          <ellipse cx="65" cy="35" rx="45" ry="22" fill="#E0C4B0" />
          <ellipse cx="120" cy="33" rx="40" ry="20" fill="#E0C4B0" />
        </svg>
      </div>
      <div className="absolute top-[65%] left-[10%] opacity-[0.05] animate-cloud-drift" style={{ animationDelay: "5s" }}>
        <svg width="160" height="60" viewBox="0 0 160 60" fill="none">
          <ellipse cx="80" cy="42" rx="60" ry="18" fill="#E0C4B0" />
          <ellipse cx="55" cy="30" rx="40" ry="20" fill="#E0C4B0" />
          <ellipse cx="105" cy="28" rx="35" ry="18" fill="#E0C4B0" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes cloud-drift {
          0% { transform: translateX(0); }
          50% { transform: translateX(40px); }
          100% { transform: translateX(0); }
        }
        @keyframes cloud-drift-reverse {
          0% { transform: translateX(0); }
          50% { transform: translateX(-40px); }
          100% { transform: translateX(0); }
        }
        .animate-cloud-drift {
          animation: cloud-drift 15s ease-in-out infinite;
        }
        .animate-cloud-drift-reverse {
          animation: cloud-drift-reverse 18s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
