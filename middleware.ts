// middleware.ts
import { withAuth } from 'next-auth/middleware'
import { NextRequest } from 'next/server'

export default withAuth({
  callbacks: {
    authorized: ({ token, req }: { token: any; req: NextRequest }) => {
      const path = req.nextUrl.pathname

      const isAdminRoute = path.startsWith('/admin')
      const isUserRoute = path.startsWith('/dashboard')

      if (!token) return false

      if (isAdminRoute) return token.role === 'admin'
      if (isUserRoute) return ['admin', 'user'].includes(token.role)

      return true // allow public routes
    },
  },
  pages: {
    signIn: '/auth/login',
  },
})

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}
