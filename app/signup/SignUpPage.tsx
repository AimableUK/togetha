"use client";

import React from "react";
import { Users, Zap, Shield } from "lucide-react";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-tr from-background via-muted to-background flex items-center justify-center p-2 md:p-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-card rounded-3xl md:shadow-2xl overflow-hidden md:border md:border-border">
          <div className="grid md:grid-cols-2">
            {/* Left Side - Sign Up Form */}
            <div className="flex flex-col justify-center px-4 md:px-6 py-8 md:py-10 bg-card order-2 md:order-1">
              <div className="w-full max-w-lg mx-auto space-y-4">
                {/* Logo Badge */}
                <div className="flex items-center gap-3">
                  <Link href="/">
                    <div className="flex flex-row items-center gap-x-2 dark:text-gray-100 mb-4 ">
                      <Image
                        src="/logo.png"
                        alt="Togetha logo"
                        width={50}
                        height={50}
                      />
                      <div>
                        <h3 className="font-bold text-xl md:text-3xl">
                          Togetha
                        </h3>
                        <h4 className="font-semibold text-xs">
                          Collaborative Workspace
                        </h4>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Header */}
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                    Create a free Account
                  </h1>
                  <p className="text-lg text-muted-foreground ">
                    Join teams worldwide creating amazing things together
                  </p>
                </div>

                {/* Google Sign Up Button */}
                <RegisterLink
                  authUrlParams={{
                    connection_id:
                      process.env.NEXT_PUBLIC_KINDE_GOOGLE_CONNECTION_ID || "",
                    post_login_redirect_url: "/dashboard",
                  }}
                  className="w-full group relative flex items-center justify-center gap-4 px-3 md:px-6 py-3 md:py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-sm md:text-lg hover:bg-primary/90 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <svg
                    className="w-7 h-7 bg-white p-1 rounded"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Sign up with Google</span>
                </RegisterLink>

                {/* Terms */}
                {/* <p className="text-sm text-muted-foreground leading-relaxed">
                  By signing up, you agree to our{" "}
                  <a
                    href="#"
                    className="text-primary hover:underline font-medium"
                  >
                    Terms
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-primary hover:underline font-medium"
                  >
                    Privacy Policy
                  </a>
                </p> */}

                {/* Sign In Link */}
                <div className="pt-6 border-t border-border">
                  <p className="text-center text-base text-muted-foreground">
                    Already have an account?{" "}
                    <a
                      href="/signin"
                      className="text-primary hover:text-primary/80 font-bold hover:underline"
                    >
                      Sign in instead
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Features (Hidden on Mobile) */}
            <div className="hidden md:flex relative bg-linear-to-bl from-primary/20 via-primary/10 to-background overflow-hidden order-1 md:order-2">
              {/* Decorative Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary rounded-full blur-3xl"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-center p-12 space-y-3">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Why join us?
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Everything you need to collaborate effectively
                  </p>
                </div>

                {/* Feature Cards */}
                <div className="space-y-3">
                  <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg">
                          Team Collaboration
                        </h3>
                        <p className="text-muted-foreground">
                          Work together in real-time with unlimited team members
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                        <Zap className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg">
                          Lightning Fast
                        </h3>
                        <p className="text-muted-foreground">
                          Instant sync across all devices with zero lag
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                        <Shield className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg">
                          Secure & Private
                        </h3>
                        <p className="text-muted-foreground">
                          Bank-level encryption keeps your data safe
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
