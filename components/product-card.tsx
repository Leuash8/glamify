"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Star } from "lucide-react"
import type { Product } from "@/lib/products"
import { useCart } from "@/hooks/use-cart"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product, 1)
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative w-full h-48 bg-accent-light overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
            {product.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-serif font-bold text-lg text-foreground mb-2 line-clamp-2">{product.name}</h3>

          <p className="text-muted text-sm mb-3 line-clamp-2 flex-grow">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-border"}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted ml-1">({product.rating})</span>
          </div>

          {/* Price & Button */}
          <div className="flex items-center justify-between gap-3 mt-auto">
            <div>
              <p className="text-2xl font-bold text-primary">₦{product.price.toLocaleString()}</p>
              {product.size && <p className="text-xs text-muted">{product.size}</p>}
            </div>
            <button
              onClick={handleAddToCart}
              className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
