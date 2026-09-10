// A placed order, persisted so the order/tracking screen is re-accessible after
// checkout (for both pickup and delivery).

import type { VendorGroup } from '../cart/selectors'

export type Fulfillment = 'pickup' | 'delivery'

export interface PlacedOrder {
  orderNo: string
  placedAt: string // ISO timestamp
  fulfillment: Fulfillment
  address?: string // delivery address, when fulfillment === 'delivery'
  groups: VendorGroup[] // snapshot of the cart at checkout
  itemCount: number
  vendorCount: number
  total: number
}

const KEY = 'grandlake-order-v1'

export function makeOrderNo(): string {
  return 'GL-' + Math.random().toString(36).slice(2, 8).toUpperCase()
}

export function saveOrder(order: PlacedOrder): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(order))
  } catch {
    // ignore quota / privacy-mode errors
  }
}

export function loadOrder(): PlacedOrder | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as PlacedOrder) : null
  } catch {
    return null
  }
}

export function clearOrder(): void {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}
