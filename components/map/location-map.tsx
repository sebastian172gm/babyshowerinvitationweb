"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { ZoomIn, ZoomOut, Navigation, ExternalLink } from "lucide-react"

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ""

const TARGET_LNG = -74.12763
const TARGET_LAT = 4.70229
const INITIAL_ZOOM = 14
const CLICK_ZOOM_INCREMENT = 2
const NEIGHBORHOOD_ZOOM_THRESHOLD = 17
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Cra.+107c+%23+67A-29,+Engativ%C3%A1,+Bogot%C3%A1,+D.C.,+Bogot%C3%A1,+Bogot%C3%A1,+D.C.,+Colombia/@4.702345,-74.1274675,21z/data=!4m6!3m5!1s0x8e3f9ca979760fc7:0xe444f5283c29267f!8m2!3d4.702374!4d-74.127233!16s%2Fg%2F11l_616vwy?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D"

export default function LocationMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markerRef = useRef<mapboxgl.Marker | null>(null)
  const [currentZoom, setCurrentZoom] = useState(INITIAL_ZOOM)
  const [isNeighborhood, setIsNeighborhood] = useState(false)

  const centerOnTarget = useCallback(() => {
    if (!mapRef.current) return
    mapRef.current.flyTo({
      center: [TARGET_LNG, TARGET_LAT],
      duration: 600,
    })
  }, [])

  const handleZoomIn = useCallback(() => {
    if (!mapRef.current) return
    const newZoom = Math.min(mapRef.current.getZoom() + 1, 22)
    mapRef.current.flyTo({
      center: [TARGET_LNG, TARGET_LAT],
      zoom: newZoom,
      duration: 400,
    })
  }, [])

  const handleZoomOut = useCallback(() => {
    if (!mapRef.current) return
    const newZoom = Math.max(mapRef.current.getZoom() - 1, 1)
    mapRef.current.flyTo({
      center: [TARGET_LNG, TARGET_LAT],
      zoom: newZoom,
      duration: 400,
    })
  }, [])

  const handleRecenter = useCallback(() => {
    if (!mapRef.current) return
    mapRef.current.flyTo({
      center: [TARGET_LNG, TARGET_LAT],
      zoom: INITIAL_ZOOM,
      duration: 800,
    })
  }, [])

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    mapboxgl.accessToken = MAPBOX_TOKEN

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [TARGET_LNG, TARGET_LAT],
      zoom: INITIAL_ZOOM,
      attributionControl: false,
    })

    map.addControl(
      new mapboxgl.AttributionControl({ compact: true }),
      "bottom-left"
    )

    // Custom marker element
    const markerEl = document.createElement("div")
    markerEl.className = "custom-marker"
    markerEl.innerHTML = `
      <div class="marker-pulse"></div>
      <div class="marker-dot"></div>
    `

    const marker = new mapboxgl.Marker({
      element: markerEl,
      anchor: "center",
    })
      .setLngLat([TARGET_LNG, TARGET_LAT])
      .addTo(map)

    markerRef.current = marker

    // Click on marker: zoom in or open Google Maps
    markerEl.addEventListener("click", (e) => {
      e.stopPropagation()
      const zoom = map.getZoom()
      if (zoom >= NEIGHBORHOOD_ZOOM_THRESHOLD) {
        window.open(GOOGLE_MAPS_URL, "_blank", "noopener,noreferrer")
      } else {
        const newZoom = Math.min(zoom + CLICK_ZOOM_INCREMENT, 22)
        map.flyTo({
          center: [TARGET_LNG, TARGET_LAT],
          zoom: newZoom,
          duration: 600,
        })
      }
    })

    // Keep centered on zoom
    map.on("zoom", () => {
      const z = map.getZoom()
      setCurrentZoom(z)
      setIsNeighborhood(z >= NEIGHBORHOOD_ZOOM_THRESHOLD)
    })

    // After any user interaction ends, recenter
    map.on("moveend", () => {
      const center = map.getCenter()
      const dist = Math.sqrt(
        Math.pow(center.lng - TARGET_LNG, 2) +
          Math.pow(center.lat - TARGET_LAT, 2)
      )
      // Only recenter if drifted significantly
      if (dist > 0.001) {
        map.flyTo({
          center: [TARGET_LNG, TARGET_LAT],
          duration: 500,
        })
      }
    })

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-border shadow-lg">
      {/* Map container */}
      <div ref={mapContainer} className="h-full w-full" />

      {/* Custom marker styles */}
      <style jsx global>{`
        .custom-marker {
          cursor: pointer;
          position: relative;
          width: 40px;
          height: 40px;
        }
        .marker-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 16px;
          height: 16px;
          background: #e63946;
          border: 3px solid #fff;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          z-index: 2;
          transition: transform 0.2s ease;
        }
        .custom-marker:hover .marker-dot {
          transform: translate(-50%, -50%) scale(1.2);
        }
        .marker-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          background: rgba(230, 57, 70, 0.25);
          border-radius: 50%;
          animation: pulse-ring 2s ease-out infinite;
        }
        @keyframes pulse-ring {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>

      {/* Zoom controls */}
      <div className="absolute right-3 top-3 flex flex-col gap-2 z-10">
        <button
          onClick={handleZoomIn}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-background/90 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-background active:scale-95"
          aria-label="Acercar"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-background/90 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-background active:scale-95"
          aria-label="Alejar"
        >
          <ZoomOut className="h-5 w-5" />
        </button>
        <button
          onClick={handleRecenter}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-background/90 text-foreground shadow-md backdrop-blur-sm transition-colors hover:bg-background active:scale-95"
          aria-label="Recentrar mapa"
        >
          <Navigation className="h-5 w-5" />
        </button>
      </div>

      {/* Info badge */}
      <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
        <div
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-sm transition-all duration-300 ${
            isNeighborhood
              ? "bg-[#e63946] text-[#fff] cursor-pointer hover:bg-[#c1121f]"
              : "bg-background/90 text-foreground"
          }`}
          onClick={() => {
            if (isNeighborhood) {
              window.open(GOOGLE_MAPS_URL, "_blank", "noopener,noreferrer")
            }
          }}
          role={isNeighborhood ? "link" : "status"}
        >
          {isNeighborhood ? (
            <>
              <ExternalLink className="h-4 w-4" />
              <span>{"Abrir en Google Maps"}</span>
            </>
          ) : (
            <>
              <span className="inline-block h-2 w-2 rounded-full bg-[#e63946] animate-pulse" />
              <span>{"Bogotá, Colombia"}</span>
              <span className="text-muted-foreground">
                {"Zoom "}{Math.round(currentZoom)}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
