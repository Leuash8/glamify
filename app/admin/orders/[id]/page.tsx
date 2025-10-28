"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Download, CheckCircle } from "lucide-react"

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface Order {
  id: string
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  items: OrderItem[]
  total: number
  receiptPath?: string
  createdAt: string
  status: "pending" | "confirmed" | "shipped" | "delivered"
}

interface OrderDetailProps {
  params: Promise<{ id: string }>
}

export default function OrderDetailPage({ params }: OrderDetailProps) {
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [newStatus, setNewStatus] = useState<Order["status"]>("pending")

  useEffect(() => {
    params.then(async (p) => {
      try {
        const response = await fetch("/api/orders")
        if (response.ok) {
          const orders = await response.json()
          const foundOrder = orders.find((o: Order) => o.id === p.id)
          if (foundOrder) {
            setOrder(foundOrder)
            setNewStatus(foundOrder.status)
          }
        }
      } catch (error) {
        console.error("Error fetching order:", error)
      } finally {
        setIsLoading(false)
      }
    })
  }, [params])

  const handleStatusUpdate = async () => {
    if (!order) return

    try {
      const response = await fetch(`/api/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        const updated = await response.json()
        setOrder(updated)
        alert("Order status updated successfully")
      }
    } catch (error) {
      console.error("Error updating order:", error)
      alert("Failed to update order status")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted text-lg">Loading...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container-custom py-12">
          <p className="text-muted text-lg">Order not found</p>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-12">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="bg-white rounded-lg border border-border p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Order {order.id}</h1>
                  <p className="text-muted">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-lg border border-border p-6">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Customer Information</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted mb-1">Full Name</p>
                  <p className="font-semibold text-foreground">{order.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Email</p>
                  <p className="font-semibold text-foreground">{order.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">Phone</p>
                  <p className="font-semibold text-foreground">{order.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-1">City</p>
                  <p className="font-semibold text-foreground">
                    {order.city}, {order.state}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted mb-2">Delivery Address</p>
                <p className="font-semibold text-foreground">
                  {order.address}
                  <br />
                  {order.city}, {order.state} {order.zipCode}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg border border-border p-6">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Order Items</h2>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center pb-4 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-semibold text-foreground">{item.name}</p>
                      <p className="text-sm text-muted">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-primary">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex justify-between items-center">
                  <p className="font-serif text-xl font-bold text-foreground">Total</p>
                  <p className="font-serif text-2xl font-bold text-primary">₦{order.total.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Receipt */}
            {order.receiptPath && (
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Payment Receipt</h2>

                <div className="relative w-full h-64 bg-accent-light rounded-lg overflow-hidden mb-4">
                  <Image
                    src={order.receiptPath || "/placeholder.svg"}
                    alt="Payment receipt"
                    fill
                    className="object-contain"
                  />
                </div>

                <a
                  href={order.receiptPath}
                  download
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download Receipt
                </a>
              </div>
            )}
          </div>

          {/* Status Management */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border p-6 sticky top-20">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Update Status</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Order Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as Order["status"])}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>

                <button
                  onClick={handleStatusUpdate}
                  className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                >
                  Update Status
                </button>
              </div>

              {/* Status Timeline */}
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="font-semibold text-foreground mb-4">Status Timeline</h3>

                <div className="space-y-4">
                  {(["pending", "confirmed", "shipped", "delivered"] as const).map((status, index) => (
                    <div key={status} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            ["pending", "confirmed", "shipped", "delivered"].indexOf(order.status) >= index
                              ? "bg-primary text-white"
                              : "bg-border text-muted"
                          }`}
                        >
                          {["pending", "confirmed", "shipped", "delivered"].indexOf(order.status) >= index ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <div className="w-2 h-2 bg-current rounded-full" />
                          )}
                        </div>
                        {index < 3 && (
                          <div
                            className={`w-0.5 h-8 ${
                              ["pending", "confirmed", "shipped", "delivered"].indexOf(order.status) > index
                                ? "bg-primary"
                                : "bg-border"
                            }`}
                          />
                        )}
                      </div>
                      <div className="pt-1">
                        <p className="font-semibold text-foreground capitalize">{status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
