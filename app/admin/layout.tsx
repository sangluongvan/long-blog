"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const cookies = document.cookie.split(";")
      const adminCookie = cookies.find((cookie) => cookie.trim().startsWith("admin_logged_in="))

      if (adminCookie && adminCookie.includes("true")) {
        setIsAuthenticated(true)
      } else {
        // Redirect to login if not on auth page
        if (!window.location.pathname.includes("/admin/auth")) {
          router.push("/admin/auth")
          return
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white text-2xl">🐱</span>
          </div>
          <p className="text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    )
  }

  // Show login page if not authenticated and on auth page
  if (!isAuthenticated && window.location.pathname.includes("/admin/auth")) {
    return <>{children}</>
  }

  // Show admin content if authenticated
  if (isAuthenticated && !window.location.pathname.includes("/admin/auth")) {
    return <>{children}</>
  }

  // Fallback
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl">❌</span>
        </div>
        <p className="text-gray-600">Không có quyền truy cập</p>
      </div>
    </div>
  )
}
