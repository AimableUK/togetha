import React from "react";
import {
  ArrowRight,
  Zap,
  Users,
  Globe,
  Heart,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AboutUs = () => {
  const values = [
    {
      icon: Users,
      title: "Collaboration First",
      description:
        "We believe great work happens when teams work together seamlessly in real-time.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Performance matters. Every feature is optimized for speed and responsiveness.",
    },
    {
      icon: Globe,
      title: "Accessible to All",
      description:
        "Togetha is built for teams everywhere, regardless of size or location.",
    },
    {
      icon: Heart,
      title: "User Obsessed",
      description:
        "Your feedback shapes our roadmap. We listen, iterate, and improve constantly.",
    },
  ];

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
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight">
              About Togetha
            </h1>
            <p className="text-xl opacity-70 leading-relaxed mb-8">
              We're on a mission to revolutionize how teams collaborate. Built
              with the belief that the best ideas come from seamless teamwork,
              Togetha empowers teams to create, share, and innovate together in
              real-time.
            </p>
            <div className="w-12 h-1 opacity-30"></div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 opacity-75 leading-relaxed">
                <p>
                  We were born from the idea I had while learning database
                  management systems, where I thought of creating a website
                  where learners could collaborate in teams and work on
                  different lessons together.
                </p>
                <p>
                  Over time, this idea grew even bigger, evolving into a
                  platform that allows teamwork, learning, and collaboration in
                  a seamless and interactive way.
                </p>
                <p>
                  What started as a simple idea has become a vision for
                  enhancing collaborative learning and helping students achieve
                  more together.
                </p>
              </div>
            </div>
            <div className="border rounded-lg p-6 opacity-30 flex items-center justify-center md:min-h-96">
              <span className="text-5xl">
                <Image
                  src="/realtime.svg"
                  alt="Real-Time Collaboration"
                  width={40}
                  height={40}
                  className="w-5/6"
                />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="opacity-70 leading-relaxed max-w-2xl">
              These principles guide everything we do and how we serve our
              community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={idx}
                  className="border rounded-lg p-8 hover:opacity-90 transition-opacity"
                >
                  <Icon size={32} className="mb-4 opacity-60" />
                  <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                  <p className="opacity-70 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Meet the Founder
            </h2>
            <p className="opacity-70 leading-relaxed max-w-2xl">
              Togetha was founded and built by a passionate creator with a
              vision for better collaboration.
            </p>
          </div>

          <div className="border rounded-lg p-8 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* Profile Card */}
              <div className="md:col-span-1 text-center">
                <div className="w-fit rounded-full border-2 opacity-95 flex items-center justify-center mx-auto mb-6 text-4xl">
                  <Image
                    src="/Aimable.jpg"
                    alt="Ukobizaba Aimable Picture"
                    width={120}
                    height={120}
                    className="w-fit rounded-full"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">AIMABLE Ukobizaba</h3>
                <p className="text-sm opacity-60 mb-6">Creator & Co-Founder</p>

                <div className="flex justify-center gap-4">
                  <a
                    href="https://ukobizaba-aimable.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border rounded-lg hover:opacity-80 transition-opacity flex items-center justify-center"
                    title="Portfolio"
                  >
                    <ExternalLink size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ukobizaba-aimable/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border rounded-lg hover:opacity-80 transition-opacity flex items-center justify-center"
                    title="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://github.com/AimableUK/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border rounded-lg hover:opacity-80 transition-opacity flex items-center justify-center"
                    title="GitHub"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>

              {/* Bio */}
              <div className="md:col-span-2 space-y-4 opacity-75 leading-relaxed">
                <p>
                  AIMABLE is a full-stack developer and product visionary with a
                  passion for creating tools that empower teams. With experience
                  in building scalable applications and a deep understanding of
                  user needs, AIMABLE founded Togetha to solve the collaboration
                  challenges he witnessed across industries.
                </p>
                <p>
                  Driven by the belief that technology should simplify work
                  rather than complicate it, AIMABLE leads Togetha with a focus
                  on user experience, performance, and accessibility. Under his
                  vision, Togetha has become a platform where teams of any size
                  can collaborate seamlessly.
                </p>
                <p>
                  When not building Togetha, AIMABLE actively contributes to
                  open-source projects, shares knowledge with the developer
                  community, and continuously explores emerging technologies
                  that could enhance the collaboration experience.
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                  <div>
                    <p className="text-sm opacity-60 mb-1">Role</p>
                    <p className="font-semibold">Founder</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-60 mb-1">Founded</p>
                    <p className="font-semibold">November, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-60 mb-1">Focus</p>
                    <p className="font-semibold">Collaboration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="border rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="opacity-75 leading-relaxed">
                To empower teams worldwide with seamless, real-time
                collaboration tools that eliminate friction and unlock creative
                potential. We believe every team deserves a workspace where
                ideas flow freely and work gets done effortlessly.
              </p>
            </div>

            <div className="border rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="opacity-75 leading-relaxed">
                To create a world where geography, timezone, and distance are no
                longer barriers to collaboration. Togetha envisions a future
                where the best teams-whether co-located or distributed-can work
                together as if they're in the same room.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What Makes Us Different
            </h2>
            <p className="opacity-70 leading-relaxed max-w-2xl">
              In a crowded market, Togetha stands out through our commitment to
              simplicity, speed, and user satisfaction.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "Real-Time Collaboration at Scale",
                desc: "Our advanced conflict resolution and synchronization algorithms make collaboration smooth, even with dozens of collaborators editing simultaneously.",
              },
              {
                title: "Unified Workspace Experience",
                desc: "No more tab-switching. Teams, documents, files, and communication all live in one seamless environment.",
              },
              {
                title: "Built for Modern Teams",
                desc: "Google login integration, zero setup friction, and intuitive interfaces that teams love from day one.",
              },
              {
                title: "Privacy & Security First",
                desc: "Enterprise-grade security, end-to-end encryption, and full GDPR/CCPA compliance because your data matters.",
              },
              {
                title: "Obsessive Performance",
                desc: "Blazing-fast load times, responsive interactions, and optimized for teams working across continents.",
              },
              {
                title: "Community-Driven Development",
                desc: "Your feedback directly shapes our roadmap. We listen, we iterate, we improve based on what you need.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="border rounded-lg p-6 hover:opacity-90 transition-opacity"
              >
                <div className="flex items-start gap-4">
                  <ArrowRight size={20} className="shrink-0 mt-1 opacity-60" />
                  <div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm opacity-70">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="border rounded-lg p-12 sm:p-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Join Thousands of Teams
            </h2>
            <p className="text-lg opacity-70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the future of collaboration. Sign up today and start
              working together with your team, no credit card required.
            </p>
            <a href="/signup">
              <button className="cursor-pointer px-8 py-3 border rounded-lg font-semibold hover:opacity-80 transition-opacity inline-flex items-center gap-2">
                Get Started for Free
                <ArrowRight size={18} />
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
