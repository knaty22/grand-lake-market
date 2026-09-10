import { Link } from 'react-router-dom'

import { AppHeader } from '../components/AppHeader'
import { PhoneFrame } from '../components/PhoneFrame'
import { DoorDashBadge } from '../components/DoorDashBadge'
import { VendorGroupList } from '../components/VendorGroupList'
import { Button } from '../components/ui/button'
import { formatPrice } from '../data/seed'
import { loadOrder } from '../order/orderStore'
import { cn } from '../lib/utils'

const STATUS_STEPS = ['Placed', 'Vendors notified', 'Ready Saturday'] as const

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

  const placedDate = new Date(order.placedAt).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
  const currentStep = 2 // placed + vendors notified done; "Ready Saturday" pending

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
              order.fulfillment === 'delivery' && 'border-doordash',
            )}
          >
            <span className="flex items-center gap-2 text-sm font-semibold">
              {order.fulfillment === 'delivery' ? (
                <>
                  DoorDash Delivery <DoorDashBadge />
                </>
              ) : (
                'Pickup at AIM Booth'
              )}
            </span>
            <span className="text-xs text-muted-foreground">
              {order.fulfillment === 'delivery' ? 'Delivered' : 'Collect'} Saturday, 9am–2pm
              {order.fulfillment === 'delivery' ? '' : ', at the AIM Booth'}
            </span>
          </div>
        </section>

        <section className="px-4 pb-3 pt-2">
          <ol>
            {STATUS_STEPS.map((label, i) => {
              const done = i < currentStep
              const current = i === currentStep
              return (
                <li key={label} className="relative flex gap-3 pb-[18px] last:pb-0">
                  {i < STATUS_STEPS.length - 1 && (
                    <span
                      className={cn(
                        'absolute left-[10px] top-[22px] bottom-0 w-0.5',
                        done ? 'bg-brand-teal' : 'bg-border',
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      'z-10 flex size-[22px] shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold text-white',
                      done && 'border-brand-teal bg-brand-teal',
                      current && 'border-brand-teal shadow-[inset_0_0_0_3px_var(--brand-teal)]',
                      !done && !current && 'border-border bg-background',
                    )}
                  >
                    {done ? '✓' : ''}
                  </span>
                  <span
                    className={cn(
                      'flex flex-col gap-px pt-px text-sm font-semibold',
                      !done && !current && 'text-muted-foreground',
                    )}
                  >
                    {label}
                    {label === 'Ready Saturday' && (
                      <span className="text-xs font-normal text-muted-foreground">
                        this Saturday · 9am–2pm
                      </span>
                    )}
                  </span>
                </li>
              )
            })}
          </ol>
        </section>

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
