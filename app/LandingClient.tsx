"use client";

import Header from "./_components/includes/Header";
import Hero from "./_components/Hero";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Footer from "./_components/includes/Footer";
import CTA from "./_components/CTA";
import JoinUs from "./_components/JoinUs";
import Services from "./_components/Services";
import Preview from "./_components/Preview";
import FAQ from "./_components/FAQ";
import MainPreview from "./_components/MainPreview";

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
