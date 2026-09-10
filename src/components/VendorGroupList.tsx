// Renders the cart grouped by vendor with per-vendor subtotals.
// This is the shared component behind the critical job: "check cart contents
// across vendors before paying."

import { formatPrice } from '../data/seed'
import type { VendorGroup } from '../cart/selectors'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select'

const QTY_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

interface VendorGroupListProps {
  groups: VendorGroup[]
  /** when set, each line gets a quantity Select + remove control */
  editable?: {
    setQty: (productId: string, qty: number) => void
    remove: (productId: string) => void
  }
  /** show the vendor's stall under its name */
  showPickup?: boolean
}

export function VendorGroupList({ groups, editable, showPickup }: VendorGroupListProps) {
  return (
    <div data-testid="vendor-groups">
      {groups.map((group) => (
        <section key={group.vendor.id} aria-label={group.vendor.name}>
          <div className="flex items-baseline justify-between gap-2 bg-muted px-4 py-2">
            <div>
              <div data-testid="vendor-name" className="text-[13px] font-bold">
                {group.vendor.name}
              </div>
              {showPickup && (
                <div className="text-[11px] text-muted-foreground">{group.vendor.stall}</div>
              )}
            </div>
            <div className="text-xs font-semibold">subtotal {formatPrice(group.subtotal)}</div>
          </div>

          {group.items.map(({ product, qty, lineTotal }) => (
            <div
              data-testid="cart-line"
              className="flex items-center gap-3 border-b px-4 py-2.5"
              key={product.id}
            >
              {editable ? (
                <Select
                  value={String(qty)}
                  onValueChange={(v) => editable.setQty(product.id, Number(v))}
                >
                  <SelectTrigger
                    size="sm"
                    className="w-[62px]"
                    aria-label={`quantity of ${product.name}`}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {QTY_OPTIONS.map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <span className="text-sm font-semibold text-muted-foreground">{qty}×</span>
              )}
              <span data-testid="line-name" className="flex-1 text-sm">
                {product.name}
              </span>
              <span className="text-[13px] font-semibold">{formatPrice(lineTotal)}</span>
              {editable && (
                <button
                  type="button"
                  data-testid="remove-item"
                  className="p-1 text-xs text-muted-foreground underline"
                  onClick={() => editable.remove(product.id)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
