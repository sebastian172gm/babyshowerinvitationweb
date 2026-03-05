# Baby Shower Invitation Web

A beautiful, animated baby shower invitation website built with Next.js and Tailwind CSS.

## Features

- Envelope opening animation
- Auto-playing music with custom player
- Interactive map with Mapbox
- Countdown timer to the event
- Event details with date, time, and location
- Photo gallery
- Event itinerary
- Gift registry (Lluvia de Sobres)
- WhatsApp RSVP
- Floating decorative elements (stars and clouds)
- Fully responsive design

## Getting Started

### Prerequisites

- Node.js 18+
- A Mapbox access token

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

## Customization

Edit the variables at the top of `app/page.tsx` to personalize:

- `BABY_NAME` - Baby's name
- `EVENT_DATE` - Event date and time
- `EVENT_ADDRESS` - Venue address
- `MAP_URL` - Google Maps link
- `GIFT_REGISTRY_URL` - Gift registry link
- `WHATSAPP_PHONE` - WhatsApp number for RSVP

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Mapbox GL](https://www.mapbox.com/)
- [Lucide Icons](https://lucide.dev/)


### code adicional 

*           {/* Category filter */}
          <div className="text-left">
            <label className="block text-xs text-muted-foreground tracking-wider uppercase mb-3 font-sans">
              Tipos de invitado
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

          npm run generate-guests ## to update lista de invitados.xlsx
