import ClickSpark from "@/components/ClickSpark";
import { useTheme } from "next-themes";
import React from "react";

const Hero = () => {
  const { theme } = useTheme();

  const handleScroll = (amount: number) => {
    scrollTo({
      behavior: "smooth",
      top: amount,
    });
  };

  return (
    <>
      <ClickSpark
        sparkColor={`${theme === "dark" ? "#fff" : "#1d64ba"}`}
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <section className="lg:grid lg:place-content-center">
          <div className="relative isolate px-6 lg:px-8">
            {/* gradient */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
              />
            </div>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-28">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="trans relative rounded-full px-3 py-1 text-sm/6 text-primary ring-1 ring-primary/10 hover:ring-primary/20">
                  Announcing our new Big Features.{" "}
                  <button
                    onClick={() => handleScroll(350)}
                    className="font-semibold text-accent hover:underline cursor-pointer"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 cursor-pointer"
                    />
                    Read more <span aria-hidden="true">&rarr;</span>
                  </button>
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold  sm:text-5xl">
                  <strong className="text-accent"> Togetha, </strong>
                  Everything You Build Feels Effortless
                </h1>
                <p className="mt-8 text-lg font-medium text-pretty text-primary sm:text-xl/8">
                  Capture your ideas, edit them effortlessly, and keep your
                  thoughts organized - Togetha makes it simple to focus and
                  create without distractions
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="/signup"
                    className="rounded-md bg-accent text-white px-3.5 py-2.5 text-sm font-semibold shadow-xs hover:bg-accent/60 active:bg-accent/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Get started
                  </a>
                  <button
                    onClick={() => handleScroll(480)}
                    className="text-sm/6 font-semibold cursor-pointer"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
              />
            </div>
          </div>
        </section>
      </ClickSpark>
    </>
  );
};

export default Hero;
