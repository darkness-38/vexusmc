import bcrypt from "bcryptjs";
import { isAuthMeHash, verifyAuthMePassword } from "@/lib/authme";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const loginSchema = z.object({
  username: z.string().min(3).max(16).regex(/^[a-zA-Z0-9_]+$/),
  password: z.string().min(6).max(50),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
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

        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          name: user.username,
          username: user.username,
          rank: user.rank,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username =
          (user as { username?: string }).username ?? user.name ?? undefined;
        token.rank = (user as { rank?: string }).rank ?? "Oyuncu";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.rank = token.rank as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/giris",
  },
});


