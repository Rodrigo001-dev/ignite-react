import { ReactNode, createContext, useState } from 'react'

export interface Product {
  id: string
  name: string
  imageUrl: string
  price: string
  numberPrice: number
  description: string
  defaultPriceId: string
}

interface CarContextData {
  cartItems: Product[]
  cartTotal: number
  addToCart: (product: Product) => void
  removeCartItem: (productId: string) => void
  checkIfItemAlreadyExist: (productId: string) => boolean
}

interface CartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CarContextData)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<Product[]>([])

  const cartTotal = cartItems.reduce((total, product) => {
    return total + product.numberPrice
  }, 0)

  function addToCart(product: Product) {
    setCartItems((state) => [...state, product])
  }
  function removeCartItem(productId: string) {
    setCartItems((state) => state.filter((item) => item.id !== productId))
  }

  function checkIfItemAlreadyExist(productId: string) {
    return cartItems.some((product) => product.id === productId)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        addToCart,
        removeCartItem,
        checkIfItemAlreadyExist,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
