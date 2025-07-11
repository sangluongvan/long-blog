"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })

      if (response.ok) {
        router.push("/admin/auth")
        router.refresh()
      } else {
        const data = await response.json()
        alert(data.error || "Đăng xuất thất bại.")
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      disabled={loading}
      className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
    >
      <LogOut className="h-4 w-4 mr-2" />
      {loading ? (
          <>
            <div className="animate-spin h-4 w-4 mr-2 border-b-2 border-gray-600 rounded-full" />
            Đang đăng xuất...
          </>
      ) : (
          <>
            <LogOut className="h-4 w-4 mr-2" />
            Đăng xuất
          </>
      )}
    </Button>
  )
}
