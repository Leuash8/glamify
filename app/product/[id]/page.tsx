"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Heart, ArrowLeft } from "lucide-react"
import { PRODUCTS } from "@/lib/products"
import { useCart } from "@/hooks/use-cart"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = PRODUCTS.find((p) => p.id === Number.parseInt(id))

  if (!product) {
    notFound()
  }

  return <ProductPageClient product={product} />
}

function ProductPageClient({ product }: { product: (typeof PRODUCTS)[0] }) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()

  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container-custom py-4">
        <Link href="/shop" className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>
      </div>

      {/* Product Details */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="flex items-center justify-center bg-accent-light rounded-lg overflow-hidden h-96 md:h-full">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <span className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                {product.category}
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-border"}`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-foreground">({product.rating})</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-4xl font-bold text-primary mb-2">₦{product.price.toLocaleString()}</p>
              {product.size && <p className="text-muted text-lg">Size: {product.size}</p>}
            </div>

            {/* Description */}
            <p className="text-muted text-lg mb-8 leading-relaxed">{product.description}</p>

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-foreground hover:bg-accent-light transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-l border-r border-border py-2 focus:outline-none"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-foreground hover:bg-accent-light transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  addedToCart ? "bg-green-500 text-white" : "bg-primary text-white hover:bg-primary-dark"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {addedToCart ? "Added to Cart!" : "Add to Cart"}
              </button>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors border-2 ${
                  isWishlisted
                    ? "border-primary bg-primary text-white"
                    : "border-border text-foreground hover:border-primary"
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Additional Info */}
            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-muted">SKU:</span>
                <span className="font-semibold text-foreground">GLM-{product.id.toString().padStart(3, "0")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Category:</span>
                <span className="font-semibold text-foreground">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Availability:</span>
                <span className="font-semibold text-green-600">In Stock</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                  <div className="bg-white rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
                    <div className="relative w-full h-40 bg-accent-light">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif font-bold text-foreground line-clamp-2 mb-2">{relatedProduct.name}</h3>
                      <p className="text-primary font-bold text-lg">₦{relatedProduct.price.toLocaleString()}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
