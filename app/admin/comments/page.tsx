"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Search,
  Filter,
  MessageSquare,
  Check,
  X,
  Eye,
  Reply,
  Trash2,
  Calendar,
  Mail,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"
import Link from "next/link"

export default function CommentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedComments, setSelectedComments] = useState<number[]>([])
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")

  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      content: "Long thật đáng yêu! Tôi cũng có một chú mèo giống vậy. Cảm ơn bạn đã chia sẻ những câu chuyện thú vị.",
      post: "Ngày đầu tiên Long về nhà",
      postId: 1,
      status: "approved",
      date: "2024-01-15 14:30",
      ip: "192.168.1.1",
      userAgent: "Chrome 120.0.0.0",
      replies: [
        {
          id: 11,
          author: "Admin",
          content: "Cảm ơn bạn đã theo dõi blog! Rất vui khi biết bạn cũng yêu mèo.",
          date: "2024-01-15 15:00",
          isAdmin: true,
        },
      ],
    },
    {
      id: 2,
      author: "Trần Thị B",
      email: "tranthib@email.com",
      content: "Mèo cưng của tôi cũng rất nghịch ngợm như Long. Đọc blog này khiến tôi nhớ đến những kỷ niệm đẹp!",
      post: "Những trò nghịch ngợm của Long",
      postId: 2,
      status: "pending",
      date: "2024-01-14 09:15",
      ip: "192.168.1.2",
      userAgent: "Safari 17.0",
      replies: [],
    },
    {
      id: 3,
      author: "Lê Minh C",
      email: "leminhc@email.com",
      content: "Bài viết rất hay! Tôi muốn hỏi Long thích loại đồ chơi nào nhất?",
      post: "Long và món đồ chơi yêu thích",
      postId: 3,
      status: "approved",
      date: "2024-01-13 16:45",
      ip: "192.168.1.3",
      userAgent: "Firefox 121.0",
      replies: [],
    },
    {
      id: 4,
      author: "Phạm Thị D",
      email: "phamthid@email.com",
      content: "Spam content here...",
      post: "Ngày đầu tiên Long về nhà",
      postId: 1,
      status: "spam",
      date: "2024-01-12 08:20",
      ip: "192.168.1.4",
      userAgent: "Chrome 119.0.0.0",
      replies: [],
    },
  ])

  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.post.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = selectedFilter === "all" || comment.status === selectedFilter

    return matchesSearch && matchesFilter
  })

  const updateCommentStatus = (id: number, status: string) => {
    setComments((prev) => prev.map((comment) => (comment.id === id ? { ...comment, status } : comment)))
  }

  const deleteComment = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa bình luận này?")) {
      setComments((prev) => prev.filter((comment) => comment.id !== id))
    }
  }

  const bulkUpdateStatus = (status: string) => {
    setComments((prev) =>
      prev.map((comment) => (selectedComments.includes(comment.id) ? { ...comment, status } : comment)),
    )
    setSelectedComments([])
  }

  const bulkDelete = () => {
    if (confirm(`Bạn có chắc muốn xóa ${selectedComments.length} bình luận đã chọn?`)) {
      setComments((prev) => prev.filter((comment) => !selectedComments.includes(comment.id)))
      setSelectedComments([])
    }
  }

  const submitReply = (commentId: number) => {
    if (!replyText.trim()) return

    const newReply = {
      id: Date.now(),
      author: "Admin",
      content: replyText,
      date: new Date().toISOString().slice(0, 16).replace("T", " "),
      isAdmin: true,
    }

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId ? { ...comment, replies: [...comment.replies, newReply] } : comment,
      ),
    )

    setReplyText("")
    setReplyingTo(null)
  }

  const toggleCommentSelection = (id: number) => {
    setSelectedComments((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "spam":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      approved: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      spam: "bg-red-100 text-red-700",
    }

    const labels = {
      approved: "Đã duyệt",
      pending: "Chờ duyệt",
      spam: "Spam",
    }

    return (
      <Badge className={`${variants[status as keyof typeof variants]} border-0`}>
        {labels[status as keyof typeof labels]}
      </Badge>
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
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Quản lý bình luận</h1>
                  <p className="text-sm text-gray-500">Duyệt và quản lý bình luận từ độc giả</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {selectedComments.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => bulkUpdateStatus("approved")}
                  >
                    <Check className="mr-1 h-4 w-4" />
                    Duyệt ({selectedComments.length})
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => bulkUpdateStatus("spam")}
                    className="text-red-600 hover:text-red-700 bg-transparent"
                  >
                    <X className="mr-1 h-4 w-4" />
                    Spam
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={bulkDelete}
                    className="text-red-600 hover:text-red-700 bg-transparent"
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Xóa
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                label: "Tổng bình luận",
                value: comments.length,
                color: "from-blue-500 to-blue-600",
                icon: MessageSquare,
              },
              {
                label: "Chờ duyệt",
                value: comments.filter((c) => c.status === "pending").length,
                color: "from-yellow-500 to-yellow-600",
                icon: Clock,
              },
              {
                label: "Đã duyệt",
                value: comments.filter((c) => c.status === "approved").length,
                color: "from-green-500 to-green-600",
                icon: CheckCircle,
              },
              {
                label: "Spam",
                value: comments.filter((c) => c.status === "spam").length,
                color: "from-red-500 to-red-600",
                icon: AlertCircle,
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
                      placeholder="Tìm kiếm bình luận..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-200 rounded-lg focus:border-purple-300 focus:ring-purple-200 focus:ring-2 focus:ring-opacity-20"
                    >
                      <option value="all">Tất cả ({comments.length})</option>
                      <option value="pending">
                        Chờ duyệt ({comments.filter((c) => c.status === "pending").length})
                      </option>
                      <option value="approved">
                        Đã duyệt ({comments.filter((c) => c.status === "approved").length})
                      </option>
                      <option value="spam">Spam ({comments.filter((c) => c.status === "spam").length})</option>
                    </select>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Lọc
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments List */}
          <div className="space-y-4">
            {filteredComments.length > 0 ? (
              filteredComments.map((comment) => (
                <Card
                  key={comment.id}
                  className={`border-0 shadow-lg transition-all ${
                    selectedComments.includes(comment.id) ? "ring-2 ring-purple-500 bg-purple-50" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Selection Checkbox */}
                      <input
                        type="checkbox"
                        checked={selectedComments.includes(comment.id)}
                        onChange={() => toggleCommentSelection(comment.id)}
                        className="mt-1 rounded border-gray-300"
                      />

                      {/* Avatar */}
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                        {comment.author.charAt(0).toUpperCase()}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                            {getStatusBadge(comment.status)}
                            <div className="flex items-center text-sm text-gray-500">
                              {getStatusIcon(comment.status)}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateCommentStatus(comment.id, "approved")}
                              disabled={comment.status === "approved"}
                              className="bg-transparent"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateCommentStatus(comment.id, "spam")}
                              className="text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                              className="bg-transparent"
                            >
                              <Reply className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteComment(comment.id)}
                              className="text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Comment Content */}
                        <div className="mb-3">
                          <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                        </div>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {comment.date}
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            {comment.email}
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            Bài viết: {comment.post}
                          </div>
                        </div>

                        {/* Technical Info */}
                        <details className="text-xs text-gray-400">
                          <summary className="cursor-pointer hover:text-gray-600">Thông tin kỹ thuật</summary>
                          <div className="mt-2 space-y-1">
                            <p>IP: {comment.ip}</p>
                            <p>User Agent: {comment.userAgent}</p>
                          </div>
                        </details>

                        {/* Replies */}
                        {comment.replies.length > 0 && (
                          <div className="mt-4 pl-4 border-l-2 border-gray-200 space-y-3">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center space-x-2 mb-2">
                                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                                    A
                                  </div>
                                  <span className="font-medium text-sm text-gray-900">{reply.author}</span>
                                  {reply.isAdmin && (
                                    <Badge className="bg-orange-100 text-orange-700 text-xs border-0">Admin</Badge>
                                  )}
                                  <span className="text-xs text-gray-500">{reply.date}</span>
                                </div>
                                <p className="text-sm text-gray-700">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reply Form */}
                        {replyingTo === comment.id && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <h5 className="font-medium text-gray-900 mb-3">Trả lời bình luận</h5>
                            <Textarea
                              placeholder="Viết phản hồi..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              className="mb-3 border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                              rows={3}
                            />
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                onClick={() => submitReply(comment.id)}
                                disabled={!replyText.trim()}
                                className="bg-gradient-to-r from-purple-500 to-pink-500"
                              >
                                Gửi phản hồi
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setReplyingTo(null)
                                  setReplyText("")
                                }}
                                className="bg-transparent"
                              >
                                Hủy
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-20">
                <MessageSquare className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchTerm ? "Không tìm thấy bình luận nào" : "Chưa có bình luận nào"}
                </h3>
                <p className="text-gray-600">
                  {searchTerm ? "Thử thay đổi từ khóa tìm kiếm" : "Bình luận từ độc giả sẽ hiển thị ở đây"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
