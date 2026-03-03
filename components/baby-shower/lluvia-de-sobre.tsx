"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface LluviaDeSobreProps {
  giftRegistryUrl: string
}

export function LluviaDeSobre({ giftRegistryUrl }: LluviaDeSobreProps) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="py-16 px-4">
      <div
        className={`max-w-sm mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2
          className="text-3xl md:text-4xl text-foreground mb-6"
          style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
        >
          Lluvia de Sobre
        </h2>

        <p className="text-muted-foreground text-xs font-sans mb-6">
          Pañales etapa 3 o 4
        </p>

        <div className="h-px bg-gradient-to-r from-transparent via-baby-gold/50 to-transparent mb-6" />

        <a
          href={giftRegistryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-4xl md:text-5xl text-foreground hover:opacity-70 transition-opacity"
          style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
        >
          Escoge tu regalo aquí
        </a>
      </div>
    </section>
  )
}
