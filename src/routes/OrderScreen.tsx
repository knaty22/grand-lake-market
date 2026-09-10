import { Link } from 'react-router-dom'

import { AppHeader } from '../components/AppHeader'
import { PhoneFrame } from '../components/PhoneFrame'
import { DoorDashBadge } from '../components/DoorDashBadge'
import { VendorGroupList } from '../components/VendorGroupList'
import { DeliveryMap } from '../components/DeliveryMap'
import { Button } from '../components/ui/button'
import { formatPrice } from '../data/seed'
import { loadOrder } from '../order/orderStore'
import { cn } from '../lib/utils'

export function OrderScreen() {
  const order = loadOrder()

  if (!order) {
    return (
      <PhoneFrame>
        <AppHeader title="Your order" backTo="/" />
        <div className="phone__scroll">
          <p className="px-4 py-8 text-sm text-muted-foreground">
            No recent order.{' '}
            <Link to="/shop" className="font-semibold text-brand-teal">
              Start a new order →
            </Link>
          </p>
        </div>
      </PhoneFrame>
    )
  }

  const isDelivery = order.fulfillment === 'delivery'
  const placedDate = new Date(order.placedAt).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  // 4-step status. In this prototype the order sits at "Preparing" (step index 1).
  const steps = ['Received', 'Preparing', 'Ready', isDelivery ? 'Delivery' : 'Pickup']
  const currentStep = 1

  return (
    <PhoneFrame>
      <AppHeader title="Your order" backTo="/" />

      <div className="phone__scroll">
        <div className="px-4 pb-2 pt-4">
          <div data-testid="order-number" className="text-xl font-bold">
            Order {order.orderNo}
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground">Placed {placedDate}</div>
        </div>

        <section className="px-4 pb-3 pt-2">
          <div
            className={cn(
              'flex flex-col gap-1 rounded-lg border bg-card p-3.5',
              isDelivery && 'border-doordash',
            )}
          >
            <span className="flex items-center gap-2 text-sm font-semibold">
              {isDelivery ? (
                <>
                  DoorDash Delivery <DoorDashBadge />
                </>
              ) : (
                'Pickup at AIM Booth'
              )}
            </span>
            <span className="text-xs text-muted-foreground">
              {isDelivery ? 'Delivered' : 'Collect'} Saturday, 9am–2pm
              {isDelivery ? '' : ', at the AIM Booth'}
            </span>
          </div>
        </section>

        {/* Numbered status stepper — the primary status source */}
        <section className="px-4 pb-3 pt-2">
          <ol
            data-testid="status-stepper"
            className="flex items-start justify-between text-center"
          >
            {steps.map((label, i) => {
              const done = i < currentStep
              const current = i === currentStep
              return (
                <li key={label} className="relative flex flex-1 flex-col items-center gap-1.5">
                  {i < steps.length - 1 && (
                    <span
                      className={cn(
                        'absolute left-1/2 top-[13px] h-0.5 w-full',
                        done ? 'bg-brand-teal' : 'bg-border',
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      'z-10 flex size-7 items-center justify-center rounded-full border-2 text-xs font-bold',
                      done && 'border-brand-teal bg-brand-teal text-white',
                      current && 'border-brand-teal bg-background text-brand-teal',
                      !done && !current && 'border-border bg-background text-muted-foreground',
                    )}
                  >
                    {done ? '✓' : i + 1}
                  </span>
                  <span
                    className={cn(
                      'text-[11px] font-semibold leading-tight',
                      !done && !current && 'text-muted-foreground',
                    )}
                  >
                    {label}
                  </span>
                </li>
              )
            })}
          </ol>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            {steps[currentStep]} — ready this Saturday, 9am–2pm
          </p>
        </section>

        {/* Live delivery map — visual addition, DoorDash orders only */}
        {isDelivery && (
          <section className="px-4 pb-3 pt-1">
            <div className="mb-2 flex items-center gap-2 text-[13px] font-bold text-muted-foreground">
              <DoorDashBadge /> Live delivery tracking
            </div>
            <DeliveryMap />
          </section>
        )}

        <section className="px-4 pb-4 pt-2">
          <h2 className="mb-2 text-[13px] font-bold text-muted-foreground">
            {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'} from {order.vendorCount}{' '}
            {order.vendorCount === 1 ? 'vendor' : 'vendors'} · {formatPrice(order.total)}
          </h2>
          <div className="overflow-hidden rounded-lg border">
            <VendorGroupList groups={order.groups} />
          </div>
        </section>
      </div>

      <div className="sticky bottom-0 border-t bg-background p-3">
        <Button asChild size="block">
          <Link to="/">Done</Link>
        </Button>
      </div>
    </PhoneFrame>
  )
}
