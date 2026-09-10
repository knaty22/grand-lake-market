interface QtyStepperProps {
  qty: number
  onDec: () => void
  onInc: () => void
  label?: string
}

export function QtyStepper({ qty, onDec, onInc, label = 'quantity' }: QtyStepperProps) {
  return (
    <div
      className="inline-flex items-center overflow-hidden rounded-md border border-input"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={onDec}
        aria-label="decrease"
        className="px-2.5 py-1.5 text-base font-semibold leading-none text-muted-foreground"
      >
        –
      </button>
      <span aria-live="polite" className="min-w-6 text-center text-sm font-semibold">
        {qty}
      </span>
      <button
        type="button"
        onClick={onInc}
        aria-label="increase"
        className="px-2.5 py-1.5 text-base font-semibold leading-none text-brand-teal"
      >
        +
      </button>
    </div>
  )
}
