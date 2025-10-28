"use client"

import { useState, useMemo } from "react"
import { PRODUCTS } from "@/lib/products"
import ProductCard from "@/components/product-card"

type Category = "All" | "Hair Products" | "Lip Care"

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All")
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "rating">("featured")

  const categories: Category[] = ["All", "Hair Products", "Lip Care"]

  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Sort
    const sorted = [...filtered]
    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case "featured":
      default:
        // Keep original order
        break
    }

    return sorted
  }, [selectedCategory, sortBy])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-accent-light py-12">
        <div className="container-custom">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">Our Shop</h1>
          <p className="text-muted text-lg">Explore our complete collection of premium beauty products</p>
        </div>
      </div>

      {/* Filters & Products */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg border border-border sticky top-20">
              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="font-serif font-bold text-lg mb-4">Category</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value as Category)}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-foreground hover:text-primary transition-colors">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort Filter */}
              <div>
                <h3 className="font-serif font-bold text-lg mb-4">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <>
                <div className="mb-6 text-sm text-muted">
                  Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted text-lg">No products found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
