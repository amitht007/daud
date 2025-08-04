import CredentialsProvider from "next-auth/providers/credentials";
import { getDB } from "./db";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const db = await getDB();
        const user = await db.get("SELECT * FROM users WHERE email = ?", credentials.email);

        if (user && await bcrypt.compare(credentials.password, user.password_hash)) {
          return { id: user.id, email: user.email, role: user.role };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Export authHelpers for API usage
export const authHelpers = {
  verifyToken(token) {
    // Example: decode JWT and return user object
    // Replace with your JWT verification logic
    try {
      const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      return payload;
    } catch (err) {
      console.error('[AUTH] Token verification failed:', err);
      return null;
    }
  }
};
