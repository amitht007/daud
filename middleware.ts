import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_PATHS = ["/", "/learn-more", "/api", "/_next", "/favicon.ico", "/static"];
const AUTH_PAGES = ["/login", "/register", "/auth/login", "/auth/register"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow home page for unauthenticated users
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Allow public paths and static files
  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  // Get the token (JWT) from cookies
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If user is authenticated and tries to access login/register, redirect to dashboard
  if (token && AUTH_PAGES.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    if (token.role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If user is not authenticated and tries to access protected pages, redirect to login
  if (!token && !AUTH_PAGES.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    // Allow public pages, block others
    if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // If user is authenticated but tries to access admin pages without admin role, redirect to home
  if (pathname.startsWith("/admin") && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If user is authenticated but tries to access user dashboard without user role, redirect to home
  if (pathname.startsWith("/dashboard") && token?.role !== "user" && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Optionally, configure matcher for only relevant routes
export const config = {
  matcher: [
    "/((?!api|_next|static|favicon.ico).*)"
  ],
};
