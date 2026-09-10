import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AppHeader } from '../components/AppHeader'
import { PhoneFrame } from '../components/PhoneFrame'
import { MarketBanner } from '../components/MarketBanner'
import { DoorDashBadge } from '../components/DoorDashBadge'
import { VendorGroupList } from '../components/VendorGroupList'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Spinner } from '../components/ui/spinner'
import { Field, FieldLabel, FieldDescription } from '../components/ui/field'
import { useCart } from '../cart/CartContext'
import { byVendor, totals as cartTotals } from '../cart/selectors'
import { CUSTOMER } from '../data/account'
import { formatPrice } from '../data/seed'
import { makeOrderNo, saveOrder } from '../order/orderStore'
import type { Fulfillment } from '../order/orderStore'
import { cn } from '@/lib/utils'

const OPTIONS: { value: Fulfillment; title: string; detail: string; badge?: boolean }[] = [
  {
    value: 'pickup',
    title: 'Pickup at AIM Booth',
    detail: 'Collect Saturday, 9am–2pm, at the AIM Booth',
  },
  {
    value: 'delivery',
    title: 'DoorDash Delivery',
    detail: 'Delivered Saturday, 9am–2pm',
    badge: true,
  },
]

/**
 * Delivery + payment step. Reached from the cart's "Place order" button; both
 * fulfillment options and payment live here, not on the cart.
 */
export function CheckoutScreen() {
  const navigate = useNavigate()
  const { qtys, clear } = useCart()
  const groups = byVendor(qtys)
  const totals = cartTotals(qtys)

  const [fulfillment, setFulfillment] = useState<Fulfillment>('pickup')
  const [address, setAddress] = useState(
    `${CUSTOMER.address.line1}, ${CUSTOMER.address.line2}`,
  )
  const [processing, setProcessing] = useState(false)

  const defaultCard = CUSTOMER.payments.find((p) => p.default)

  if (groups.length === 0) {
    return (
      <PhoneFrame>
        <AppHeader title="Checkout" backTo="/cart" backLabel="Back to cart" />
        <div className="phone__scroll">
          <p className="px-4 py-8 text-sm text-muted-foreground">
            Your cart is empty.{' '}
            <Link to="/shop" className="font-semibold text-foreground underline">
              Browse the market →
            </Link>
          </p>
        </div>
      </PhoneFrame>
    )
  }

  function placeOrder() {
    setProcessing(true)
    window.setTimeout(() => {
      saveOrder({
        orderNo: makeOrderNo(),
        placedAt: new Date().toISOString(),
        fulfillment,
        address: fulfillment === 'delivery' ? address : undefined,
        groups,
        itemCount: totals.itemCount,
        vendorCount: totals.vendorCount,
        total: totals.total,
      })
      clear()
      navigate('/order')
    }, 1600)
  }

  return (
    <PhoneFrame>
      <AppHeader title="Checkout" backTo="/cart" backLabel="Back to cart" />

      <div className="phone__scroll">
        <div className="pane">
        <MarketBanner />

        {/* Delivery options — both shown inline, no separate reveal step */}
        <section className="px-4 pb-4 pt-1">
          <h2 className="mb-2.5 text-[15px] font-bold">How do you want your order?</h2>
          <div className="grid gap-2.5">
            {OPTIONS.map((o) => (
              <div key={o.value}>
                <button
                  type="button"
                  data-testid="fulfillment-option"
                  aria-pressed={fulfillment === o.value}
                  onClick={() => setFulfillment(o.value)}
                  className={cn(
                    'flex w-full items-start gap-3 rounded-lg border bg-card p-3.5 text-left',
                    fulfillment === o.value && 'border-[1.5px] border-foreground bg-accent',
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      'mt-0.5 size-5 shrink-0 rounded-full border-2',
                      fulfillment === o.value
                        ? 'border-foreground shadow-[inset_0_0_0_4px_var(--foreground)]'
                        : 'border-input',
                    )}
                  />
                  <span className="flex flex-col gap-0.5">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      {o.title}
                      {o.badge && <DoorDashBadge />}
                    </span>
                    <span className="text-xs text-muted-foreground">{o.detail}</span>
                  </span>
                </button>

                {/* Inline address entry — only when DoorDash is selected */}
                {o.value === 'delivery' && fulfillment === 'delivery' && (
                  <div className="mt-2.5 rounded-lg border bg-card p-3.5">
                    <Field>
                      <FieldLabel htmlFor="delivery-address">Delivery address</FieldLabel>
                      <Input
                        id="delivery-address"
                        data-testid="delivery-address"
                        autoComplete="street-address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Street address, city, ZIP"
                      />
                      <FieldDescription>
                        Your DoorDash dasher delivers here during Saturday's market window.
                      </FieldDescription>
                    </Field>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Payment */}
        <section className="px-4 pb-4 pt-1">
          <h2 className="mb-2.5 text-[15px] font-bold">Payment</h2>
          <Field>
            <FieldLabel htmlFor="card-number">Card number</FieldLabel>
            <Input
              id="card-number"
              inputMode="numeric"
              autoComplete="cc-number"
              defaultValue={defaultCard ? `•••• •••• •••• ${defaultCard.last4}` : ''}
              placeholder="1234 5678 9012 3456"
            />
            <FieldDescription>
              {defaultCard
                ? `${defaultCard.brand} ending ${defaultCard.last4} — change in Account`
                : 'Prototype — no real payment is taken.'}
            </FieldDescription>
          </Field>
        </section>

        {/* Order summary (read-only) */}
        <section className="px-4 pb-4 pt-1">
          <h2 className="mb-2.5 text-[15px] font-bold">Your order</h2>
          <div className="overflow-hidden rounded-lg border">
            <VendorGroupList groups={groups} />
          </div>
        </section>
        </div>
      </div>

      <div className="border-t bg-background p-3">
        <div className="pane grid gap-2.5">
          <div className="flex items-baseline justify-between text-[13px] text-muted-foreground">
            <span>
              {totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'} · {totals.vendorCount}{' '}
              {totals.vendorCount === 1 ? 'vendor' : 'vendors'}
            </span>
            <strong className="text-lg text-foreground">{formatPrice(totals.total)}</strong>
          </div>
          <Button className="h-12 w-full" onClick={placeOrder} disabled={processing}>
            {processing ? (
              <>
                <Spinner /> Processing payment…
              </>
            ) : (
              'Place order'
            )}
          </Button>
        </div>
      </div>
    </PhoneFrame>
  )
}
