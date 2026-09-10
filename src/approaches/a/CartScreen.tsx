import { Link, useNavigate } from 'react-router-dom'

import { AppHeader } from '../../components/AppHeader'
import { PhoneFrame } from '../../components/PhoneFrame'
import { BottomNav } from '../../components/BottomNav'
import { VendorGroupList } from '../../components/VendorGroupList'
import { Button } from '../../components/ui/button'
import { useCart } from '../../cart/CartContext'
import { byVendor, totals as cartTotals } from '../../cart/selectors'
import { formatPrice } from '../../data/seed'

export function CartScreen() {
  const navigate = useNavigate()
  const { qtys, setQty, remove } = useCart()
  const groups = byVendor(qtys)
  const totals = cartTotals(qtys)

  if (groups.length === 0) {
    return (
      <PhoneFrame>
        <AppHeader title="Your cart" backTo="/shop" backLabel="Keep shopping" />
        <div className="phone__scroll">
          <p className="px-4 py-8 text-sm text-muted-foreground">
            Your cart is empty.{' '}
            <Link to="/shop" className="font-semibold text-foreground underline">
              Browse the market →
            </Link>
          </p>
        </div>
        <BottomNav />
      </PhoneFrame>
    )
  }

  return (
    <PhoneFrame>
      <AppHeader title="Your cart" backTo="/shop" backLabel="Keep shopping" />

      <div className="phone__scroll">
        <div className="pane">
          <p className="px-4 pb-1 pt-3.5 text-xs text-muted-foreground">
            {totals.vendorCount} {totals.vendorCount === 1 ? 'vendor' : 'vendors'} ·{' '}
            {totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'}
          </p>

          {/* Order summary — data table grouped by vendor */}
          <div className="overflow-hidden border-y">
            <VendorGroupList groups={groups} editable={{ setQty, remove }} showPickup />
          </div>

          <p className="px-4 py-3 text-xs text-muted-foreground">
            Choose pickup or DoorDash delivery and add payment on the next step.
          </p>
        </div>
      </div>

      {/* Order summary total + both CTAs stay on the cart screen */}
      <div className="border-t bg-background p-3">
        <div className="pane grid gap-2.5">
          <div className="flex items-baseline justify-between text-[13px] text-muted-foreground">
            <span>Total</span>
            <strong className="text-lg text-foreground">{formatPrice(totals.total)}</strong>
          </div>
          <Button className="h-12 w-full" onClick={() => navigate('/checkout')}>
            Place order
          </Button>
          <Button asChild variant="outline" className="h-11 w-full">
            <Link to="/shop">Keep shopping</Link>
          </Button>
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  )
}
