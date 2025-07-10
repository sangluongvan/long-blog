"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

export default function AdminAuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if already logged in
    const cookies = document.cookie.split(";")
    const adminCookie = cookies.find((cookie) => cookie.trim().startsWith("admin_logged_in="))

    if (adminCookie && adminCookie.includes("true")) {
      window.location.href = "/admin"
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate login - replace with actual auth logic
      if (email === "sangluonganm@gmail.com" && password === "xuanlam@98") {
        // Set cookie instead of localStorage for middleware to work
        document.cookie = "admin_logged_in=true; path=/; max-age=86400" // 24 hours

        // Redirect to admin dashboard
        window.location.href = "/admin"
      } else {
        alert("Email hoặc mật khẩu không đúng!")
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("Có lỗi xảy ra khi đăng nhập!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🐱</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Đăng nhập Admin</CardTitle>
          <p className="text-gray-600">Quản lý Blog của Long</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="
">Email</Label>
              <Input
                id="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="xuanlam@gmail.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isLoading}>
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>

          {/*<div className="mt-6 p-4 bg-gray-50 rounded-lg">*/}
          {/*  <p className="text-sm text-gray-600 mb-2">Demo credentials:</p>*/}
          {/*  <p className="text-sm font-mono">User: xuanlam</p>*/}
          {/*  <p className="text-sm font-mono">Password: xuanlam@98</p>*/}
          {/*</div>*/}
        </CardContent>
      </Card>
    </div>
  )
}
