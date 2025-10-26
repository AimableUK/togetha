import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";
import { useIsMobile } from "../hooks/use-mobile";

const Preview = () => {
  const isMobile = useIsMobile();
  const handleScroll = (amount: number) => {
    scrollTo({
      behavior: "smooth",
      top: amount,
    });
  };

  return (
    <div className=" relative z-20 overflow-hidden">
      <div className="container mx-auto px-6 py-8 md:py-16 lg:grid lg:grid-cols-12 lg:items-center lg:gap-16 flex flex-col-reverse">
        <div className="lg:col-span-5 sm:w-full max-w-2xl">
          <span className="w-36 h-2 bg-gray-900 rounded-md dark:bg-accent my-2 mt-4 block"></span>
          <span className="w-28 h-2 bg-gray-900 rounded-md dark:bg-accent mb-5 block"></span>

          <h1 className="font-bebas-neue uppercase text-3xl sm:text-5xl xl:text-7xl font-black leading-[0.95] tracking-tight ">
            <span className="block text-2xl sm:text-4xl text-accent">
              Notes, Docs & Diagrams
            </span>
            TOGETHA
          </h1>

          <p className="mt-4 text-sm sm:text-base">
            Capture ideas in real-time, organize your thoughts, and collaborate
            seamlessly - no clutter, no confusion, just clear focus and
            effortless creation.
            <span className="font-semibold">control</span>.
          </p>

          <div className="flex mt-8">
            <LoginLink
              postLoginRedirectURL="/dashboard"
              className="py-2 px-3 font-semibold rounded-lg bg-accent text-white text-md mr-4 hover:bg-accent/60 active:bg-accent/30 trans"
            >
              Explore Now
            </LoginLink>
            <button
              onClick={() =>
                isMobile ? handleScroll(300 * 14.2) : handleScroll(300 * 8.3)
              }
              className="py-2 px-3 font-semibold rounded-lg bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-white active:bg-accent/80 text-md transition"
            >
              Read More
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-accent text-emerald-200">
              Rich Text Playground
            </span>
            <span className="px-3 py-1 rounded-full bg-accent text-emerald-200">
              Canvas for Drawings
            </span>
            <span className="px-3 py-1 rounded-full  bg-accent text-emerald-200">
              CSV import/export
            </span>
          </div>
        </div>

        <div className="lg:col-span-7 w-full dash -mx-2 md:mx-0">
          <div
            className="max-w-lg md:max-w-2xl md:ml-auto
                  rounded-3xl border border-gray-200 dark:border-white/10
                  bg-white dark:bg-gray-800 shadow-xl p-5 animate-float"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-3 w-24 bg-gray-200 dark:bg-white/10 rounded"></div>
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                <span className="h-3 w-3 rounded-full bg-rose-500"></span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="p-2 md:p-4 rounded-2xl bg-[#dbeafc] dark:bg-accent/10">
                <div className="text-xs text-accent dark:text-[#68a0e4]">
                  total files
                </div>
                <div className="text-xl md:text-2xl font-bold text-accent dark:text-[#68a0e4]">
                  1,284
                </div>
              </div>
              <div className="p-2 md:p-4 rounded-2xl bg-gray-50 dark:bg-white/5">
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  total teams
                </div>
                <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  23
                </div>
              </div>
              <div className="p-2 md:p-4 rounded-2xl bg-gray-50 dark:bg-white/5">
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  Value (Cost)
                </div>
                <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  0$
                </div>
              </div>
            </div>
            <div className="h-36 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">
              Files & Workspace Management
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
