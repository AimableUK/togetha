"use client";

import Header from "./_components/includes/Header";
import Hero from "./_components/landing/Hero";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Footer from "./_components/includes/Footer";
import CTA from "./_components/landing/CTA";
import JoinUs from "./_components/landing/JoinUs";
import Services from "./_components/landing/Services";
import Preview from "./_components/landing/Preview";
import FAQ from "./_components/landing/FAQ";
import MainPreview from "./_components/landing/MainPreview";

export default function LandingClient() {
  const { user, isLoading } = useKindeBrowserClient();

  return (
    <div>
      <Header user={user} isLoading={isLoading} />

      <Hero />
      <CTA />
      <MainPreview />
      <Preview />
      <Services />
      <FAQ />
      <JoinUs />

      <Footer />
    </div>
  );
}
