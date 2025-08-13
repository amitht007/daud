// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { dbOperations } from '../../../../lib/db'

const handler= NextAuth({
// Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: Record<string, string> | undefined) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        try {
          // Get user from database
          const user = dbOperations.getUserByEmail.get(credentials.email)
          
          if (!user) {
            throw new Error('No user found with this email')
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password_hash)
          
          if (!isPasswordValid) {
            throw new Error('Invalid password')
          }

          // Return user object (password_hash will be excluded)
          return {
            id: user.id,
            email: user.email,
            role: user.role,
            created_at: user.created_at
          }
        } catch (error: any) {
          console.error('Authorization error:', error)
          throw new Error(error.message || 'Authentication failed')
        }
      }
    })
  ],
  
  // Custom pages for sign in and sign up
  pages: {
    signIn: '/login',
    // signUp: '/register',
  },
  


  // Callbacks to handle JWT and session
  callbacks: {
    async jwt({ token, user }: { token: any, user?: any }) {
      // Add user info to token on sign in
      if (user) {
        token.id = user.id
        token.role = user.role
        token.email = user.email
      }
      return token
    },
    
    async session({ session, token }: { session: any, token: any }) {
      // Add user info to session
      console.log('[NEXTAUTH] Session callback:', { session, token })
      
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.email = token.email
      }
      return session
    },

    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl
    }
  },
  
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 30 days
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  
  debug: process.env.NODE_ENV === 'development',
})

export { handler as GET, handler as POST }
// This exports the handler for both GET and POST requests, allowing NextAuth to handle authentication routes