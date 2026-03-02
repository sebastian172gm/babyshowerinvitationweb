"use client"

import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Check, Send } from "lucide-react"

interface WhatsAppRsvpProps {
  phoneNumber: string
  babyName: string
  eventDate: string
}

export function WhatsAppRsvp({ phoneNumber, babyName, eventDate }: WhatsAppRsvpProps) {
  const { ref, isVisible } = useScrollAnimation()
  const [guestName, setGuestName] = useState("")
  const [attending, setAttending] = useState<"yes" | "no" | null>(null)
  const [guests, setGuests] = useState("1")

  const buildMessage = () => {
    const status = attending === "yes" ? "Si asistire" : "No podre asistir"
    const lines = [
      `Hola! Confirmo mi asistencia al Baby Shower de ${babyName}.`,
      "",
      `Nombre: ${guestName || "Invitado"}`,
      `Asistencia: ${status}`,
    ]
    if (attending === "yes") {
      lines.push(`Numero de acompanantes: ${guests}`)
    }
    lines.push("", `Fecha del evento: ${eventDate}`)
    return encodeURIComponent(lines.join("\n"))
  }

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${buildMessage()}`

  return (
    <section ref={ref} className="py-20 px-4">
      <div
        className={`max-w-md mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-baby-gold text-xs tracking-[0.4em] uppercase mb-2 font-sans">
          Confirma tu asistencia
        </p>
        <h2
          className="text-3xl md:text-4xl text-foreground mb-4"
          style={{ fontFamily: "var(--font-script), 'Great Vibes', cursive" }}
        >
          Te esperamos
        </h2>
        <p className="text-muted-foreground text-sm font-sans leading-relaxed mb-10 max-w-xs mx-auto">
          Ayudanos a preparar todo con amor. Confirma tu asistencia por WhatsApp.
        </p>

        {/* Form */}
        <div
          className={`space-y-6 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Name input */}
          <div className="text-left">
            <label className="block text-xs text-muted-foreground tracking-wider uppercase mb-2 font-sans">
              Tu nombre
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Escribe tu nombre"
              className="w-full px-5 py-3 rounded-full bg-card border border-border text-foreground text-sm font-sans placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-baby-pink/40 focus:border-baby-pink/40 transition-all"
            />
          </div>

          {/* Attending toggle */}
          <div className="text-left">
            <label className="block text-xs text-muted-foreground tracking-wider uppercase mb-3 font-sans">
              Podras asistir?
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setAttending("yes")}
                className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-sans transition-all duration-300 border ${
                  attending === "yes"
                    ? "bg-baby-pink/25 border-baby-pink/50 text-foreground"
                    : "bg-card border-border text-muted-foreground hover:border-baby-pink/30"
                }`}
              >
                {attending === "yes" && <Check className="w-4 h-4" strokeWidth={2} />}
                Si, asistire
              </button>
              <button
                type="button"
                onClick={() => setAttending("no")}
                className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-sans transition-all duration-300 border ${
                  attending === "no"
                    ? "bg-baby-gold-light/30 border-baby-gold/40 text-foreground"
                    : "bg-card border-border text-muted-foreground hover:border-baby-gold/30"
                }`}
              >
                {attending === "no" && <Check className="w-4 h-4" strokeWidth={2} />}
                No podre
              </button>
            </div>
          </div>

          {/* Number of guests (only if attending) */}
          {attending === "yes" && (
            <div className="text-left animate-in fade-in slide-in-from-bottom-2 duration-500">
              <label className="block text-xs text-muted-foreground tracking-wider uppercase mb-2 font-sans">
                Numero de acompanantes
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full px-5 py-3 rounded-full bg-card border border-border text-foreground text-sm font-sans focus:outline-none focus:ring-2 focus:ring-baby-pink/40 focus:border-baby-pink/40 transition-all appearance-none"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "persona" : "personas"}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* WhatsApp send button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full px-8 py-4 rounded-full bg-[#b2dfb0] text-foreground text-sm tracking-wider font-sans hover:bg-[#9dd49b] transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-[#b2dfb0]/30 mt-2"
          >
            {/* WhatsApp icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>Enviar confirmacion</span>
            <Send className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  )
}
