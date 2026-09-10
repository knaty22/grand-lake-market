import { Link, useNavigate } from 'react-router-dom'

import { AppHeader } from '../../components/AppHeader'
import { PhoneFrame } from '../../components/PhoneFrame'
import { VendorGroupList } from '../../components/VendorGroupList'
import { Button } from '../../components/ui/button'
import { useCart } from '../../cart/CartContext'
import { byVendor, totals as cartTotals } from '../../cart/selectors'
import { formatPrice } from '../../data/seed'

export function CartScreen() {
  const navigate = useNavigate()
  const { qtys, setQty, remove } = useCart('a')
  const groups = byVendor(qtys)
  const totals = cartTotals(qtys)

  return (
    <PhoneFrame>
      <AppHeader title="Your cart" backTo="/a/shop" backLabel="Keep shopping" />

      <div className="phone__scroll">
        {groups.length === 0 ? (
          <p className="px-4 py-8 text-sm text-muted-foreground">
            Your cart is empty.{' '}
            <Link to="/a/shop" className="font-semibold text-brand-teal">
              Browse the market →
            </Link>
          </p>
        ) : (
          <>
            <p className="px-4 pb-1 pt-3.5 text-xs text-muted-foreground">
              {totals.vendorCount} {totals.vendorCount === 1 ? 'vendor' : 'vendors'} ·{' '}
              {totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'} · one pickup
            </p>
            <VendorGroupList groups={groups} editable={{ setQty, remove }} showPickup />
          </>
        )}
      </div>

      {groups.length > 0 && (
        <div className="sticky bottom-0 grid gap-2.5 border-t bg-background p-3">
          <div className="flex items-baseline justify-between text-[13px] text-muted-foreground">
            <span>Total</span>
            <strong className="text-lg text-foreground">{formatPrice(totals.total)}</strong>
          </div>
          <Button size="block" onClick={() => navigate('/a/review')}>
            Review &amp; check out
          </Button>
        </div>
      )}
    </PhoneFrame>
  )
}
