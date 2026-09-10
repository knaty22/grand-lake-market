import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import './styles/base.css'
import { CartProvider } from './cart/CartContext'
import { WelcomeScreen } from './routes/WelcomeScreen'
import { GridScreen } from './approaches/a/GridScreen'
import { CartScreen } from './approaches/a/CartScreen'
import { ReviewScreen } from './approaches/a/ReviewScreen'
import { CheckoutScreen } from './routes/CheckoutScreen'
import { OrderScreen } from './routes/OrderScreen'

// Final iteration — built forward from Version A (Unified Grid) only.
const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/a" replace /> },

  {
    path: '/a',
    element: (
      <WelcomeScreen
        approach="a"
        tagline="Shop the whole Grand Lake Farmers Market in one grid — every vendor, one cart, one pickup."
        startTo="/a/shop"
        startLabel="Start shopping"
      />
    ),
  },
  { path: '/a/shop', element: <GridScreen /> },
  { path: '/a/cart', element: <CartScreen /> },
  { path: '/a/review', element: <ReviewScreen /> },
  { path: '/a/checkout', element: <CheckoutScreen approach="a" /> },
  { path: '/a/order', element: <OrderScreen approach="a" /> },

  { path: '*', element: <Navigate to="/a" replace /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
