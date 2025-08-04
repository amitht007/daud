"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "./useAuth"

export function useAuthRedirect() {
  const { isLoggedIn, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Check if user was redirected after login
  const redirectFrom = searchParams.get("redirectFrom")
  const hasFormData = searchParams.get("hasFormData") === "true"

  const requireAuth = (currentPath, formData = null) => {
    if (isLoading) return false // Wait for auth check

    if (!isLoggedIn) {
      // Save form data to sessionStorage if provided
      if (formData) {
        sessionStorage.setItem(
          "pendingFormData",
          JSON.stringify({
            data: formData,
            path: currentPath,
            timestamp: Date.now(),
          }),
        )
      }

      // Redirect to login with return path
      const loginUrl = `/login?redirectFrom=${encodeURIComponent(currentPath)}${formData ? "&hasFormData=true" : ""}`
      router.push(loginUrl)
      return false
    }

    return true // User is authenticated
  }

  const getPendingFormData = (currentPath) => {
    try {
      const stored = sessionStorage.getItem("pendingFormData")
      if (!stored) return null

      const { data, path, timestamp } = JSON.parse(stored)

      // Check if data is for current path and not too old (30 minutes)
      if (path === currentPath && Date.now() - timestamp < 30 * 60 * 1000) {
        // Clear the stored data after retrieving
        sessionStorage.removeItem("pendingFormData")
        return data
      }

      // Clean up old data
      sessionStorage.removeItem("pendingFormData")
      return null
    } catch (error) {
      console.error("Error retrieving form data:", error)
      return null
    }
  }

  const clearPendingFormData = () => {
    sessionStorage.removeItem("pendingFormData")
  }

  return {
    requireAuth,
    getPendingFormData,
    clearPendingFormData,
    redirectFrom,
    hasFormData,
  }
}
