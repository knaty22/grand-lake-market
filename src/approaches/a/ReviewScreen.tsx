import { Link, useNavigate } from 'react-router-dom'

import { AppHeader } from '../../components/AppHeader'
import { PhoneFrame } from '../../components/PhoneFrame'
import { VendorGroupList } from '../../components/VendorGroupList'
import { Button } from '../../components/ui/button'
import { useCart } from '../../cart/CartContext'
import { byVendor, totals as cartTotals } from '../../cart/selectors'
import { formatPrice } from '../../data/seed'

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
          <p className="px-4 py-8 text-sm text-muted-foreground">
            Nothing to review.{' '}
            <Link to="/a/shop" className="font-semibold text-brand-teal">
              Browse the market →
            </Link>
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

      <div className="sticky bottom-0 grid gap-2.5 border-t bg-background p-3">
        <div className="flex items-baseline justify-between text-[13px] text-muted-foreground">
          <span>
            {totals.vendorCount} {totals.vendorCount === 1 ? 'vendor' : 'vendors'} · {totals.itemCount}{' '}
            {totals.itemCount === 1 ? 'item' : 'items'}
          </span>
          <strong className="text-lg text-foreground">{formatPrice(totals.total)}</strong>
        </div>
        <Button size="block" onClick={() => navigate('/a/checkout')}>
          Checkout
        </Button>
      </div>
    </PhoneFrame>
  )
}
