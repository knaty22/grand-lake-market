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

  // SVG recreation — a turnip: yellow body, teal leaves, hand-lettered text.
  return (
    <svg
      viewBox="0 0 200 200"
      style={{ height }}
      className={cn('w-auto', className)}
      role="img"
      aria-label="Grand Lake Farmers Market"
    >
      {/* leaves */}
      <g fill="#008773">
        <path d="M92 60c-6-14-4-30 4-40 6 10 8 26 2 40z" />
        <path d="M96 62c8-12 22-20 36-20-4 12-16 24-32 26z" />
        <path d="M88 64c-12-6-22-18-24-32 12 2 26 12 32 28z" />
        <path d="M100 66c14-2 30 2 40 12-12 6-30 6-42-4z" />
        <path d="M84 70c-14 2-28 10-34 22 12 4 28 2 38-10z" />
      </g>
      {/* body */}
      <path
        d="M100 66c34 0 58 20 58 54 0 40-30 66-58 66s-58-24-58-62c0-36 24-58 58-58z"
        fill="#ffd800"
      />
      {/* wordmark */}
      <text
        x="100"
        y="120"
        textAnchor="middle"
        fontSize="30"
        fontWeight="800"
        fill="#ffffff"
        fontFamily="Inter, sans-serif"
      >
        GRAND
      </text>
      <text
        x="100"
        y="150"
        textAnchor="middle"
        fontSize="30"
        fontWeight="800"
        fill="#ffffff"
        fontFamily="Inter, sans-serif"
      >
        LAKE
      </text>
      <text
        x="100"
        y="170"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        letterSpacing="1"
        fill="#008773"
        fontFamily="Inter, sans-serif"
      >
        FARMERS MARKET
      </text>
    </svg>
  )
}
