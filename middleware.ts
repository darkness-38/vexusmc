/**
 * middleware.ts — Vercel Edge Runtime
 *
 * IMPORTANT: This file must NEVER import from:
 *   - @/lib/auth      (pulls in Prisma + bcryptjs → exceeds 1 MB Edge limit)
 *   - @/lib/prisma    (Node.js-only)
 *   - @/lib/authme    (uses Node.js 'crypto' module)
 *   - bcryptjs        (Node.js-only)
 *
 * We use NextAuth(authConfig) directly with the Edge-safe config.
 * The resulting .auth wrapper only needs to decode a JWT cookie via
 * the Web Crypto API — keeping the bundle tiny.
 */
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

// Instantiate NextAuth with the lightweight Edge-safe config.
// This does NOT pull in Prisma, bcryptjs, or crypto.
const { auth } = NextAuth(authConfig);

const protectedRoutes = ["/hesabim", "/bakiye-yukle"];

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  // req.auth is null when the JWT cookie is absent or invalid.
  const isLoggedIn = Boolean(req.auth);
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isLoggedIn && isProtected) {
    const redirectUrl = new URL("/giris", nextUrl.origin);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isLoggedIn && pathname === "/giris") {
    return NextResponse.redirect(new URL("/hesabim", nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/hesabim/:path*", "/bakiye-yukle", "/giris"],
};

