import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PRODUCTS } from "@/lib/products"
import ProductCard from "@/components/product-card"

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 6)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent-light py-20 md:py-32">
        <div className="container-custom">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
              Look Like You Desire
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 text-pretty">
              <span className="font-semibold">Pure ingredients. Real results. Timeless beauty.</span> Our herbal hair
              and natural lip products are crafted to nourish, protect, and enhance your natural glow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                View Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Collection</h2>
            <p className="text-muted text-lg">Handpicked products loved by our customers</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-accent-light py-20">
        <div className="container-custom">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Why Choose Glamify
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">✓</span>
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Premium Quality</h3>
              <p className="text-muted">
                Carefully curated products that meet our high standards for quality and effectiveness.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">✓</span>
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Fast Delivery</h3>
              <p className="text-muted">Quick and reliable shipping to get your beauty essentials to you on time.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">✓</span>
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Expert Support</h3>
              <p className="text-muted">Our team is here to help you find the perfect products for your needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Look?</h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered their beauty with Glamify.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
