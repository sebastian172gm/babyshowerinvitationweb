"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Calendar, Clock, MapPin, Gift } from "lucide-react"
import LocationMap from "@/components/map/location-map"

interface EventDetailsProps {
  day: string
  date: string
  time: string
  address: string
  mapUrl: string
  giftRegistryUrl: string
}

export function EventDetails({
  day,
  date,
  time,
  address,
  mapUrl,
  giftRegistryUrl,
}: EventDetailsProps) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="py-20 px-4">
      <div
        className={`max-w-md mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-baby-gold text-xs tracking-[0.4em] uppercase mb-2 font-sans">Detalles del evento</p>
        <h2
          className="text-3xl md:text-4xl text-foreground mb-10"
          style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
        >
          Te esperamos
        </h2>

        <div className="space-y-8">
          {/* Date */}
          <div
            className={`flex flex-col items-center gap-3 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-baby-pink/15 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-baby-gold" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-foreground font-serif text-lg">{day}</p>
              <p className="text-muted-foreground text-sm font-sans">{date}</p>
            </div>
          </div>

          {/* Time */}
          <div
            className={`flex flex-col items-center gap-3 transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-baby-gold-light/30 flex items-center justify-center">
              <Clock className="w-5 h-5 text-baby-gold" strokeWidth={1.5} />
            </div>
            <p className="text-foreground font-serif text-lg">{time}</p>
          </div>

          {/* Location */}
          <div
            className={`flex flex-col items-center gap-3 transition-all duration-700 delay-[600ms] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-baby-beige flex items-center justify-center">
              <MapPin className="w-5 h-5 text-baby-gold" strokeWidth={1.5} />
            </div>
            <p className="text-foreground/80 text-sm font-sans leading-relaxed max-w-xs">{address}</p>
          </div>
        </div>

        {/* Map */}
        <div className="mt-10 h-64 md:h-80 w-full">
          <LocationMap />
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-4 mt-6">
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-baby-gold-light/30 text-foreground text-sm tracking-wider font-sans hover:bg-baby-gold-light/50 transition-all duration-300 hover:scale-105 border border-baby-gold/30"
          >
            <MapPin className="w-4 h-4" strokeWidth={1.5} />
            <span>Ver ubicación</span>
          </a>

          {/* Elegant divider */}
          <div className="w-full flex flex-col items-center gap-1 my-8">
            <div className="flex items-center gap-3 w-3/4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-baby-gold/50 to-baby-gold/50" />
              <span className="text-baby-gold/60 text-lg">&#10045;</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-baby-gold/50 to-baby-gold/50" />
            </div>
          </div>

          {/* Lluvia de Sobres */}
          <div className="w-full py-2">
            <h3
              className="text-4xl md:text-4xl text-foreground mb-3"
              style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
            >
              Lluvia de Sobres
            </h3>
            <p className="text-muted-foreground text-xs font-sans mb-3">
              + Pañales etapa 3 o 4
            </p>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 h-px bg-baby-gold/40" />
              <span className="text-baby-gold/70 text-xl font-bold leading-none">ó</span>
              <div className="flex-1 h-px bg-baby-gold/40" />
            </div>
            <p
              className="text-4xl md:text-5xl text-foreground"
              style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
            >
              Escoge tu regalo aquí
            </p>
          </div>

          <a
            href={giftRegistryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-baby-pink/20 text-foreground text-sm tracking-wider font-sans hover:bg-baby-pink/30 transition-all duration-300 hover:scale-105 border border-baby-pink/30"
          >
            <Gift className="w-4 h-4" strokeWidth={1.5} />
            <span>Ver mesa de regalos</span>
          </a>
        </div>
      </div>
    </section>
  )
}
