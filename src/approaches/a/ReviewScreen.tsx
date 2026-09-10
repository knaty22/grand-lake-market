import { Link, useNavigate } from 'react-router-dom'

import { AppHeader } from '../../components/AppHeader'
import { PhoneFrame } from '../../components/PhoneFrame'
import { VendorGroupList } from '../../components/VendorGroupList'
import { useCart } from '../../cart/CartContext'
import { byVendor, totals as cartTotals } from '../../cart/selectors'
import { formatPrice } from '../../data/seed'
import './a.css'

export function ReviewScreen() {
  const navigate = useNavigate()
  const { qtys } = useCart('a')
  const groups = byVendor(qtys)
  const totals = cartTotals(qtys)

  if (groups.length === 0) {
    return (
      <PhoneFrame>
        <AppHeader title="Review order" backTo="/a/shop" backLabel="Back to shop" />
        <div className="phone__scroll">
          <p className="a-empty">
            Nothing to review. <Link to="/a/shop">Browse the market →</Link>
          </p>
        </div>
      </PhoneFrame>
    )
  }

  return (
    <PhoneFrame>
      <AppHeader title="Review order" backTo="/a/cart" backLabel="Back to cart" />

      <div className="phone__scroll">
        <VendorGroupList groups={groups} showPickup />
      </div>

      <div className="a-dock a-dock--review">
        <div className="a-dock__total">
          <span>
            {totals.vendorCount} {totals.vendorCount === 1 ? 'vendor' : 'vendors'} · {totals.itemCount}{' '}
            {totals.itemCount === 1 ? 'item' : 'items'}
          </span>
          <strong>{formatPrice(totals.total)}</strong>
        </div>
        <button
          type="button"
          className="btn btn--primary btn--block"
          onClick={() => navigate('/a/checkout')}
        >
          Checkout
        </button>
      </div>
    </PhoneFrame>
  )
}
