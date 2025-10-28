import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { type NextRequest, NextResponse } from "next/server"
import { sendOrderEmail } from "@/lib/email"

interface Order {
  id: string
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  deliveryMethod: "pickup" | "delivery"
  additionalNotes: string
  items: Array<{
    id: number
    name: string
    price: number
    quantity: number
  }>
  total: number
  deliveryFee: number
  finalTotal: number
  receiptPath?: string
  createdAt: string
  status: "pending"
}

// Store orders in memory (in production, use a database)
const orders: Map<string, Order> = new Map()

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const fullName = formData.get("fullName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const address = formData.get("address") as string
    const city = formData.get("city") as string
    const state = formData.get("state") as string
    const zipCode = formData.get("zipCode") as string
    const deliveryMethod = (formData.get("deliveryMethod") as "pickup" | "delivery") || "delivery"
    const additionalNotes = formData.get("additionalNotes") as string
    const items = JSON.parse(formData.get("items") as string)
    const total = Number.parseFloat(formData.get("total") as string)
    const deliveryFee = Number.parseFloat(formData.get("deliveryFee") as string)
    const finalTotal = Number.parseFloat(formData.get("finalTotal") as string)
    const receipt = formData.get("receipt") as File | null

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    let receiptPath: string | undefined

    // Handle receipt file
    if (receipt) {
      try {
        const uploadsDir = join(process.cwd(), "public", "uploads", "receipts")
        await mkdir(uploadsDir, { recursive: true })

        const buffer = await receipt.arrayBuffer()
        const filename = `${orderId}-${receipt.name}`
        const filepath = join(uploadsDir, filename)

        await writeFile(filepath, Buffer.from(buffer))
        receiptPath = `/uploads/receipts/${filename}`
      } catch (error) {
        console.error("Error saving receipt:", error)
        // Continue without receipt path
      }
    }

    // Create order object
    const order: Order = {
      id: orderId,
      fullName,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      deliveryMethod,
      additionalNotes,
      items,
      total,
      deliveryFee,
      finalTotal,
      receiptPath,
      createdAt: new Date().toISOString(),
      status: "pending",
    }

    // Store order
    orders.set(orderId, order)

    try {
      await sendOrderEmail({
        orderId: order.id,
        fullName: order.fullName,
        email: order.email,
        phone: order.phone,
        address: order.address,
        city: order.city,
        state: order.state,
        zipCode: order.zipCode,
        deliveryMethod: order.deliveryMethod,
        additionalNotes: order.additionalNotes,
        items: order.items,
        total: order.total,
        deliveryFee: order.deliveryFee,
        finalTotal: order.finalTotal,
        receiptPath: order.receiptPath,
      })
    } catch (error) {
      console.error("Error sending email notification:", error)
      // Continue even if email fails
    }

    return NextResponse.json({ id: orderId, ...order }, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const ordersList = Array.from(orders.values())
    return NextResponse.json(ordersList)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
