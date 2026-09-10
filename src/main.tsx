import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import './index.css'
import { CartProvider } from './cart/CartContext'
import { WelcomeScreen } from './routes/WelcomeScreen'
import { LoginScreen } from './routes/LoginScreen'
import { GridScreen } from './approaches/a/GridScreen'
import { CartScreen } from './approaches/a/CartScreen'
import { OrderScreen } from './routes/OrderScreen'
import { AccountScreen } from './routes/account/AccountScreen'
import { PaymentsScreen } from './routes/account/PaymentsScreen'
import { AddressScreen } from './routes/account/AddressScreen'
import { RewardsScreen } from './routes/account/RewardsScreen'

// Vendor screen pulls in Recharts — load it only when someone opens it.
const VendorScreen = lazy(() =>
  import('./routes/vendor/VendorScreen').then((m) => ({ default: m.VendorScreen })),
)

const lazyScreen = (el: React.ReactNode) => (
  <Suspense fallback={<div className="phone" />}>{el}</Suspense>
)

// Grand Lake Farmers Market — final customer shopping flow (built from Version A).
const router = createBrowserRouter([
  { path: '/', element: <WelcomeScreen /> },
  { path: '/login', element: <LoginScreen /> },
  { path: '/shop', element: <GridScreen /> },
  { path: '/cart', element: <CartScreen /> },
  { path: '/order', element: <OrderScreen /> },

  { path: '/account', element: <AccountScreen /> },
  { path: '/account/payments', element: <PaymentsScreen /> },
  { path: '/account/address', element: <AddressScreen /> },
  { path: '/account/rewards', element: <RewardsScreen /> },

  { path: '/vendor', element: lazyScreen(<VendorScreen />) },

  { path: '*', element: <Navigate to="/" replace /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
