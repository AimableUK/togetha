import { ModeToggle } from "@/components/theme/ModeToggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row items-center gap-x-2">
          <Image src="/logo.png" alt="Togetha logo" width={35} height={35} />
          <h1 className="font-semibold text-xl">Togetha</h1>
        </div>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a className="transition hover:text-gray-400/75" href="#">
                  {" "}
                  About{" "}
                </a>
              </li>

              <li>
                <a className="transition hover:text-gray-400/75" href="#">
                  {" "}
                  Services{" "}
                </a>
              </li>

              <li>
                <a className="transition hover:text-gray-400/75" href="#">
                  {" "}
                  Projects{" "}
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex flex-row items-center gap-x-1">
              <Button variant="ghost" className="cursor-pointer">
                Login
              </Button>
              <Button variant="outline" className="cursor-pointer">
                Register
              </Button>
              <ModeToggle />
            </div>

            <button className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
