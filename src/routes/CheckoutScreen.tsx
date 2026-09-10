import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AppHeader } from '../components/AppHeader'
import { PhoneFrame } from '../components/PhoneFrame'
import { MarketBanner } from '../components/MarketBanner'
import { DoorDashBadge } from '../components/DoorDashBadge'
import { VendorGroupList } from '../components/VendorGroupList'
import { Button } from '../components/ui/button'
import { useCart } from '../cart/CartContext'
import { byVendor, totals as cartTotals } from '../cart/selectors'
import { formatPrice } from '../data/seed'
import { makeOrderNo, saveOrder } from '../order/orderStore'
import type { Fulfillment } from '../order/orderStore'
import { cn } from '../lib/utils'

export function CheckoutScreen() {
  const navigate = useNavigate()
  const { qtys, clear } = useCart()
  const groups = byVendor(qtys)
  const totals = cartTotals(qtys)
  const [fulfillment, setFulfillment] = useState<Fulfillment>('pickup')

  if (groups.length === 0) {
    return (
      <PhoneFrame>
        <AppHeader title="Checkout" backTo="/review" />
        <div className="phone__scroll">
          <p className="px-4 py-8 text-sm text-muted-foreground">
            Your cart is empty.{' '}
            <Link to="/shop" className="font-semibold text-brand-teal">
              Browse the market →
            </Link>
          </p>
        </div>
      </PhoneFrame>
    )
  }

  function placeOrder() {
    saveOrder({
      orderNo: makeOrderNo(),
      placedAt: new Date().toISOString(),
      fulfillment,
      groups,
      itemCount: totals.itemCount,
      vendorCount: totals.vendorCount,
      total: totals.total,
    })
    clear()
    navigate('/order')
  }

  return (
    <PhoneFrame>
      <AppHeader title="Checkout" backTo="/review" />

      <div className="phone__scroll">
        <MarketBanner />

        <section className="px-4 pb-4 pt-1">
          <h2 className="mb-2.5 text-[15px] font-bold">How do you want your order?</h2>
          <FulfillmentOption
            selected={fulfillment === 'pickup'}
            onSelect={() => setFulfillment('pickup')}
            title="Pickup at AIM Booth"
            detail="Collect Saturday, 9am–2pm, at the AIM Booth"
          />
          <FulfillmentOption
            selected={fulfillment === 'delivery'}
            onSelect={() => setFulfillment('delivery')}
            title="DoorDash Delivery"
            badge
            detail="Delivered Saturday, 9am–2pm"
          />
        </section>

        <section className="px-4 pb-4 pt-1">
          <h2 className="mb-2.5 text-[15px] font-bold">Your order</h2>
          <div className="overflow-hidden rounded-lg border">
            <VendorGroupList groups={groups} />
          </div>
        </section>
      </div>

      <div className="sticky bottom-0 grid gap-2.5 border-t bg-background p-3">
        <div className="flex items-baseline justify-between text-[13px] text-muted-foreground">
          <span>
            {totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'} · {totals.vendorCount}{' '}
            {totals.vendorCount === 1 ? 'vendor' : 'vendors'}
          </span>
          <strong className="text-lg text-foreground">{formatPrice(totals.total)}</strong>
        </div>
        <Button size="block" onClick={placeOrder}>
          Place order
        </Button>
      </div>
    </PhoneFrame>
  )
}

interface FulfillmentOptionProps {
  selected: boolean
  onSelect: () => void
  title: string
  detail: string
  badge?: boolean
}

function FulfillmentOption({ selected, onSelect, title, detail, badge }: FulfillmentOptionProps) {
  return (
    <button
      type="button"
      data-testid="fulfillment-option"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        'mb-2.5 flex w-full items-start gap-3 rounded-lg border bg-card p-3.5 text-left',
        selected && 'border-[1.5px] border-brand-teal bg-accent/60',
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'mt-0.5 size-5 shrink-0 rounded-full border-2',
          selected ? 'border-brand-teal shadow-[inset_0_0_0_4px_var(--brand-teal)]' : 'border-input',
        )}
      />
      <span className="flex flex-col gap-0.5">
        <span className="flex items-center gap-2 text-sm font-semibold">
          {title}
          {badge && <DoorDashBadge />}
        </span>
        <span className="text-xs text-muted-foreground">{detail}</span>
      </span>
    </button>
  )
}
