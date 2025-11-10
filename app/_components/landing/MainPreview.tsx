import Image from "next/image";
import React, { useState } from "react";

const MainPreview = () => {
  const [preview, setPreview] = useState("editor");

  return (
    <div className="pt-1 pb-8">
      <div className="mx-auto max-w-2xl px-3 lg:max-w-7xl lg:px-6">
        <h2 className="text-center text-base/7 font-semibold text-accent dark:text-indigo-400">
          Collaborate Instantly
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Brainstorm, design, and create with your team in real time
        </p>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-accent/15 dark:bg-accent/10 lg:rounded-l-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight max-lg:text-center">
                  Mobile friendly
                </p>
                <p className="mt-2 max-w-lg text-sm/6 dark:text-gray-400 max-lg:text-center">
                  Access Togetha on any device with a fast, responsive
                  workspace. Plan, brainstorm, and create projects with your
                  team in real time on mobile, tablet, or desktop.
                </p>
              </div>
              <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 outline outline-white/20">
                  <Image
                    src="/DahboardMobilePreview.jpg"
                    alt="togetha image mobile preview"
                    width={300}
                    height={300}
                    className="size-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 lg:rounded-l-4xl" />
          </div>
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-accent/15 dark:bg-accent/10 max-lg:rounded-t-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight max-lg:text-center">
                  Performance
                </p>
                <p className="mt-2 max-w-lg text-sm/6 dark:text-gray-400 max-lg:text-center">
                  Collaborate anywhere with Togetha. Enjoy fast, responsive, and
                  real-time project management on mobile, tablet, or desktop.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                <Image
                  src="performance.svg"
                  alt="Notes Site Performance"
                  width={20}
                  height={20}
                  className="w-52 max-lg:max-w-xs"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-t-4xl" />
          </div>
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-accent/15 dark:bg-accent/10" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight max-lg:text-center">
                  Security
                </p>
                <p className="mt-2 max-w-lg text-sm/6 dark:text-gray-400 max-lg:text-center">
                  Keep your work safe with Togetha's secure platform. All
                  projects and team data are protected with end-to-end
                  encryption and advanced security measures.
                </p>
              </div>
              <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-security.png"
                  className="h-[min(152px,40cqw)] object-cover"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15" />
          </div>
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-accent/15 dark:bg-accent/10 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight max-lg:text-center">
                  Your Creative Playground
                </p>
                <p className="mt-2 max-w-lg text-sm/6 dark:text-gray-400 max-lg:text-center">
                  Experience Togetha's real-time workspace with a collaborative
                  text editor and interactive canvas. Plan, design, and bring
                  ideas to life with your team seamlessly.
                </p>
              </div>
              <div className="relative min-h-120 w-full grow">
                <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900/60 outline outline-white/10">
                  <div className="flex bg-gray-900 outline outline-white/5">
                    <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                      <div
                        onClick={() => setPreview("editor")}
                        className={`${preview === "editor" && "bg-white/5"} cursor-pointer border-r border-b border-r-white/10 border-b-white/20 px-4 py-2 text-white`}
                      >
                        Rich-Text Editor
                      </div>
                      <div
                        onClick={() => setPreview("canvas")}
                        className={`${preview === "canvas" && "bg-white/5"} cursor-pointer border-r border-gray-600/10 px-4 py-2`}
                      >
                        Canvas
                      </div>
                      <a href="/signup">
                        <div
                          onClick={() => setPreview("canvas")}
                          className="hover:bg-white/5 cursor-pointer border-r border-gray-600/10 px-4 py-2"
                        >
                          Try Now!
                        </div>
                      </a>
                    </div>
                  </div>
                  <div>
                    <Image
                      src={
                        preview === "editor"
                          ? "/EditorPreview.jpg"
                          : "/CanvasPreview.jpg"
                      }
                      alt="togetha image mobile preview"
                      width={300}
                      height={300}
                      className="size-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPreview;
