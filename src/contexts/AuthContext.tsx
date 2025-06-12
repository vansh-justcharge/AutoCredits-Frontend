
import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { authAPI } from "../services/api"
import type { User } from "../services/api"

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check for existing token and validate it
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const userData = await authAPI.getCurrentUser()
        setUser(userData)
        setIsAuthenticated(true)
      } catch (err) {
        console.error("Auth check failed:", err)
        localStorage.removeItem("token")
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, []) // Empty dependency array - only run on mount

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      const response = await authAPI.login(email, password)
      if (response.status === "success" && response.data.token) {
        localStorage.setItem("token", response.data.token)
        setUser(response.data.user)
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.response?.data?.message || "An error occurred during login")
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setIsAuthenticated(false)
    // Redirect to login page
    window.location.href = "/login"
  }

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
