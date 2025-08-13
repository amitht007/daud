import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const adminRoutes = ["/admin", "/admin/*", "/pages/admin", "/pages/settings"];

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Protect admin routes
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }
  }

  // Optionally, protect other authenticated routes
  // if (pathname.startsWith("/protected")) {
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/pages/settings", "/pages/admin/:path*"],
};
