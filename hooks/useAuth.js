"use client"

import { useState, useEffect, createContext, useContext } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    isLoggedIn: false,
    role: null,
    username: null,
    email: null,
    department: null,
    id: null,
    isLoading: true,
  })

  const [token, setToken] = useState(null)

  useEffect(() => {
    // Check for stored token
    const storedToken = localStorage.getItem("auth_token")
    if (storedToken) {
      verifyToken(storedToken)
    } else {
      setUser((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  const verifyToken = async (authToken) => {
    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: authToken }),
      })

      if (response.ok) {
        const data = await response.json()
        setUser({
          isLoggedIn: true,
          role: data.user.role,
          username: data.user.username,
          email: data.user.email,
          department: data.user.department,
          id: data.user.id,
          isLoading: false,
        })
        setToken(authToken)
      } else {
        // Token is invalid, remove it
        localStorage.removeItem("auth_token")
        setUser((prev) => ({ ...prev, isLoading: false }))
      }
    } catch (error) {
      console.error("Token verification failed:", error)
      localStorage.removeItem("auth_token")
      setUser((prev) => ({ ...prev, isLoading: false }))
    }
  }

  const login = async (username, password) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("auth_token", data.token)
        setToken(data.token)
        setUser({
          isLoggedIn: true,
          role: data.user.role,
          username: data.user.username,
          email: data.user.email,
          department: data.user.department,
          id: data.user.id,
          isLoading: false,
        })
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      console.error("Login failed:", error)
      return { success: false, error: "Login failed" }
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    setToken(null)
    setUser({
      isLoggedIn: false,
      role: null,
      username: null,
      email: null,
      department: null,
      id: null,
      isLoading: false,
    })
  }

  // Helper functions
  const isAdmin = () => user.role === "admin"
  const isUser = () => user.role === "user"
  const canDelete = () => user.role === "admin"
  const canApprove = () => user.role === "admin"
  const canEdit = (itemOwner) => user.role === "admin" || user.username === itemOwner
  const isLoggedIn = () => user.isLoggedIn
  const value = {
    ...user,
    token,
    login,
    logout,
    isAdmin,
    isUser,
    canDelete,
    canApprove,
    canEdit,  
    isLoggedIn,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
