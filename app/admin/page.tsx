"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  BarChart3,
  FileText,
  ImageIcon,
  Settings,
  TrendingUp,
  Eye,
  Heart,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  MoreHorizontal,
  Globe,
  Calendar,
  Activity,
  ArrowUp,
  ArrowDown,
  Users,
  MousePointer,
} from "lucide-react"
import { LogoutButton } from "./components/logout-button"
import Link from "next/link"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const stats = [
    {
      title: "Tổng bài viết",
      value: "24",
      change: "+3",
      changeType: "increase",
      changeText: "tuần này",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Lượt xem",
      value: "12,543",
      change: "+15%",
      changeType: "increase",
      changeText: "so với tháng trước",
      icon: Eye,
      color: "text-green-600",
      bgColor: "bg-green-100",
      gradient: "from-green-500 to-green-600",
    },
    {
      title: "Lượt thích",
      value: "1,847",
      change: "+8%",
      changeType: "increase",
      changeText: "tuần này",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-100",
      gradient: "from-red-500 to-red-600",
    },
    {
      title: "Khách truy cập",
      value: "3,264",
      change: "+12%",
      changeType: "increase",
      changeText: "hôm nay",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      gradient: "from-purple-500 to-purple-600",
    },
  ]

  const recentPosts = [
    {
      id: 1,
      title: "Long và món đồ chơi mới",
      status: "published",
      views: 234,
      likes: 45,
      date: "2024-01-15",
      category: "Đồ chơi",
      featured_image: "/placeholder.svg?height=60&width=80",
    },
    {
      id: 2,
      title: "Ngày đầu tiên Long về nhà",
      status: "published",
      views: 567,
      likes: 89,
      date: "2024-01-10",
      category: "Kỷ niệm",
      featured_image: "/placeholder.svg?height=60&width=80",
    },
    {
      id: 3,
      title: "Long học cách sử dụng cây cào",
      status: "draft",
      views: 0,
      likes: 0,
      date: "2024-01-08",
      category: "Huấn luyện",
      featured_image: "/placeholder.svg?height=60&width=80",
    },
    {
      id: 4,
      title: "Những trò nghịch ngợm của Long",
      status: "published",
      views: 189,
      likes: 67,
      date: "2024-01-05",
      category: "Hài hước",
      featured_image: "/placeholder.svg?height=60&width=80",
    },
  ]

  const analyticsData = [
    { name: "Trang chủ", views: 4521, percentage: 35 },
    { name: "Blog", views: 3240, percentage: 25 },
    { name: "Thư viện", views: 2156, percentage: 17 },
    { name: "Về Long", views: 1890, percentage: 15 },
    { name: "Khác", views: 1043, percentage: 8 },
  ]

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3, badge: null },
    { id: "posts", label: "Bài viết", icon: FileText, badge: "24" },
    { id: "media", label: "Thư viện", icon: ImageIcon, badge: "156" },
    { id: "analytics", label: "Thống kê", icon: Activity, badge: null },
    { id: "settings", label: "Cài đặt", icon: Settings, badge: null },
  ]

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Chào mừng trở lại! 👋</h1>
            <p className="text-orange-100 text-lg">Blog của Long đang hoạt động tốt với {stats[1].value} lượt xem</p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-4xl">🐱</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-gray-50"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div
                  className={`flex items-center text-sm font-medium ${
                    stat.changeType === "increase" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.changeType === "increase" ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.changeText}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: "Tạo bài viết", icon: Plus, color: "from-blue-500 to-blue-600", href: "/admin/posts/new" },
          { label: "Upload ảnh", icon: ImageIcon, color: "from-green-500 to-green-600", href: "/admin/media" },
          { label: "Xem thống kê", icon: BarChart3, color: "from-purple-500 to-purple-600", href: "#analytics" },
          { label: "Cài đặt", icon: Settings, color: "from-orange-500 to-orange-600", href: "/admin/settings" },
        ].map((action, index) => (
          <Button
            key={index}
            className={`h-16 bg-gradient-to-r ${action.color} hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
            asChild={action.href.startsWith("/")}
            onClick={action.href.startsWith("#") ? () => setActiveTab("analytics") : undefined}
          >
            {action.href.startsWith("/") ? (
              <Link href={action.href}>
                <action.icon className="h-5 w-5 mr-2" />
                {action.label}
              </Link>
            ) : (
              <>
                <action.icon className="h-5 w-5 mr-2" />
                {action.label}
              </>
            )}
          </Button>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Posts */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
                  <span className="text-blue-900">Bài viết gần đây</span>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/posts">Xem tất cả</Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {recentPosts.slice(0, 4).map((post) => (
                  <div key={post.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center space-x-4">
                      <img
                        src={post.featured_image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-16 h-12 object-cover rounded-lg shadow-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-900 truncate">{post.title}</h4>
                          <Badge variant={post.status === "published" ? "default" : "secondary"} className="text-xs">
                            {post.status === "published" ? "Đã đăng" : "Nháp"}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {post.date}
                          </span>
                          <span className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {post.views}
                          </span>
                          <span className="flex items-center">
                            <Heart className="h-3 w-3 mr-1" />
                            {post.likes}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                          <Link href={`/admin/posts/edit/${post.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Summary */}
        <div>
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
              <CardTitle className="flex items-center">
                <MousePointer className="mr-2 h-5 w-5 text-purple-600" />
                <span className="text-purple-900">Trang phổ biến</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {analyticsData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{item.name}</span>
                        <span className="text-sm text-gray-500">{item.views}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderPosts = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Quản lý bài viết</h2>
          <p className="text-gray-600 mt-1">Tạo và quản lý nội dung blog của Long</p>
        </div>
        <Button
          className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300"
          asChild
        >
          <Link href="/admin/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            Tạo bài viết mới
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-orange-300 focus:ring-orange-200"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:border-orange-300 focus:ring-orange-200 focus:ring-2 focus:ring-opacity-20"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="published">Đã đăng</option>
                <option value="draft">Nháp</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Lọc
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Table */}
      <Card className="border-0 shadow-xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Bài viết
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Thống kê
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {recentPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={post.featured_image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-16 h-12 object-cover rounded-lg shadow-sm"
                        />
                        <div>
                          <div className="text-sm font-semibold text-gray-900 mb-1">{post.title}</div>
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={post.status === "published" ? "default" : "secondary"}
                        className={post.status === "published" ? "bg-green-100 text-green-700" : ""}
                      >
                        {post.status === "published" ? "Đã đăng" : "Nháp"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {post.views}
                        </span>
                        <span className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {post.likes}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{post.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-blue-50 hover:text-blue-600 bg-transparent"
                          asChild
                        >
                          <Link href={`/admin/posts/edit/${post.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-red-50 hover:text-red-600 bg-transparent"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="hover:bg-gray-50 bg-transparent">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Thống kê chi tiết</h2>
          <p className="text-gray-600 mt-1">Phân tích traffic và engagement của blog</p>
        </div>
      </div>

      {/* Traffic Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng lượt xem</p>
                <p className="text-3xl font-bold text-gray-900">12,543</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  +15% so với tháng trước
                </p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Khách duy nhất</p>
                <p className="text-3xl font-bold text-gray-900">3,264</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  +8% tuần này
                </p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Thời gian trung bình</p>
                <p className="text-3xl font-bold text-gray-900">2:34</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  +12% hôm nay
                </p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Pages */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
            Trang phổ biến nhất
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{item.name}</span>
                    <span className="text-sm text-gray-500">{item.views} lượt xem</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Traffic Sources */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Nguồn traffic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { source: "Tìm kiếm trực tiếp", percentage: 45, color: "from-blue-500 to-blue-600" },
                { source: "Google", percentage: 30, color: "from-green-500 to-green-600" },
                { source: "Social Media", percentage: 15, color: "from-pink-500 to-pink-600" },
                { source: "Khác", percentage: 10, color: "from-gray-500 to-gray-600" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{item.source}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${item.color} h-2 rounded-full`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 w-8">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Thiết bị truy cập</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { device: "Desktop", percentage: 60, color: "from-blue-500 to-blue-600" },
                { device: "Mobile", percentage: 35, color: "from-green-500 to-green-600" },
                { device: "Tablet", percentage: 5, color: "from-purple-500 to-purple-600" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{item.device}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${item.color} h-2 rounded-full`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 w-8">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard()
      case "posts":
        return renderPosts()
      case "media":
        return (
          <div className="text-center py-20">
            <ImageIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quản lý thư viện</h3>
            <p className="text-gray-600 mb-6">Upload và quản lý ảnh, video của Long</p>
            <Button className="bg-gradient-to-r from-green-500 to-green-600" asChild>
              <Link href="/admin/media">
                <Plus className="mr-2 h-4 w-4" />
                Đi tới thư viện
              </Link>
            </Button>
          </div>
        )
      case "analytics":
        return renderAnalytics()
      case "settings":
        return (
          <div className="text-center py-20">
            <Settings className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Cài đặt website</h3>
            <p className="text-gray-600 mb-6">Cấu hình và tùy chỉnh blog của Long</p>
            <Button className="bg-gradient-to-r from-gray-500 to-gray-600" asChild>
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                Đi tới cài đặt
              </Link>
            </Button>
          </div>
        )
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">🐱</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
                <p className="text-sm text-gray-500">Quản lý Blog của Long</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="hidden sm:flex bg-transparent" asChild>
                <a href="/" target="_blank" rel="noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  Xem trang web
                </a>
              </Button>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Enhanced Sidebar */}
        <aside className="w-64 bg-white/80 backdrop-blur-md shadow-lg min-h-screen border-r">
          <nav className="p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg transform scale-105"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </div>
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          activeTab === item.id ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  )
}
