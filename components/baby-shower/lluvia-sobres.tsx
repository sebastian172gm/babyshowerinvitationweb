"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Gift } from "lucide-react"

interface LluviaSobresProps {
  giftRegistryUrl: string
}

export function LluviaSobres({ giftRegistryUrl }: LluviaSobresProps) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="py-20 px-4">
      <div
        className={`max-w-md mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="w-full py-2">
          <h3
            className="text-4xl md:text-5xl text-foreground mb-3"
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
          className="inline-flex items-center gap-2 px-8 py-3 mt-6 rounded-full bg-baby-pink/20 text-foreground text-sm tracking-wider font-sans hover:bg-baby-pink/30 transition-all duration-300 hover:scale-105 border border-baby-pink/30"
        >
          <Gift className="w-4 h-4" strokeWidth={1.5} />
          <span>Ver mesa de regalos</span>
        </a>
      </div>
    </section>
  )
}
