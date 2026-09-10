import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Store } from 'lucide-react'

import { PhoneFrame } from '../components/PhoneFrame'
import { GrandLakeLogo } from '../components/GrandLakeLogo'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../components/ui/card'
import { Button } from '../components/ui/button'

export function LoginScreen() {
  const navigate = useNavigate()

  return (
    <PhoneFrame>
      <div className="phone__scroll pane flex min-h-full flex-col gap-4 p-4">
        <div className="flex flex-col items-center pb-2 pt-6">
          <GrandLakeLogo height={72} />
          <h1 className="mt-4 text-lg font-bold">Log in to Grand Lake</h1>
          <p className="text-sm text-muted-foreground">Choose the account you're using.</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex size-10 items-center justify-center rounded-md bg-foreground text-background">
              <ShoppingBag className="size-5" />
            </div>
            <CardTitle>Customer account</CardTitle>
            <CardDescription>Shop the whole market, track orders, earn rewards.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => navigate('/account')}>
              Continue as customer
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex size-10 items-center justify-center rounded-md border">
              <Store className="size-5" />
            </div>
            <CardTitle>Vendor account</CardTitle>
            <CardDescription>Manage your stall's incoming orders and inventory.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" onClick={() => navigate('/vendor')}>
              Continue as vendor
            </Button>
          </CardContent>
        </Card>

        <div className="pt-1 text-center">
          <Button asChild variant="ghost" size="sm">
            <Link to="/shop">Skip for now</Link>
          </Button>
        </div>
      </div>
    </PhoneFrame>
  )
}
