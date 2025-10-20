import React from "react";

const Hero = () => {
  return (
    <section className="lg:grid lg:h-screen lg:place-content-center">
      <div
        className="flex items-baseline 
        justify-center pt-20"
      >
        <h2 className="text-center flex w-fit rounded-full border border-gray-400 p-1 px-3 font-medium transition-colors">
          See What's New &nbsp;| &nbsp;
          <span className="text-[#1d64ba]">AI Diagram</span>
        </h2>
      </div>
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-3 sm:px-3 lg:px-8">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-bold  sm:text-5xl">
            <strong className="text-[#1d64ba]"> Togetha, </strong>
            Everything You Build Feels Effortless
          </h1>

          <p className="mt-4 text-base text-pretty sm:text-lg/relaxed">
            Link ideas, tasks, and projects seamlessly, all togetha.
          </p>

          <div className="mt-4 flex justify-center gap-4 sm:mt-6">
            <a
              className="inline-block rounded border border-[#1d64ba] bg-[#1d64ba] px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#098bf6]"
              href="#"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
