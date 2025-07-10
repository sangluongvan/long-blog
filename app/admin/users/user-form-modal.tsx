"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Mail, Lock, Shield, Eye, EyeOff, Save, Crown, Pencil, UserCheck } from "lucide-react"

interface UserFormModalProps {
  isOpen: boolean
  onClose: (shouldRefresh?: boolean) => void
  user?: {
    id: string
    username: string
    email: string
    role: "admin" | "editor" | "viewer"
    status: "active" | "inactive"
    avatar?: string
    created_at: string
    updated_at: string
    last_login?: string
  } | null
}

export function UserFormModal({ isOpen, onClose, user }: UserFormModalProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "viewer" as "admin" | "editor" | "viewer",
    status: "active" as "active" | "inactive",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        password: "",
        confirmPassword: "",
        role: user.role,
        status: user.status,
      })
    } else {
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "viewer",
        status: "active",
      })
    }
    setErrors({})
  }, [user, isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.username.trim()) {
      newErrors.username = "Tên người dùng là bắt buộc"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email là bắt buộc"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (!user && !formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc"
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      const url = user ? `/api/auth/users/${user.id}` : "/api/auth/users"
      const method = user ? "PUT" : "POST"

      const payload = {
        username: formData.username,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        ...(formData.password && { password: formData.password }),
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        onClose(true)
      } else {
        const data = await response.json()
        setErrors({ general: data.error || "Có lỗi xảy ra" })
      }
    } catch (error) {
      setErrors({ general: "Có lỗi xảy ra" })
    } finally {
      setLoading(false)
    }
  }

  const getRoleInfo = (role: string) => {
    switch (role) {
      case "admin":
        return {
          icon: <Crown className="h-4 w-4" />,
          label: "Quản trị viên",
          description: "Toàn quyền quản lý hệ thống",
          color: "bg-red-100 text-red-700 border-red-200",
        }
      case "editor":
        return {
          icon: <Pencil className="h-4 w-4" />,
          label: "Biên tập viên",
          description: "Quản lý nội dung và media",
          color: "bg-blue-100 text-blue-700 border-blue-200",
        }
      case "viewer":
        return {
          icon: <Eye className="h-4 w-4" />,
          label: "Người xem",
          description: "Chỉ xem nội dung",
          color: "bg-gray-100 text-gray-700 border-gray-200",
        }
      default:
        return {
          icon: <UserCheck className="h-4 w-4" />,
          label: "Người dùng",
          description: "Vai trò cơ bản",
          color: "bg-gray-100 text-gray-700 border-gray-200",
        }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-blue-900">
              <UserCheck className="mr-2 h-5 w-5" />
              {user ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onClose()} className="hover:bg-white/50">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{errors.general}</p>
              </div>
            )}

            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <UserCheck className="mr-2 h-5 w-5" />
                Thông tin cơ bản
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                    Tên người dùng *
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className={`mt-1 ${errors.username ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-blue-300 focus:ring-blue-200"}`}
                    placeholder="Nhập tên người dùng"
                  />
                  {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email *
                  </Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`pl-10 ${errors.email ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-blue-300 focus:ring-blue-200"}`}
                      placeholder="Nhập địa chỉ email"
                    />
                  </div>
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                {user ? "Đổi mật khẩu (để trống nếu không đổi)" : "Mật khẩu"}
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Mật khẩu {!user && "*"}
                  </Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={`pl-10 pr-10 ${errors.password ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-blue-300 focus:ring-blue-200"}`}
                      placeholder="Nhập mật khẩu"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Xác nhận mật khẩu {!user && "*"}
                  </Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className={`pl-10 pr-10 ${errors.confirmPassword ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-blue-300 focus:ring-blue-200"}`}
                      placeholder="Nhập lại mật khẩu"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>

            {/* Role and Status */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Phân quyền & Trạng thái
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                    Vai trò *
                  </Label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value as "admin" | "editor" | "viewer" })
                    }
                    className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:border-blue-300 focus:ring-blue-200 focus:ring-2 focus:ring-opacity-20"
                  >
                    <option value="viewer">Viewer - Người xem</option>
                    <option value="editor">Editor - Biên tập viên</option>
                    <option value="admin">Admin - Quản trị viên</option>
                  </select>

                  {/* Role Info */}
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge className={getRoleInfo(formData.role).color}>
                        {getRoleInfo(formData.role).icon}
                        <span className="ml-1">{getRoleInfo(formData.role).label}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{getRoleInfo(formData.role).description}</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                    Trạng thái *
                  </Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
                    className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:border-blue-300 focus:ring-blue-200 focus:ring-2 focus:ring-opacity-20"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                  </select>

                  {/* Status Info */}
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <Badge
                      className={
                        formData.status === "active"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-gray-100 text-gray-700 border-gray-200"
                      }
                    >
                      {formData.status === "active" ? (
                        <>
                          <UserCheck className="h-3 w-3 mr-1" />
                          Có thể đăng nhập
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3 w-3 mr-1" />
                          Không thể đăng nhập
                        </>
                      )}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={() => onClose()} disabled={loading}>
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {user ? "Đang cập nhật..." : "Đang tạo..."}
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {user ? "Cập nhật" : "Tạo người dùng"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
