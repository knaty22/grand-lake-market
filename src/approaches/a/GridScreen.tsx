import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchIcon, XIcon } from 'lucide-react'

import { AppHeader } from '../../components/AppHeader'
import { PhoneFrame } from '../../components/PhoneFrame'
import { BottomNav } from '../../components/BottomNav'
import { ProductThumb } from '../../components/ProductThumb'
import { QtyStepper } from '../../components/QtyStepper'
import { CartSummaryBar } from '../../components/CartSummaryBar'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { badgeVariants } from '../../components/ui/badge'
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from '../../components/ui/input-group'
import { useCart } from '../../cart/CartContext'
import { totals as cartTotals } from '../../cart/selectors'
import { CATEGORIES, PRODUCTS, formatPrice, getVendor } from '../../data/seed'
import type { Category } from '../../data/seed'
import { cn } from '@/lib/utils'

type Filter = 'All' | Category

export function GridScreen() {
  const navigate = useNavigate()
  const { qtys, add, setQty } = useCart()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('All')

  const q = query.trim().toLowerCase()

  // A search term and a category filter must never fight each other and leave
  // the shopper stranded: typing a search clears the active category, and
  // tapping a category clears the search term. Either control always works.
  function runSearch(next: string) {
    setQuery(next)
    if (next.trim()) setFilter('All')
  }
  function pickCategory(c: Filter) {
    setFilter(c)
    setQuery('')
  }

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

      <div className="border-b bg-background">
      <div className="pane grid gap-2.5 p-4">
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            type="search"
            placeholder="Search"
            value={query}
            onChange={(e) => runSearch(e.target.value)}
            aria-label="Search products"
          />
          {query !== '' && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                type="button"
                size="icon-xs"
                aria-label="Clear search"
                onClick={() => setQuery('')}
              >
                <XIcon />
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>

        {/* category carousel — single scrolling row, always available even
            while a search term is showing */}
        <div
          role="tablist"
          aria-label="Category filter"
          className="-mx-4 flex flex-nowrap gap-2 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {(['All', ...CATEGORIES] as Filter[]).map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={filter === c && q === ''}
              onClick={() => pickCategory(c)}
              className={cn(
                badgeVariants({
                  variant: filter === c && q === '' ? 'default' : 'outline',
                }),
                'shrink-0 cursor-pointer py-1.5',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      </div>

      <div className="phone__scroll pane">
        {visible.length === 0 && (
          <p className="px-4 py-8 text-sm text-muted-foreground">
            Nothing matches “{query}”.{' '}
            <button
              type="button"
              className="font-semibold text-foreground underline"
              onClick={() => setQuery('')}
            >
              Clear search
            </button>{' '}
            or pick a category above.
          </p>
        )}
        <div className="grid grid-cols-2 gap-3.5 px-4 pb-28 pt-4 md:grid-cols-3">
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
          <div className="pane">
            <CartSummaryBar totals={totals} ctaLabel="View cart" onClick={() => navigate('/cart')} />
          </div>
        </div>
      )}

      <BottomNav />
    </PhoneFrame>
  )
}
