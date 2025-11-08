"use client";

import { ModeToggle } from "@/components/theme/ModeToggle";
import { Button } from "@/components/ui/button";
import { useGlobalLoader } from "@/lib/useGlobalLoader";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

type SiteProps = {
  user: {} | null;
  isLoading: boolean | null;
};

const Header = ({ user, isLoading }: SiteProps) => {
  const [headerCollapse, setHeaderCollapse] = useState(false);
  const { startLoading, stopLoading, isButtonLoading } = useGlobalLoader();
  const pathname = usePathname();

  const handleScroll = (amount: number) => {
    scrollTo({
      behavior: "smooth",
      top: amount,
    });
  };

  return (
    <header className="border-b z-50">
      <div className="mx-auto flex my-3 items-center gap-8 px-3 md:px-4">
        <Link href="/">
          <div className="flex flex-row items-center gap-x-2">
            <Image src="/logo.png" alt="Togetha logo" width={35} height={35} />
            <h1 className="font-semibold text-xl">Togetha</h1>
          </div>
        </Link>

        {/* desktop nav */}
        <div className="flex flex-1 items-center justify-end md:justify-between">
          {/* nav */}
          <nav aria-label="Global" className="hidden md:block z-998  ">
            <ul className="flex items-center gap-6">
              <li>
                <button
                  onClick={() => handleScroll(100 * 10.5)}
                  className="trans cursor-pointer hover:text-accent"
                >
                  Product
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleScroll(200 * 12.4)}
                  className="trans cursor-pointer hover:text-accent"
                >
                  Services
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleScroll(200 * 19)}
                  className="trans cursor-pointer z-10 hover:text-accent"
                >
                  Solutions
                </button>
              </li>
            </ul>
          </nav>
          {/* auth actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-row items-center gap-x-1">
              {isLoading ? (
                <div className="loader2"></div>
              ) : user ? (
                <>
                  <LogoutLink>
                    <Button variant="ghost" className="cursor-pointer">
                      Logout
                    </Button>
                  </LogoutLink>

                  <Link href="/dashboard">
                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => {
                        startLoading("dashboard");
                        setTimeout(() => {
                          pathname === "/dashboard" && stopLoading("dashboard");
                        }, 2000);
                      }}
                      disabled={isButtonLoading("dashboard")}
                    >
                      {isButtonLoading("dashboard") && (
                        <span className="loader2 w-5!"></span>
                      )}
                      Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <a href="/signin">
                    <Button variant="ghost" className="cursor-pointer">
                      Login
                    </Button>
                  </a>

                  <a href="/signup">
                    <Button variant="outline" className="cursor-pointer">
                      Register
                    </Button>
                  </a>
                </>
              )}

              <ModeToggle />
            </div>

            {/* nav toogle */}
            <button
              onClick={() => setHeaderCollapse(!headerCollapse)}
              className="z-50 block rounded-sm hover:bg-accent/40 active:scale-90 trans p-1 cursor-pointer md:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6"
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

      {/* mobile nav */}
      {headerCollapse && (
        <nav
          aria-label="Global"
          className="z-50 block trans md:hidden py-1 px-2 border-t w-full"
        >
          {/* nav */}
          <ul className="flex flex-col gap-1 w-full">
            <li
              onClick={() => handleScroll(200 * 7.1)}
              className="z-50 w-full bg-secondary hover:bg-accent rounded-md p-2 px-3 cursor-pointer trans"
            >
              Product
            </li>

            <li
              onClick={() => handleScroll(200 * 22.3)}
              className="z-50 w-full bg-secondary hover:bg-accent rounded-md p-2 px-3 cursor-pointer trans"
            >
              Services
            </li>

            <li
              onClick={() => handleScroll(200 * 30.3)}
              className="z-50 w-full bg-secondary hover:bg-accent rounded-md p-2 px-3 cursor-pointer trans"
            >
              Solutions
            </li>
          </ul>

          {/* auth actions */}
          <div className="z-999 flex flex-row justify-end items-center gap-x-1 w-full mt-5">
            {isLoading ? (
              <div className="loader2 w-5!"></div>
            ) : user ? (
              <>
                <LogoutLink className="z-999">
                  <Button variant="ghost" className="cursor-pointer w-full">
                    Logout
                  </Button>
                </LogoutLink>

                <Link href="/dashboard" className="z-999">
                  <Button
                    variant="outline"
                    className="cursor-pointer w-full"
                    onClick={() => {
                      startLoading("dashboard");
                      setTimeout(() => {
                        pathname === "/dashboard" && stopLoading("dashboard");
                      }, 2000);
                    }}
                    disabled={isButtonLoading("dashboard")}
                  >
                    {isButtonLoading("dashboard") && (
                      <span className="loader2 w-5!"></span>
                    )}
                    Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <a href="/signin" className="z-999">
                  <Button variant="ghost" className="z-50 cursor-pointer">
                    Login
                  </Button>
                </a>

                <a href="/signup" className="z-999">
                  <Button variant="outline" className="z-50 cursor-pointer">
                    Register
                  </Button>
                </a>
              </>
            )}

            <ModeToggle />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
