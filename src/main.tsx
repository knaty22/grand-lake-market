import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import './index.css'
import { CartProvider } from './cart/CartContext'
import { WelcomeScreen } from './routes/WelcomeScreen'
import { GridScreen } from './approaches/a/GridScreen'
import { CartScreen } from './approaches/a/CartScreen'
import { ReviewScreen } from './approaches/a/ReviewScreen'
import { CheckoutScreen } from './routes/CheckoutScreen'
import { OrderScreen } from './routes/OrderScreen'

// Grand Lake Farmers Market — final customer shopping flow (built from Version A).
const router = createBrowserRouter([
  { path: '/', element: <WelcomeScreen /> },
  { path: '/shop', element: <GridScreen /> },
  { path: '/cart', element: <CartScreen /> },
  { path: '/review', element: <ReviewScreen /> },
  { path: '/checkout', element: <CheckoutScreen /> },
  { path: '/order', element: <OrderScreen /> },
  { path: '*', element: <Navigate to="/" replace /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
