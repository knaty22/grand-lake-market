import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface AppHeaderProps {
  title: string
  backTo?: string
  backLabel?: string
  /** optional action rendered on the right (e.g. an account button) */
  action?: ReactNode
}

export function AppHeader({ title, backTo, backLabel = 'Back', action }: AppHeaderProps) {
  return (
    <header className="border-b bg-background px-4 pb-3 pt-3.5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          {backTo ? (
            <Link
              to={backTo}
              className="mb-1.5 inline-block text-[13px] font-semibold text-muted-foreground"
            >
              ← {backLabel}
            </Link>
          ) : (
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Grand Lake Farmers Market
            </span>
          )}
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </header>
  )
}
