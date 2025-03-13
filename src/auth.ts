import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import prisma from "./lib/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      type?: string | null;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT as string, 10),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  trustHost: true,
  callbacks: {
    async signIn({ user }) {
      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email as string,
          },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email as string,
            },
          });
        }
        return true;
      } catch (error) {
        console.error("Authentication error:", error);
        return false;
      }
    },
    async session({ session }) {
        if (session.user) {
          const user = await prisma.user.findUnique({
            where: {
              email: session.user.email as string,
            },
            select: {
              id: true,
              type: true,
            },
          });
    
          if (user) {
            session.user.id = user.id;
            session.user.type = user.type;
          }
        }
        return session;
      },
  }
});
