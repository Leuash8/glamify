import nodemailer from "nodemailer"
import { CONFIG } from "./config"

interface OrderEmailData {
  orderId: string
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  items: Array<{
    id: number
    name: string
    price: number
    quantity: number
  }>
  total: number
  receiptPath?: string
}

// Create transporter
const transporter = nodemailer.createTransport({
  host: CONFIG.smtp.host,
  port: CONFIG.smtp.port,
  secure: CONFIG.smtp.secure,
  auth: {
    user: CONFIG.smtp.auth.user,
    pass: CONFIG.smtp.auth.pass,
  },
})

export async function sendOrderEmail(order: OrderEmailData) {
  try {
    const itemsHTML = order.items
      .map(
        (item) =>
          `<tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">x${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">₦${(item.price * item.quantity).toLocaleString()}</td>
      </tr>`,
      )
      .join("")

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #ff8c42; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">New Order Received!</h1>
        </div>
        
        <div style="padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #333;">Order Details</h2>
          <p><strong>Order ID:</strong> ${order.orderId}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          
          <h3 style="color: #333; margin-top: 20px;">Customer Information</h3>
          <p><strong>Name:</strong> ${order.fullName}</p>
          <p><strong>Email:</strong> ${order.email}</p>
          <p><strong>Phone:</strong> ${order.phone}</p>
          <p><strong>Address:</strong> ${order.address}, ${order.city}, ${order.state} ${order.zipCode}</p>
          
          <h3 style="color: #333; margin-top: 20px;">Order Items</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #ff8c42; color: white;">
                <th style="padding: 8px; text-align: left;">Product</th>
                <th style="padding: 8px; text-align: center;">Quantity</th>
                <th style="padding: 8px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
            </tbody>
          </table>
          
          <div style="margin-top: 20px; text-align: right;">
            <h3 style="color: #ff8c42;">Total: ₦${order.total.toLocaleString()}</h3>
          </div>
          
          <p style="margin-top: 20px; color: #666; font-size: 14px;">
            <strong>Status:</strong> Pending - Awaiting payment confirmation
          </p>
        </div>
        
        <div style="padding: 20px; background-color: #333; color: white; text-align: center; font-size: 12px;">
          <p>This is an automated email from Glamify. Please do not reply to this email.</p>
        </div>
      </div>
    `

    // Send email to admin
    await transporter.sendMail({
      from: CONFIG.smtp.auth.user,
      to: CONFIG.adminEmail,
      subject: `New Order: ${order.orderId}`,
      html: htmlContent,
    })

    // Send confirmation email to customer
    const customerHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #ff8c42; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Order Confirmation</h1>
        </div>
        
        <div style="padding: 20px; background-color: #f9f9f9;">
          <p>Hi ${order.fullName},</p>
          <p>Thank you for your order! We've received your order and will process it shortly.</p>
          
          <h3 style="color: #333;">Your Order ID: ${order.orderId}</h3>
          
          <h3 style="color: #333; margin-top: 20px;">Order Summary</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #ff8c42; color: white;">
                <th style="padding: 8px; text-align: left;">Product</th>
                <th style="padding: 8px; text-align: center;">Quantity</th>
                <th style="padding: 8px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
            </tbody>
          </table>
          
          <div style="margin-top: 20px; text-align: right;">
            <h3 style="color: #ff8c42;">Total: ₦${order.total.toLocaleString()}</h3>
          </div>
          
          <p style="margin-top: 20px; color: #666;">
            We'll send you an update once your order is confirmed. If you have any questions, feel free to contact us on WhatsApp.
          </p>
        </div>
        
        <div style="padding: 20px; background-color: #333; color: white; text-align: center; font-size: 12px;">
          <p>&copy; 2025 Glamify. All rights reserved.</p>
        </div>
      </div>
    `

    await transporter.sendMail({
      from: CONFIG.smtp.auth.user,
      to: order.email,
      subject: `Order Confirmation: ${order.orderId}`,
      html: customerHTML,
    })

    console.log(`[Email] Order notification sent for ${order.orderId}`)
    return true
  } catch (error) {
    console.error("[Email Error]", error)
    throw error
  }
}
