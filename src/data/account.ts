// Placeholder account data for the prototype. No real auth or persistence.

export interface PaymentMethod {
  id: string
  brand: string
  last4: string
  exp: string
  default: boolean
}

export const CUSTOMER = {
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  initials: 'AR',
  address: {
    line1: '128 Grand Avenue',
    line2: 'Oakland, CA 94610',
  },
  payments: [
    { id: 'p1', brand: 'Visa', last4: '4242', exp: '08/27', default: true },
    { id: 'p2', brand: 'Mastercard', last4: '5518', exp: '02/26', default: false },
  ] as PaymentMethod[],
  rewards: {
    points: 240,
    tier: 'Grand Lake Regular',
    nextTierAt: 300,
    perk: '$5 off your next order at 300 points',
  },
}

export const VENDOR = {
  stallName: 'Sunrise Farm',
  stallNo: 'Stall 4',
  incomingOrders: [
    { id: 'GL-7QK2', items: 3, customer: 'Alex R.', fulfillment: 'Pickup', when: 'Sat 9:00–2:00' },
    { id: 'GL-M4T9', items: 1, customer: 'Priya S.', fulfillment: 'DoorDash', when: 'Sat 9:00–2:00' },
    { id: 'GL-B12C', items: 5, customer: 'Dana L.', fulfillment: 'Pickup', when: 'Sat 9:00–2:00' },
  ],
}
