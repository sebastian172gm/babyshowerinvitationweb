"use client"

import { useEffect, useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface CountdownProps {
  targetDate: Date
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(target: Date): TimeLeft {
  const difference = target.getTime() - new Date().getTime()
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const { ref, isVisible } = useScrollAnimation()

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(targetDate))
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const units = [
    { value: timeLeft?.days ?? 0, label: "Dias" },
    { value: timeLeft?.hours ?? 0, label: "Horas" },
    { value: timeLeft?.minutes ?? 0, label: "Minutos" },
    { value: timeLeft?.seconds ?? 0, label: "Segundos" },
  ]

  return (
    <section ref={ref} className="py-20 px-4">
      <div
        className={`max-w-lg mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-baby-gold text-xs tracking-[0.3em] uppercase mb-3 font-sans">Faltan</p>
        <div className="flex items-center justify-center gap-3 md:gap-6">
          {units.map((unit, i) => (
            <div key={unit.label} className="flex items-center gap-3 md:gap-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-card shadow-sm border border-border flex items-center justify-center mb-2">
                  <span className="text-2xl md:text-3xl font-serif text-foreground font-semibold">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-[10px] md:text-xs text-muted-foreground tracking-wider uppercase font-sans">
                  {unit.label}
                </span>
              </div>
              {i < units.length - 1 && (
                <span className="text-baby-gold text-xl font-serif mb-6">:</span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" fill="#C9956B" opacity="0.6" />
          </svg>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>
    </section>
  )
}
