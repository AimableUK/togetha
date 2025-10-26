"use client";

import { ModeToggle } from "@/components/theme/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type SiteProps = {
  user: {} | null;
  isLoading: boolean | null;
};

const Header = ({ user, isLoading }: SiteProps) => {
  const [headerCollapse, setHeaderCollapse] = useState(false);

  return (
    <header className="border-b">
      <div className="mx-auto flex my-3 items-center gap-8 px-3 md:px-4">
        <div className="flex flex-row items-center gap-x-2">
          <Image src="/logo.png" alt="Togetha logo" width={35} height={35} />
          <h1 className="font-semibold text-xl">Togetha</h1>
        </div>

        {/* desktop nav */}
        <div className="flex flex-1 items-center justify-end md:justify-between">
          {/* nav */}
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6">
              <li>
                <a className="trans" href="#">
                  About
                </a>
              </li>

              <li>
                <a className="trans" href="#">
                  Services
                </a>
              </li>

              <li>
                <a className="trans" href="#">
                  Projects
                </a>
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
                    <Button variant="outline" className="cursor-pointer">
                      Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <LoginLink postLoginRedirectURL="/dashboard">
                    <Button variant="ghost" className="cursor-pointer">
                      Login
                    </Button>
                  </LoginLink>

                  <RegisterLink>
                    <Button variant="outline" className="cursor-pointer">
                      Register
                    </Button>
                  </RegisterLink>
                </>
              )}

              <ModeToggle />
            </div>

            {/* nav toogle */}
            <button
              onClick={() => setHeaderCollapse(!headerCollapse)}
              className="z-50 block rounded-sm hover:bg-accent active:scale-90 trans p-1 cursor-pointer md:hidden"
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
          className="block trans md:hidden py-1 border-t w-full"
        >
          {/* nav */}
          <ul className="flex flex-col gap-1 w-full">
            <li className="w-full bg-secondary hover:bg-accent rounded-md p-2 px-3 cursor-pointer trans">
              <a className="transition" href="#">
                About
              </a>
            </li>

            <li className="w-full bg-secondary hover:bg-accent rounded-md p-2 px-3 cursor-pointer trans">
              <a className="transition" href="#">
                Services
              </a>
            </li>

            <li className="w-full bg-secondary hover:bg-accent rounded-md p-2 px-3 cursor-pointer trans">
              <a className="transition" href="#">
                Products
              </a>
            </li>
          </ul>

          {/* auth actions */}
          <div className="flex flex-row justify-end items-center gap-x-1 w-full mt-5">
            {isLoading ? (
              <div className="loader2"></div>
            ) : user ? (
              <>
                <LogoutLink>
                  <Button variant="ghost" className="cursor-pointer w-full">
                    Logout
                  </Button>
                </LogoutLink>

                <Link href="/dashboard">
                  <Button variant="outline" className="cursor-pointer w-full">
                    Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <LoginLink postLoginRedirectURL="/dashboard">
                  <Button variant="ghost" className="cursor-pointer">
                    Login
                  </Button>
                </LoginLink>

                <RegisterLink>
                  <Button variant="outline" className="cursor-pointer">
                    Register
                  </Button>
                </RegisterLink>
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
