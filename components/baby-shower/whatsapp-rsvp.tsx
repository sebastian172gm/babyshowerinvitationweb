"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Check, Send, ChevronDown } from "lucide-react"
import guestList from "@/data/guests.json"
import type { Guest } from "@/types/guest"

interface WhatsAppRsvpProps {
  phoneNumber: string
  babyName: string
  eventDate: string
}

export function WhatsAppRsvp({ phoneNumber, babyName, eventDate }: WhatsAppRsvpProps) {
  const { ref, isVisible } = useScrollAnimation()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [attending, setAttending] = useState<"yes" | "no" | null>(null)
  const [guests, setGuests] = useState("1")
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const categories = useMemo(() => {
    const cats = new Set((guestList as Guest[]).map((g) => g.category))
    return Array.from(cats).filter(Boolean).sort()
  }, [])

  const filteredGuests = useMemo(() => {
    let list = guestList as Guest[]
    if (selectedCategory) {
      list = list.filter((g) => g.category === selectedCategory)
    }
    const query = searchQuery.toLowerCase().trim()
    if (query) {
      list = list.filter((g) => g.name.toLowerCase().includes(query))
    }
    return list
  }, [searchQuery, selectedCategory])

  // Reset guest count when selected guest changes
  useEffect(() => {
    setGuests("1")
  }, [selectedGuest])

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleCategoryChange = (cat: string | null) => {
    setSelectedCategory(cat)
    setSearchQuery("")
    setSelectedGuest(null)
  }

  const handleSelectGuest = (guest: Guest) => {
    setSelectedGuest(guest)
    setSearchQuery(guest.name)
    setIsDropdownOpen(false)
  }

  const handleInputChange = (value: string) => {
    setSearchQuery(value)
    setSelectedGuest(null)
    setIsDropdownOpen(true)
  }

  const maxGuests = selectedGuest?.maxGuests ?? 1

  const buildMessage = () => {
    const name = selectedGuest?.name || searchQuery || "Invitado"
    const status = attending === "yes" ? "Si asistire" : "No podre asistir"
    const lines = [
      `Hola! Confirmo mi asistencia al Baby Shower de ${babyName}.`,
      "",
      `Nombre: ${name}`,
      `Asistencia: ${status}`,
    ]
    if (attending === "yes") {
      lines.push(`Numero de personas: ${guests}`)
    }
    lines.push("", `Fecha del evento: ${eventDate}`)
    return encodeURIComponent(lines.join("\n"))
  }

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${buildMessage()}`
  const canSend = (selectedGuest || searchQuery.trim()) && attending !== null

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
          {/* Category filter */}
          <div className="text-left">
            <label className="block text-xs text-muted-foreground tracking-wider uppercase mb-3 font-sans">
              Tipo de invitado
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleCategoryChange(null)}
                className={`px-4 py-2 rounded-full text-xs font-sans transition-all duration-300 border ${
                  selectedCategory === null
                    ? "bg-baby-pink/25 border-baby-pink/50 text-foreground"
                    : "bg-card border-border text-muted-foreground hover:border-baby-pink/30"
                }`}
              >
                Todos
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-sans transition-all duration-300 border ${
                    selectedCategory === cat
                      ? "bg-baby-pink/25 border-baby-pink/50 text-foreground"
                      : "bg-card border-border text-muted-foreground hover:border-baby-pink/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Name autocomplete */}
          <div className="text-left relative">
            <label className="block text-xs text-muted-foreground tracking-wider uppercase mb-2 font-sans">
              Busca tu nombre
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder="Escribe tu nombre para buscar..."
                className="w-full px-5 py-3 pr-10 rounded-full bg-card border border-border text-foreground text-sm font-sans placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-baby-pink/40 focus:border-baby-pink/40 transition-all"
              />
              <ChevronDown
                className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Dropdown */}
            {isDropdownOpen && filteredGuests.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute z-50 w-full mt-2 max-h-48 overflow-y-auto rounded-2xl bg-card border border-border shadow-lg"
              >
                {filteredGuests.map((guest, i) => (
                  <button
                    key={`${guest.name}-${i}`}
                    type="button"
                    onClick={() => handleSelectGuest(guest)}
                    className={`w-full flex items-center justify-between px-5 py-3 text-left text-sm font-sans transition-colors hover:bg-baby-pink/10 ${
                      selectedGuest?.name === guest.name
                        ? "bg-baby-pink/15 text-foreground"
                        : "text-foreground"
                    } ${i === 0 ? "rounded-t-2xl" : ""} ${
                      i === filteredGuests.length - 1 ? "rounded-b-2xl" : ""
                    }`}
                  >
                    <span className="truncate mr-2">{guest.name}</span>
                    <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-baby-pink/20 border border-baby-pink/30 text-muted-foreground">
                      {guest.category}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* No results */}
            {isDropdownOpen && searchQuery.trim() && filteredGuests.length === 0 && (
              <div className="absolute z-50 w-full mt-2 px-5 py-3 rounded-2xl bg-card border border-border shadow-lg text-sm text-muted-foreground font-sans">
                No se encontro tu nombre. Puedes escribirlo manualmente.
              </div>
            )}

            {/* Category badge */}
            {selectedGuest && (
              <span className="inline-block mt-3 px-3 py-1 rounded-full bg-baby-pink/20 border border-baby-pink/40 text-foreground/70 text-xs font-sans tracking-wider">
                {selectedGuest.category}
              </span>
            )}
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
                Numero de personas
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full px-5 py-3 rounded-full bg-card border border-border text-foreground text-sm font-sans focus:outline-none focus:ring-2 focus:ring-baby-pink/40 focus:border-baby-pink/40 transition-all appearance-none"
              >
                {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "persona" : "personas"}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* WhatsApp send button */}
          <a
            href={canSend ? whatsappUrl : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-3 w-full px-8 py-4 rounded-full text-sm tracking-wider font-sans transition-all duration-300 mt-2 ${
              canSend
                ? "bg-[#b2dfb0] text-foreground hover:bg-[#9dd49b] hover:scale-[1.02] shadow-lg shadow-[#b2dfb0]/30 cursor-pointer"
                : "bg-[#b2dfb0]/40 text-foreground/40 pointer-events-none"
            }`}
            aria-disabled={!canSend}
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
