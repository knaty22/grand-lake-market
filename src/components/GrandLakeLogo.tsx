import { useState } from 'react'
import { cn } from '@/lib/utils'

interface GrandLakeLogoProps {
  /** rendered height of the logo in px */
  height?: number
  className?: string
}

/**
 * Grand Lake Farmers Market logo. Uses the real logo image from
 * /public/grandlake-logo.png; falls back to an SVG recreation if it's missing.
 * The logo keeps its own colours — it's an allowed exception to the B&W system.
 */
export function GrandLakeLogo({ height = 128, className }: GrandLakeLogoProps) {
  const [failed, setFailed] = useState(false)

  if (!failed) {
    return (
      <img
        src="/grandlake-logo.png"
        alt="Grand Lake Farmers Market"
        style={{ height }}
        className={cn('w-auto object-contain', className)}
        onError={() => setFailed(true)}
      />
    )
  }

  // SVG recreation of the real logo — a turnip: irregular yellow body, teal
  // leaf cluster sprouting top-left, hand-lettered white "GRAND LAKE" tilted
  // slightly, teal "FARMERS MARKET" beneath.
  return (
    <svg
      viewBox="0 0 200 200"
      style={{ height }}
      className={cn('w-auto', className)}
      role="img"
      aria-label="Grand Lake Farmers Market"
    >
      {/* leaf cluster, top-left */}
      <g fill="#0f8074">
        <path d="M78 74c-16-2-30-12-38-26 15-4 33 0 44 14z" />
        <path d="M82 68c-10-14-12-32-6-48 12 9 20 27 16 46z" />
        <path d="M90 66c2-17 13-32 30-40 3 15-2 34-18 44z" />
        <path d="M92 72c12-11 29-16 46-13-6 14-22 25-42 22z" />
        <path d="M74 84c-14 3-27 13-33 27 14 3 30-1 40-15z" />
        <path d="M86 80l6-14 6 14-6 6z" fill="#ffffff" opacity="0.15" />
      </g>
      {/* turnip body — deliberately lumpy */}
      <path
        d="M100 66c22-1 41 9 50 27 8 16 6 37-4 53-11 17-30 27-47 25-19-2-36-16-42-37-5-19-1-42 13-56 8-8 19-12 30-12z"
        fill="#ffd800"
      />
      {/* little root tail, lower-right */}
      <path d="M147 156c9 3 16 9 20 18-11 1-21-4-26-13z" fill="#ffd800" />
      {/* wordmark, tilted like the hand lettering */}
      <g
        transform="rotate(-7 100 120)"
        fill="#ffffff"
        fontFamily="'Trebuchet MS', 'Segoe UI', Inter, sans-serif"
        fontWeight="800"
        textAnchor="middle"
      >
        <text x="100" y="120" fontSize="30">
          GRAND
        </text>
        <text x="100" y="150" fontSize="34">
          LAKE
        </text>
      </g>
      <text
        x="100"
        y="172"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        letterSpacing="1.5"
        fill="#0f8074"
        fontFamily="'Trebuchet MS', 'Segoe UI', Inter, sans-serif"
      >
        FARMERS MARKET
      </text>
    </svg>
  )
}
