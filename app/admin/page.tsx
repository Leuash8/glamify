"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Eye, CheckCircle, Clock, AlertCircle } from "lucide-react"

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

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "confirmed" | "shipped" | "delivered">("all")

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders")
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredOrders = orders.filter((order) => filterStatus === "all" || order.status === filterStatus)

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />
      case "shipped":
        return <AlertCircle className="w-4 h-4" />
      case "delivered":
        return <CheckCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <div className="bg-primary text-white py-8">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-4xl font-bold">Admin Dashboard</h1>
              <p className="text-white/80 mt-2">Manage orders and customer information</p>
            </div>
            <Link href="/" className="text-white hover:text-white/80 transition-colors">
              Back to Store
            </Link>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container-custom py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg border border-border p-6">
            <p className="text-muted text-sm mb-2">Total Orders</p>
            <p className="font-serif text-3xl font-bold text-foreground">{orders.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-border p-6">
            <p className="text-muted text-sm mb-2">Pending</p>
            <p className="font-serif text-3xl font-bold text-yellow-600">
              {orders.filter((o) => o.status === "pending").length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-border p-6">
            <p className="text-muted text-sm mb-2">Confirmed</p>
            <p className="font-serif text-3xl font-bold text-blue-600">
              {orders.filter((o) => o.status === "confirmed").length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-border p-6">
            <p className="text-muted text-sm mb-2">Total Revenue</p>
            <p className="font-serif text-3xl font-bold text-primary">
              ₦{orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-3">
          {(["all", "pending", "confirmed", "shipped", "delivered"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors capitalize ${
                filterStatus === status
                  ? "bg-primary text-white"
                  : "bg-white border border-border text-foreground hover:border-primary"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg border border-border overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <p className="text-muted text-lg">Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-muted text-lg">No orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-accent-light border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Items</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Total</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr
                      key={order.id}
                      className={`border-b border-border hover:bg-accent-light transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 font-mono text-sm font-semibold text-primary">{order.id}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-foreground">{order.fullName}</p>
                          <p className="text-sm text-muted">{order.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">{order.items.length} items</td>
                      <td className="px-6 py-4 font-bold text-primary">₦{order.total.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors font-semibold"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
