"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import Image from "next/image"

const photos = [
  { src: "/images/baby-shoes.jpg", alt: "Zapatitos de bebe", rotation: "-rotate-3" },
  { src: "/images/baby-nursery.jpg", alt: "Cuarto del bebe", rotation: "rotate-2" },
  { src: "/images/baby-clothes11.jpg", alt: "Ropita de bebe", rotation: "-rotate-1" },
  { src: "/images/baby-toys.jpg", alt: "Juguetes del bebe", rotation: "rotate-3" },
]

export function PhotoGallery() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section ref={ref} className="py-20 px-4 bg-baby-beige/40">
      <div className="max-w-lg mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-baby-gold text-xs tracking-[0.4em] uppercase mb-2 font-sans">Preparando tu llegada</p>
          <h2
            className="text-3xl md:text-4xl text-foreground"
            style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
          >
            Momentos Especiales
          </h2>
        </div>

        {/* Polaroid-style photo grid */}
        <div className="grid grid-cols-2 gap-6 md:gap-8">
          {photos.map((photo, index) => (
            <div
              key={photo.src}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 200 + 300}ms` }}
            >
              <div
                className={`bg-card rounded-sm shadow-lg p-2.5 pb-10 ${photo.rotation} hover:rotate-0 transition-transform duration-500 cursor-default`}
              >
                <div className="relative aspect-square overflow-hidden rounded-sm">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 45vw, 220px"
                  />
                </div>
                <p
                  className="absolute bottom-2.5 left-0 right-0 text-center text-sm text-muted-foreground"
                  style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
                >
                  {photo.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
