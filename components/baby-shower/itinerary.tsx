"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Coffee, Utensils, Gamepad2, Cake, PartyPopper, Camera } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface ItineraryItem {
  time: string
  title: string
  icon: LucideIcon
}

const itineraryItems: ItineraryItem[] = [
  { time: "2:00 PM", title: "Bienvenida y recepcion", icon: Coffee },
  { time: "2:30 PM", title: "Fotos", icon: Camera },
  { time: "3:00 PM", title: "Comida y bebidas", icon: Utensils },
  { time: "3:30 PM", title: "Juegos y dinamicas", icon: Gamepad2 },
  { time: "5:30 PM", title: "Apertura de regalos", icon: PartyPopper },
  { time: "6:30 PM", title: "recuerdos", icon: PartyPopper }
]

function TimelineItem({ item, index }: { item: ItineraryItem; index: number }) {
  const { ref, isVisible } = useScrollAnimation(0.3)
  const Icon = item.icon

  return (
    <div
      ref={ref}
      className={`flex items-center gap-4 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Time */}
      <div className="w-20 text-right shrink-0">
        <span className="text-xs text-muted-foreground font-sans tracking-wider">{item.time}</span>
      </div>

      {/* Dot + Line */}
      <div className="relative flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-card border-2 border-baby-gold/40 flex items-center justify-center shadow-sm z-10">
          <Icon className="w-4 h-4 text-baby-gold" strokeWidth={1.5} />
        </div>
      </div>

      {/* Title */}
      <div className="flex-1">
        <p className="text-sm text-foreground font-sans">{item.title}</p>
      </div>
    </div>
  )
}

export function Itinerary() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="py-20 px-4 bg-baby-beige/30">
      <div className="max-w-md mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-baby-gold text-xs tracking-[0.4em] uppercase mb-2 font-sans">Programa</p>
          <h2
            className="text-3xl md:text-4xl text-foreground"
            style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
          >
            Itinerario
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[calc(5rem+1.25rem-1px)] top-5 bottom-5 w-[2px] bg-baby-gold/20" />

          <div className="space-y-8">
            {itineraryItems.map((item, index) => (
              <TimelineItem key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
