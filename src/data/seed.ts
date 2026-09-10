// Seed data for the FullTote Build-order A/B prototype.
// No backend — this is the entire market catalogue for both options.

export type Category =
  | 'Vegetables'
  | 'Fruit'
  | 'Bakery'
  | 'Dairy & Eggs'
  | 'Pantry'
  | 'Flowers & Plants'
  | 'Handmade'
  | 'Prepared Food'

export interface Vendor {
  id: string
  name: string
  stall: string
  pickupBy: string
}

export interface Product {
  id: string
  vendorId: string
  name: string
  price: number
  unit: string
  category: Category
  /** hex colour used for the flat placeholder image block */
  swatch: string
}

export const CATEGORIES: Category[] = [
  'Vegetables',
  'Fruit',
  'Bakery',
  'Dairy & Eggs',
  'Pantry',
  'Flowers & Plants',
  'Handmade',
  'Prepared Food',
]

export const VENDORS: Vendor[] = [
  { id: 'sunrise', name: 'Sunrise Farm', stall: 'Stall 4', pickupBy: '1:00 PM' },
  { id: 'berryhill', name: 'Berry Hill', stall: 'Stall 12', pickupBy: '1:00 PM' },
  { id: 'millers', name: "Miller's Bakery", stall: 'Stall 22', pickupBy: '1:00 PM' },
  { id: 'soapco', name: 'Soap Co.', stall: 'Stall 31', pickupBy: '1:00 PM' },
  { id: 'greenthumb', name: 'Green Thumb', stall: 'Stall 38', pickupBy: '1:00 PM' },
  { id: 'orchard', name: 'Hill & Dale Orchard', stall: 'Stall 9', pickupBy: '1:00 PM' },
  { id: 'hive', name: 'Golden Hive', stall: 'Stall 17', pickupBy: '1:00 PM' },
  { id: 'cocina', name: 'La Cocina', stall: 'Stall 25', pickupBy: '1:00 PM' },
]

export const PRODUCTS: Product[] = [
  // Vegetables
  { id: 'tomatoes', vendorId: 'sunrise', name: 'Heirloom Tomatoes', price: 4.5, unit: 'basket', category: 'Vegetables', swatch: '#d9694b' },
  { id: 'greens', vendorId: 'sunrise', name: 'Salad Greens', price: 5.0, unit: 'bag', category: 'Vegetables', swatch: '#5f8f4e' },
  { id: 'chard', vendorId: 'sunrise', name: 'Rainbow Chard', price: 3.5, unit: 'bunch', category: 'Vegetables', swatch: '#7a9e3f' },
  { id: 'corn', vendorId: 'sunrise', name: 'Sweet Corn', price: 4.0, unit: 'half-dozen', category: 'Vegetables', swatch: '#e3c04a' },
  { id: 'carrots', vendorId: 'greenthumb', name: 'Rainbow Carrots', price: 3.5, unit: 'bunch', category: 'Vegetables', swatch: '#e08a3c' },

  // Fruit
  { id: 'strawberries', vendorId: 'berryhill', name: 'Strawberries', price: 6.0, unit: 'basket', category: 'Fruit', swatch: '#c33b52' },
  { id: 'blueberries', vendorId: 'berryhill', name: 'Blueberries', price: 7.0, unit: 'pint', category: 'Fruit', swatch: '#4b5f9e' },
  { id: 'peaches', vendorId: 'orchard', name: 'Yellow Peaches', price: 5.5, unit: 'basket', category: 'Fruit', swatch: '#e39a4f' },
  { id: 'apples', vendorId: 'orchard', name: 'Honeycrisp Apples', price: 6.0, unit: 'bag', category: 'Fruit', swatch: '#b5423b' },

  // Bakery
  { id: 'sourdough', vendorId: 'millers', name: 'Sourdough Loaf', price: 8.0, unit: 'each', category: 'Bakery', swatch: '#c9a15e' },
  { id: 'baguette', vendorId: 'millers', name: 'Baguette', price: 4.0, unit: 'each', category: 'Bakery', swatch: '#d8b87a' },
  { id: 'buns', vendorId: 'millers', name: 'Morning Buns', price: 12.0, unit: 'half-dozen', category: 'Bakery', swatch: '#b98a55' },

  // Dairy & Eggs
  { id: 'eggs', vendorId: 'sunrise', name: 'Farm Eggs', price: 7.0, unit: 'dozen', category: 'Dairy & Eggs', swatch: '#e6cfa1' },
  { id: 'butter', vendorId: 'sunrise', name: 'Cultured Butter', price: 8.0, unit: 'half-pound', category: 'Dairy & Eggs', swatch: '#eddda0' },
  { id: 'chevre', vendorId: 'orchard', name: 'Fresh Chèvre', price: 9.0, unit: 'log', category: 'Dairy & Eggs', swatch: '#f0ece0' },

  // Pantry
  { id: 'jam', vendorId: 'berryhill', name: 'Berry Jam', price: 9.0, unit: 'jar', category: 'Pantry', swatch: '#8a3355' },
  { id: 'honey', vendorId: 'hive', name: 'Wildflower Honey', price: 11.0, unit: 'jar', category: 'Pantry', swatch: '#d99a2b' },
  { id: 'hothoney', vendorId: 'hive', name: 'Hot Honey', price: 12.0, unit: 'jar', category: 'Pantry', swatch: '#c9722a' },

  // Flowers & Plants
  { id: 'basil', vendorId: 'greenthumb', name: 'Basil Plant', price: 6.0, unit: 'pot', category: 'Flowers & Plants', swatch: '#4f7c3a' },
  { id: 'flowers', vendorId: 'greenthumb', name: 'Cut Flowers', price: 15.0, unit: 'bunch', category: 'Flowers & Plants', swatch: '#d76a86' },
  { id: 'herbs', vendorId: 'greenthumb', name: 'Herb Bundle', price: 4.0, unit: 'bundle', category: 'Flowers & Plants', swatch: '#6b9150' },

  // Handmade
  { id: 'lavendersoap', vendorId: 'soapco', name: 'Lavender Soap', price: 9.0, unit: 'bar', category: 'Handmade', swatch: '#8f7bb0' },
  { id: 'oatmealsoap', vendorId: 'soapco', name: 'Oatmeal Soap', price: 9.0, unit: 'bar', category: 'Handmade', swatch: '#c7b299' },
  { id: 'candle', vendorId: 'hive', name: 'Beeswax Candle', price: 14.0, unit: 'each', category: 'Handmade', swatch: '#e0b459' },

  // Prepared Food
  { id: 'tamales', vendorId: 'cocina', name: 'Chicken Tamales', price: 10.0, unit: 'half-dozen', category: 'Prepared Food', swatch: '#b0703a' },
  { id: 'salsa', vendorId: 'cocina', name: 'Salsa Roja', price: 6.0, unit: 'jar', category: 'Prepared Food', swatch: '#b73b30' },
  { id: 'horchata', vendorId: 'cocina', name: 'Horchata', price: 4.0, unit: 'bottle', category: 'Prepared Food', swatch: '#e8ddc6' },
]

const VENDOR_BY_ID = new Map(VENDORS.map((v) => [v.id, v]))
const PRODUCT_BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]))

export function getVendor(id: string): Vendor {
  const v = VENDOR_BY_ID.get(id)
  if (!v) throw new Error(`Unknown vendor: ${id}`)
  return v
}

export function getProduct(id: string): Product {
  const p = PRODUCT_BY_ID.get(id)
  if (!p) throw new Error(`Unknown product: ${id}`)
  return p
}

export function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`
}
