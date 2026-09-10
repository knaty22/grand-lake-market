import { Badge } from './ui/badge'

/** "DOORDASH" badge — keeps DoorDash brand red (#FF3008), never themed. */
export function DoorDashBadge() {
  return (
    <Badge variant="doordash" aria-label="DoorDash" data-testid="doordash-badge">
      DOORDASH
    </Badge>
  )
}
