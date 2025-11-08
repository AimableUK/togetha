"use client";

import React from "react";
import { CloudCheck, EarthLock, Lock, NotebookPen, Watch } from "lucide-react";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-card md:rounded-3xl md:shadow-2xl overflow-hidden md:border md:border-border">
          <div className="grid md:grid-cols-2 min-h-[600px]">
            {/* Left Side */}
            <div className="hidden md:block relative bg-linear-to-br from-primary via-primary to-primary/80 dark:from-background dark:via-background dark:to-background/80 overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-72 h-72 bg-primary-foreground rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-foreground rounded-full blur-3xl"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center p-12">
                <div className="space-y-6">
                  <Link href="/">
                    <div className="flex flex-row items-center gap-x-2 text-gray-100 mb-4 ">
                      <Image
                        src="/logo.png"
                        alt="Togetha logo"
                        width={40}
                        height={40}
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

                  <h2 className="text-4xl font-bold leading-tight text-gray-50 dark:text-primary">
                    Welcome to
                    <br />
                    Creative Collaboration
                  </h2>

                  <p className="text-lg leading-relaxed text-gray-50 dark:text-primary">
                    Sign in with Google to access your boards and collaborate
                    with your team in real-time.
                  </p>

                  {/* Feature List */}
                  <div className="space-y-4 pt-6">
                    <div className="flex items-center gap-3">
                      <Watch className="text-background dark:text-primary" />
                      <span className="text-sm text-gray-50 dark:text-primary">
                        Real-time collaboration with your team
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CloudCheck className="text-background dark:text-primary" />
                      <span className="text-sm text-gray-50 dark:text-primary">
                        Your work is automatically saved and synced
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <EarthLock className="text-background dark:text-primary" />
                      <span className="text-sm text-gray-50 dark:text-primary">
                        Your data is encrypted and protected
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <NotebookPen className="text-background dark:text-primary" />
                      <span className="text-sm text-gray-50 dark:text-primary">
                        Offline Mode, Work without interruptions
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Sign In Form */}
            <div className="flex items-center justify-center p-8 md:p-12 bg-card">
              <div className="w-full max-w-md space-y-8">
                {/* Mobile Logo (Visible only on mobile) */}
                <div className="md:hidden flex justify-center mb-8">
                  <div className="w-16 h-16 bg-linear-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
                    <Lock className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>

                {/* Header */}
                <div className="text-center md:text-left">
                  <h1 className="text-4xl font-bold text-foreground mb-3">
                    Glad to see you again!
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Sketch, share, and organize your thoughts seamlessly -
                    wherever inspiration strikes, Your workspace is waiting.
                  </p>
                </div>

                {/* Google Sign In Button */}
                <div className="space-y-6">
                  <LoginLink
                    authUrlParams={{
                      connection_id:
                        process.env.NEXT_PUBLIC_KINDE_GOOGLE_CONNECTION_ID ||
                        "",
                      post_login_redirect_url: "/dashboard",
                    }}
                    className="w-full group relative flex items-center justify-center gap-4 px-8 py-4 bg-background border-2 border-input rounded-2xl font-semibold text-foreground hover:bg-accent/30 hover:text-accent-foreground hover:border-accent hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
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
                    <span className="text-lg">Continue with Google</span>
                  </LoginLink>

                  {/* Privacy Notice */}
                  <div className="bg-muted border border-border rounded-xl p-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <span className="font-semibold text-foreground">
                        🔒 Secure Sign-In:
                      </span>{" "}
                      We'll redirect you to Google's secure login page. Your
                      credentials are never shared with us.
                    </p>
                  </div>
                </div>

                {/* Terms */}
                <p className="text-xs text-muted-foreground text-center leading-relaxed pt-4">
                  By continuing, you agree to our{" "}
                  <a
                    href="#"
                    className="text-primary hover:text-primary/80 font-medium underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-primary hover:text-primary/80 font-medium underline"
                  >
                    Privacy Policy
                  </a>
                </p>

                {/* Footer */}
                <div className="pt-6 border-t border-border">
                  <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <a
                      href="/signup"
                      className="text-primary hover:text-primary/80 font-semibold hover:underline"
                    >
                      Create one now
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
