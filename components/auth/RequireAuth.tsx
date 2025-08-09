"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface RequireAuthProps {
  role?: string
  children: React.ReactNode
}

export default function RequireAuth({ role, children }: RequireAuthProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return
    if (!session?.user) {
      router.replace("/login")
      return
    }
    if (role && session.user.role !== role) {
      router.replace("/")
      return
    }
  }, [session, status, role, router])

  if (status === "loading" || !session?.user || (role && session.user.role !== role)) {
    return null // or a spinner
  }

  return <>{children}</>
}
