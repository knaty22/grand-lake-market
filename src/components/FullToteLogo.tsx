interface FullToteLogoProps {
  size?: number
  markOnly?: boolean
}

/** Placeholder wordmark — replaced by the real Grand Lake logo in the rebrand step. */
export function FullToteLogo({ size = 40, markOnly = false }: FullToteLogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5" aria-label="FullTote">
      <span
        aria-hidden="true"
        className="inline-flex items-center justify-center bg-secondary font-bold tracking-wide text-secondary-foreground"
        style={{ width: size, height: size, fontSize: size * 0.42, borderRadius: size * 0.28 }}
      >
        FT
      </span>
      {!markOnly && (
        <span className="font-bold tracking-tight text-foreground" style={{ fontSize: size * 0.62 }}>
          FullTote
        </span>
      )}
    </span>
  )
}
