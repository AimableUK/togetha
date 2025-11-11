import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://www.togetha-app.vercel.app";

  const urls = [
    { loc: `${baseUrl}/`, priority: 1.0 },

    { loc: `${baseUrl}/signin`, priority: 0.8 },
    { loc: `${baseUrl}/signup`, priority: 0.8 },

    { loc: `${baseUrl}/support/contact`, priority: 0.6 },
    { loc: `${baseUrl}/legal/about-us`, priority: 0.6 },
    { loc: `${baseUrl}/support/help-center`, priority: 0.6 },

    { loc: `${baseUrl}/legal/community-guidelines`, priority: 0.4 },
    { loc: `${baseUrl}/legal/privacy-policy`, priority: 0.4 },
    { loc: `${baseUrl}/legal/terms-and-conditions`, priority: 0.4 },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (url) => `
      <url>
        <loc>${url.loc}</loc>
        <priority>${url.priority}</priority>
      </url>`
      )
      .join("")}
  </urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
