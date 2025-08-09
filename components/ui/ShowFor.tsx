// components/ShowFor.tsx
'use client'

import { useSession } from 'next-auth/react'

type ShowForProps = {
  role: 'admin' | 'user'
  children: React.ReactNode
}

export default function ShowFor({ role, children }: ShowForProps) {
  const { data: session, status } = useSession()

  if (status === 'loading') return null
  if (session?.user?.role !== role) return null

  return <>{children}</>
}
