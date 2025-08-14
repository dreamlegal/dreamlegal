
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import EmailProvider from "next-auth/providers/email";
import prisma from "./lib/prisma";
import { cookies } from "next/headers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "select_account"
        }
      }
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          scope: "openid profile email", // LinkedIn has updated their scopes - use these instead
          // prompt: "select_account"
        }
      },
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
    async signIn({ user, account, profile }) {
      try {
        // For email provider, we only want to proceed after verification
        // NextAuth doesn't provide a clear way to detect "just sending email" vs "link clicked"
        // so we need to use a different approach
        if (account?.provider === "email") {
          console.log("Email provider authentication attempt", { 
            emailVerified: user.emailVerified,
            hasAccount: !!account
          });
          
          // Check if this is just the initial email request (no emailVerified yet)
          if (!user.emailVerified) {
            console.log("Email not verified yet, returning without setting cookies");
            return true; // Allow the email to be sent, but don't set cookies
          }
        }

        // Find or create the user
        let dbUser = await prisma.user.findUnique({
          where: {
            email: user.email as string,
          },
        });

        if (!dbUser) {
          // Create new user with type 'user' by default
          dbUser = await prisma.user.create({
            data: {
              email: user.email as string,
              name: user.name,
              image: user.image,
              type: 'user', // Default type is 'user'
              emailVerified: new Date(),
            },
          });
          
          // Create empty user account
          await prisma.userAccount.create({
            data: {
              userId: dbUser.id,
            },
          });
        }

        // At this point, we know:
        // - For OAuth: The OAuth flow completed successfully
        // - For Email: The magic link was clicked and verified
        // So it's safe to set cookies
        const expirationTime = Date.now() + 30 * 24 * 60 * 60 * 1000;
        const cookieStore = cookies();
        cookieStore.set('auth', JSON.stringify({
          id: dbUser.id,
          type: dbUser.type,
          exp: expirationTime,
          email: dbUser.email
        }), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
          domain: process.env.COOKIE_DOMAIN || undefined
        });

        return true;
      } catch (error) {
        console.error("Authentication error:", error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // Special handling for the /auth/success route which is our generic success redirect
      if (url.includes('/auth/success')) {
        // This is after a successful auth, so check onboarding status
        const authCookie = cookies().get('auth');
        if (!authCookie) {
          return '/auth/user/login';
        }
        
        try {
          const authData = JSON.parse(authCookie.value);
          
          // If cookie is expired
          if (authData.exp && authData.exp < Date.now()) {
            return '/auth/user/login';
          }
          
          // Check user type and redirect accordingly
          if (authData.type === 'vendor') {
            return '/tech-vendor/dashboard';
          }
          
          // For user type, check if onboarding is completed
          if (authData.type === 'user') {
            console.log('Checking onboarding status for user:', authData.id);
            const userAccount = await prisma.userAccount.findFirst({
              where: { userId: authData.id },
            });
            
            const hasCompletedOnboarding = !!(
              userAccount && 
              userAccount.CompanyAddress && 
              userAccount.OrgType && 
              userAccount.TeamSize
            );
            
            console.log('Onboarding status:', hasCompletedOnboarding);
            
            if (!hasCompletedOnboarding) {
              return '/onboard';
            }
            
            return '/legal-professionals/dashboard';
          }
        } catch (error) {
          console.error('Error parsing auth cookie:', error);
          return '/auth/user/login';
        }
      }
      
      // For other redirects
      const authCookie = cookies().get('auth');
      if (!authCookie) {
        return '/auth/user/login'; // If no auth cookie, redirect to login
      }
      
      try {
        const authData = JSON.parse(authCookie.value);
        
        // If cookie is expired
        if (authData.exp && authData.exp < Date.now()) {
          return '/auth/user/login';
        }
        
        // Check user type and redirect accordingly
        if (authData.type === 'vendor') {
          return '/tech-vendor/dashboard';
        }
        
        // For user type, check if onboarding is completed
        if (authData.type === 'user') {
          const userAccount = await prisma.userAccount.findFirst({
            where: { userId: authData.id },
          });
          
          const hasCompletedOnboarding = !!(
            userAccount && 
            userAccount.CompanyAddress && 
            userAccount.OrgType && 
            userAccount.TeamSize
          );
          
          if (!hasCompletedOnboarding) {
            return '/onboard';
          }
          
          return '/legal-professionals/dashboard';
        }
      } catch (error) {
        console.error('Error parsing auth cookie:', error);
        return '/auth/user/login';
      }
      
      // Default fallback
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    // Add a session callback to pass user data to the client
    async session({ session, token }) {
      if (token && session.user) {
        // Add relevant data from the token to the session
        session.user.id = token.sub;
        session.user.type = token.type;
      }
      return session;
    },
    // Add a JWT callback to add custom claims to the token
    async jwt({ token, user }) {
      if (user) {
        // Add custom claims to the token
        token.type = user.type;
      }
      return token;
    }
  },
  pages: {
    signIn: '/auth/user/login',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request', // Page shown after email is sent
  },
  debug: process.env.NODE_ENV === 'development',
  events: {
    signOut: async () => {
      // On sign out, clear the auth cookie
      const cookieStore = cookies();
      cookieStore.delete('auth');
    },
  },
});