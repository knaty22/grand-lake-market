import { Gift } from 'lucide-react'

import { AppHeader } from '../../components/AppHeader'
import { PhoneFrame } from '../../components/PhoneFrame'
import { Card } from '../../components/ui/card'
import { Progress } from '../../components/ui/progress'
import { CUSTOMER } from '../../data/account'

export function RewardsScreen() {
  const { points, tier, nextTierAt, perk } = CUSTOMER.rewards
  const pct = Math.min(100, Math.round((points / nextTierAt) * 100))

  return (
    <PhoneFrame>
      <AppHeader title="Rewards" backTo="/account" backLabel="Account" />
      <div className="phone__scroll grid content-start gap-4 p-4">
        <Card className="p-4 text-center">
          <div className="text-4xl font-extrabold text-foreground">{points}</div>
          <div className="mt-0.5 text-sm font-medium text-muted-foreground">points · {tier}</div>
        </Card>

        <Card className="p-4">
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>{points} pts</span>
            <span>{nextTierAt} pts</span>
          </div>
          <Progress value={pct} />
          <p className="mt-3 flex items-start gap-2 text-sm">
            <Gift className="mt-0.5 size-4 shrink-0 text-foreground" />
            {perk}
          </p>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          You earn 1 point per $1 spent. Prototype — points are placeholder data.
        </p>
      </div>
    </PhoneFrame>
  )
}
