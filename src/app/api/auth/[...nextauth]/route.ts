import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const db = await connectDB();
        const user = await db.collection("users").findOne({ email: credentials.email });
        if (!user) {
          return null;
        }
        // Removed password logging for security
        const isValid = await bcrypt.compare(credentials.password, user.password_hash);
        if (!isValid) {
          return null;
        }
        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          name: user.name || user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
