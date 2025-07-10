"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  const handleLogout = () => {
    // Clear the admin cookie
    document.cookie = "admin_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

    // Redirect to login
    window.location.href = "/admin/auth"
  }

  return (
    <Button variant="outline" onClick={handleLogout} className="flex items-center bg-transparent">
      <LogOut className="h-4 w-4 mr-2" />
      Đăng xuất
    </Button>
  )
}
