import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const handleScroll = (amount: number) => {
    scrollTo({
      behavior: "smooth",
      top: amount,
    });
  };

  return (
    <footer>
      <div className="mt-5">
        <div className="container px-4 mx-auto">
          <div className="-mx-4 flex flex-col justify-between">
            <div className="px-4 my-4 w-full flex flex-col gap-3 ">
              <Link href="/">
                <div className="flex flex-row items-center gap-x-2">
                  <Image
                    src="/logo.png"
                    alt="Togetha logo"
                    width={35}
                    height={35}
                  />
                  <h1 className="font-semibold text-xl">Togetha</h1>
                </div>
              </Link>

              <p className="text-justify">
                Togetha is a simple and intuitive workspace designed to help you
                capture, organize, and refine your ideas effortlessly. Whether
                you're jotting down quick notes, editing content, or clearing
                clutter from your thoughts, Togetha makes it easy to focus on
                what truly matters. Collaborate seamlessly, stay organized, and
                keep your ideas neat, all in one place - without distractions or
                unnecessary complexity.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-2 px-5 md:gap-20 md:px-10">
              <div className="px-4 my-4 w-full sm:w-auto">
                <div>
                  <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-accent">
                    Explore
                  </h2>
                </div>
                <ul className="leading-8">
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
                      className="trans cursor-pointer hover:text-accent"
                    >
                      Solutions
                    </button>
                  </li>
                </ul>
              </div>

              <div className="px-4 my-4 w-full sm:w-auto">
                <div>
                  <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-accent">
                    Support
                  </h2>
                </div>
                <ul className="leading-8">
                  <li>
                    <a
                      href="/legal/privacy-policy"
                      className="trans cursor-pointer hover:text-accent"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="/legal/terms-and-conditions"
                      className="trans cursor-pointer hover:text-accent"
                    >
                      Terms and Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      href="/legal/community-guidelines"
                      className="trans cursor-pointer hover:text-accent"
                    >
                      Community guidelines
                    </a>
                  </li>
                  <li>
                    <a
                      href="/support/contact"
                      className="trans cursor-pointer hover:text-accent"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="/support/help-center"
                      className="trans cursor-pointer hover:text-accent"
                    >
                      Help Center
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-accent/5 py-4">
        <div className="flex flex-wrap justify-between text-sm">
          <div className="px-4 w-full text-center">
            Copyright &copy;
            {new Date().getFullYear()} Togetha. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
