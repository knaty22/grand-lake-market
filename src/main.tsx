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
import { AccountScreen } from './routes/account/AccountScreen'
import { PaymentsScreen } from './routes/account/PaymentsScreen'
import { AddressScreen } from './routes/account/AddressScreen'
import { RewardsScreen } from './routes/account/RewardsScreen'
import { VendorScreen } from './routes/vendor/VendorScreen'

// Grand Lake Farmers Market — final customer shopping flow (built from Version A).
const router = createBrowserRouter([
  { path: '/', element: <WelcomeScreen /> },
  { path: '/shop', element: <GridScreen /> },
  { path: '/cart', element: <CartScreen /> },
  { path: '/review', element: <ReviewScreen /> },
  { path: '/checkout', element: <CheckoutScreen /> },
  { path: '/order', element: <OrderScreen /> },

  { path: '/account', element: <AccountScreen /> },
  { path: '/account/payments', element: <PaymentsScreen /> },
  { path: '/account/address', element: <AddressScreen /> },
  { path: '/account/rewards', element: <RewardsScreen /> },

  { path: '/vendor', element: <VendorScreen /> },

  { path: '*', element: <Navigate to="/" replace /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
