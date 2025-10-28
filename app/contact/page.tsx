"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { CONFIG } from "@/lib/config"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create mailto link
      const mailtoLink = `mailto:${CONFIG.adminEmail}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
      )}`

      // Open mailto
      window.location.href = mailtoLink

      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" })
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-accent-light py-16 md:py-24">
        <div className="container-custom">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-lg text-white/90">We'd love to hear from you. Reach out to us anytime.</p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info */}
            <div className="bg-white rounded-lg border border-border p-8">
              <Mail className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">Email</h3>
              <p className="text-muted mb-4">Send us an email and we'll respond as soon as possible.</p>
              <a href={`mailto:${CONFIG.adminEmail}`} className="text-primary hover:text-primary-dark font-semibold">
                {CONFIG.adminEmail}
              </a>
            </div>

            <div className="bg-white rounded-lg border border-border p-8">
              <Phone className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">WhatsApp</h3>
              <p className="text-muted mb-4">Chat with us on WhatsApp for quick responses.</p>
              <a
                href={`https://wa.me/${CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark font-semibold"
              >
                +{CONFIG.whatsapp}
              </a>
            </div>

            <div className="bg-white rounded-lg border border-border p-8">
              <MapPin className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">Follow Us</h3>
              <p className="text-muted mb-4">Connect with us on social media.</p>
              <div className="flex gap-4">
                <a
                  href={CONFIG.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark font-semibold"
                >
                  Facebook
                </a>
                <a
                  href={CONFIG.snapchat}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark font-semibold"
                >
                  Snapchat
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg border border-border p-8">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-8">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {submitted && (
                  <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center font-semibold">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
