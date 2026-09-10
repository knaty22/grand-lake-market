import { MapPin } from 'lucide-react'

import { AppHeader } from '../../components/AppHeader'
import { PhoneFrame } from '../../components/PhoneFrame'
import { Card } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { CUSTOMER } from '../../data/account'

export function AddressScreen() {
  return (
    <PhoneFrame>
      <AppHeader title="Saved address" backTo="/account" backLabel="Account" />
      <div className="phone__scroll pane grid content-start gap-3 p-4">
        <Card className="flex items-start gap-3 p-4">
          <MapPin className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
          <div>
            <div className="text-sm font-semibold">Delivery address</div>
            <div className="mt-0.5 text-sm text-muted-foreground">
              {CUSTOMER.address.line1}
              <br />
              {CUSTOMER.address.line2}
            </div>
          </div>
        </Card>
        <Button variant="outline" size="block" disabled>
          Edit address
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Used for DoorDash delivery. Prototype — placeholder address.
        </p>
      </div>
    </PhoneFrame>
  )
}
