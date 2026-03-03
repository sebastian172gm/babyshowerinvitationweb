"use client"

import Image from "next/image"

export function BearWithBalloons({ className = "" }: { className?: string }) {
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
    </div>
  )
}
