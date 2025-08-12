"use client"
// pages/auth/login/page.tsx
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

const LoginPage = () => {
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    console.log("[LoginPage] handleSubmit called. email:", email)
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // <-- change to false for manual redirect
      })
      console.log("[LoginPage] signIn result:", result)
      if (result?.ok && result.url) {
        router.replace(result.url)
      }
    } catch (err) {
      console.error("[LoginPage] signIn error:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* ...existing form fields... */}
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginPage