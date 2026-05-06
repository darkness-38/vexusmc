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
  // AUTH_SECRET is the canonical env var for NextAuth v5 (Auth.js).
  // Falls back to NEXTAUTH_SECRET for backward compatibility.
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,

  session: { strategy: "jwt" },

  // Required for Vercel deployments — prevents UntrustedHost errors.
  trustHost: true,

  // DO NOT set custom cookies config here.
  // NextAuth v5 auto-detects HTTPS on Vercel and configures secure
  // cookies with the correct name prefix automatically.

  // Providers: empty here, real Credentials provider is in lib/auth.ts.
  providers: [],

  callbacks: {
    /**
     * jwt() — runs on every request that touches the session.
     *
     * On first sign-in, `user` is the object from authorize().
     * token.sub is NextAuth's canonical user ID — must be set.
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
     * Return true unconditionally; redirect logic is in middleware.ts.
     */
    authorized() {
      return true;
    },
  },

  pages: {
    signIn: "/giris",
  },
};
