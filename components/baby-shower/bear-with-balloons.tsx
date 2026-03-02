"use client"

export function BearWithBalloons({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 300 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Balloon strings */}
        <path d="M120 200 Q125 150 115 80" stroke="#C9956B" strokeWidth="1.5" fill="none" opacity="0.6" />
        <path d="M150 195 Q150 140 150 65" stroke="#C9956B" strokeWidth="1.5" fill="none" opacity="0.6" />
        <path d="M180 200 Q175 150 185 80" stroke="#C9956B" strokeWidth="1.5" fill="none" opacity="0.6" />

        {/* Balloons */}
        {/* Pink balloon */}
        <ellipse cx="115" cy="55" rx="35" ry="42" fill="#D4A0A8">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; -3 -5; 0 0; 3 -3; 0 0"
            dur="6s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse cx="115" cy="55" rx="15" ry="20" fill="#F0D4D8" opacity="0.3" transform="translate(-8, -8)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="-8 -8; -11 -13; -8 -8; -5 -11; -8 -8"
            dur="6s"
            repeatCount="indefinite"
          />
        </ellipse>

        {/* Blue balloon */}
        <ellipse cx="150" cy="40" rx="32" ry="38" fill="#C8A2A8">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 2 -4; 0 0; -2 -6; 0 0"
            dur="5s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse cx="150" cy="40" rx="12" ry="16" fill="#E0C4C8" opacity="0.3" transform="translate(-6, -8)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="-6 -8; -4 -12; -6 -8; -8 -14; -6 -8"
            dur="5s"
            repeatCount="indefinite"
          />
        </ellipse>

        {/* Gold/beige balloon */}
        <ellipse cx="185" cy="50" rx="33" ry="40" fill="#E0C4A8">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 4 -3; 0 0; -2 -5; 0 0"
            dur="7s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse cx="185" cy="50" rx="13" ry="17" fill="#F0DCC8" opacity="0.3" transform="translate(-7, -9)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="-7 -9; -3 -12; -7 -9; -9 -14; -7 -9"
            dur="7s"
            repeatCount="indefinite"
          />
        </ellipse>

        {/* Balloon knots */}
        <circle cx="115" cy="97" r="3" fill="#B88A90" />
        <circle cx="150" cy="78" r="3" fill="#B08890" />
        <circle cx="185" cy="90" r="3" fill="#C9A088" />

        {/* Bear body */}
        <ellipse cx="150" cy="280" rx="45" ry="50" fill="#E8D5B8" />
        
        {/* Bear belly */}
        <ellipse cx="150" cy="290" rx="30" ry="35" fill="#F5ECE0" />

        {/* Bear head */}
        <circle cx="150" cy="215" r="40" fill="#E8D5B8" />

        {/* Ears */}
        <circle cx="118" cy="185" r="16" fill="#E8D5B8" />
        <circle cx="118" cy="185" r="10" fill="#D4A0A8" opacity="0.5" />
        <circle cx="182" cy="185" r="16" fill="#E8D5B8" />
        <circle cx="182" cy="185" r="10" fill="#D4A0A8" opacity="0.5" />

        {/* Face */}
        {/* Eyes */}
        <circle cx="138" cy="210" r="4" fill="#3D2B1F" />
        <circle cx="162" cy="210" r="4" fill="#3D2B1F" />
        <circle cx="139" cy="208" r="1.5" fill="#FFFFFF" />
        <circle cx="163" cy="208" r="1.5" fill="#FFFFFF" />

        {/* Snout */}
        <ellipse cx="150" cy="225" rx="12" ry="9" fill="#F5ECE0" />
        <circle cx="150" cy="222" r="4" fill="#3D2B1F" />

        {/* Mouth */}
        <path d="M145 228 Q150 234 155 228" stroke="#3D2B1F" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Blush */}
        <ellipse cx="128" cy="222" rx="8" ry="5" fill="#D4A0A8" opacity="0.3" />
        <ellipse cx="172" cy="222" rx="8" ry="5" fill="#D4A0A8" opacity="0.3" />

        {/* Arms holding strings */}
        <path d="M110 260 Q95 240 120 210" stroke="#E8D5B8" strokeWidth="16" fill="none" strokeLinecap="round" />
        <path d="M190 260 Q205 240 180 210" stroke="#E8D5B8" strokeWidth="16" fill="none" strokeLinecap="round" />

        {/* Paws */}
        <ellipse cx="118" cy="208" rx="8" ry="6" fill="#E8D5B8" />
        <ellipse cx="182" cy="208" rx="8" ry="6" fill="#E8D5B8" />

        {/* Legs */}
        <ellipse cx="130" cy="325" rx="18" ry="12" fill="#E8D5B8" />
        <ellipse cx="170" cy="325" rx="18" ry="12" fill="#E8D5B8" />
        <ellipse cx="130" cy="327" rx="10" ry="6" fill="#F5ECE0" />
        <ellipse cx="170" cy="327" rx="10" ry="6" fill="#F5ECE0" />

        {/* Bow */}
        <path d="M138 248 Q150 240 162 248" fill="#D4A0A8" />
        <path d="M138 248 Q150 256 162 248" fill="#D4A0A8" />
        <circle cx="150" cy="248" r="5" fill="#B88A90" />
      </svg>
    </div>
  )
}
