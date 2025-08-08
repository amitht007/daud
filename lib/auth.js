import CredentialsProvider from "next-auth/providers/credentials";
import { dbOperations } from "./db";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize function called with credentials:", credentials);
        if (!credentials) {
            console.log("No credentials, returning null.");
            return null;
        }
        const user = dbOperations.getUserByEmail.get(credentials.email);
        console.log("User from DB:", user);

        if (user) {
            const passwordMatch = await bcrypt.compare(credentials.password, user.password_hash);
            console.log("Password match:", passwordMatch);
            if (passwordMatch) {
                console.log("Returning user:", { id: user.id, email: user.email, role: user.role });
                return { id: user.id, email: user.email, role: user.role };
            }
        }

        console.log("Authentication failed, returning null.");
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
