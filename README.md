# Grand Lake Farmers Market

The final iteration of the Grand Lake Farmers Market shopping prototype (UX
capstone). Built forward from Version A ("Unified Grid"), which outperformed
Version B in live testing.

**Critical job (never regress):** combine items from multiple vendors without
losing track of what's in the cart.

## Routes

| Route | Screen |
| ----- | ------ |
| `/` | Welcome — logo + "Get Started" |
| `/shop` | Product grid across every vendor (with the Task 2 search fix) |
| `/cart` | Cart, grouped by vendor |
| `/review` | Review order |
| `/checkout` | Saturday-hours banner + fulfillment choice (Pickup / DoorDash Delivery) |
| `/order` | Order number, status stepper, items by vendor, fulfillment method |

Account / vendor-portal / live order-tracking screens are added in later steps.

## Assets

Place the market logo at `public/grandlake-logo.png`. Until it's present the
welcome screen shows a text wordmark fallback.

## Stack

Vite + React + TypeScript, `react-router-dom`, Tailwind v4, shadcn/ui.
No backend — the cart and placed order live in `localStorage`; "Place order" is
a stub. Deploys to Vercel on push to `main`; `vercel.json` rewrites all paths to
`index.html`.

Prototype by Natalia Quinones.
