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

export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },

  // Providers array must be present but empty here — the real Credentials
  // provider (which needs Prisma) is added in lib/auth.ts.
  providers: [],

  callbacks: {
    // This jwt callback runs in the Edge too (on subsequent requests).
    // It only reads from the existing token — no DB calls.
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username =
          (user as { username?: string }).username ?? user.name ?? undefined;
        token.rank = (user as { rank?: string }).rank ?? "Oyuncu";
      }
      return token;
    },

    // This session callback also runs in the Edge on /api/auth/session calls.
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.rank = token.rank as string;
      }
      return session;
    },

    // authorized() is called by the middleware auth() wrapper on every request.
    // Return true to allow, false/redirect to deny.
    // The actual redirect logic is handled in middleware.ts for more control.
    authorized({ auth }) {
      // Simply expose whether a session exists — redirect logic is in middleware.ts
      return true;
    },
  },

  pages: {
    signIn: "/giris",
  },
};
