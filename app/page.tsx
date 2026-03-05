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
import { LluviaSobres } from "@/components/baby-shower/lluvia-sobres"
import { Footer } from "@/components/baby-shower/footer"
import { MusicPlayer } from "@/components/baby-shower/music-player"
import { FloatingStars, FloatingClouds } from "@/components/baby-shower/floating-elements"
import { WhatsAppRsvp } from "@/components/baby-shower/whatsapp-rsvp"

/* ===================================
   VARIABLES EDITABLES - Personaliza aqui
   =================================== */
const BABY_NAME = "Lyah Celeste"
const BABY_LAST_NAME = ""
const EVENT_DATE = new Date("2026-04-18T14:00:00")
const EVENT_DAY = "Sábado"
const EVENT_DATE_TEXT = "18 de Abril, 2026"
const EVENT_TIME = "2:00 PM"
const EVENT_ADDRESS = "Salón de eventos las mercedez, Cra 107d #67a-2, Bogotá"
const MAP_URL = "https://www.google.com/maps/place/Cra.+107d+%23+67A-2,+Engativ%C3%A1,+Bogot%C3%A1,+D.C.,+Bogot%C3%A1,+Bogot%C3%A1,+D.C.,+Colombia/@4.7024203,-74.1281027,19z/data=!3m1!4b1!4m6!3m5!1s0x8e3f9ca97ba5e3d1:0xe94d98320b59429d!8m2!3d4.702419!4d-74.127459!16s%2Fg%2F11x2m4cfbw?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D"
const GIFT_REGISTRY_URL = "https://www.wishbob.com/dytpnuclgq"
const WHATSAPP_PHONE = "573503009808"
/* =================================== */

export default function BabyShowerPage() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)

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

        {/* Sections */}
        <HeroSection
          isPlaying={isMusicPlaying}
          musicPlayer={<MusicPlayer shouldPlay={isEnvelopeOpen} onPlayingChange={setIsMusicPlaying} />}
        />

        <div className="relative z-20">
          <MessageSection />

          <PhotoDivider src="/images/baby-shoes.jpg" alt="Zapatitos de bebe" />

          <PresentationSection
            babyName={BABY_NAME}
            babyLastName={BABY_LAST_NAME}
          />

          <PhotoDivider src="/images/baby-clothes.jpg" alt="Ropita de bebe" />

          <Countdown targetDate={EVENT_DATE} />



          <EventDetails
            day={EVENT_DAY}
            date={EVENT_DATE_TEXT}
            time={EVENT_TIME}
            address={EVENT_ADDRESS}
            mapUrl={MAP_URL}
          />

          <PhotoGallery />

          <Itinerary />

          <LluviaSobres giftRegistryUrl={GIFT_REGISTRY_URL} />

          <WhatsAppRsvp
            phoneNumber={WHATSAPP_PHONE}
            babyName={BABY_NAME}
            eventDate={EVENT_DATE_TEXT}
          />

          <PhotoDivider src="/images/baby-toys.jpg" alt="Juguetes del bebe" />

          <Footer />
        </div>
      </div>
    </main>
  )
}
