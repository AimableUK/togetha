"use client";

import React, { useState } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HelpCenter() {
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({});

  const categories = [
    { id: "getting-started", label: "Getting Started" },
    { id: "workspaces", label: "Workspaces & Teams" },
    // { id: "collaboration", label: "Real-Time Collaboration" },
    { id: "documents", label: "Documents & Files" },
    { id: "permissions", label: "Permissions & Access" },
    { id: "account", label: "Account Settings" },
    { id: "troubleshooting", label: "Troubleshooting" },
    { id: "best-practices", label: "Best Practices" },
  ];

  const faqs = {
    "getting-started": [
      {
        id: "gs-1",
        question: "How do I create my first Team?",
        answer:
          'To create your first Team, sign in to your Togetha account and click "Create Team" on your dashboard, Choose a name. Invite team members by entering their email addresses, and they\'ll receive an invitation to join.',
      },
      {
        id: "gs-2",
        question: "What's the difference between a workspace and a team?",
        answer:
          "A workspace is your top-level collaborative environment where multiple teams can exist. Teams are sub-groups within a workspace that focus on specific projects or functions. You can organize teams by department, project, or any structure that works for your organization.",
      },
      {
        id: "gs-3",
        question: "How do I invite team members to my workspace?",
        answer:
          'On the Header of Workspace on a specified, Click "Invite" and enter email addresses of the people you want to invite. You can set their role (Editor, or Viewer) before sending invitations. They\'ll receive an email with a link to join.',
      },
      {
        id: "gs-4",
        question: "Can I use Togetha on mobile?",
        answer:
          "Yes! Togetha is fully responsive and works on mobile browsers. You can download it anytime from Site Settings. You can collaborate, view documents, and manage teams on the go.",
      },
      {
        id: "gs-5",
        question: "Is there a free trial available?",
        answer:
          "Yes! We offer a 14-day free trial of all features with no credit card required. (Currently everything is in Premium as an Offer to early Users of Togetha)",
      },
    ],
    workspaces: [
      {
        id: "ws-1",
        question: "How many workspaces can I create?",
        answer:
          "By now, you have One active workspace by default where you can create your teams on any plan. Each Team is isolated and can have its own set of members, documents, and settings. Perfect for managing multiple projects or organizations.",
      },
      {
        id: "ws-2",
        question: "How do I manage Team members?",
        answer:
          "Click Invite on the Workspace Header, you will see Members and their access on your current team who has access. You can invite new members, change their roles, or remove members. Roles include Editor (can edit content), and Viewer (read-only access).",
      },
      {
        id: "ws-4",
        question: "How do I delete a Team?",
        answer:
          "Go to Workspace Side Nav > click More icon on the team you want to delete > Delete Team. Note that this action is permanent and cannot be undone. All documents and data will be deleted.",
      },
      {
        id: "ws-5",
        question: "How do I delete a workspace?",
        answer:
          "Everyone on Togetha is gave one workspace to manage your teams by default, you can't delete it.",
      },
      {
        id: "ws-6",
        question: "What happens when I leave a workspace?",
        answer:
          "When you leave a workspace, you lose access to all documents and shared resources.",
      },
    ],
    // collaboration: [
    //   {
    //     id: "col-1",
    //     question: "How does real-time collaboration work?",
    //     answer:
    //       "When multiple team members open the same document, changes are synchronized instantly. You'll see cursor positions of other collaborators, their edits appear in real-time, and the system merges edits intelligently. Everyone is always working on the latest version.",
    //   },
    //   {
    //     id: "col-2",
    //     question:
    //       "What happens if two people edit the same content simultaneously?",
    //     answer:
    //       "Togetha uses advanced conflict resolution to merge simultaneous edits intelligently. Both changes are preserved and combined logically. The system maintains version history so you can see what changed and when.",
    //   },
    //   {
    //     id: "col-3",
    //     question: "Can I see who's currently working on a document?",
    //     answer:
    //       "Yes! When you open a document, you'll see active collaborators at the top. Their cursor positions and selections are highlighted with different colors. This helps you coordinate work and avoid duplicate efforts.",
    //   },
    // ],
    documents: [
      {
        id: "doc-1",
        question: "What file formats can I import?",
        answer:
          "Togetha supports importing from Word (.docx), Google Docs, PDF, Markdown, and plain text files. Documents are automatically converted to Togetha format while preserving formatting, images, and structure.",
      },
      {
        id: "doc-2",
        question: "Can I export my documents?",
        answer:
          "Absolutely! Export documents as PDF, Word (.docx), Markdown, or plain text. Go to Document Menu > Export and choose your preferred format. All formatting and content are preserved.",
      },
      {
        id: "doc-3",
        question: "How much storage do I get?",
        answer:
          "Storage limits depend on your plan. Free plans include 5GB, Pro plans get 100GB, and Enterprise plans have unlimited storage. Attachment storage is separate from document storage.",
      },
      // {
      //   id: "doc-4",
      //   question: "Can I organize documents into folders?",
      //   answer:
      //     "Yes! Create unlimited folders to organize your documents. Drag and drop documents between folders, create nested folder structures, and use consistent naming for easy navigation.",
      // },
      {
        id: "doc-5",
        question: "How do I search for documents?",
        answer:
          "Use the workspace search bar to find files by title. Search works across all files you have access to. Use filters to narrow results by team, date, or document type.",
      },
    ],
    permissions: [
      {
        id: "perm-1",
        question: "What are the different permission levels?",
        answer:
          "Togetha has three permission levels: Owner (created the workspace), Editor (create and edit files), and Viewer (read-only access). Some features can have granular permissions.",
      },
      {
        id: "perm-2",
        question: "How do I set permissions on specific file?",
        answer:
          'On the Header of the Workspace and click "Share". Choose who can access it and their permission level (Viewer, or Editor).',
      },
      {
        id: "perm-3",
        question: "Can I make a file private?",
        answer:
          "No! Currently all files are public for the users who have access to them in the team",
      },
      {
        id: "perm-4",
        question: "Can I see who has access to a file?",
        answer:
          'Yes! Click "Share" to see all people with access, their roles. You can remove access immediately or change permission levels.',
      },
    ],
    account: [
      {
        id: "acc-1",
        question: "Can I change my email address?",
        answer:
          "No! All your teams are bound to your Connected Google Account which can't be changed by Now.",
      },
      {
        id: "acc-2",
        question: "How do I delete my account?",
        answer:
          "Go to Account Settings > Delete Account. Note that this is permanent and will remove you from all teams. Download your data first if needed. You'll have a 30-day grace period to recover.",
      },
      {
        id: "acc-2",
        question: "How do I update my notification preferences?",
        answer:
          "Go to Settings > Notifications Settings. Choose what types of notifications you want and how to receive them (email, push, in-app).",
      },
    ],
    troubleshooting: [
      {
        id: "ts-1",
        question: "Why am I not seeing real-time updates?",
        answer:
          "Check your internet connection first. If connected, try refreshing the page. If others see updates before you, you might have a slow connection. Togetha works best with stable internet (broadband recommended).",
      },
      {
        id: "ts-2",
        question: "What should I do if a file won't load?",
        answer:
          "First, try refreshing the page or clearing your browser cache. If it persists, try a different browser. If still not working, contact malostechnologies@gmail.com with the file ID and what you were trying to do.",
      },
      {
        id: "ts-3",
        question: "Can I recover a deleted file or team?",
        answer:
          "No! After Clicking delete on a File or Team its permanently deleted and cannot be recovered.",
      },
      {
        id: "ts-4",
        question: "Why is my invite not working?",
        answer:
          "Check that the email address is correct and the person isn't already in the team. Make sure you didn't misspell the email. Have them check spam folder. If issues persist, ask them to create an account first.",
      },
      {
        id: "ts-5",
        question: "What do I do if I'm experiencing performance issues?",
        answer:
          "Close unused tabs and browser extensions. Restart your browser or computer. Check if you're on a slow internet connection. For large files, performance may vary. Contact support if issues continue.",
      },
    ],
    "best-practices": [
      // {
      //   id: "bp-1",
      //   question: "How should I organize my Team?",
      //   answer:
      //     "Create clear folder structures by project or team. Use consistent naming conventions. Keep a main README document with workspace overview. Archive completed projects. This makes navigation easy for all team members.",
      // },
      {
        id: "bp-3",
        question: "How should I structure large documents in files?",
        answer:
          "Use clear headings and sections. Keep documents focused on single topics. Link to related documents instead of cramming everything in one place. Use table of contents for navigation. This makes documents easier to update and understand.",
      },
      {
        id: "bp-4",
        question: "When should I create a new workspace vs. a team?",
        answer:
          "Workspaces are created by default, one for a specific user, Use teams within workspaces for projects, departments, or functional groups. Workspaces are more isolated; teams share more context.",
      },
      {
        id: "bp-5",
        question: "How do I keep my Team secure?",
        answer:
          "Regularly review member permissions. Remove inactive members. Use strong passwords and enable 2FA. Don't share sensitive links publicly. Audit access regularly. Keep sensitive documents in restricted folders with limited access.",
      },
    ],
  };

  type FaqCategory = keyof typeof faqs;
  const allFaqs = Object.values(faqs).flat();
  const filteredFaqs = searchQuery.trim()
    ? allFaqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs[activeCategory as FaqCategory] || [];

  const toggleFaq = (id: string) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
              Help Center
            </h1>
            <p className="text-lg opacity-70 mb-8">
              Find answers to common questions and learn how to get the most out
              of Togetha
            </p>

            {/* Search Bar */}
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-50"
                size={20}
              />
              <input
                type="text"
                placeholder="Search help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar Navigation */}
        {!searchQuery && (
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Mobile Menu */}
              {mobileMenuOpen && (
                <nav className="lg:hidden mb-8 space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeCategory === category.id
                          ? "font-semibold opacity-100"
                          : "opacity-60 hover:opacity-80"
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </nav>
              )}

              {/* Desktop Navigation */}
              <nav className="hidden lg:block space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider opacity-50 mb-6">
                  Categories
                </h3>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 border-l-2 ${
                      activeCategory === category.id
                        ? "border-current font-medium opacity-100"
                        : "border-transparent opacity-60 hover:opacity-80"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        )}

        {/* Content */}
        <main className={searchQuery ? "lg:col-span-4" : "lg:col-span-3"}>
          {searchQuery && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Search Results</h2>
              <p className="opacity-60">
                Found {filteredFaqs.length} result
                {filteredFaqs.length !== 1 ? "s" : ""} for "{searchQuery}"
              </p>
            </div>
          )}

          {/* Category Title */}
          {!searchQuery && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {categories.find((c) => c.id === activeCategory)?.label}
              </h2>
              <div className="w-12 h-1 opacity-30"></div>
            </div>
          )}

          {/* FAQs */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border rounded-lg overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:opacity-80 transition-opacity text-left"
                  >
                    <span className="font-semibold">{faq.question}</span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 transition-transform ${
                        expandedFaqs[faq.id] ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>

                  {expandedFaqs[faq.id] && (
                    <div className="px-6 py-4 border-t opacity-75 leading-relaxed bg-opacity-50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="opacity-60 mb-4">
                  No results found for "{searchQuery}"
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="opacity-60 hover:opacity-100 transition-opacity underline text-sm"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* Contact Support */}
          <div className="mt-16 border-t pt-12">
            <div className="rounded-lg border-l-4 pl-6 py-6 opacity-75">
              <h3 className="font-semibold text-lg mb-2">
                Didn't find what you're looking for?
              </h3>
              <p className="mb-4">
                Our support team is here to help. Reach out to us at
                malostechnologies@gmail.com or use the chat feature in your
                workspace.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="mailto:malostechnologies@gmail.com"
                  className="opacity-60 hover:opacity-100 transition-opacity underline text-sm"
                >
                  Email Support
                </a>
                <a
                  href="/support/contact"
                  className="opacity-60 hover:opacity-100 transition-opacity underline text-sm"
                >
                  Contact Form
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
