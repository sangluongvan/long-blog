"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function TestAuthPage() {
  const [authStatus, setAuthStatus] = useState<string>("Checking...")

  useEffect(() => {
    const cookies = document.cookie.split(";")
    const adminCookie = cookies.find((cookie) => cookie.trim().startsWith("admin_logged_in="))

    if (adminCookie && adminCookie.includes("true")) {
      setAuthStatus("✅ Đã đăng nhập thành công!")
    } else {
      setAuthStatus("❌ Chưa đăng nhập")
    }
  }, [])

  const clearCookies = () => {
    document.cookie = "admin_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    setAuthStatus("🔄 Đã xóa cookies")
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Test Authentication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">{authStatus}</p>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">Cookies hiện tại:</p>
              <pre className="text-xs bg-gray-100 p-2 rounded">{document.cookie || "Không có cookies"}</pre>
            </div>

            <div className="space-y-2">
              <Button onClick={() => (window.location.href = "/admin/auth")} className="w-full">
                Đi tới trang đăng nhập
              </Button>
              <Button onClick={() => (window.location.href = "/admin")} variant="outline" className="w-full">
                Đi tới Admin Dashboard
              </Button>
              <Button onClick={clearCookies} variant="destructive" className="w-full">
                Xóa cookies
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
