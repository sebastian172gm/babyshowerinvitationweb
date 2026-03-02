"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import Image from "next/image"

interface PresentationProps {
  babyName: string
  babyLastName: string
}

export function PresentationSection({ babyName, babyLastName }: PresentationProps) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="py-20 px-4 bg-baby-beige/30">
      <div
        className={`max-w-md mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-baby-gold text-xs tracking-[0.4em] uppercase mb-2 font-sans">Te presentamos a</p>
        <h2
          className="text-4xl md:text-5xl text-foreground mb-1"
          style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
        >
          Baby
        </h2>
        <h3 className="text-2xl md:text-3xl font-serif text-foreground tracking-wide mb-8">
          {babyName} {babyLastName}
        </h3>

        {/* Photo - circular frame with flowers image */}
        <div
          className={`relative w-44 h-44 md:w-52 md:h-52 mx-auto mb-8 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <div className="absolute inset-0 rounded-full border-2 border-baby-gold/30" />
          <div className="absolute inset-1 rounded-full border border-baby-pink/20" />
          <div className="absolute inset-3 rounded-full overflow-hidden">
            <Image
              src="/images/baby-flowers.jpeg"
              alt="Decoracion floral"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 176px, 208px"
            />
          </div>
          {/* Decorative dots */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-baby-gold/40" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-baby-gold/40" />
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full bg-baby-gold/40" />
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-baby-gold/40" />
        </div>

        {/* Ultrasound - polaroid style with real image */}
        <div
          className={`relative inline-block transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 rotate-0" : "opacity-0 -rotate-6"
          }`}
        >
          <div className="bg-card rounded-sm shadow-lg p-3 pb-10 transform hover:rotate-1 transition-transform duration-500">
            <div className="relative w-48 h-36 md:w-56 md:h-40 rounded-sm overflow-hidden">
              <Image
                src="/images/baby-nursery.jpeg"
                alt="Cuarto del bebe"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 224px"
              />
            </div>
            <p
              className="absolute bottom-2 left-0 right-0 text-center text-sm text-muted-foreground"
              style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
            >
              Preparando tu llegada
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
