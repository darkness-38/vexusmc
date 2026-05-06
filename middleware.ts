import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const protectedRoutes = ["/hesabim", "/bakiye-yukle"];

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  // req.auth is populated by NextAuth v5's auth() middleware wrapper.
  // It is null when no valid session exists.
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

