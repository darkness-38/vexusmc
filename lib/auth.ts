/**
 * lib/auth.ts — Node.js runtime ONLY
 *
 * This is the FULL NextAuth configuration used by:
 *   - app/api/auth/[...nextauth]/route.ts  (login/session API)
 *   - Server Components / Server Actions that call auth()
 *
 * It imports Prisma, bcryptjs, and authme — all Node.js-only modules.
 * It must NEVER be imported by middleware.ts.
 *
 * Shared settings (secret, session, callbacks, pages) come from
 * auth.config.ts to keep a single source of truth.
 */
import bcrypt from "bcryptjs";
import { isAuthMeHash, verifyAuthMePassword } from "@/lib/authme";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/auth.config";

const loginSchema = z.object({
  username: z.string().min(3).max(16).regex(/^[a-zA-Z0-9_]+$/),
  password: z.string().min(6).max(50),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Spread the Edge-safe config — inherits secret, session strategy,
  // jwt/session callbacks, and pages. We only add the Credentials provider.
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Kullanıcı Adı", type: "text" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(rawCredentials) {
        const parsed = loginSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { username: parsed.data.username },
        });
        if (!user) return null;

        // Detect hash format at runtime and verify accordingly.
        // AuthMe (Minecraft) accounts use $SHA$salt$hash format.
        // Accounts created via the web/seed use bcrypt.
        let valid: boolean;
        if (isAuthMeHash(user.password)) {
          try {
            valid = verifyAuthMePassword(parsed.data.password, user.password);
          } catch {
            valid = false;
          }
        } else {
          valid = await bcrypt.compare(parsed.data.password, user.password);
        }
        if (!valid) return null;

        // Wrapped in try/catch: a DB error here must NEVER prevent the
        // return value from reaching NextAuth — otherwise authorize() returns
        // undefined (not null), which NextAuth treats as a failure.
        try {
          await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
          });
        } catch {
          // Non-critical: proceed with login even if timestamp update fails.
        }

        // Return an explicit, fully-typed object so the jwt callback
        // receives all fields on the first login tick.
        return {
          id: user.id,
          name: user.username,
          username: user.username,
          rank: user.rank,
        };
      },
    }),
  ],
});
