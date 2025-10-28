"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingCart, Menu, X } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { items } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      {/* Increased nav height for bigger logo */}
      <div className="container-custom flex items-center justify-between h-24">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img
            src="/images/logo.png"
            alt="Glamify"
            className="h-45 w-auto"  // ⬅️ was h-14, now h-20
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Cart & Mobile Menu */}
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative p-2 hover:bg-accent-light rounded-lg transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-foreground" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-accent-light rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-white animate-in fade-in slide-in-from-top-2">
          <div className="container-custom py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
