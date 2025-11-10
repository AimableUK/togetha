import React from "react";

const Footer = () => {
  return (
    <footer className="border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row justify-between md:items-center gap-6">
        <p className="text-sm opacity-50">
          &copy; {new Date().getFullYear()} Togetha. All rights reserved.
        </p>
        <div className="gap-8 text-sm flex flex-col md:flex-row">
          <a
            href="/legal/privacy-policy"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            Privacy Policy
          </a>
          <a
            href="/legal/terms-and-conditions"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            Terms and Conditions
          </a>
          <a
            href="/legal/community-guidelines"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            Community guidelines
          </a>
          <a
            href="/support/contact"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            Contact Us
          </a>
          <a
            href="/legal/about-us"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            About Us
          </a>
          <a
            href="/support/help-center"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            Help Center
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
