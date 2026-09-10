import { Link } from 'react-router-dom'
import { PhoneFrame } from '../components/PhoneFrame'
import { GrandLakeLogo } from '../components/GrandLakeLogo'
import { Button } from '../components/ui/button'
import { loadOrder } from '../order/orderStore'

export function WelcomeScreen() {
  const hasOrder = loadOrder() !== null

  return (
    <PhoneFrame>
      <div className="phone__scroll flex min-h-full flex-col p-4">
        <div className="flex flex-1 flex-col items-center justify-center px-2">
          <GrandLakeLogo height={128} />
        </div>

        <div className="flex flex-col items-center gap-3">
          <Button asChild size="block">
            <Link to="/shop">Get Started</Link>
          </Button>
          {hasOrder && (
            <Link to="/order" className="text-[13px] font-semibold text-brand-teal">
              View your recent order →
            </Link>
          )}
        </div>

        <footer className="mt-6 text-center text-[11px] text-muted-foreground">
          Prototype by Natalia Quinones
        </footer>
      </div>
    </PhoneFrame>
  )
}
