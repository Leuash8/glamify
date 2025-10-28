import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container-custom text-center py-20">
        <div className="mb-8">
          <h1 className="font-serif text-6xl md:text-8xl font-bold text-primary mb-4">404</h1>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Page Not Found</h2>
          <p className="text-muted text-lg mb-8 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist. Let's get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
