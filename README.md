# FullTote — A/B prototype (v2, with checkout + order tracking)

A second, **separate** build of the FullTote Build-order A/B prototype for the
Grand Lake Farmers Market UX capstone. This is not the same deployment as the
first prototype — it's its own repo and its own Vercel project.

## Routes

| Route | Screen |
| ----- | ------ |
| `/` | → redirects to `/a` |
| **`/a`** | Welcome (FullTote logo, tagline, "Start shopping") |
| `/a/shop` | Option A — Unified Grid |
| `/a/cart` · `/a/review` | cart (by vendor) · review |
| `/a/checkout` | Saturday banner + fulfillment choice (Pickup at AIM Booth / DoorDash Delivery) |
| `/a/order` | Order number, status stepper, items by vendor, fulfillment method |
| **`/b`** | Welcome (FullTote logo, tagline, "Get started") |
| `/b/build` | Option B — Guided Builder (3-step wizard) |
| `/b/checkout` · `/b/order` | same checkout + order screens as A |

The two options are separate experiences and never link to each other. Carts and
placed orders are kept separate per option (localStorage).

## What's new vs. the first prototype

- Branded welcome screen before each option's main screen
- Checkout screen: Saturday 9am–2pm market banner shown before the fulfillment
  choice; DoorDash Delivery option carries a `#FF3008` DOORDASH badge
- Order / tracking screen: order number, Placed → Vendors notified → Ready
  Saturday stepper, re-accessible after checkout for both pickup and delivery
- Option B step 1 adds a search bar and an "Explore the Farmers Market this
  week" free-browse button above the category checklist

The core browsing/cart-building experience (grid on `/a/shop`, wizard on
`/b/build`) is unchanged from the first prototype.

## Run locally

```bash
npm install
npm run dev
```

## Tech

Vite + React + TypeScript, `react-router-dom`. No backend; "Place order" is a
stub that records the order locally. Deploys to Vercel on push to `main`;
`vercel.json` rewrites all paths to `index.html`.
