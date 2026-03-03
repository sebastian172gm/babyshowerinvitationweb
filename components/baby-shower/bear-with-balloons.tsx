"use client"

import Image from "next/image"

const NOTES = [
  { char: "♪", left: "5%", delay: "0s", duration: "3s" },
  { char: "♫", left: "85%", delay: "0.6s", duration: "3.4s" },
  { char: "♪", left: "15%", delay: "1.2s", duration: "2.8s" },
  { char: "♫", left: "75%", delay: "1.8s", duration: "3.2s" },
  { char: "♪", left: "50%", delay: "2.4s", duration: "3s" },
  { char: "♫", left: "92%", delay: "0.3s", duration: "3.6s" },
  { char: "♪", left: "-2%", delay: "1.5s", duration: "2.6s" },
  { char: "♫", left: "60%", delay: "2.1s", duration: "3.1s" },
]

interface BearWithBalloonsProps {
  className?: string
  isPlaying?: boolean
}

export function BearWithBalloons({ className = "", isPlaying = false }: BearWithBalloonsProps) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/images/elephant without background.png"
        alt="Baby elephant"
        width={300}
        height={400}
        className="w-full h-full object-contain"
        priority
      />

      {isPlaying && (
        <>
          {NOTES.map((note, i) => (
            <span
              key={i}
              className="absolute text-baby-gold/70 pointer-events-none select-none"
              style={{
                left: note.left,
                bottom: "20%",
                fontSize: "1.25rem",
                animation: `floatNote ${note.duration} ease-in-out ${note.delay} infinite`,
              }}
            >
              {note.char}
            </span>
          ))}

          <style jsx>{`
            @keyframes floatNote {
              0% {
                opacity: 0;
                transform: translateY(0) rotate(0deg);
              }
              15% {
                opacity: 0.8;
              }
              80% {
                opacity: 0.6;
              }
              100% {
                opacity: 0;
                transform: translateY(-120px) rotate(20deg);
              }
            }
          `}</style>
        </>
      )}
    </div>
  )
}
