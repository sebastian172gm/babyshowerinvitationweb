"use client"

import { useEffect, useState } from "react"

// Deterministic pseudo-random helpers (no hydration mismatch)
const frac = (n: number) => n - Math.floor(n)
const hash = (i: number, salt: number) => frac(Math.sin(i * 127.1 + salt * 311.7) * 43758.5)

export function FloatingStars() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const COLORS = ["#C9956B", "#E8B4B8", "#F5CBA7", "#D4A5A5", "#F8E8D4", "#FADADD", "#FFD9B3"]
  const ANIMS = ["animate-twinkle", "animate-pulse-star", "animate-spin-star", "animate-twinkle", "animate-pulse-star", "animate-twinkle", "animate-spin-star"]

  // 75 regular 8-point stars spread evenly using grid + offset
  const stars = Array.from({ length: 75 }, (_, i) => {
    const col = i % 10
    const row = Math.floor(i / 10)
    return {
      id: i,
      left: `${col * 10 + hash(i, 1) * 9 + 0.5}%`,
      top: `${row * 13.3 + hash(i, 2) * 12 + 0.5}%`,
      size: 5 + Math.floor(hash(i, 3) * 14),
      delay: hash(i, 4) * 7,
      duration: 3 + hash(i, 5) * 5,
      opacity: 0.12 + hash(i, 6) * 0.35,
      color: COLORS[i % COLORS.length],
      animClass: ANIMS[i % ANIMS.length],
    }
  })

  // 18 larger 4-point sparkles, evenly distributed
  const sparkles = Array.from({ length: 18 }, (_, i) => {
    const col = i % 6
    const row = Math.floor(i / 6)
    return {
      id: i,
      left: `${col * 16.5 + hash(i, 7) * 14 + 1}%`,
      top: `${row * 33 + hash(i, 8) * 30 + 1}%`,
      size: 12 + Math.floor(hash(i, 9) * 14),
      delay: hash(i, 10) * 8,
      color: COLORS[i % COLORS.length],
    }
  })

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute ${star.animClass}`}
          style={{
            left: star.left,
            top: star.top,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            opacity: star.opacity,
          }}
        >
          <svg width={star.size} height={star.size} viewBox="0 0 16 16" fill="none">
            <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" fill={star.color} />
          </svg>
        </div>
      ))}

      {sparkles.map((s) => (
        <div
          key={`sp-${s.id}`}
          className="absolute animate-sparkle"
          style={{ left: s.left, top: s.top, animationDelay: `${s.delay}s`, opacity: 0.22 }}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill="none">
            <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" fill={s.color} />
            <path d="M12 6L12.8 11.2L18 12L12.8 12.8L12 18L11.2 12.8L6 12L11.2 11.2L12 6Z" fill="white" opacity="0.5" />
          </svg>
        </div>
      ))}

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.08; transform: scale(0.7) rotate(0deg); }
          50% { opacity: 0.55; transform: scale(1.35) rotate(20deg); }
        }
        @keyframes pulse-star {
          0%, 100% { opacity: 0.06; transform: scale(0.65); }
          50% { opacity: 0.5; transform: scale(1.25); }
        }
        @keyframes spin-star {
          0% { opacity: 0.1; transform: scale(0.85) rotate(0deg); }
          50% { opacity: 0.45; transform: scale(1.15) rotate(180deg); }
          100% { opacity: 0.1; transform: scale(0.85) rotate(360deg); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0.04; transform: scale(0.55) rotate(0deg); }
          25% { opacity: 0.35; transform: scale(1.15) rotate(45deg); }
          75% { opacity: 0.22; transform: scale(0.95) rotate(135deg); }
        }
        .animate-twinkle  { animation: twinkle     var(--dur, 4s) ease-in-out infinite; }
        .animate-pulse-star { animation: pulse-star var(--dur, 5s) ease-in-out infinite; }
        .animate-spin-star  { animation: spin-star  var(--dur, 6s) linear    infinite; }
        .animate-sparkle    { animation: sparkle    8s             ease-in-out infinite; }
      `}</style>
    </div>
  )
}

/* ─── Cloud shape helper ─── */
function Cloud({ w, h, fill = "#E0C4B0", highlight = "#EDD5C5", lumps = 3 }: {
  w: number; h: number; fill?: string; highlight?: string; lumps?: number
}) {
  const baseRx = w * 0.42
  const baseRy = h * 0.28
  const baseCy = h * 0.72
  const lumpPositions = lumps === 2
    ? [0.38, 0.65]
    : lumps === 4
    ? [0.28, 0.47, 0.65, 0.78]
    : [0.33, 0.55, 0.72]
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <ellipse cx={w * 0.5} cy={baseCy} rx={baseRx} ry={baseRy} fill={fill} />
      {lumpPositions.map((cx, j) => (
        <ellipse key={j} cx={w * cx} cy={h * (0.32 + j * 0.04)} rx={w * (0.22 + j * 0.01)} ry={h * (0.28 + j * 0.02)} fill={fill} />
      ))}
      <ellipse cx={w * 0.5} cy={h * 0.42} rx={w * 0.2} ry={h * 0.18} fill={highlight} />
    </svg>
  )
}

export function FloatingClouds() {
  // 16 clouds: position, size, opacity, animation, delay, duration
  const clouds: {
    top: string; left?: string; right?: string
    w: number; h: number; opacity: number
    anim: string; delay: number; duration: number; lumps?: number
  }[] = [
    // Row ~0–15%
    { top: "2%",  left: "3%",    w: 200, h: 80,  opacity: 0.10, anim: "drift",         delay: 0,   duration: 18 },
    { top: "4%",  left: "38%",   w: 150, h: 58,  opacity: 0.07, anim: "float",         delay: 2,   duration: 22, lumps: 2 },
    { top: "8%",  right: "2%",   w: 210, h: 84,  opacity: 0.09, anim: "drift-reverse", delay: 3.5, duration: 20 },

    // Row ~18–32%
    { top: "18%", left: "12%",   w: 180, h: 72,  opacity: 0.08, anim: "float",         delay: 5,   duration: 26 },
    { top: "22%", right: "15%",  w: 160, h: 64,  opacity: 0.07, anim: "drift-reverse", delay: 1,   duration: 21, lumps: 2 },
    { top: "28%", left: "55%",   w: 130, h: 52,  opacity: 0.06, anim: "drift",         delay: 8,   duration: 24 },

    // Row ~36–52%
    { top: "36%", left: "0%",    w: 220, h: 88,  opacity: 0.08, anim: "drift",         delay: 4,   duration: 19, lumps: 4 },
    { top: "42%", left: "30%",   w: 145, h: 58,  opacity: 0.06, anim: "float",         delay: 11,  duration: 28 },
    { top: "48%", right: "0%",   w: 200, h: 80,  opacity: 0.07, anim: "drift-reverse", delay: 6,   duration: 23 },

    // Row ~56–70%
    { top: "58%", left: "8%",    w: 170, h: 68,  opacity: 0.07, anim: "float",         delay: 7,   duration: 25 },
    { top: "62%", left: "48%",   w: 155, h: 62,  opacity: 0.06, anim: "drift",         delay: 13,  duration: 22, lumps: 2 },
    { top: "66%", right: "5%",   w: 185, h: 74,  opacity: 0.07, anim: "drift-reverse", delay: 2.5, duration: 20 },

    // Row ~74–92%
    { top: "74%", left: "2%",    w: 165, h: 66,  opacity: 0.06, anim: "drift",         delay: 9,   duration: 27 },
    { top: "78%", left: "35%",   w: 195, h: 78,  opacity: 0.07, anim: "float",         delay: 0.5, duration: 30, lumps: 4 },
    { top: "84%", right: "3%",   w: 175, h: 70,  opacity: 0.06, anim: "drift-reverse", delay: 14,  duration: 21 },
    { top: "90%", left: "20%",   w: 250, h: 100, opacity: 0.06, anim: "float",         delay: 6,   duration: 32, lumps: 4 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {clouds.map((c, i) => (
        <div
          key={i}
          className={`absolute animate-cloud-${c.anim}`}
          style={{
            top: c.top,
            ...(c.left !== undefined ? { left: c.left } : {}),
            ...(c.right !== undefined ? { right: c.right } : {}),
            opacity: c.opacity,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
          }}
        >
          <Cloud w={c.w} h={c.h} lumps={c.lumps} />
        </div>
      ))}

      <style jsx>{`
        @keyframes cloud-drift {
          0%   { transform: translateX(0px); }
          50%  { transform: translateX(55px); }
          100% { transform: translateX(0px); }
        }
        @keyframes cloud-drift-reverse {
          0%   { transform: translateX(0px); }
          50%  { transform: translateX(-55px); }
          100% { transform: translateX(0px); }
        }
        @keyframes cloud-float {
          0%   { transform: translateX(0px)   translateY(0px); }
          33%  { transform: translateX(25px)  translateY(-10px); }
          66%  { transform: translateX(-18px) translateY(7px); }
          100% { transform: translateX(0px)   translateY(0px); }
        }
        .animate-cloud-drift         { animation: cloud-drift         18s ease-in-out infinite; }
        .animate-cloud-drift-reverse { animation: cloud-drift-reverse 20s ease-in-out infinite; }
        .animate-cloud-float         { animation: cloud-float         24s ease-in-out infinite; }
      `}</style>
    </div>
  )
}
