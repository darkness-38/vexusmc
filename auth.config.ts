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
    /**
     * jwt() — runs on every request that needs a token.
     *
     * On first sign-in, `user` is populated with the object returned
     * from authorize(). We copy every field we need into the token so
     * they survive across requests.
     *
     * IMPORTANT: We set token.sub explicitly. NextAuth v5 uses token.sub
     * as the canonical user identifier. Without it, req.auth can be null
     * even when a cookie exists, causing the middleware to redirect to /giris.
     */
    jwt({ token, user }) {
      if (user) {
        // token.sub is NextAuth's built-in "subject" field — must equal user.id
        token.sub = user.id ?? token.sub;
        token.id = user.id;
        token.name = user.name;
        token.username = (user as { username?: string }).username ?? user.name ?? undefined;
        token.rank = (user as { rank?: string }).rank ?? "Oyuncu";
      }
      return token;
    },

    /**
     * session() — shapes the session object exposed to the client.
     *
     * We read from `token` (not from DB) so this is Edge-safe.
     * Every field set in jwt() above is available here via token.
     */
    session({ session, token }) {
      if (token) {
        session.user.id = (token.id ?? token.sub) as string;
        session.user.name = token.name as string;
        session.user.username = token.username as string;
        session.user.rank = (token.rank ?? "Oyuncu") as string;
      }
      return session;
    },

    /**
     * authorized() — called by the middleware auth() wrapper.
     * We return true here unconditionally; redirect logic is in middleware.ts
     * where we have full control via req.auth.
     */
    authorized() {
      return true;
    },
  },

  pages: {
    signIn: "/giris",
  },
};
