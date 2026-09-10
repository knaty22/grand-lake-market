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
          <GrandLakeLogo height={420} className="max-w-full" />
        </div>

        <div className="flex flex-col items-center gap-3">
          <Button asChild className="h-12 w-full">
            <Link to="/shop">Get Started</Link>
          </Button>
          <div className="flex items-center gap-3 text-[13px] text-muted-foreground">
            <Link to="/login" className="font-semibold text-foreground">
              Log in
            </Link>
            {hasOrder && (
              <>
                <span aria-hidden>·</span>
                <Link to="/order" className="font-semibold text-foreground">
                  Recent order
                </Link>
              </>
            )}
          </div>
        </div>

        <footer className="mt-6 text-center text-[11px] text-muted-foreground">
          Prototype by Natalia Quinones
        </footer>
      </div>
    </PhoneFrame>
  )
}
