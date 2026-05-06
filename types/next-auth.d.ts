import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      rank: string;
    } & DefaultSession["user"];
  }

  interface User {
    username: string;
    rank: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string;
    username?: string;
    rank?: string;
  }
}

