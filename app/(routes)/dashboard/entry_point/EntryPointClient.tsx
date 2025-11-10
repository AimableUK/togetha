"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function EntryPoint() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetStarted = () => {
    setLoading(true);
    router.push("/dashboard/getstarted?mode=onboarding");
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-10">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-16">
        {/* Right SVG */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/WelcomePageWave.svg"
            alt="Welcome page to Togetha Wave"
            width={50}
            height={50}
            className="w-2/6 md:w-3/6"
          />
        </div>
        {/* Left Content */}
        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-row items-center gap-x-2">
              <Image
                src="/logo.png"
                alt="Togetha logo"
                width={35}
                height={35}
              />
              <h1 className="font-semibold text-xl">Togetha</h1>
            </div>
            <h1 className="text-4xl font-semibold ">
              It looks like you're new to Togetha
            </h1>
            <p className="text-lg text-primary/80">
              There are no active workspaces for this account. If your team
              isn't on Togetha yet, you can create one to get started with
              real-time collaboration.
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleGetStarted}
            disabled={loading}
            className="cursor-pointer bg-black text-white py-3 px-8 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-800 transition-colors w-fit"
          >
            {loading && <span className="loader2 w-6!"></span>}
            Get Started
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
