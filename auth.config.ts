/**
 * auth.config.ts  — EDGE-SAFE NextAuth configuration
 *
 * This file contains ONLY the parts of the NextAuth config that are safe
 * to run in the Vercel Edge Runtime (middleware).
 *
 * !! RULES — never violate these !!
 *  - NO imports from 'crypto', 'bcryptjs', or any Node.js built-in
 *  - NO imports of Prisma or any database client
 *  - NO imports from @/lib/authme or @/lib/prisma
 *
 * Heavy logic (Prisma queries, password hashing) lives exclusively in
 * lib/auth.ts and is never imported here.
 */
import type { NextAuthConfig } from "next-auth";

// Determine if we're running over HTTPS.
// Setting secure: true on http://localhost will cause the browser to
// REFUSE to send the cookie back — silently breaking the session.
const useSecureCookies = process.env.NEXTAUTH_URL?.startsWith("https://") ?? false;

export const authConfig: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },

  // Prevents "UntrustedHost" errors on Vercel, behind proxies,
  // or when the Host header doesn't match NEXTAUTH_URL.
  trustHost: true,

  // Explicit cookie configuration ensures the session token is set
  // correctly regardless of deployment environment.
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
      },
    },
  },

  // Providers array must be present but empty here — the real Credentials
  // provider (which needs Prisma) is added in lib/auth.ts.
  providers: [],

  callbacks: {
    /**
     * jwt() — runs on every request that touches the session.
     *
     * On first sign-in, `user` is the object returned from authorize().
     * We copy fields into the token so they persist across requests.
     *
     * token.sub is NextAuth's canonical user identifier — without it,
     * req.auth in the middleware is null even when a cookie exists.
     */
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.id = user.id;
        token.name = user.name;
        token.username =
          (user as { username?: string }).username ?? user.name ?? undefined;
        token.rank = (user as { rank?: string }).rank ?? "Oyuncu";
      }
      return token;
    },

    /**
     * session() — shapes the session object exposed to the client.
     * Reads from token only — no DB calls, Edge-safe.
     */
    session({ session, token }) {
      if (session.user) {
        session.user.id = (token.sub ?? token.id) as string;
        session.user.name = token.name as string;
        session.user.username = token.username as string;
        session.user.rank = (token.rank ?? "Oyuncu") as string;
      }
      return session;
    },

    /**
     * authorized() — called by the middleware auth() wrapper.
     * Return true unconditionally; custom redirect logic lives in middleware.ts.
     */
    authorized() {
      return true;
    },
  },

  pages: {
    signIn: "/giris",
  },
};
