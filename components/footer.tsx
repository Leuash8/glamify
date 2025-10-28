"use client"

import Link from "next/link"
import { Facebook, MessageCircle, Camera } from "lucide-react"
import { CONFIG } from "@/lib/config"

export default function Footer() {
  return (
    <footer className="bg-neutral-dark text-white mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Glamify</h3>
            <p className="text-gray-400 text-sm">
              Premium herbal hair and natural lip care products for the modern woman.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/shop" className="hover:text-primary transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-primary transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href={CONFIG.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary rounded-full hover:bg-primary-dark transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary rounded-full hover:bg-primary-dark transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={CONFIG.snapchat}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary rounded-full hover:bg-primary-dark transition-colors"
              >
                <Camera className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Glamify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
