import { NextResponse } from "next/server";

export async function GET() {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>https://togetha-app.vercel.app/</loc>
            <priority>1.0</priority>
        </url>
        <url>
            <loc>https://togetha-app.vercel.app/features</loc>
            <priority>0.8</priority>
        </url>
        <url>
            <loc>https://togetha-app.vercel.app/contact</loc>
            <priority>0.7</priority>
        </url>
    </urlset>`;

    return new NextResponse(sitemap, {
        headers: { "Content-Type": "application/xml" },
    });
}
