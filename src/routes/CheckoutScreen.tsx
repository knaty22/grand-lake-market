import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

import { AppHeader } from '../components/AppHeader'
import { PhoneFrame } from '../components/PhoneFrame'
import { MarketBanner } from '../components/MarketBanner'
import { DoorDashBadge } from '../components/DoorDashBadge'
import { VendorGroupList } from '../components/VendorGroupList'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Spinner } from '../components/ui/spinner'
import { Field, FieldLabel, FieldDescription } from '../components/ui/field'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '../components/ui/drawer'
import { useCart } from '../cart/CartContext'
import { byVendor, totals as cartTotals } from '../cart/selectors'
import { CUSTOMER } from '../data/account'
import { formatPrice } from '../data/seed'
import { makeOrderNo, saveOrder } from '../order/orderStore'
import type { Fulfillment } from '../order/orderStore'
import { cn } from '@/lib/utils'

const OPTIONS: {
  value: Fulfillment
  title: string
  detail: string
  badge?: boolean
}[] = [
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

export function CheckoutScreen() {
  const navigate = useNavigate()
  const { qtys, clear } = useCart()
  const groups = byVendor(qtys)
  const totals = cartTotals(qtys)
  const [fulfillment, setFulfillment] = useState<Fulfillment>('pickup')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [processing, setProcessing] = useState(false)

  const defaultCard = CUSTOMER.payments.find((p) => p.default)
  const chosen = OPTIONS.find((o) => o.value === fulfillment)!

  if (groups.length === 0) {
    return (
      <PhoneFrame>
        <AppHeader title="Checkout" backTo="/review" />
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
      <AppHeader title="Checkout" backTo="/review" />

      <div className="phone__scroll">
        <MarketBanner />

        <section className="px-4 pb-4 pt-1">
          <h2 className="mb-2.5 text-[15px] font-bold">How do you want your order?</h2>
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <button
                type="button"
                data-testid="fulfillment-trigger"
                className="flex w-full items-center gap-3 rounded-lg border bg-card p-3.5 text-left"
              >
                <span className="flex-1">
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    {chosen.title}
                    {chosen.badge && <DoorDashBadge />}
                  </span>
                  <span className="text-xs text-muted-foreground">{chosen.detail}</span>
                </span>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Delivery options</DrawerTitle>
              </DrawerHeader>
              <div className="grid gap-2.5 p-4 pt-0">
                {OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    data-testid="fulfillment-option"
                    aria-pressed={fulfillment === o.value}
                    onClick={() => {
                      setFulfillment(o.value)
                      setDrawerOpen(false)
                    }}
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
                ))}
                <DrawerClose asChild>
                  <Button variant="outline" className="mt-1 w-full">
                    Done
                  </Button>
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
        </section>

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
    </PhoneFrame>
  )
}
