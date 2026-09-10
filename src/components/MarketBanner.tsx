/**
 * Market timing banner. Shown before the fulfillment choice on checkout (and
 * again on the order screen) because orders can be placed any day but are only
 * fulfilled during the Saturday market window.
 */
export function MarketBanner() {
  return (
    <div
      role="note"
      data-testid="market-banner"
      className="mx-4 my-4 rounded-lg border border-brand-teal/25 bg-accent/70 p-4"
    >
      <div className="text-sm font-bold text-foreground">
        Grand Lake Farmer Market <span className="text-muted-foreground">·</span>{' '}
        <span className="text-brand-teal">Open Saturdays 9am–2pm</span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Order any day — every order is fulfilled during Saturday's market window.
      </p>
    </div>
  )
}
