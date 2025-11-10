"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TermsConditions() {
  const [activeSection, setActiveSection] = useState("acceptance-of-terms");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [
    { id: "acceptance-of-terms", label: "Acceptance of Terms" },
    { id: "use-license", label: "Use License" },
    { id: "disclaimer", label: "Disclaimer" },
    { id: "limitations", label: "Limitations of Liability" },
    { id: "accuracy", label: "Accuracy of Materials" },
    { id: "materials-license", label: "Materials License" },
    { id: "user-content", label: "User Content" },
    { id: "prohibited-behavior", label: "Prohibited Behavior" },
    { id: "termination", label: "Termination" },
    { id: "governing-law", label: "Governing Law" },
    { id: "dispute-resolution", label: "Dispute Resolution" },
    { id: "modifications", label: "Modifications to Terms" },
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
          <Link href="/">
            <div className="flex gap-x-1 items-center">
              <Image
                src="/logo.png"
                alt="Togetha Logo"
                width={40}
                height={40}
              />
              <div className="text-2xl font-bold tracking-tight">Togetha</div>
            </div>
          </Link>
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
              Terms & Conditions
            </h1>
            <p className="text-lg opacity-70 mb-6">
              The legal agreement governing your use of Togetha
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
          {/* Acceptance of Terms */}
          <section id="acceptance-of-terms" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Acceptance of Terms</h2>
            <p className="mb-4 opacity-75 leading-relaxed">
              By accessing and using Togetha (the "Service"), you accept and
              agree to be bound by the terms and provision of this agreement. If
              you do not agree to abide by the above, please do not use this
              service.
            </p>
            <p className="mb-4 opacity-75 leading-relaxed">
              Togetha reserves the right to make changes to these Terms and
              Conditions at any time without notice. Your continued use of the
              website will signify your acceptance of any adjustment to these
              terms.
            </p>
            <p className="opacity-75 leading-relaxed">
              By using Togetha, you represent that you are at least 18 years old
              or have the legal consent of a parent or guardian to use this
              service.
            </p>
          </section>

          {/* Use License */}
          <section id="use-license" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Use License</h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              Permission is granted to temporarily download one copy of the
              materials (information or software) on Togetha for personal,
              non-commercial transitory viewing only. This is the grant of a
              license, not a transfer of title, and under this license you may
              not:
            </p>
            <ul className="space-y-3">
              {[
                "Modifying or copying the materials",
                "Using the materials for any commercial purpose or for any public display",
                "Attempting to decompile, disassemble, or reverse engineer any software contained on Togetha",
                "Removing any copyright or other proprietary notations from the materials",
                'Transferring the materials to another person or "mirroring" the materials on any other server',
                "Violating any applicable laws or regulations in connection with your access or use",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 opacity-75">
                  <ChevronRight size={18} className="shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Disclaimer */}
          <section id="disclaimer" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Disclaimer</h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              The materials on Togetha are provided "as is". Togetha makes no
              warranties, expressed or implied, and hereby disclaims and negates
              all other warranties including, without limitation, implied
              warranties or conditions of merchantability, fitness for a
              particular purpose, or non-infringement of intellectual property
              or other violation of rights.
            </p>
            <p className="mb-6 opacity-75 leading-relaxed">
              Further, Togetha does not warrant or make any representations
              concerning the accuracy, likely results, or reliability of the use
              of the materials on its website or otherwise relating to such
              materials or on any sites linked to this site.
            </p>
            <div className="border-l-4 pl-6 py-4 opacity-75">
              <p className="font-semibold mb-2">No Warranty:</p>
              <p>
                You assume all responsibility and risk for the use of Togetha
                and the internet generally. Use of Togetha is at your own risk.
                Togetha is provided on an "as-is" basis without any warranties
                of any kind.
              </p>
            </div>
          </section>

          {/* Limitations of Liability */}
          <section id="limitations" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">
              Limitations of Liability
            </h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              In no event shall Togetha or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on Togetha, even if Togetha or
              an authorized representative has been notified orally or in
              writing of the possibility of such damage.
            </p>
            <p className="mb-6 opacity-75 leading-relaxed">
              Togetha's total liability to you for damages shall not exceed the
              amount you paid to Togetha in the 12 months immediately preceding
              the claim, or the amount of $100 USD, whichever is greater.
            </p>
            <ul className="space-y-3">
              {[
                "Loss of profits, revenue, data, or use",
                "Business interruption or stoppage",
                "Any indirect, incidental, special, consequential, or punitive damages",
                "Loss of opportunity or goodwill",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 opacity-75">
                  <ChevronRight size={18} className="shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Accuracy of Materials */}
          <section id="accuracy" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Accuracy of Materials</h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              The materials appearing on Togetha could include technical,
              typographical, or photographic errors. Togetha does not warrant
              that any of the materials on its website are accurate, complete,
              or current. Togetha may make changes to the materials contained on
              its website at any time without notice.
            </p>
            <p className="mb-6 opacity-75 leading-relaxed">
              Togetha does not make any commitment to update the materials on
              this website. While we strive to provide accurate and up-to-date
              information, we cannot guarantee that all information is
              error-free or current.
            </p>
            <p className="opacity-75 leading-relaxed">
              You are responsible for verifying any information you rely upon
              before taking action based on such information.
            </p>
          </section>

          {/* Materials License */}
          <section id="materials-license" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Materials License</h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              Togetha grants you a limited, non-exclusive, non-transferable
              license to access and use Togetha for lawful purposes only. This
              license does not include:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "The right to sell or modify the service or any materials contained therein",
                "The right to decompile or otherwise reverse engineer any software",
                "The right to remove any copyright, trademark, or other proprietary notices",
                "The right to transfer the license to another party",
                "Commercial use of the service except as expressly permitted",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 opacity-75">
                  <ChevronRight size={18} className="shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="opacity-75 leading-relaxed">
              All content, software, and materials on Togetha remain the
              exclusive property of Togetha or its content suppliers and are
              protected by international copyright laws.
            </p>
          </section>

          {/* User Content */}
          <section id="user-content" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">User Content</h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              You retain all rights to any content you submit, post, or display
              on or through Togetha ("User Content"). By submitting User
              Content, you grant Togetha a non-exclusive, worldwide,
              royalty-free license to use, reproduce, modify, and distribute
              such content in connection with operating and improving the
              Service.
            </p>
            <p className="mb-6 opacity-75 leading-relaxed">
              You represent and warrant that:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "You own or have the necessary rights to the User Content you submit",
                "Your User Content does not violate any third-party rights",
                "Your User Content does not contain viruses, malware, or other harmful code",
                "Your User Content complies with all applicable laws and regulations",
                "Your User Content does not infringe on any intellectual property rights",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 opacity-75">
                  <ChevronRight size={18} className="shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="opacity-75 leading-relaxed">
              Togetha reserves the right to remove any User Content that
              violates these terms or is otherwise objectionable.
            </p>
          </section>

          {/* Prohibited Behavior */}
          <section id="prohibited-behavior" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Prohibited Behavior</h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              You agree not to engage in any of the following prohibited
              behaviors:
            </p>
            <ul className="space-y-3">
              {[
                "Harassing, threatening, or defaming any person",
                "Uploading or transmitting viruses or malicious code",
                "Spam, phishing, or other fraudulent activities",
                "Attempting to gain unauthorized access to Togetha systems",
                "Disrupting the normal operation of Togetha",
                "Collecting or tracking personal information of others without consent",
                "Violating any applicable laws or regulations",
                "Infringing on intellectual property rights",
                "Using automated tools to access or scrape the Service",
                "Impersonating another person or entity",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 opacity-75">
                  <ChevronRight size={18} className="shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Termination */}
          <section id="termination" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Termination</h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              Togetha may terminate or suspend your account and access to the
              Service at any time, for any reason, without notice or liability.
              Reasons for termination include, but are not limited to:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "Violation of these Terms and Conditions",
                "Illegal or harmful activity",
                "Payment failure or fraud",
                "Abuse of the Service or other users",
                "Non-compliance with applicable laws",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 opacity-75">
                  <ChevronRight size={18} className="shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mb-6 opacity-75 leading-relaxed">
              Upon termination, all rights granted to you will immediately
              cease, and you must destroy any materials in your possession
              related to Togetha.
            </p>
            <div className="border-l-4 pl-6 py-4 opacity-75">
              <p className="font-semibold mb-2">Data After Termination:</p>
              <p>
                Togetha is not responsible for any data loss resulting from
                account termination. You should maintain backups of your data.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section id="governing-law" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Governing Law</h2>
            <p className="mb-4 opacity-75 leading-relaxed">
              These Terms and Conditions and all related policies are governed
              by and construed in accordance with the laws of the State of
              California, United States, without regard to its conflict of laws
              doctrine. Any legal suit, action or proceeding arising out of or
              relating to these terms shall be instituted exclusively in the
              federal or state courts located in San Francisco County,
              California.
            </p>
            <p className="opacity-75 leading-relaxed">
              You irrevocably submit to the exclusive jurisdiction of these
              courts and waive any objection to venue or inconvenient forum.
            </p>
          </section>

          {/* Dispute Resolution */}
          <section id="dispute-resolution" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Dispute Resolution</h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              In the event of a dispute arising out of or relating to these
              Terms and Conditions or your use of Togetha, the parties agree to
              attempt to resolve the dispute through good faith negotiation
              before pursuing any legal action.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide opacity-70 mb-4">
                  Binding Arbitration
                </h3>
                <p className="opacity-75 leading-relaxed">
                  Any dispute that cannot be resolved through negotiation shall
                  be submitted to binding arbitration administered by a neutral
                  arbitrator. The arbitration shall take place in San Francisco,
                  California, and shall be conducted in accordance with the
                  American Arbitration Association (AAA) rules.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide opacity-70 mb-4">
                  Class Action Waiver
                </h3>
                <p className="opacity-75 leading-relaxed">
                  You agree that any arbitration or proceeding shall be
                  conducted on an individual basis and not as a class action,
                  collective action, or representative action.
                </p>
              </div>
            </div>
          </section>

          {/* Modifications to Terms */}
          <section id="modifications" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Modifications to Terms</h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              Togetha reserves the right, at its sole discretion, to modify
              these Terms and Conditions at any time. Such modifications are
              effective immediately upon posting to the website. Your continued
              use of Togetha following the posting of modified Terms means that
              you accept and agree to the changes.
            </p>
            <p className="mb-6 opacity-75 leading-relaxed">
              It is your responsibility to review these Terms regularly to
              ensure you are aware of any modifications. If you do not agree
              with any changes to these Terms, you should discontinue your use
              of Togetha.
            </p>
            <div className="border-l-4 pl-6 py-4 opacity-75">
              <p className="font-semibold mb-2">Notification:</p>
              <p>
                We will notify you of any material changes by updating the "Last
                Updated" date of these Terms and by posting notice on Togetha.
              </p>
            </div>
          </section>

          {/* Footer Note */}
          <div className="pt-12 border-t opacity-50 text-sm">
            <p>
              If you have any questions about these Terms and Conditions, please
              contact us at malostechnologies@gmail.com. These Terms and
              Conditions were last updated on November 10, 2025.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
