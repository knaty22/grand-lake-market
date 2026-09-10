import { useState } from 'react'
import { cn } from '@/lib/utils'

interface GrandLakeLogoProps {
  /** rendered height of the logo in px */
  height?: number
  className?: string
}

/**
 * Grand Lake Farmers Market logo. Uses the real logo image from
 * /public/grandlake-logo.png; falls back to a text wordmark if it's missing.
 */
export function GrandLakeLogo({ height = 64, className }: GrandLakeLogoProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        className={cn('inline-flex flex-col items-center leading-tight', className)}
        aria-label="Grand Lake Farmers Market"
      >
        <span className="text-lg font-extrabold tracking-tight text-brand-teal">GRAND LAKE</span>
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">
          Farmers Market
        </span>
      </span>
    )
  }

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
