"use client"

import { useState } from "react"
import { Envelope } from "@/components/baby-shower/envelope"
import { HeroSection } from "@/components/baby-shower/hero-section"
import { MessageSection } from "@/components/baby-shower/message-section"
import { PresentationSection } from "@/components/baby-shower/presentation-section"
import { PhotoGallery } from "@/components/baby-shower/photo-gallery"
import { PhotoDivider } from "@/components/baby-shower/photo-divider"
import { Countdown } from "@/components/baby-shower/countdown"
import { EventDetails } from "@/components/baby-shower/event-details"
import { Itinerary } from "@/components/baby-shower/itinerary"
import { Footer } from "@/components/baby-shower/footer"
import { MusicPlayer } from "@/components/baby-shower/music-player"
import { FloatingStars, FloatingClouds } from "@/components/baby-shower/floating-elements"
import { WhatsAppRsvp } from "@/components/baby-shower/whatsapp-rsvp"

/* ===================================
   VARIABLES EDITABLES - Personaliza aqui
   =================================== */
const BABY_NAME = "Lyah"
const BABY_LAST_NAME = "Celeste"
const EVENT_DATE = new Date("2026-04-18T14:00:00")
const EVENT_DAY = "Sabado"
const EVENT_DATE_TEXT = "18 de Abril, 2026"
const EVENT_TIME = "2:00 PM"
const EVENT_ADDRESS = "Salon de eventos las mercedez, Cra 107c #67a-29, Bogotá"
const MAP_URL = "https://www.google.com/maps/place/Cra.+107c+%23+67A-29,+Engativ%C3%A1,+Bogot%C3%A1,+D.C.,+Bogot%C3%A1,+Bogot%C3%A1,+D.C.,+Colombia/@4.702345,-74.1274675,21z/data=!4m6!3m5!1s0x8e3f9ca979760fc7:0xe444f5283c29267f!8m2!3d4.702374!4d-74.127233!16s%2Fg%2F11l_616vwy?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D"
const GIFT_REGISTRY_URL = "#"
const WHATSAPP_PHONE = "573503009808"
/* =================================== */

export default function BabyShowerPage() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Envelope intro */}
      {!isEnvelopeOpen && <Envelope onOpen={() => setIsEnvelopeOpen(true)} />}

      {/* Main content */}
      <div
        className={`transition-opacity duration-1000 ${
          isEnvelopeOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Floating decorative elements */}
        <FloatingStars />
        <FloatingClouds />

        {/* Music player */}
        <MusicPlayer shouldPlay={isEnvelopeOpen} />

        {/* Sections */}
        <HeroSection />

        <div className="relative z-20">
          <MessageSection />

          <PhotoDivider src="/images/baby-shoes.jpg" alt="Zapatitos de bebe" />

          <PresentationSection
            babyName={BABY_NAME}
            babyLastName={BABY_LAST_NAME}
          />

          <PhotoDivider src="/images/baby-clothes.jpg" alt="Ropita de bebe" />

          <Countdown targetDate={EVENT_DATE} />

          <WhatsAppRsvp
            phoneNumber={WHATSAPP_PHONE}
            babyName={BABY_NAME}
            eventDate={EVENT_DATE_TEXT}
          />

          <EventDetails
            day={EVENT_DAY}
            date={EVENT_DATE_TEXT}
            time={EVENT_TIME}
            address={EVENT_ADDRESS}
            mapUrl={MAP_URL}
            giftRegistryUrl={GIFT_REGISTRY_URL}
          />

          <PhotoGallery />

          <Itinerary />

          <PhotoDivider src="/images/baby-toys.jpg" alt="Juguetes del bebe" />

          <Footer />
        </div>
      </div>
    </main>
  )
}
