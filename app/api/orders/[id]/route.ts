import { type NextRequest, NextResponse } from "next/server"

// In-memory storage (in production, use a database)
const orders = new Map()

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    // In production, update in database
    // For now, just return success
    return NextResponse.json({
      id,
      status: body.status,
      message: "Order status updated successfully",
    })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
