"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/lib/products"

export interface CartItem extends Product {
  quantity: number
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cart")
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load cart:", e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, isLoaded])

  const addItem = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const removeItem = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
    } else {
      setItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    }
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    isLoaded,
  }
}
