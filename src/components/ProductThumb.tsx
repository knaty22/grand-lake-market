import type { Product } from '../data/seed'

/** Flat colour-block placeholder for a product image. Sized by the caller. */
export function ProductThumb({ product, className = '' }: { product: Product; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{ background: product.swatch, opacity: 0.9 }}
    />
  )
}
