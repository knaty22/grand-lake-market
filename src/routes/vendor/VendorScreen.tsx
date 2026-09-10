import { Link } from 'react-router-dom'

import { AppHeader } from '../../components/AppHeader'
import { PhoneFrame } from '../../components/PhoneFrame'
import { Button } from '../../components/ui/button'

// Stub — the incoming-orders / inventory screens are built in the next step.
export function VendorScreen() {
  return (
    <PhoneFrame>
      <AppHeader title="Vendor view" backTo="/account" backLabel="Account" />
      <div className="phone__scroll flex flex-col items-center justify-center gap-3 p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Vendor portal — incoming orders and inventory — coming next.
        </p>
        <Button asChild variant="outline" size="sm">
          <Link to="/shop">Back to shopping</Link>
        </Button>
      </div>
    </PhoneFrame>
  )
}
