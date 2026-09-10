import { Link } from 'react-router-dom'

import { AppHeader } from '../components/AppHeader'
import { PhoneFrame } from '../components/PhoneFrame'
import { DoorDashBadge } from '../components/DoorDashBadge'
import { VendorGroupList } from '../components/VendorGroupList'
import type { ApproachKey } from '../cart/CartContext'
import { formatPrice } from '../data/seed'
import { loadOrder } from '../order/orderStore'
import './OrderScreen.css'

const STATUS_STEPS = ['Placed', 'Vendors notified', 'Ready Saturday'] as const

export function OrderScreen({ approach }: { approach: ApproachKey }) {
  const order = loadOrder(approach)

  if (!order) {
    return (
      <PhoneFrame>
        <AppHeader title="Your order" backTo={`/${approach}`} />
        <div className="phone__scroll">
          <p className="order__empty">
            No recent order. <Link to={`/${approach}`}>Start a new order →</Link>
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
  // In this prototype the order is always freshly placed: it's been placed and
  // vendors have been notified; "Ready Saturday" is what's still pending.
  const currentStep = 2

  return (
    <PhoneFrame>
      <AppHeader title="Your order" backTo={`/${approach}`} />

      <div className="phone__scroll">
        <div className="order__head">
          <div className="order__no">Order {order.orderNo}</div>
          <div className="order__placed">Placed {placedDate}</div>
        </div>

        <section className="order__section">
          <div
            className={`order__fulfil${order.fulfillment === 'delivery' ? ' order__fulfil--dd' : ''}`}
          >
            <span className="order__fulfil-title">
              {order.fulfillment === 'delivery' ? (
                <>
                  DoorDash Delivery <DoorDashBadge />
                </>
              ) : (
                'Pickup at AIM Booth'
              )}
            </span>
            <span className="order__fulfil-when">
              {order.fulfillment === 'delivery' ? 'Delivered' : 'Collect'} Saturday, 9am–2pm
              {order.fulfillment === 'delivery' ? '' : ', at the AIM Booth'}
            </span>
          </div>
        </section>

        <section className="order__section">
          <ol className="statusbar">
            {STATUS_STEPS.map((label, i) => {
              const state = i < currentStep ? 'done' : i === currentStep ? 'current' : 'todo'
              return (
                <li key={label} className={`statusbar__step statusbar__step--${state}`}>
                  <span className="statusbar__dot">{state === 'done' ? '✓' : ''}</span>
                  <span className="statusbar__label">
                    {label}
                    {label === 'Ready Saturday' && (
                      <span className="statusbar__sub">this Saturday · 9am–2pm</span>
                    )}
                  </span>
                </li>
              )
            })}
          </ol>
        </section>

        <section className="order__section">
          <h2 className="order__h">
            {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'} from {order.vendorCount}{' '}
            {order.vendorCount === 1 ? 'vendor' : 'vendors'} · {formatPrice(order.total)}
          </h2>
          <VendorGroupList groups={order.groups} />
        </section>
      </div>

      <div className="dock">
        <Link to={`/${approach}`} className="btn btn--primary btn--block">
          Done
        </Link>
      </div>
    </PhoneFrame>
  )
}
