import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Poppins } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Glamify - Premium Herbal Hair & Lip Care",
  description:
    "Discover pure, natural herbal hair and lip care products crafted to nourish and enhance your natural glow",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="font-poppins bg-background text-foreground">
        <Navigation />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
