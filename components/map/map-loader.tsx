"use client"

import dynamic from "next/dynamic"

const LocationMap = dynamic(() => import("@/components/map/location-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-foreground" />
        <p className="text-sm text-muted-foreground">{"Loading map\u2026"}</p>
      </div>
    </div>
  ),
})

export default function MapLoader() {
  return <LocationMap />
}
