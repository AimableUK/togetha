import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const access = request.cookies.get("access_token");
    const refresh = request.cookies.get("refresh_token");

    if (!access && !refresh) {
        const loginUrl = new URL(
            "/signin",
            request.url
        );
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
