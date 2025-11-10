"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CommunityGuidelines() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [
    { id: "introduction", label: "Introduction" },
    { id: "core-values", label: "Core Values" },
    { id: "respect-inclusion", label: "Respect & Inclusion" },
    { id: "collaboration", label: "Collaboration Standards" },
    { id: "communication", label: "Professional Communication" },
    { id: "intellectual-property", label: "Intellectual Property" },
    { id: "confidentiality", label: "Confidentiality & Security" },
    { id: "content-standards", label: "Content Standards" },
    { id: "prohibited-conduct", label: "Prohibited Conduct" },
    { id: "workspace-etiquette", label: "Workspace Etiquette" },
    { id: "reporting", label: "Reporting Violations" },
    { id: "enforcement", label: "Enforcement & Consequences" },
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
              Community Guidelines
            </h1>
            <p className="text-lg opacity-70 mb-6">
              Creating a positive, productive, and inclusive collaborative
              environment for all Togetha users
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
              Welcome to Togetha! Our Community Guidelines are designed to
              foster a respectful, productive, and collaborative environment
              where teams can work together effectively in real time. These
              guidelines apply to all users, workspaces, and interactions on the
              Togetha platform.
            </p>
            <p className="mb-4 opacity-75 leading-relaxed">
              Togetha is a collaborative workspace platform built on trust,
              transparency, and mutual respect. We believe that when people
              communicate openly and treat each other with dignity, amazing
              things happen. These guidelines help us maintain that culture.
            </p>
            <p className="opacity-75 leading-relaxed">
              By using Togetha, you commit to adhering to these guidelines and
              to helping create an inclusive community where everyone can
              contribute their best work.
            </p>
          </section>

          {/* Core Values */}
          <section id="core-values" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-8">Core Values</h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              These core values guide everything we do at Togetha and should
              guide how you interact within our community:
            </p>

            <div className="space-y-6">
              {[
                {
                  title: "Respect",
                  desc: "We value diverse perspectives, experiences, and backgrounds. Treat every team member with dignity and consideration, regardless of their role, experience level, or background.",
                },
                {
                  title: "Collaboration",
                  desc: "Togetha is built for teamwork. Contribute actively, listen to others, and work together toward shared goals. Celebrate collective achievements.",
                },
                {
                  title: "Transparency",
                  desc: "Communicate openly and honestly. Share feedback constructively, acknowledge mistakes, and keep team members informed. Clear communication prevents misunderstandings.",
                },
                {
                  title: "Accountability",
                  desc: "Take responsibility for your actions and contributions. Follow through on commitments and maintain professional standards in all interactions.",
                },
                {
                  title: "Innovation",
                  desc: "Embrace creative thinking and new ideas. Challenge the status quo respectfully, experiment, and learn from both successes and failures.",
                },
                {
                  title: "Inclusivity",
                  desc: "Ensure everyone feels welcomed and valued. Create space for quiet voices, avoid assumptions, and actively work to include diverse viewpoints.",
                },
              ].map((value, idx) => (
                <div key={idx} className="border-l-4 pl-6 py-4">
                  <h3 className="font-semibold mb-2 text-lg">{value.title}</h3>
                  <p className="opacity-75 leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Respect & Inclusion */}
          <section id="respect-inclusion" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Respect & Inclusion</h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              A respectful and inclusive community is fundamental to Togetha's
              mission. We're committed to providing a platform free from
              discrimination, harassment, and bullying.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide opacity-70 mb-4">
                  Do's
                </h3>
                <ul className="space-y-3">
                  {[
                    "Treat all team members with respect and professionalism",
                    "Use inclusive language that welcomes people of all backgrounds",
                    "Listen actively and consider different perspectives",
                    "Give credit where credit is due",
                    "Support team members who ask for help",
                    "Speak up if you witness disrespectful behavior",
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
                  Don'ts
                </h3>
                <ul className="space-y-3">
                  {[
                    "Discriminate based on race, gender, sexual orientation, religion, disability, or any other characteristic",
                    "Engage in harassment, bullying, or intimidation",
                    "Make derogatory comments or jokes about protected groups",
                    "Use slurs or offensive language",
                    "Exclude people based on personal characteristics",
                    "Create hostile environments or exclude certain team members",
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

          {/* Collaboration Standards */}
          <section id="collaboration" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Collaboration Standards</h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              Effective collaboration requires shared understanding and mutual
              responsibility. These standards help us work together
              productively:
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Contribute meaningfully to discussions and decisions",
                "Respect deadlines and project timelines",
                "Keep team members informed of progress and changes",
                "Ask questions when you need clarification",
                "Build on others' ideas rather than dismissing them",
                "Work asynchronously with consideration for time zones and schedules",
                "Share knowledge and help teammates succeed",
                "Participate actively in meetings and collaborative sessions",
                "Provide context for comments and decisions",
                "Follow established team workflows and processes",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 opacity-75">
                  <ChevronRight size={18} className="shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="border-l-4 pl-6 py-4 opacity-75">
              <p className="font-semibold mb-2">Real-Time Collaboration:</p>
              <p>
                When collaborating in real time on Togetha, be mindful of
                others' contributions, avoid overwriting without discussion, and
                communicate clearly about changes and decisions.
              </p>
            </div>
          </section>

          {/* Professional Communication */}
          <section id="communication" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">
              Professional Communication
            </h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              Clear, respectful communication is the foundation of successful
              collaboration. Maintain professional standards in all written and
              verbal interactions on Togetha.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide opacity-70 mb-4">
                  Communication Best Practices
                </h3>
                <ul className="space-y-3">
                  {[
                    "Write clearly and concisely to be easily understood",
                    "Proofread before sending messages or sharing documents",
                    "Use professional tone and language in all communications",
                    "Respond promptly to messages and questions",
                    "Clarify assumptions before taking action",
                    "Give context when asking questions or making requests",
                    "Use appropriate channels for different types of communication",
                    "Acknowledge receipt of important messages",
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
                  Feedback & Criticism
                </h3>
                <p className="mb-4 opacity-75 leading-relaxed">
                  Constructive feedback is essential for growth and improvement:
                </p>
                <ul className="space-y-3">
                  {[
                    "Provide feedback with the intent to help, not to harm",
                    "Be specific about what could be improved",
                    "Offer suggestions for solutions, not just problems",
                    "Discuss concerns privately when appropriate",
                    "Receive feedback with an open mind",
                    "Separate criticism of ideas from criticism of people",
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

          {/* Intellectual Property */}
          <section id="intellectual-property" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Intellectual Property</h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              Respect intellectual property rights and give proper credit for
              the work and ideas of others:
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Respect copyrights, trademarks, and patents of third parties",
                "Give attribution when using others' content or ideas",
                "Don't plagiarize or claim credit for others' work",
                "Obtain permission before using external content or tools",
                "Don't share proprietary information without authorization",
                "Respect open source licenses and their requirements",
                "Properly cite sources in documents and presentations",
                "Report suspected intellectual property violations",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 opacity-75">
                  <ChevronRight size={18} className="shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="border-l-4 pl-6 py-4 opacity-75">
              <p className="font-semibold mb-2">Content Ownership:</p>
              <p>
                Content created within Togetha workspaces is owned by the
                workspace. Users creating content grant the necessary
                permissions for team collaboration and use within the workspace.
              </p>
            </div>
          </section>

          {/* Confidentiality & Security */}
          <section id="confidentiality" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">
              Confidentiality & Security
            </h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              Protecting sensitive information and maintaining workspace
              security is everyone's responsibility:
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Keep confidential information within appropriate access levels",
                "Don't share access credentials with others",
                "Log out when stepping away from your device",
                "Don't access others' workspaces or data without permission",
                "Report security vulnerabilities to Togetha support immediately",
                "Be cautious with external file sharing and link permissions",
                "Don't store sensitive information in locations visible to unauthorized users",
                "Follow your organization's data handling policies",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 opacity-75">
                  <ChevronRight size={18} className="shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="border-l-4 pl-6 py-4 opacity-75">
              <p className="font-semibold mb-2">
                Workspace Admin Responsibility:
              </p>
              <p>
                Workspace administrators should regularly review access
                permissions, monitor workspace activity, and ensure that only
                authorized members can access sensitive information.
              </p>
            </div>
          </section>

          {/* Content Standards */}
          <section id="content-standards" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Content Standards</h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              All content shared on Togetha should meet basic standards of
              professionalism and appropriateness:
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide opacity-70 mb-4">
                  Acceptable Content
                </h3>
                <ul className="space-y-3">
                  {[
                    "Professional work documents and materials",
                    "Constructive feedback and ideas",
                    "Relevant articles, resources, and learning materials",
                    "Project updates and progress information",
                    "Team coordination and meeting notes",
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
                  Prohibited Content
                </h3>
                <ul className="space-y-3">
                  {[
                    "Hate speech, slurs, or derogatory content",
                    "Sexually explicit or inappropriate content",
                    "Violence, threats, or harmful content",
                    "Spam or unsolicited advertising",
                    "Malware, viruses, or harmful code",
                    "Content that violates laws or regulations",
                    "Doxxing or sharing private information",
                    "Misinformation or deliberately false information",
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

          {/* Prohibited Conduct */}
          <section id="prohibited-conduct" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Prohibited Conduct</h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              The following behaviors are strictly prohibited on Togetha:
            </p>

            <ul className="space-y-3">
              {[
                "Harassment, bullying, or intimidation of any user",
                "Discrimination based on protected characteristics",
                "Sexual harassment or unwanted advances",
                "Revenge porn or non-consensual intimate imagery",
                "Threats of violence or harm",
                "Doxxing, stalking, or persistent contact after being asked to stop",
                "Impersonation or identity fraud",
                "Unauthorized access to accounts or data",
                "Spreading misinformation or conspiracy theories",
                "Spam or mass unsolicited communications",
                "Manipulation or coercion of others",
                "Attempting to hack or disable platform features",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 opacity-75">
                  <ChevronRight size={18} className="shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Workspace Etiquette */}
          <section id="workspace-etiquette" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Workspace Etiquette</h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              Maintaining a positive workspace culture requires attention to
              shared norms and expectations:
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide opacity-70 mb-4">
                  Meeting Etiquette
                </h3>
                <ul className="space-y-3">
                  {[
                    "Join on time and come prepared",
                    "Silence notifications or step away if you can't focus",
                    "Avoid multitasking during important discussions",
                    "Listen actively and avoid interrupting",
                    "Follow the meeting agenda and stay on topic",
                    "Respect time limits and finish on time",
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
                  Document Collaboration
                </h3>
                <ul className="space-y-3">
                  {[
                    "Communicate before making major changes",
                    "Organize documents clearly and consistently",
                    "Don't delete others' work without discussion",
                    "Version control and maintain document history",
                    "Respect others' formatting and style choices",
                    "Give credit for major contributions",
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
                  Workspace Organization
                </h3>
                <ul className="space-y-3">
                  {[
                    "Keep workspace organized and files clearly named",
                    "Use consistent naming conventions",
                    "Archive completed projects appropriately",
                    "Don't create unnecessary duplicate files",
                    "Respect established folder structures",
                    "Clean up outdated or unused content",
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

          {/* Reporting Violations */}
          <section id="reporting" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">Reporting Violations</h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              We take all reports seriously and are committed to maintaining a
              safe and respectful community. If you witness or experience a
              violation of these guidelines:
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide opacity-70 mb-4">
                  How to Report
                </h3>
                <ul className="space-y-3 mb-6">
                  {[
                    "Contact your workspace administrator directly",
                    "Email our support team at malostechnologies@gmail.com",
                    "Use the Help Center within Togetha, for asking help",
                    "Report severe violations to malostechnologies@gmail.com immediately",
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 opacity-75">
                      <ChevronRight size={18} className="shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="opacity-75 leading-relaxed text-sm">
                  <span className="font-semibold">When reporting:</span> Provide
                  as much detail as possible, including dates, times,
                  participants, and specific content or behavior. Screenshots or
                  saved messages are helpful.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide opacity-70 mb-4">
                  Confidentiality
                </h3>
                <p className="opacity-75 leading-relaxed">
                  We take confidentiality seriously and will handle reports
                  discreetly. We will not publicly identify reporters without
                  their consent and will protect them from retaliation.
                  Information will be shared only with those who need to know to
                  address the violation.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide opacity-70 mb-4">
                  No Retaliation
                </h3>
                <p className="opacity-75 leading-relaxed">
                  We prohibit retaliation against anyone who reports a violation
                  in good faith. Retaliation is itself a violation of these
                  guidelines and will be taken seriously.
                </p>
              </div>
            </div>
          </section>

          {/* Enforcement & Consequences */}
          <section id="enforcement" className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6">
              Enforcement & Consequences
            </h2>
            <p className="mb-6 opacity-75 leading-relaxed">
              Violations of these Community Guidelines may result in
              consequences ranging from warnings to permanent account
              suspension. The severity depends on factors including the nature
              of the violation, frequency, and impact on the community.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide opacity-70 mb-4">
                  Progressive Enforcement
                </h3>
                <ul className="space-y-4">
                  {[
                    {
                      level: "Warning",
                      desc: "A first-time minor violation may result in a warning and opportunity to correct behavior.",
                    },
                    {
                      level: "Temporary Suspension",
                      desc: "Repeated violations or serious first-time violations may result in temporary loss of access (24 hours to 30 days).",
                    },
                    {
                      level: "Workspace Removal",
                      desc: "Severe violations may result in permanent removal from a specific workspace.",
                    },
                    {
                      level: "Platform Ban",
                      desc: "Serious violations of law or severe harm may result in permanent removal from Togetha entirely.",
                    },
                  ].map((item, idx) => (
                    <li key={idx} className="border-l-4 pl-6 py-4 opacity-75">
                      <p className="font-semibold mb-2">{item.level}</p>
                      <p>{item.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold uppercase tracking-wide opacity-70 mb-4">
                  Appeals Process
                </h3>
                <p className="mb-4 opacity-75 leading-relaxed">
                  If you believe an enforcement action was taken in error, you
                  may appeal:
                </p>
                <ul className="space-y-3">
                  {[
                    "Email malostechnologies@gmail.com within 30 days of the action",
                    "Provide detailed explanation of why you believe the action was in error",
                    "Our review team will investigate and respond within 5 business days",
                    "Decisions can be overturned if evidence supports your appeal",
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

          {/* Footer Note */}
          <div className="pt-12 border-t opacity-50 text-sm">
            <p>
              These Community Guidelines are part of our commitment to creating
              a positive, productive collaboration environment. We review and
              update these guidelines regularly based on community feedback and
              emerging issues. Questions? Contact us at
              malostechnologies@gmail.com.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
