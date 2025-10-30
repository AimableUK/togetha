import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://www.togetha-app.vercel.app";

  const urls = [
    { loc: `${baseUrl}/`, priority: 1.0 },
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
