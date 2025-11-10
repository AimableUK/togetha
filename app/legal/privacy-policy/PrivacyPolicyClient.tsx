"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import Image from "next/image";

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [
    { id: "introduction", label: "Introduction" },
    { id: "information-we-collect", label: "Information We Collect" },
    { id: "how-we-use", label: "How We Use Your Information" },
    { id: "data-sharing", label: "Data Sharing & Disclosure" },
    { id: "data-retention", label: "Data Retention" },
    { id: "your-rights", label: "Your Rights & Choices" },
    { id: "security", label: "Security" },
    { id: "cookies", label: "Cookies & Tracking" },
    { id: "third-party", label: "Third-Party Services" },
    { id: "children", label: "Children's Privacy" },
    { id: "international", label: "International Data Transfers" },
    { id: "contact", label: "Contact Us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: any) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b sticky top-0 z-40 bg-opacity-95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-3 md:px-4 sm:px-6 lg:px-8 py-2 md:py-4 flex items-center justify-between">
          <div className="flex gap-x-1 items-center">
            <Image src="/logo.png" alt="Togetha Logo" width={40} height={40} />
            <div className="text-2xl font-bold tracking-tight">Togetha</div>
          </div>
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg opacity-70 mb-6">
              How we protect and handle your data at Togetha
            </p>
            <p className="text-sm opacity-50 font-medium">
              Last updated: November 10, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <nav className="lg:hidden mb-8 space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeSection === section.id
                        ? "font-semibold opacity-100"
                        : "opacity-60 hover:opacity-80"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            )}

            {/* Desktop Navigation */}
            <nav className="hidden lg:block space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider opacity-50 mb-6">
                Table of Contents
              </h3>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 border-l-2 ${
                    activeSection === section.id
                      ? "border-current font-medium opacity-100"
                      : "border-transparent opacity-60 hover:opacity-80"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="lg:col-span-3 space-y-16">
          {/* Introduction */}
          <section id="introduction" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Introduction</h2>
            <p className="mb-4 opacity-75 leading-relaxed">
              At Togetha, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and otherwise process
              information about you in connection with our website,
              applications, and services (collectively, the "Services").
            </p>
            <p className="opacity-75 leading-relaxed">
              By accessing or using Togetha, you agree to the terms of this
              Privacy Policy. If you do not agree with our practices, please do
              not use our Services.
            </p>
          </section>

          {/* Information We Collect */}
          <section id="information-we-collect" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-8">Information We Collect</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide opacity-70 mb-4">
                  Information You Provide Directly
                </h3>
                <ul className="space-y-3">
                  {[
                    {
                      title: "Account Registration",
                      desc: "When you create an account, we collect your name, email address, and profile picture from Google.",
                    },
                    {
                      title: "Communication Data",
                      desc: "We collect information when you email us, submit a support ticket, or communicate through our platform.",
                    },
                    {
                      title: "User-Generated Content",
                      desc: "Any content, files, documents, or data you create or upload to Togetha.",
                    },
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 opacity-75">
                      <ChevronRight size={18} className="shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">{item.title}:</span>{" "}
                        {item.desc}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide opacity-70 mb-4">
                  Information Collected Automatically
                </h3>
                <ul className="space-y-3">
                  {[
                    {
                      title: "Device Information",
                      desc: "Device type, operating system, browser type, and device identifiers.",
                    },
                    {
                      title: "Usage Data",
                      desc: "Information about how you interact with our Services, including features accessed and time spent.",
                    },
                    {
                      title: "Cookies & Similar Technologies",
                      desc: "We use cookies, web beacons, and similar tracking technologies to enhance your experience.",
                    },
                    {
                      title: "Log Data",
                      desc: "Server logs containing access times, pages viewed, and referring URLs.",
                    },
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 opacity-75">
                      <ChevronRight size={18} className="shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">{item.title}:</span>{" "}
                        {item.desc}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide opacity-70 mb-4">
                  Information from Third Parties
                </h3>
                <ul className="space-y-3">
                  {[
                    {
                      title: "Social Media",
                      desc: "If you sign up using a social media account, we receive information from that platform.",
                    },
                    {
                      title: "Third-Party Integrations",
                      desc: "Information from integrated applications and services you connect to Togetha.",
                    },
                    {
                      title: "Analytics Providers",
                      desc: "Data about your interactions with our site from analytics services.",
                    },
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 opacity-75">
                      <ChevronRight size={18} className="shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">{item.title}:</span>{" "}
                        {item.desc}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use */}
          <section id="how-we-use" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">
              How We Use Your Information
            </h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              We use the information we collect for various purposes:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Providing Services: To deliver, maintain, and improve the Togetha platform and features.",
                "Authentication: To verify your identity and secure your account.",
                "Communication: To send you transactional emails, support responses, and service updates.",
                "Marketing: To send promotional emails and updates (with your consent where required).",
                "Analytics: To understand usage patterns and improve our platform.",
                "Personalization: To customize your experience and provide relevant content.",
                "Security: To detect, prevent, and address fraud, abuse, and security issues.",
                "Legal Compliance: To comply with applicable laws and regulations.",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 opacity-75">
                  <ChevronRight size={18} className="shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="border-l-4 pl-6 py-4 opacity-75">
              <p className="font-semibold mb-2">Legitimate Interests:</p>
              <p>
                We process your data where we have legitimate business interests
                that are not overridden by your rights, such as improving our
                services, detecting fraud, and ensuring platform security.
              </p>
            </div>
          </section>

          {/* Data Sharing */}
          <section id="data-sharing" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-8">
              Data Sharing & Disclosure
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide opacity-70 mb-4">
                  We Do Share Data With
                </h3>
                <ul className="space-y-3">
                  {[
                    "Service Providers: Third-party vendors who help us operate our platform.",
                    "Business Partners: Integrations and partners you authorize.",
                    "Legal Requirements: When required by law, court order, or government authority.",
                    "Business Transfers: In the event of merger, acquisition, bankruptcy, or sale of assets.",
                    "With Your Consent: Any other sharing where you provide explicit consent.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 opacity-75">
                      <ChevronRight size={18} className="shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide opacity-70 mb-4">
                  We Do NOT Share Data
                </h3>
                <ul className="space-y-3">
                  {[
                    "We do not sell your personal data to third parties for marketing purposes.",
                    "We do not share your data with unaffiliated parties for their own marketing purposes without consent.",
                    "We do not disclose your sensitive information (account details) to unauthorized parties.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 opacity-75">
                      <ChevronRight size={18} className="shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section id="data-retention" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Data Retention</h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              We retain your personal information for as long as necessary to
              provide our Services and fulfill the purposes outlined in this
              Privacy Policy. Retention periods vary based on the context of the
              processing and our legal obligations:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "Active Account Data: Retained while your account is active.",
                "Deleted Accounts: Deleted within 30 days of account deletion.",
                "Transactional Data: Retained for at least 7 years for tax and legal compliance.",
                "Marketing Data: Retained until you unsubscribe.",
                "Log Data: Typically retained for 90 days.",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 opacity-75">
                  <ChevronRight size={18} className="shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="opacity-75 leading-relaxed">
              If you wish to delete your data sooner, please contact us using
              the information in the Contact section below.
            </p>
          </section>

          {/* Your Rights */}
          <section id="your-rights" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-8">Your Rights & Choices</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide opacity-70 mb-4">
                  Depending on your location, you may have:
                </h3>
                <ul className="space-y-3">
                  {[
                    "Right to Access: You can request a copy of the personal data we hold about you.",
                    "Right to Correction: You can request corrections to inaccurate or incomplete data.",
                    "Right to Deletion: You can request deletion of your personal data.",
                    "Right to Portability: You can request your data in a portable format.",
                    "Right to Object: You can object to processing of your data for certain purposes.",
                    "Right to Withdraw Consent: You can withdraw previously given consent at any time.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 opacity-75">
                      <ChevronRight size={18} className="shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide opacity-70 mb-4">
                  Marketing Communications
                </h3>
                <p className="opacity-75 leading-relaxed">
                  You can opt out of marketing emails by clicking the
                  unsubscribe link in any email or updating your preferences in
                  your account settings. Opting out of marketing communications
                  will not affect transactional emails about your account.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide opacity-70 mb-4">
                  Cookie Preferences
                </h3>
                <p className="opacity-75 leading-relaxed">
                  You can manage cookie preferences through your browser
                  settings. Most browsers allow you to refuse cookies or alert
                  you when cookies are being sent.
                </p>
              </div>
            </div>
          </section>

          {/* Security */}
          <section id="security" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Security</h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              We implement comprehensive technical, administrative, and physical
              security measures to protect your personal information:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "End-to-end encryption for data in transit and at rest",
                "Regular security audits and penetration testing",
                "Multi-factor authentication for account access",
                "Secure password policies and requirements",
                "Access controls and role-based permissions",
                "Compliance with industry standards (SOC 2, GDPR, CCPA)",
                "Incident response and data breach notification procedures",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 opacity-75">
                  <ChevronRight size={18} className="shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="opacity-75 leading-relaxed">
              However, no security system is impenetrable. You are responsible
              for maintaining the confidentiality of your login credentials.
            </p>
          </section>

          {/* Cookies */}
          <section id="cookies" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-8">
              Cookies & Tracking Technologies
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide opacity-70 mb-4">
                  Types of Cookies We Use
                </h3>
                <ul className="space-y-3">
                  {[
                    "Essential Cookies: Required for platform functionality and security.",
                    "Performance Cookies: Help us understand how you use our Services to improve functionality.",
                    "Functional Cookies: Remember your preferences and settings.",
                    "Analytics Cookies: Track usage patterns and performance metrics.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 opacity-75">
                      <ChevronRight size={18} className="shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide opacity-70 mb-4">
                  Your Cookie Choices
                </h3>
                <p className="opacity-75 leading-relaxed">
                  You can control cookie preferences through your browser
                  settings. Disabling cookies may limit functionality of our
                  Services. We respect Do Not Track (DNT) signals where
                  applicable.
                </p>
              </div>
            </div>
          </section>

          {/* Third Party */}
          <section id="third-party" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Third-Party Services</h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              Our Services may contain links to and integrate with third-party
              websites and services. This Privacy Policy does not apply to those
              services. We encourage you to review the privacy policies of any
              third-party services before providing your information.
            </p>
            <div>
              <h3 className="text-lg font-semibold uppercase tracking-wide opacity-70 mb-4">
                Common Third-Party Integrations
              </h3>
              <ul className="space-y-3">
                {[
                  "Analytics Services (Google Analytics)",
                  "Payment Processors (Flutter Wave)",
                  "Email Providers (Resend)",
                  "Social Media Platforms",
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 opacity-75">
                    <ChevronRight size={18} className="shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Children */}
          <section id="children" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Children's Privacy</h2>
            <p className="mb-4 opacity-75 leading-relaxed">
              Togetha is not intended for users under 13 years of age (or the
              applicable age of digital consent in your jurisdiction). We do not
              knowingly collect personal information from children. If we become
              aware that we have collected information from a child under 13, we
              will take steps to delete such information promptly.
            </p>
            <p className="opacity-75 leading-relaxed">
              If you believe we have collected information from a child, please
              contact us immediately.
            </p>
          </section>

          {/* International */}
          <section id="international" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">
              International Data Transfers
            </h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              Your information may be transferred to, stored in, and processed
              in countries other than your country of residence. When we
              transfer personal information internationally, we implement
              appropriate safeguards:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "Standard Contractual Clauses (SCCs) approved by relevant authorities",
                "Binding Corporate Rules",
                "Your explicit consent",
                "Adequacy decisions by competent authorities",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 opacity-75">
                  <ChevronRight size={18} className="shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="opacity-75 leading-relaxed">
              By using Togetha, you consent to the transfer of your information
              to countries outside your country of residence.
            </p>
          </section>

          {/* Contact */}
          <section id="contact" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              If you have questions about this Privacy Policy or to exercise
              your rights, please contact us:
            </p>
            <div className="border-l-4 pl-6 py-4 mb-8 opacity-75">
              <p className="font-semibold mb-3">
                Email: malostechnologies@gmail.com
              </p>
              <p className="font-semibold mb-3">
                Mailing Address: Gasabo, kigali, Rwanda
                <br />
                Togetha Inc.
                <br />
                Gasabo, Kigali
              </p>
              <p className="font-semibold">
                Response Time: We aim to respond to all inquiries within 30
                days.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold uppercase tracking-wide opacity-70 mb-4">
                EU Data Subject Rights
              </h3>
              <p className="opacity-75 leading-relaxed">
                If you're located in the EU or EEA, you have the right to lodge
                a complaint with your local data protection authority if you
                believe we have violated your privacy rights.
              </p>
            </div>
          </section>

          {/* Footer Note */}
          <div className="pt-12 border-t opacity-50 text-sm">
            <p>
              This Privacy Policy is current as of the last updated date shown
              above. Togetha reserves the right to modify this policy at any
              time. We will notify users of material changes via email or by
              prominently posting changes on our website.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
