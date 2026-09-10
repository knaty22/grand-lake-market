import { Link, useLocation } from 'react-router-dom'
import { Home, Search, ShoppingCart, CircleUser } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { useCart } from '../cart/CartContext'
import { totals as cartTotals } from '../cart/selectors'
import { cn } from '@/lib/utils'

const ITEMS: { to: string; label: string; icon: LucideIcon }[] = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/shop', label: 'Search', icon: Search },
  { to: '/cart', label: 'Cart', icon: ShoppingCart },
  { to: '/account', label: 'Account', icon: CircleUser },
]

export function BottomNav() {
  const { pathname } = useLocation()
  const { qtys } = useCart()
  const count = cartTotals(qtys).itemCount

  return (
    <nav className="flex shrink-0 items-stretch border-t bg-background">
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active =
          to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(to + '/')
        return (
          <Link
            key={to}
            to={to}
            aria-label={label}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'relative flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-medium',
              active ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            <Icon className="size-5" strokeWidth={active ? 2.5 : 2} />
            {label}
            {to === '/cart' && count > 0 && (
              <span className="absolute right-1/2 top-1 -mr-4 flex min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[9px] font-bold text-background">
                {count}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
