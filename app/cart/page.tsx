"use client"

import Link from "next/link"
import Image from "next/image"
import { Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, isLoaded } = useCart()

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted text-lg">Loading cart...</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container-custom py-12">
          <Link
            href="/shop"
            className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>

          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-muted mx-auto mb-4 opacity-50" />
            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
            <p className="text-muted text-lg mb-8">Start shopping to add items to your cart</p>
            <Link
              href="/shop"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-12">
        <Link
          href="/shop"
          className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <h1 className="font-serif text-4xl font-bold text-foreground mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`p-6 flex gap-6 ${index !== items.length - 1 ? "border-b border-border" : ""}`}
                >
                  {/* Product Image */}
                  <div className="relative w-24 h-24 bg-accent-light rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <Link href={`/product/${item.id}`} className="hover:text-primary transition-colors">
                      <h3 className="font-serif font-bold text-lg text-foreground mb-1">{item.name}</h3>
                    </Link>
                    <p className="text-muted text-sm mb-3">{item.category}</p>
                    {item.size && <p className="text-muted text-sm mb-3">Size: {item.size}</p>}
                    <p className="text-primary font-bold text-lg">₦{item.price.toLocaleString()}</p>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-destructive hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-foreground hover:bg-accent-light transition-colors"
                      >
                        −
                      </button>
                      <span className="px-4 py-1 font-semibold text-foreground">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-foreground hover:bg-accent-light transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <p className="font-bold text-foreground">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border p-6 sticky top-20">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-muted">
                  <span>Subtotal</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg text-foreground mb-6">
                <span>Total</span>
                <span className="text-primary">₦{total.toLocaleString()}</span>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-primary text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors mb-3"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/shop"
                className="block w-full border-2 border-primary text-primary text-center px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
