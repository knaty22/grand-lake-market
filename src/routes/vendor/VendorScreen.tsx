import { useState } from 'react'
import { PackageOpen, Check } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import { AppHeader } from '../../components/AppHeader'
import { PhoneFrame } from '../../components/PhoneFrame'
import { Card } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../../components/ui/chart'
import type { ChartConfig } from '../../components/ui/chart'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import { DoorDashBadge } from '../../components/DoorDashBadge'
import { VENDOR } from '../../data/account'
import { formatPrice } from '../../data/seed'

const REVENUE = [
  { week: 'Aug 9', orders: 18, revenue: 420 },
  { week: 'Aug 16', orders: 21, revenue: 510 },
  { week: 'Aug 23', orders: 19, revenue: 465 },
  { week: 'Aug 30', orders: 24, revenue: 620 },
  { week: 'Sep 6', orders: 27, revenue: 690 },
  { week: 'Sep 13', orders: 29, revenue: 735 },
]
const chartConfig = {
  revenue: { label: 'Revenue', color: '#0a0a0a' },
} satisfies ChartConfig

/**
 * Vendor portal — UI-only stub. Incoming orders + a revenue chart with
 * placeholder data; Inventory marked "Coming soon". No real order/inventory logic.
 */
export function VendorScreen() {
  return (
    <PhoneFrame>
      <AppHeader title="Vendor view" backTo="/account" backLabel="Account" />

      <div className="border-b bg-background">
        <div className="pane px-4 pb-3">
          <div className="text-sm font-semibold">{VENDOR.stallName}</div>
          <div className="text-xs text-muted-foreground">
            {VENDOR.stallNo} · today's market · Sat 9am–2pm
          </div>
        </div>
      </div>

      <div className="phone__scroll pane p-4">
        <Tabs defaultValue="orders">
          <TabsList className="w-full">
            <TabsTrigger value="orders">Orders ({VENDOR.incomingOrders.length})</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
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

          <TabsContent value="revenue" className="grid gap-3">
            <Card className="p-4">
              <div className="text-xs font-medium text-muted-foreground">Last Saturday</div>
              <div className="text-2xl font-extrabold">{formatPrice(735)}</div>
              <div className="text-xs text-muted-foreground">+6.5% vs. the week before</div>
            </Card>
            <Card className="p-4">
              <div className="mb-3 text-[13px] font-bold">Revenue by market day</div>
              <ChartContainer config={chartConfig} className="h-[180px] w-full">
                <BarChart data={REVENUE} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="week"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    fontSize={11}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                </BarChart>
              </ChartContainer>
            </Card>
            <Card className="p-4">
              <div className="mb-2 text-[13px] font-bold">Sales by market day</div>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="px-2">Market day</TableHead>
                    <TableHead className="px-2 text-right">Orders</TableHead>
                    <TableHead className="px-2 text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...REVENUE].reverse().map((r) => (
                    <TableRow key={r.week} className="hover:bg-transparent">
                      <TableCell className="px-2 font-medium">Sat {r.week}</TableCell>
                      <TableCell className="px-2 text-right">{r.orders}</TableCell>
                      <TableCell className="px-2 text-right font-semibold">
                        {formatPrice(r.revenue)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            <p className="text-center text-xs text-muted-foreground">
              Prototype — revenue figures are placeholder data.
            </p>
          </TabsContent>

          <TabsContent value="inventory">
            <Card className="flex flex-col items-center gap-3 px-6 py-12 text-center">
              <PackageOpen className="size-8 text-muted-foreground" />
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold">Inventory</span>
                <Badge variant="outline">Coming soon</Badge>
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

function IncomingOrderCard({ order }: { order: (typeof VENDOR.incomingOrders)[number] }) {
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
        {isDelivery ? <DoorDashBadge /> : <Badge variant="outline">Pickup</Badge>}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{order.when}</div>
      <div className="mt-3">
        {ready ? (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
            <Check className="size-4" /> Marked ready
          </span>
        ) : (
          <Button variant="outline" size="sm" onClick={() => setReady(true)}>
            Mark ready
          </Button>
        )}
      </div>
    </Card>
  )
}
