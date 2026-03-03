"use client"

import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Heart } from "lucide-react"

export function MessageSection() {
  const { ref, isVisible } = useScrollAnimation()
  const [showMessage, setShowMessage] = useState(false)

  return (
    <section ref={ref} className="py-20 px-4">
      <div
        className={`max-w-md mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="mb-8">
          <Heart className="w-6 h-6 mx-auto text-baby-pink mb-6" strokeWidth={1.5} />
          <p className="text-lg md:text-xl text-foreground/80 font-serif italic leading-relaxed">
            {"\"Solo podemos esperar que nuestro amor sea tan grande como nuestra felicidad al recibirte...\""}
          </p>
        </div>

        {!showMessage ? (
          <button
            onClick={() => setShowMessage(true)}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-baby-pink/20 text-foreground text-sm tracking-wider uppercase font-sans hover:bg-baby-pink/30 transition-all duration-300 hover:scale-105 border border-baby-pink/30"
          >
            <span>Dale clic</span>
            <Heart className="w-4 h-4 text-baby-pink" strokeWidth={1.5} />
          </button>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="text-foreground/70 leading-relaxed font-sans text-sm md:text-base">
              ¡Un nuevo milagro esta por llegar a nuestras vidas!
              Te invitamos a celebrar con nosotros la llegada de nuestra princesa.
              Tu presencia llenara de alegria este dia tan especial.
            </p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 4C12 4 14 8 16 10C18 12 22 12 22 12C22 12 18 14 16 16C14 18 12 22 12 22C12 22 10 18 8 16C6 14 2 12 2 12C2 12 6 10 8 8C10 6 12 4 12 4Z" fill="#C9956B" opacity="0.3" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
