"use client"

import Link from "next/link"
import { CheckCircle, Download, Home } from "lucide-react"
import { useEffect, useState } from "react"

interface OrderConfirmationProps {
  params: Promise<{ id: string }>
}

export default function OrderConfirmationPage({ params }: OrderConfirmationProps) {
  const [orderId, setOrderId] = useState<string>("")

  useEffect(() => {
    params.then((p) => setOrderId(p.id))
  }, [params])

  if (!orderId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted text-lg">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto" />
          </div>

          {/* Success Message */}
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Order Confirmed!</h1>
          <p className="text-lg text-muted mb-8">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>

          {/* Order Details */}
          <div className="bg-white rounded-lg border border-border p-8 mb-8">
            <div className="mb-6 pb-6 border-b border-border">
              <p className="text-sm text-muted mb-2">Order Number</p>
              <p className="font-serif text-3xl font-bold text-primary">#{orderId}</p>
            </div>

            <div className="space-y-4 text-left">
              <div>
                <p className="text-sm text-muted mb-1">Status</p>
                <p className="font-semibold text-foreground flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                  Payment Pending Verification
                </p>
              </div>

              <div>
                <p className="text-sm text-muted mb-1">What's Next?</p>
                <ul className="text-foreground space-y-2 list-disc list-inside">
                  <li>We'll verify your payment receipt</li>
                  <li>You'll receive a confirmation email</li>
                  <li>Your order will be prepared for shipment</li>
                  <li>You'll get tracking information via email</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-accent-light rounded-lg p-6 mb-8">
            <p className="text-foreground mb-4">If you have any questions about your order, please contact us at:</p>
            <p className="font-semibold text-primary text-lg">
              {process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@glamify.com"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <Link
              href="/shop"
              className="flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              <Download className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
