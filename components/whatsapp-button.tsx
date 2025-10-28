"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { CONFIG } from "@/lib/config"

export default function WhatsAppButton() {
  return (
    <Link
      href={`https://wa.me/${CONFIG.whatsapp}?text=Hi%20Glamify%2C%20I%20have%20a%20question%20about%20your%20products`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 animate-bounce"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </Link>
  )
}
