// A placed order, persisted so the order/tracking screen is re-accessible after
// checkout (for both pickup and delivery). One stored order per approach.

import type { VendorGroup } from '../cart/selectors'
import type { ApproachKey } from '../cart/CartContext'

export type Fulfillment = 'pickup' | 'delivery'

export interface PlacedOrder {
  orderNo: string
  approach: ApproachKey
  placedAt: string // ISO timestamp
  fulfillment: Fulfillment
  groups: VendorGroup[] // snapshot of the cart at checkout
  itemCount: number
  vendorCount: number
  total: number
}

const key = (approach: ApproachKey) => `fulltote-order-${approach}`

export function makeOrderNo(): string {
  return 'FT-' + Math.random().toString(36).slice(2, 8).toUpperCase()
}

export function saveOrder(order: PlacedOrder): void {
  try {
    localStorage.setItem(key(order.approach), JSON.stringify(order))
  } catch {
    // ignore quota / privacy-mode errors
  }
}

export function loadOrder(approach: ApproachKey): PlacedOrder | null {
  try {
    const raw = localStorage.getItem(key(approach))
    return raw ? (JSON.parse(raw) as PlacedOrder) : null
  } catch {
    return null
  }
}

export function clearOrder(approach: ApproachKey): void {
  try {
    localStorage.removeItem(key(approach))
  } catch {
    // ignore
  }
}
