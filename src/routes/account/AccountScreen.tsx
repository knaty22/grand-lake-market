import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, CreditCard, MapPin, Receipt, Gift, Store } from 'lucide-react'

import { AppHeader } from '../../components/AppHeader'
import { PhoneFrame } from '../../components/PhoneFrame'
import { BottomNav } from '../../components/BottomNav'
import { Card } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { CUSTOMER } from '../../data/account'
import { loadOrder } from '../../order/orderStore'
import type { LucideIcon } from 'lucide-react'

export function AccountScreen() {
  const navigate = useNavigate()
  const order = loadOrder()
  const defaultCard = CUSTOMER.payments.find((p) => p.default)

  return (
    <PhoneFrame>
      <AppHeader title="Account" backTo="/shop" backLabel="Back" />

      <div className="phone__scroll pane p-4">
        <Card className="mb-5 flex items-center gap-3 p-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-foreground text-base font-bold text-white">
            {CUSTOMER.initials}
          </span>
          <div className="min-w-0">
            <div className="truncate font-semibold">{CUSTOMER.name}</div>
            <div className="truncate text-sm text-muted-foreground">{CUSTOMER.email}</div>
          </div>
        </Card>

        <div className="mb-5 overflow-hidden rounded-lg border">
          <Row
            icon={CreditCard}
            label="Payment methods"
            value={defaultCard ? `${defaultCard.brand} •••• ${defaultCard.last4}` : 'None saved'}
            onClick={() => navigate('/account/payments')}
          />
          <Row
            icon={MapPin}
            label="Saved address"
            value={CUSTOMER.address.line1}
            onClick={() => navigate('/account/address')}
          />
          <Row
            icon={Receipt}
            label="Order history"
            value={order ? `Order ${order.orderNo}` : 'No orders yet'}
            onClick={() => navigate(order ? '/order' : '/shop')}
          />
          <Row
            icon={Gift}
            label="Rewards"
            value={`${CUSTOMER.rewards.points} points`}
            onClick={() => navigate('/account/rewards')}
            last
          />
        </div>

        <Card className="p-0">
          <button
            type="button"
            onClick={() => navigate('/vendor')}
            className="flex w-full items-center gap-3 p-4 text-left"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Store className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold">Switch to Vendor view</span>
              <span className="block text-sm text-muted-foreground">
                Manage a stall — incoming orders &amp; inventory
              </span>
            </span>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
          </button>
        </Card>

        <div className="mt-6 text-center">
          <Button asChild variant="ghost" size="sm">
            <Link to="/login">Switch account</Link>
          </Button>
        </div>
      </div>

      <BottomNav />
    </PhoneFrame>
  )
}

function Row({
  icon: Icon,
  label,
  value,
  onClick,
  last,
}: {
  icon: LucideIcon
  label: string
  value: string
  onClick: () => void
  last?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'flex w-full items-center gap-3 bg-card px-4 py-3.5 text-left' +
        (last ? '' : ' border-b')
      }
    >
      <Icon className="size-[18px] shrink-0 text-muted-foreground" />
      <span className="flex-1 text-sm font-medium">{label}</span>
      <span className="max-w-[45%] truncate text-sm text-muted-foreground">{value}</span>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
    </button>
  )
}
