"use client";

import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function LandingClient() {
  const { user, isLoading } = useKindeBrowserClient();

  return (
    <div>
      <Header user={user} isLoading={isLoading} />

      <Hero />
    </div>
  );
}

