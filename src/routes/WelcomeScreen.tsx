import { Link } from 'react-router-dom'
import { PhoneFrame } from '../components/PhoneFrame'
import { FullToteLogo } from '../components/FullToteLogo'
import type { ApproachKey } from '../cart/CartContext'
import { loadOrder } from '../order/orderStore'
import './WelcomeScreen.css'

interface WelcomeScreenProps {
  approach: ApproachKey
  tagline: string
  /** where the CTA goes — the first screen of this option's flow */
  startTo: string
  startLabel: string
}

/** Branded welcome screen shown before each option's main screen. */
export function WelcomeScreen({ approach, tagline, startTo, startLabel }: WelcomeScreenProps) {
  const hasOrder = loadOrder(approach) !== null

  return (
    <PhoneFrame>
      <div className="phone__scroll welcome">
        <div className="welcome__brand">
          <FullToteLogo size={52} />
          <p className="welcome__tagline">{tagline}</p>
        </div>
        <div className="welcome__actions">
          <Link to={startTo} className="btn btn--primary btn--block welcome__cta">
            {startLabel}
          </Link>
          {hasOrder && (
            <Link to={`/${approach}/order`} className="welcome__order-link">
              View your recent order →
            </Link>
          )}
        </div>
      </div>
    </PhoneFrame>
  )
}
