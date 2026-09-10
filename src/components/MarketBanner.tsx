/**
 * Market timing banner. Shown before the fulfillment choice on checkout (and
 * again on the order screen) because orders can be placed any day but are only
 * fulfilled during the Saturday market window.
 */
export function MarketBanner() {
  return (
    <div className="market-banner" role="note">
      <div className="market-banner__line">
        <span className="market-banner__name">Grand Lake Farmer Market</span>
        <span className="market-banner__dot" aria-hidden="true">
          ·
        </span>
        <span className="market-banner__hours">Open Saturdays 9am–2pm</span>
      </div>
      <p className="market-banner__note">
        Order any day — every order is fulfilled during Saturday's market window.
      </p>
    </div>
  )
}
