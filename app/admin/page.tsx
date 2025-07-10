import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Users, MessageSquare, Eye, TrendingUp, Calendar, Clock, Plus, MoreHorizontal } from "lucide-react"
import Link from "next/link"

// Mock data - trong production sẽ lấy từ database
const stats = [
  {
    title: "Tổng bài viết",
    value: "24",
    change: "+12%",
    changeType: "increase" as const,
    icon: FileText,
  },
  {
    title: "Người dùng",
    value: "1,234",
    change: "+5%",
    changeType: "increase" as const,
    icon: Users,
  },
  {
    title: "Bình luận",
    value: "89",
    change: "-2%",
    changeType: "decrease" as const,
    icon: MessageSquare,
  },
  {
    title: "Lượt xem",
    value: "12,345",
    change: "+18%",
    changeType: "increase" as const,
    icon: Eye,
  },
]

const recentPosts = [
  {
    id: 1,
    title: "Hướng dẫn nuôi mèo cho người mới bắt đầu",
    status: "published",
    author: "Admin",
    date: "2024-01-15",
    views: 1234,
  },
  {
    id: 2,
    title: "Top 10 giống mèo đáng yêu nhất",
    status: "draft",
    author: "Editor",
    date: "2024-01-14",
    views: 856,
  },
  {
    id: 3,
    title: "Cách chăm sóc mèo con sơ sinh",
    status: "published",
    author: "Admin",
    date: "2024-01-13",
    views: 2341,
  },
  {
    id: 4,
    title: "Thức ăn tốt nhất cho mèo",
    status: "published",
    author: "Editor",
    date: "2024-01-12",
    views: 1876,
  },
]

const recentComments = [
  {
    id: 1,
    author: "Nguyễn Văn A",
    content: "Bài viết rất hữu ích, cảm ơn admin!",
    post: "Hướng dẫn nuôi mèo cho người mới bắt đầu",
    date: "2024-01-15",
    status: "approved",
  },
  {
    id: 2,
    author: "Trần Thị B",
    content: "Mình có thể hỏi thêm về việc tắm cho mèo không?",
    post: "Cách chăm sóc mèo con sơ sinh",
    date: "2024-01-14",
    status: "pending",
  },
  {
    id: 3,
    author: "Lê Văn C",
    content: "Thông tin rất chi tiết và dễ hiểu.",
    post: "Top 10 giống mèo đáng yêu nhất",
    date: "2024-01-13",
    status: "approved",
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Chào mừng trở lại! Đây là tổng quan về blog của bạn.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button asChild>
            <Link href="/admin/posts/new">
              <Plus className="mr-2 h-4 w-4" />
              Tạo bài viết mới
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-pink-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp
                  className={`h-4 w-4 mr-1 ${stat.changeType === "increase" ? "text-green-500" : "text-red-500"}`}
                />
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === "increase" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">so với tháng trước</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Bài viết gần đây</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/posts">Xem tất cả</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{post.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.date}
                      </span>
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {post.views.toLocaleString()}
                      </span>
                      <span>bởi {post.author}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={post.status === "published" ? "default" : "secondary"}>
                      {post.status === "published" ? "Đã xuất bản" : "Nháp"}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Comments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Bình luận gần đây</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/comments">Xem tất cả</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentComments.map((comment) => (
                <div key={comment.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-medium">{comment.author.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{comment.author}</p>
                        <p className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {comment.date}
                        </p>
                      </div>
                    </div>
                    <Badge variant={comment.status === "approved" ? "default" : "secondary"}>
                      {comment.status === "approved" ? "Đã duyệt" : "Chờ duyệt"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                  <p className="text-xs text-gray-500">Trên bài: {comment.post}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
