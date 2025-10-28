"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, Copy, Check } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { CONFIG } from "@/lib/config"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart, isLoaded } = useCart()
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [receiptPreview, setReceiptPreview] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Only pickup is available
  const deliveryMethod = "pickup"
  const deliveryFee = CONFIG.pickupFee
  const finalTotal = total + deliveryFee

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted text-lg">Loading...</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container-custom py-12">
          <div className="text-center py-20">
            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
            <p className="text-muted text-lg mb-8">Add items to your cart before checking out</p>
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setReceiptFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setReceiptPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("fullName", formData.fullName)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("address", formData.address)
      formDataToSend.append("city", formData.city)
      formDataToSend.append("state", formData.state)
      formDataToSend.append("zipCode", formData.zipCode)
      formDataToSend.append("deliveryMethod", deliveryMethod)
      formDataToSend.append("additionalNotes", additionalNotes)
      formDataToSend.append("items", JSON.stringify(items))
      formDataToSend.append("total", total.toString())
      formDataToSend.append("deliveryFee", deliveryFee.toString())
      formDataToSend.append("finalTotal", finalTotal.toString())
      if (receiptFile) formDataToSend.append("receipt", receiptFile)

      const response = await fetch("/api/orders", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        const order = await response.json()
        clearCart()
        router.push(`/order-confirmation/${order.id}`)
      } else {
        alert("Failed to submit order. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting order:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-12">
        <Link
          href="/cart"
          className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        <h1 className="font-serif text-4xl font-bold text-foreground mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Pickup Method (Delivery Removed) */}
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Pickup Method</h2>

                <label
                  className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors"
                  style={{ borderColor: "#ff8c42" }}
                >
                  <input type="radio" checked readOnly className="w-4 h-4" />
                  <div className="ml-4 flex-1">
                    <p className="font-semibold text-foreground">Pickup (Free)</p>
                    <p className="text-sm text-muted">Pick up your order at our store</p>
                  </div>
                  <span className="text-primary font-bold">₦0</span>
                </label>
              </div>

              {/* Shipping Information */}
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Customer Information</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                        placeholder="+234 800 000 0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                      placeholder="123 Main Street"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                        placeholder="Lagos"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                        placeholder="Lagos"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                        placeholder="100001"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Additional Notes</h2>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="Add any special instructions or notes for your order..."
                  rows={4}
                />
              </div>

              {/* Payment */}
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Payment Instructions</h2>

                <div className="bg-accent-light p-6 rounded-lg mb-6">
                  <p className="text-foreground font-semibold mb-4">Please transfer the amount below to:</p>

                  {[
                    { label: "Bank Name", value: CONFIG.bankDetails.bankName, field: "bank" },
                    { label: "Account Name", value: CONFIG.bankDetails.accountName, field: "name" },
                    { label: "Account Number", value: CONFIG.bankDetails.accountNumber, field: "account" },
                    { label: "Amount", value: `₦${finalTotal.toLocaleString()}`, field: "amount" },
                  ].map(({ label, value, field }) => (
                    <div key={field} className="flex items-center justify-between bg-white p-4 rounded-lg mb-3">
                      <div>
                        <p className="text-sm text-muted">{label}</p>
                        <p className="font-semibold text-foreground">{value}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(value, field)}
                        className="p-2 hover:bg-accent-light rounded transition-colors"
                      >
                        {copiedField === field ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <Copy className="w-5 h-5 text-primary" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-muted">
                  After payment, please upload your receipt below to confirm your order.
                </p>
              </div>

              {/* Receipt Upload */}
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Upload Receipt</h2>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  {receiptPreview ? (
                    <div className="space-y-4">
                      <img
                        src={receiptPreview || "/placeholder.svg"}
                        alt="Receipt preview"
                        className="max-h-48 mx-auto rounded-lg"
                      />
                      <p className="text-sm text-foreground font-semibold">{receiptFile?.name}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setReceiptFile(null)
                          setReceiptPreview("")
                        }}
                        className="text-primary hover:text-primary-dark text-sm font-semibold"
                      >
                        Change Receipt
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <Upload className="w-12 h-12 text-muted mx-auto mb-4" />
                      <p className="text-foreground font-semibold mb-2">Click to upload receipt</p>
                      <p className="text-sm text-muted">PNG, JPG, or PDF (Max 5MB)</p>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        required
                      />
                    </label>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !receiptFile}
                className="w-full bg-primary text-white px-6 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Processing Order..." : "Complete Order"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border p-6 sticky top-20">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-border max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-semibold text-foreground">{item.name}</p>
                      <p className="text-muted">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-foreground">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-muted">
                  <span>Subtotal</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Pickup</span>
                  <span>₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-foreground border-t border-border pt-3">
                  <span>Total</span>
                  <span className="text-primary">₦{finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
