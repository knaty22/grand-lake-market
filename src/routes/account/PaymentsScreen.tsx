import { CreditCard, Plus } from 'lucide-react'

import { AppHeader } from '../../components/AppHeader'
import { PhoneFrame } from '../../components/PhoneFrame'
import { Card } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { CUSTOMER } from '../../data/account'

export function PaymentsScreen() {
  return (
    <PhoneFrame>
      <AppHeader title="Payment methods" backTo="/account" backLabel="Account" />
      <div className="phone__scroll grid content-start gap-3 p-4">
        {CUSTOMER.payments.map((p) => (
          <Card key={p.id} className="flex items-center gap-3 p-4">
            <CreditCard className="size-5 shrink-0 text-muted-foreground" />
            <div className="flex-1">
              <div className="text-sm font-semibold">
                {p.brand} •••• {p.last4}
              </div>
              <div className="text-xs text-muted-foreground">Expires {p.exp}</div>
            </div>
            {p.default && <Badge variant="soft">Default</Badge>}
          </Card>
        ))}
        <Button variant="outline" size="block" disabled>
          <Plus className="size-4" /> Add a card
        </Button>
        <p className="text-center text-xs text-muted-foreground">Prototype — cards are placeholders.</p>
      </div>
    </PhoneFrame>
  )
}
