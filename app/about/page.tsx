import Link from "next/link"
import { ArrowRight, Heart, Zap, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-accent-light py-16 md:py-24">
        <div className="container-custom">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 text-balance">About Glamify</h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Empowering women with premium natural beauty products and exceptional service
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-muted text-lg mb-4 leading-relaxed">
                Glamify was founded with a simple mission: to bring premium herbal hair and natural lip care products to
                every woman who deserves to feel confident and beautiful.
              </p>
              <p className="text-muted text-lg mb-4 leading-relaxed">
                We believe that beauty is not just about appearance—it's about feeling empowered, confident, and
                authentic. That's why we carefully curate every product in our collection to ensure the highest quality
                and effectiveness.
              </p>
              <p className="text-muted text-lg leading-relaxed">
                From luxurious herbal hair treatments to premium natural lip care, every item in our store is selected
                with you in mind.
              </p>
            </div>
            <div className="bg-accent-light rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <Heart className="w-24 h-24 text-primary mx-auto mb-4" />
                <p className="text-foreground font-semibold text-lg">Crafted with Love</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-accent-light py-16 md:py-24">
        <div className="container-custom">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg">
              <Zap className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">Quality First</h3>
              <p className="text-muted">
                We never compromise on quality. Every product is tested and verified to meet our high standards.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">Customer Focused</h3>
              <p className="text-muted">
                Your satisfaction is our priority. We're here to support you every step of your beauty journey.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg">
              <Heart className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">Empowerment</h3>
              <p className="text-muted">
                We believe every woman deserves to feel beautiful and confident in her own skin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Discover Your Beauty?
          </h2>
          <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
            Explore our collection of premium herbal hair and natural lip care products today.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            Shop Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
