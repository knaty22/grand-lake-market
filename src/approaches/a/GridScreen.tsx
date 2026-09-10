import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchIcon } from 'lucide-react'

import { AppHeader } from '../../components/AppHeader'
import { PhoneFrame } from '../../components/PhoneFrame'
import { BottomNav } from '../../components/BottomNav'
import { ProductThumb } from '../../components/ProductThumb'
import { QtyStepper } from '../../components/QtyStepper'
import { CartSummaryBar } from '../../components/CartSummaryBar'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { badgeVariants } from '../../components/ui/badge'
import { InputGroup, InputGroupInput, InputGroupAddon } from '../../components/ui/input-group'
import { useCart } from '../../cart/CartContext'
import { totals as cartTotals } from '../../cart/selectors'
import { CATEGORIES, PRODUCTS, formatPrice, getVendor } from '../../data/seed'
import type { Category } from '../../data/seed'
import { cn } from '@/lib/utils'

type Filter = 'All' | Category

// Research fix: users didn't know what to search for — concrete example
// placeholder plus a row of popular searches when the field is empty.
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
      <AppHeader title="Shop the whole market" backTo="/" backLabel="Back" />

      <div className="grid gap-2.5 border-b bg-background p-4">
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            type="search"
            placeholder='Search — try "honey", "soap", "candles"…'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
          />
        </InputGroup>

        {q === '' && (
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Popular searches
            </span>
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {POPULAR_SEARCHES.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={cn(badgeVariants({ variant: 'outline' }), 'shrink-0 cursor-pointer py-1.5')}
                  onClick={() => setQuery(s.toLowerCase())}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* category carousel */}
        <div
          role="tablist"
          aria-label="Category filter"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {(['All', ...CATEGORIES] as Filter[]).map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={filter === c}
              onClick={() => setFilter(c)}
              className={cn(
                badgeVariants({ variant: filter === c ? 'default' : 'outline' }),
                'shrink-0 cursor-pointer py-1.5',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="phone__scroll">
        {visible.length === 0 && (
          <p className="px-4 py-8 text-sm text-muted-foreground">
            Nothing matches “{query}”. Try a popular search above, or a category.
          </p>
        )}
        <div className="grid grid-cols-2 gap-3.5 px-4 pb-40 pt-4">
          {visible.map((product) => {
            const qty = qtys[product.id] ?? 0
            return (
              <Card
                key={product.id}
                data-testid="product-card"
                className="flex flex-col gap-0 overflow-hidden py-0"
              >
                <ProductThumb product={product} className="h-[104px] w-full" />
                <div className="flex flex-col gap-0.5 p-3">
                  <div className="text-sm font-semibold leading-tight">{product.name}</div>
                  <div className="text-[13px] font-bold">
                    {formatPrice(product.price)}{' '}
                    <span className="font-medium text-muted-foreground">/ {product.unit}</span>
                  </div>
                  <div className="text-[11px] font-medium text-muted-foreground">
                    {getVendor(product.vendorId).name}
                  </div>
                  <div className="mt-2">
                    {qty === 0 ? (
                      <Button
                        size="sm"
                        className="w-full"
                        data-testid="add-btn"
                        onClick={() => add(product.id)}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        Add to cart
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
        <div className="border-t bg-background p-3">
          <CartSummaryBar totals={totals} ctaLabel="View cart" onClick={() => navigate('/cart')} />
        </div>
      )}

      <BottomNav />
    </PhoneFrame>
  )
}
