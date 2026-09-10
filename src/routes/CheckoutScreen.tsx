import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AppHeader } from '../components/AppHeader'
import { PhoneFrame } from '../components/PhoneFrame'
import { MarketBanner } from '../components/MarketBanner'
import { DoorDashBadge } from '../components/DoorDashBadge'
import { VendorGroupList } from '../components/VendorGroupList'
import { useCart } from '../cart/CartContext'
import type { ApproachKey } from '../cart/CartContext'
import { byVendor, totals as cartTotals } from '../cart/selectors'
import { formatPrice } from '../data/seed'
import { makeOrderNo, saveOrder } from '../order/orderStore'
import type { Fulfillment } from '../order/orderStore'
import './CheckoutScreen.css'

const BACK_TO: Record<ApproachKey, string> = { a: '/a/review', b: '/b/build' }

export function CheckoutScreen({ approach }: { approach: ApproachKey }) {
  const navigate = useNavigate()
  const { qtys, clear } = useCart(approach)
  const groups = byVendor(qtys)
  const totals = cartTotals(qtys)
  const [fulfillment, setFulfillment] = useState<Fulfillment>('pickup')

  if (groups.length === 0) {
    return (
      <PhoneFrame>
        <AppHeader title="Checkout" backTo={BACK_TO[approach]} />
        <div className="phone__scroll">
          <p className="checkout__empty">
            Your cart is empty. <Link to={`/${approach}`}>Start over →</Link>
          </p>
        </div>
      </PhoneFrame>
    )
  }

  function placeOrder() {
    saveOrder({
      orderNo: makeOrderNo(),
      approach,
      placedAt: new Date().toISOString(),
      fulfillment,
      groups,
      itemCount: totals.itemCount,
      vendorCount: totals.vendorCount,
      total: totals.total,
    })
    clear()
    navigate(`/${approach}/order`)
  }

  return (
    <PhoneFrame>
      <AppHeader title="Checkout" backTo={BACK_TO[approach]} />

      <div className="phone__scroll">
        <MarketBanner />

        <section className="checkout__section">
          <h2 className="checkout__h">How do you want your order?</h2>

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

        <section className="checkout__section">
          <h2 className="checkout__h">Your order</h2>
          <VendorGroupList groups={groups} />
        </section>
      </div>

      <div className="dock">
        <div className="dock__total">
          <span>
            {totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'} · {totals.vendorCount}{' '}
            {totals.vendorCount === 1 ? 'vendor' : 'vendors'}
          </span>
          <strong>{formatPrice(totals.total)}</strong>
        </div>
        <button type="button" className="btn btn--primary btn--block" onClick={placeOrder}>
          Place order
        </button>
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
      className={`fopt${selected ? ' fopt--on' : ''}`}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className={`fopt__radio${selected ? ' fopt__radio--on' : ''}`} aria-hidden="true" />
      <span className="fopt__body">
        <span className="fopt__title">
          {title}
          {badge && <DoorDashBadge />}
        </span>
        <span className="fopt__detail">{detail}</span>
      </span>
    </button>
  )
}
