"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function ContactSupport() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "general",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "general",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const supportChannels = [
    {
      icon: Mail,
      title: "Email Support",
      description: "For general inquiries and support requests",
      contact: "support@togetha.com",
      response: "24-48 hours",
    },
    {
      icon: Mail,
      title: "Legal Inquiries",
      description: "For legal requests and data subject requests",
      contact: "legal@togetha.com",
      response: "5-7 business days",
    },
    {
      icon: Mail,
      title: "Security Issues",
      description: "For reporting security vulnerabilities",
      contact: "security@togetha.com",
      response: "24 hours",
    },
    {
      icon: Mail,
      title: "Community Issues",
      description: "For reporting violations or concerns",
      contact: "community@togetha.com",
      response: "24-48 hours",
    },
  ];

  const categories = [
    { value: "general", label: "General Inquiry" },
    { value: "technical", label: "Technical Support" },
    { value: "billing", label: "Billing & Subscription" },
    { value: "feature-request", label: "Feature Request" },
    { value: "bug-report", label: "Bug Report" },
    { value: "legal", label: "Legal Request" },
    { value: "dsar", label: "Data Subject Access Request" },
    { value: "security", label: "Security Concern" },
  ];

  const faqs = [
    {
      question: "What is a Data Subject Access Request (DSAR)?",
      answer:
        "A Data Subject Access Request is a formal request under GDPR, CCPA, and other privacy laws for access to your personal data. To submit a DSAR, email legal@togetha.com with proof of identity. We'll respond within the legally required timeframe (typically 30 days).",
    },
    {
      question: "How do I report a security vulnerability?",
      answer:
        "Please send a detailed report to security@togetha.com. Include information about the vulnerability, how to reproduce it, and its potential impact. Do not disclose the vulnerability publicly until we've had time to address it. We appreciate responsible disclosure.",
    },
    {
      question: "What's your typical response time?",
      answer:
        "Response times vary by category: General support (24-48 hours), Security issues (24 hours), Legal requests (5-7 business days). You'll receive a confirmation email immediately upon submission and a substantive response within the stated timeframe.",
    },
    {
      question: "Can I schedule a call with the support team?",
      answer:
        "For Enterprise customers, we offer dedicated support and scheduling options. For other customers, email support@togetha.com to request a call. We'll do our best to accommodate your needs.",
    },
    {
      question: "How do I request a feature?",
      answer:
        'We love hearing feature ideas! Select "Feature Request" as your category and describe what you\'d like to see. Include your use case and why it would be valuable. We review all suggestions and prioritize them based on user demand.',
    },
    {
      question: "What if I need urgent support?",
      answer:
        'For urgent issues impacting your work, email support@togetha.com with "URGENT" in the subject line. For critical security incidents, contact security@togetha.com immediately. Enterprise customers have priority support channels.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b sticky top-0 z-40 bg-opacity-95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-3 md:px-4 sm:px-6 lg:px-8 py-2 md:py-4 flex items-center gap-x-2">
          <Image src="/logo.png" alt="Togetha Logo" width={40} height={40} />
          <div className="text-2xl font-bold tracking-tight">Togetha</div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Contact & Support
            </h1>
            <p className="text-lg opacity-70 mb-6">
              Get in touch with our team for direct inquiries, legal requests,
              or support needs
            </p>
            <p className="text-sm opacity-50 font-medium">
              We're here to help. Reach out anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Contact Channels */}
        <section className="mb-20">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="opacity-70 leading-relaxed">
              Choose the contact method that best fits your needs. Our team
              responds promptly to all inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {supportChannels.map((channel, idx) => {
              const Icon = channel.icon;
              return (
                <div
                  key={idx}
                  className="border rounded-lg p-6 hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <Icon size={24} className="shrink-0 mt-1 opacity-60" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {channel.title}
                      </h3>
                      <p className="text-sm opacity-60">
                        {channel.description}
                      </p>
                    </div>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <a
                      href={`mailto:${channel.contact}`}
                      className="font-medium opacity-80 hover:opacity-100 transition-opacity block mb-2"
                    >
                      {channel.contact}
                    </a>
                    <div className="flex items-center gap-2 text-sm opacity-60">
                      <Clock size={14} />
                      <span>Typical response: {channel.response}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact Form */}
        <section className="max-w-2xl mb-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Send us a Message</h2>
            <p className="opacity-70 leading-relaxed">
              Fill out the form below and our team will get back to you as soon
              as possible.
            </p>
          </div>

          {submitted && (
            <div className="mb-6 border border-green-200 rounded-lg p-4 flex items-start gap-3 bg-green-50 bg-opacity-30">
              <CheckCircle size={20} className="shrink-0 mt-0.5 opacity-80" />
              <div>
                <p className="font-semibold mb-1">Message Sent Successfully!</p>
                <p className="text-sm opacity-70">
                  Thank you for reaching out. Our team will review your message
                  and get back to you shortly.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                placeholder="John Doe"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                placeholder="john@example.com"
              />
              <p className="text-xs opacity-50 mt-1">
                We'll use this email to respond to your inquiry
              </p>
            </div>

            {/* Category Field */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Field */}
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                placeholder="Brief subject of your inquiry"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 resize-none"
                placeholder="Please provide as much detail as possible about your inquiry..."
              />
              <p className="text-xs opacity-50 mt-1">
                The more details you provide, the better we can assist you
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={
                loading ||
                !formData.name ||
                !formData.email ||
                !formData.subject ||
                !formData.message
              }
              className="w-full bg-opacity-10 border px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              <Send size={18} />
              {loading ? "Sending..." : "Send Message"}
            </button>

            <p className="text-xs opacity-50 text-center">
              By submitting this form, you agree to our Privacy Policy and Terms
              of Service
            </p>
          </div>
        </section>

        {/* Additional Information */}
        <section className="max-w-2xl mb-20">
          <h2 className="text-3xl font-bold mb-8">
            Frequently Asked Questions about Support
          </h2>

          <div className="space-y-8">
            {faqs.map((item, idx) => (
              <div key={idx} className="border-l-4 pl-6 py-4">
                <h3 className="font-semibold mb-2 text-lg">{item.question}</h3>
                <p className="opacity-75 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Office Information */}
        <section className="max-w-2xl mb-20">
          <h2 className="text-3xl font-bold mb-8">Our Office</h2>

          <div className="border rounded-lg p-8">
            <div className="flex items-start gap-4 mb-8">
              <MapPin size={24} className="shrink-0 mt-1 opacity-60" />
              <div>
                <h3 className="font-semibold mb-2 text-lg">Headquarters</h3>
                <p className="opacity-75 leading-relaxed">
                  Togetha Inc.
                  <br />
                  123 Innovation Street
                  <br />
                  San Francisco, CA 94105
                  <br />
                  United States
                </p>
              </div>
            </div>

            <div className="border-t pt-8 flex items-start gap-4">
              <Phone size={24} className="shrink-0 mt-1 opacity-60" />
              <div>
                <h3 className="font-semibold mb-2 text-lg">Phone</h3>
                <p className="opacity-75">+1 (415) 555-0123</p>
                <p className="text-sm opacity-50 mt-2">
                  Available Monday-Friday, 9 AM - 5 PM PST
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 border rounded-lg opacity-75">
            <p className="text-sm">
              <span className="font-semibold">Note:</span> For fastest response
              to inquiries, email is preferred. Phone lines are available for
              urgent matters only.
            </p>
          </div>
        </section>

        {/* Social & Resources */}
        <section className="max-w-2xl mb-20">
          <h2 className="text-3xl font-bold mb-8">Additional Resources</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Help Center",
                description:
                  "Browse our comprehensive knowledge base with guides and FAQs",
                link: "/support/help-center",
              },
              {
                title: "Status Page",
                description: "Check platform status and incident reports",
                link: "https://status.togetha.com",
              },
              {
                title: "Community Guidelines",
                description: "Learn about our community standards and policies",
                link: "/community-guidelines",
              },
              {
                title: "Privacy Policy",
                description: "Review how we handle your data and privacy",
                link: "/privacy",
              },
            ].map((resource, idx) => (
              <a
                key={idx}
                href={resource.link}
                className="border rounded-lg p-6 hover:opacity-80 transition-opacity group"
              >
                <h3 className="font-semibold mb-2 group-hover:opacity-100">
                  {resource.title}
                </h3>
                <p className="text-sm opacity-60">{resource.description}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
