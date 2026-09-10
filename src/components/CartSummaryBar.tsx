import { formatPrice } from '../data/seed'
import type { CartTotals } from '../cart/selectors'

interface CartSummaryBarProps {
  totals: CartTotals
  ctaLabel: string
  onClick: () => void
  disabled?: boolean
}

export function CartSummaryBar({ totals, ctaLabel, onClick, disabled }: CartSummaryBarProps) {
  const summary = `${totals.vendorCount} ${totals.vendorCount === 1 ? 'vendor' : 'vendors'} · ${totals.itemCount} ${totals.itemCount === 1 ? 'item' : 'items'}`

  return (
    <button
      type="button"
      data-testid="cart-bar"
      className="flex w-full items-center justify-between gap-3 rounded-lg bg-primary px-4 py-3 text-primary-foreground disabled:opacity-45"
      onClick={onClick}
      disabled={disabled}
      aria-label={`${ctaLabel}. ${summary}. ${formatPrice(totals.total)}`}
    >
      <span className="flex flex-col items-start">
        <span data-testid="cart-summary" className="text-xs font-medium opacity-80">
          {summary}
        </span>
        <span className="text-base font-bold">{formatPrice(totals.total)}</span>
      </span>
      <span className="rounded-md bg-background px-4 py-2 text-sm font-semibold text-foreground">
        {ctaLabel}
      </span>
    </button>
  )
}
