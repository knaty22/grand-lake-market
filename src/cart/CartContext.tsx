// Single shopping cart, persisted to localStorage.

import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import type { Qtys } from './selectors'

type Action =
  | { type: 'add'; productId: string }
  | { type: 'setQty'; productId: string; qty: number }
  | { type: 'remove'; productId: string }
  | { type: 'clear' }

const STORAGE_KEY = 'grandlake-cart-v1'

function load(): Qtys {
  if (typeof localStorage === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Qtys) : {}
  } catch {
    return {}
  }
}

function reducer(state: Qtys, action: Action): Qtys {
  switch (action.type) {
    case 'add':
      return { ...state, [action.productId]: (state[action.productId] ?? 0) + 1 }
    case 'setQty': {
      const next = { ...state }
      if (action.qty <= 0) delete next[action.productId]
      else next[action.productId] = action.qty
      return next
    }
    case 'remove': {
      const next = { ...state }
      delete next[action.productId]
      return next
    }
    case 'clear':
      return {}
    default:
      return state
  }
}

interface CartApi {
  qtys: Qtys
  add: (productId: string) => void
  setQty: (productId: string, qty: number) => void
  remove: (productId: string) => void
  clear: () => void
}

const CartStateContext = createContext<Qtys | null>(null)
const CartDispatchContext = createContext<React.Dispatch<Action> | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignore quota / privacy-mode errors
    }
  }, [state])

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>{children}</CartDispatchContext.Provider>
    </CartStateContext.Provider>
  )
}

export function useCart(): CartApi {
  const state = useContext(CartStateContext)
  const dispatch = useContext(CartDispatchContext)
  if (!state || !dispatch) throw new Error('useCart must be used inside <CartProvider>')

  return useMemo<CartApi>(
    () => ({
      qtys: state,
      add: (productId) => dispatch({ type: 'add', productId }),
      setQty: (productId, qty) => dispatch({ type: 'setQty', productId, qty }),
      remove: (productId) => dispatch({ type: 'remove', productId }),
      clear: () => dispatch({ type: 'clear' }),
    }),
    [state, dispatch],
  )
}
