import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CircleUser } from 'lucide-react'

import { AppHeader } from '../../components/AppHeader'
import { PhoneFrame } from '../../components/PhoneFrame'
import { ProductThumb } from '../../components/ProductThumb'
import { QtyStepper } from '../../components/QtyStepper'
import { CartSummaryBar } from '../../components/CartSummaryBar'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Card } from '../../components/ui/card'
import { useCart } from '../../cart/CartContext'
import { totals as cartTotals } from '../../cart/selectors'
import { CATEGORIES, PRODUCTS, formatPrice, getVendor } from '../../data/seed'
import type { Category } from '../../data/seed'

type Filter = 'All' | Category

// Task 2 fix: users didn't know what to search for. Offer concrete examples in
// the placeholder and a row of popular searches when the field is empty.
const POPULAR_SEARCHES = ['Honey', 'Soap', 'Candles', 'Sourdough', 'Flowers', 'Tamales']

export function GridScreen() {
  const navigate = useNavigate()
  const { qtys, add, setQty } = useCart()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('All')

  const q = query.trim().toLowerCase()

  const visible = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (filter !== 'All' && p.category !== filter) return false
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        getVendor(p.vendorId).name.toLowerCase().includes(q)
      )
    })
  }, [q, filter])

  const totals = cartTotals(qtys)

  return (
    <PhoneFrame>
      <AppHeader
        title="Shop the whole market"
        backTo="/"
        backLabel="Back"
        action={
          <Link
            to="/account"
            aria-label="Account"
            className="flex size-10 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
          >
            <CircleUser className="size-6" />
          </Link>
        }
      />

      <div className="grid gap-2.5 border-b bg-background p-4">
        <Input
          type="search"
          placeholder='Search — try "honey", "soap", "candles"…'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search products"
          className="bg-muted"
        />

        {q === '' && (
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Popular searches
            </span>
            <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {POPULAR_SEARCHES.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="shrink-0 rounded-full border bg-background px-3 py-1.5 text-xs font-semibold"
                  onClick={() => setQuery(s.toLowerCase())}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div
          role="tablist"
          aria-label="Category filter"
          className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {(['All', ...CATEGORIES] as Filter[]).map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={filter === c}
              onClick={() => setFilter(c)}
              className={
                'shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold ' +
                (filter === c ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground')
              }
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="phone__scroll bg-[var(--app-bg)]">
        {visible.length === 0 && (
          <p className="px-4 py-8 text-sm text-muted-foreground">
            Nothing matches “{query}”. Try a popular search above, or a category.
          </p>
        )}
        <div className="grid grid-cols-2 gap-3.5 px-4 pb-32 pt-4">
          {visible.map((product) => {
            const qty = qtys[product.id] ?? 0
            return (
              <Card
                key={product.id}
                data-testid="product-card"
                className="flex flex-col overflow-hidden"
              >
                <ProductThumb product={product} className="h-[104px] w-full" />
                <div className="flex flex-col gap-0.5 p-3">
                  <div className="text-sm font-semibold leading-tight">{product.name}</div>
                  <div className="text-[13px] font-bold text-price">
                    {formatPrice(product.price)}{' '}
                    <span className="font-medium text-muted-foreground">/ {product.unit}</span>
                  </div>
                  <div className="text-[11px] font-medium text-muted-foreground">
                    {getVendor(product.vendorId).name}
                  </div>
                  <div className="mt-2">
                    {qty === 0 ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        data-testid="add-btn"
                        onClick={() => add(product.id)}
                        aria-label={`Add ${product.name}`}
                      >
                        + Add
                      </Button>
                    ) : (
                      <QtyStepper
                        qty={qty}
                        onDec={() => setQty(product.id, qty - 1)}
                        onInc={() => setQty(product.id, qty + 1)}
                        label={`quantity of ${product.name}`}
                      />
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {totals.itemCount > 0 && (
        <div className="sticky bottom-0 border-t bg-background p-3">
          <CartSummaryBar totals={totals} ctaLabel="View cart" onClick={() => navigate('/cart')} />
        </div>
      )}
    </PhoneFrame>
  )
}
