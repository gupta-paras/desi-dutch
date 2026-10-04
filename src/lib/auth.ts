import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { isWhitelistedAdmin } from "@/lib/config";

export const authOptions: NextAuthOptions = {
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    // Credentials Provider for local preview & testing before Google OAuth credentials are added
    CredentialsProvider({
      id: "admin-credentials",
      name: "Admin Whitelist Access",
      credentials: {
        email: { label: "Whitelisted Google Email", type: "email", placeholder: "admin@desidutch.nl" },
        password: { label: "Passcode (default: admin)", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        const email = credentials.email.trim().toLowerCase();

        // Strictly check if email is whitelisted in config.yaml
        if (!isWhitelistedAdmin(email)) {
          throw new Error("ACCESS_DENIED_NOT_WHITELISTED");
        }

        // Check password (allows admin pass or default in development)
        const expectedPass = process.env.ADMIN_DEV_PASSWORD || "admin";
        if (credentials.password === expectedPass) {
          return {
            id: email,
            name: email.split("@")[0].toUpperCase() + " (Admin)",
            email: email,
            role: "admin",
          };
        }

        throw new Error("INVALID_CREDENTIALS");
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/unauthorized",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user?.email) return false;

      // When signing in with Google OAuth, strictly enforce whitelist against config.yaml
      if (account?.provider === "google") {
        const allowed = isWhitelistedAdmin(user.email);
        if (!allowed) {
          console.warn(`[AUTH] Google user ${user.email} denied access: Not in config.yaml whitelist`);
          return "/admin/unauthorized?reason=not_whitelisted&email=" + encodeURIComponent(user.email);
        }
      }

      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = "admin";
        (session.user as any).isWhitelisted = isWhitelistedAdmin(session.user.email);
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = "admin";
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "desi-dutch-secret-key-jaipur-amsterdam-2024",
};
