interface FullToteLogoProps {
  /** height of the mark in px; wordmark scales with it */
  size?: number
  /** hide the "FullTote" text, show only the FT mark */
  markOnly?: boolean
}

/** Simple FullTote wordmark: an "FT" mark tile + the name. */
export function FullToteLogo({ size = 40, markOnly = false }: FullToteLogoProps) {
  return (
    <span className="ftlogo" aria-label="FullTote">
      <span
        className="ftlogo__mark"
        aria-hidden="true"
        style={{ width: size, height: size, fontSize: size * 0.42, borderRadius: size * 0.28 }}
      >
        FT
      </span>
      {!markOnly && (
        <span className="ftlogo__word" style={{ fontSize: size * 0.62 }}>
          FullTote
        </span>
      )}
    </span>
  )
}
