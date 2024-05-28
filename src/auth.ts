import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../prisma";
import Google from "next-auth/providers/google";

// extend the User type for next-auth
declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      district: string;
      state: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
    district: string;
    state: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role;
      return session;
    },
  },
});
