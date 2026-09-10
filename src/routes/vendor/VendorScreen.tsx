import { useState } from 'react'
import { PackageOpen, Check } from 'lucide-react'

import { AppHeader } from '../../components/AppHeader'
import { PhoneFrame } from '../../components/PhoneFrame'
import { Card } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs'
import { DoorDashBadge } from '../../components/DoorDashBadge'
import { VENDOR } from '../../data/account'

/**
 * Vendor portal — UI-only stub. "Incoming orders" shows placeholder orders;
 * "Inventory" is marked Coming soon. No real order/inventory logic.
 */
export function VendorScreen() {
  return (
    <PhoneFrame>
      <AppHeader title="Vendor view" backTo="/account" backLabel="Account" />

      <div className="border-b bg-background px-4 pb-3">
        <div className="text-sm font-semibold">{VENDOR.stallName}</div>
        <div className="text-xs text-muted-foreground">
          {VENDOR.stallNo} · today's market · Sat 9am–2pm
        </div>
      </div>

      <div className="phone__scroll p-4">
        <Tabs defaultValue="orders">
          <TabsList className="w-full">
            <TabsTrigger value="orders">Incoming orders ({VENDOR.incomingOrders.length})</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="grid gap-3">
            {VENDOR.incomingOrders.map((o) => (
              <IncomingOrderCard key={o.id} order={o} />
            ))}
            <p className="text-center text-xs text-muted-foreground">
              Prototype — orders are placeholder data.
            </p>
          </TabsContent>

          <TabsContent value="inventory">
            <Card className="flex flex-col items-center gap-3 px-6 py-12 text-center">
              <PackageOpen className="size-8 text-muted-foreground" />
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold">Inventory</span>
                <Badge variant="soft">Coming soon</Badge>
              </div>
              <p className="max-w-[16rem] text-sm text-muted-foreground">
                Track stock levels and automatically hide sold-out items from shoppers.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PhoneFrame>
  )
}

function IncomingOrderCard({
  order,
}: {
  order: (typeof VENDOR.incomingOrders)[number]
}) {
  const [ready, setReady] = useState(false)
  const isDelivery = order.fulfillment === 'DoorDash'

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-sm font-bold">{order.id}</div>
          <div className="text-xs text-muted-foreground">
            {order.items} {order.items === 1 ? 'item' : 'items'} · {order.customer}
          </div>
        </div>
        {isDelivery ? (
          <DoorDashBadge />
        ) : (
          <Badge variant="outline">Pickup</Badge>
        )}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{order.when}</div>
      <div className="mt-3">
        {ready ? (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal">
            <Check className="size-4" /> Marked ready
          </span>
        ) : (
          <Button variant="secondary" size="sm" onClick={() => setReady(true)}>
            Mark ready
          </Button>
        )}
      </div>
    </Card>
  )
}
