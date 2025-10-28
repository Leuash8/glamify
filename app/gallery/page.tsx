import Image from "next/image"
import { PRODUCTS } from "@/lib/products"
import Link from "next/link"

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-accent-light py-16 md:py-24">
        <div className="container-custom">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Product Gallery</h1>
          <p className="text-lg text-white/90">Explore our complete collection of premium beauty products</p>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="group cursor-pointer">
                  <div className="relative w-full h-64 bg-accent-light rounded-lg overflow-hidden mb-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <button className="opacity-0 group-hover:opacity-100 bg-primary text-white px-6 py-2 rounded-lg font-semibold transition-opacity duration-300">
                        View Details
                      </button>
                    </div>
                  </div>
                  <h3 className="font-serif font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-primary font-bold text-lg mt-2">₦{product.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
