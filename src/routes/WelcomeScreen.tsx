import { Link } from 'react-router-dom'
import { PhoneFrame } from '../components/PhoneFrame'
import { FullToteLogo } from '../components/FullToteLogo'
import { Button } from '../components/ui/button'
import type { ApproachKey } from '../cart/CartContext'
import { loadOrder } from '../order/orderStore'

interface WelcomeScreenProps {
  approach: ApproachKey
  tagline: string
  startTo: string
  startLabel: string
}

export function WelcomeScreen({ approach, tagline, startTo, startLabel }: WelcomeScreenProps) {
  const hasOrder = loadOrder(approach) !== null

  return (
    <PhoneFrame>
      <div className="phone__scroll flex min-h-full flex-col p-4">
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-2 py-10 text-center">
          <FullToteLogo size={52} />
          <p className="max-w-[20rem] text-base leading-relaxed text-muted-foreground">{tagline}</p>
        </div>
        <div className="flex flex-col items-center gap-3 pb-2">
          <Button asChild size="block">
            <Link to={startTo}>{startLabel}</Link>
          </Button>
          {hasOrder && (
            <Link
              to={`/${approach}/order`}
              className="text-[13px] font-semibold text-brand-teal"
            >
              View your recent order →
            </Link>
          )}
        </div>
      </div>
    </PhoneFrame>
  )
}
