import { MoveRight } from "lucide-react";
import React from "react";

const JoinUs = () => {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-5">
      <div className="relative isolate overflow-hidden px-6 py-20 text-center sm:rounded-3xl sm:px-16 sm:shadow-sm">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          Join our community&nbsp;<span className="text-accent">today!</span>
        </h2>

        <h3 className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary">
          Connect with like-minded creators, share ideas, and get tips to make
          the most of Togetha. Join a growing community where collaboration and
          inspiration come together.
        </h3>

        <div className="mt-8 flex items-center justify-center gap-x-6">
          <a
            href="/signup"
            className="group inline-flex text-white items-center justify-center gap-2 rounded-xl bg-accent hover:bg-accent/60 active:bg-accent/30 px-4 py-3 text-sm font-semibold shadow-sm transition-all duration-150"
          >
            Explore the forum
            <MoveRight className="group-hover:-rotate-45 trans" />
          </a>
        </div>

        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-256 w-5xl -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle
            cx="512"
            cy="512"
            r="512"
            fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
            fillOpacity="0.7"
          ></circle>
          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
              <stop stopColor="#3b82f6"></stop>
              <stop offset="1" stopColor="#1d4ed8"></stop>
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default JoinUs;
