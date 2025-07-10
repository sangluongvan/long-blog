"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Search,
  Plus,
  Edit,
  Trash2,
  Users,
  UserCheck,
  Eye,
  EyeOff,
  Crown,
  PenTool,
  UserIcon,
} from "lucide-react"
import Link from "next/link"
import { type User, ROLE_PERMISSIONS } from "@/lib/auth"
import { UserFormModal } from "./user-form-modal"

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [showUserForm, setShowUserForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/auth/users")
      const data = await response.json()
      setUsers(data.users || [])
    } catch (error) {
      console.error("Failed to load users:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = () => {
    setEditingUser(null)
    setShowUserForm(true)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setShowUserForm(true)
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Bạn có chắc muốn xóa người dùng này?")) return

    try {
      const response = await fetch(`/api/auth/users/${userId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await loadUsers()
      } else {
        const data = await response.json()
        alert(data.error || "Xóa người dùng thất bại")
      }
    } catch (error) {
      console.error("Delete user error:", error)
      alert("Xóa người dùng thất bại")
    }
  }

  const handleToggleStatus = async (userId: string) => {
    try {
      const response = await fetch(`/api/auth/users/${userId}/toggle-status`, {
        method: "POST",
      })

      if (response.ok) {
        await loadUsers()
      } else {
        const data = await response.json()
        alert(data.error || "Thay đổi trạng thái thất bại")
      }
    } catch (error) {
      console.error("Toggle status error:", error)
      alert("Thay đổi trạng thái thất bại")
    }
  }

  const handleUserSaved = () => {
    setShowUserForm(false)
    setEditingUser(null)
    loadUsers()
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    return matchesSearch && matchesRole
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return Crown
      case "editor":
        return PenTool
      case "viewer":
        return UserIcon
      default:
        return UserIcon
    }
  }

  const getRoleStats = () => {
    const stats = {
      total: users.length,
      active: users.filter((u) => u.isActive).length,
      admin: users.filter((u) => u.role === "admin").length,
      editor: users.filter((u) => u.role === "editor").length,
      viewer: users.filter((u) => u.role === "viewer").length,
    }
    return stats
  }

  const stats = getRoleStats()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h1>
                  <p className="text-sm text-gray-500">Tạo và quản lý tài khoản admin</p>
                </div>
              </div>
            </div>
            <Button
              onClick={handleCreateUser}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg"
            >
              <Plus className="mr-2 h-4 w-4" />
              Thêm người dùng
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                label: "Tổng người dùng",
                value: stats.total,
                color: "from-blue-500 to-blue-600",
                icon: Users,
              },
              {
                label: "Đang hoạt động",
                value: stats.active,
                color: "from-green-500 to-green-600",
                icon: UserCheck,
              },
              {
                label: "Quản trị viên",
                value: stats.admin,
                color: "from-red-500 to-red-600",
                icon: Crown,
              },
              {
                label: "Biên tập viên",
                value: stats.editor,
                color: "from-purple-500 to-purple-600",
                icon: PenTool,
              },
              {
                label: "Người xem",
                value: stats.viewer,
                color: "from-gray-500 to-gray-600",
                icon: UserIcon,
              },
            ].map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Tìm kiếm người dùng..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                    />
                  </div>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-300 focus:ring-blue-200 focus:ring-2 focus:ring-opacity-20"
                  >
                    <option value="all">Tất cả vai trò ({users.length})</option>
                    <option value="admin">Quản trị viên ({stats.admin})</option>
                    <option value="editor">Biên tập viên ({stats.editor})</option>
                    <option value="viewer">Người xem ({stats.viewer})</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="border-0 shadow-xl">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Người dùng
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Vai trò
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Đăng nhập cuối
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredUsers.map((user) => {
                      const RoleIcon = getRoleIcon(user.role)
                      const roleInfo = ROLE_PERMISSIONS[user.role]

                      return (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <RoleIcon className="h-4 w-4 text-gray-500" />
                              <Badge className={`${roleInfo.color} border-0`}>{roleInfo.label}</Badge>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{roleInfo.description}</div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge
                              variant={user.isActive ? "default" : "secondary"}
                              className={user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                            >
                              {user.isActive ? "Hoạt động" : "Vô hiệu"}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString("vi-VN") : "Chưa đăng nhập"}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditUser(user)}
                                className="hover:bg-blue-50 hover:text-blue-600 bg-transparent"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleToggleStatus(user.id)}
                                className={`${
                                  user.isActive
                                    ? "hover:bg-red-50 hover:text-red-600"
                                    : "hover:bg-green-50 hover:text-green-600"
                                } bg-transparent`}
                              >
                                {user.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteUser(user.id)}
                                className="hover:bg-red-50 hover:text-red-600 bg-transparent"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {filteredUsers.length === 0 && (
            <div className="text-center py-20">
              <Users className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? "Không tìm thấy người dùng nào" : "Chưa có người dùng nào"}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm ? "Thử thay đổi từ khóa tìm kiếm" : "Tạo tài khoản đầu tiên để bắt đầu"}
              </p>
              {!searchTerm && (
                <Button onClick={handleCreateUser} className="bg-gradient-to-r from-blue-500 to-purple-500">
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo người dùng đầu tiên
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* User Form Modal */}
      {showUserForm && (
        <UserFormModal
          user={editingUser}
          onClose={() => {
            setShowUserForm(false)
            setEditingUser(null)
          }}
          onSave={handleUserSaved}
        />
      )}
    </div>
  )
}
