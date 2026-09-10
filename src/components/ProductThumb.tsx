import type { Product } from '../data/seed'

/** Neutral placeholder for a product image — monochrome to fit the B&W system. */
export function ProductThumb({ product, className = '' }: { product: Product; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex items-center justify-center bg-muted text-muted-foreground ${className}`}
    >
      <span className="text-lg font-bold uppercase opacity-40">{product.name.slice(0, 2)}</span>
    </span>
  )
}
