import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import ConvexClientProvider from "./ConvexClientProvider";
import { Toaster } from "sonner";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        {/* Charset & Viewport */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Title */}
        <title>
          Togetha - Collaborative Playground for Teams & Individuals
        </title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Togetha lets teams and individuals collaborate in real-time, brainstorm, and create together seamlessly."
        />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* Canonical */}
        <link rel="canonical" href="https://www.togetha-app.vercel.app/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Togetha - Collaborative Playground"
        />
        <meta
          property="og:description"
          content="Join Togetha to collaborate in real-time with your team or work individually on ideas and projects."
        />
        <meta property="og:url" content="https://www.togetha-app.vercel.app/" />
        <meta
          property="og:image"
          content="https://www.togetha-app.vercel.app/og-image.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Togetha - Collaborative Playground"
        />
        <meta
          name="twitter:description"
          content="Collaborate with teams or work individually in Togetha's real-time workspace."
        />
        <meta
          name="twitter:image"
          content="https://www.togetha-app.vercel.app/twitter-banner.png"
        />

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Togetha",
              url: "https://www.togetha-app.vercel.app",
              description:
                "Togetha is a collaborative playground for teams and individuals to brainstorm and create in real-time.",
              applicationCategory: "ProductivityApplication",
              operatingSystem: "Web",
              author: {
                "@type": "Organization",
                name: "Togetha App",
              },
            }),
          }}
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProvider>
            {children}
            <Toaster />
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
