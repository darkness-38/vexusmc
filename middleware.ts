import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/hesabim", "/bakiye-yukle"];

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isLoggedIn = Boolean(token);
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!isLoggedIn && isProtected) {
    const redirectUrl = new URL("/giris", nextUrl.origin);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isLoggedIn && pathname === "/giris") {
    return NextResponse.redirect(new URL("/hesabim", nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/hesabim/:path*", "/bakiye-yukle", "/giris"],
};


