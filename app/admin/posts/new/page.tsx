"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Save,
  Eye,
  Upload,
  X,
  Plus,
  ImageIcon,
  FileText,
  Tag,
  Calendar,
  Globe,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { RichTextEditor } from "@/components/rich-text-editor"

export default function NewPostPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [featuredImage, setFeaturedImage] = useState("")
  const [seoTitle, setSeoTitle] = useState("")
  const [seoDescription, setSeoDescription] = useState("")
  const [isPublishing, setIsPublishing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const categories = ["Kỷ niệm", "Hài hước", "Đồ chơi", "Ăn uống", "Huấn luyện", "Đời sống"]

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSave = async (status: "draft" | "published") => {
    if (status === "draft") {
      setIsSaving(true)
    } else {
      setIsPublishing(true)
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Saving post with status:", status)
      setIsSaving(false)
      setIsPublishing(false)
      // Show success message
      alert(`Bài viết đã được ${status === "draft" ? "lưu nháp" : "đăng"} thành công!`)
    }, 2000)
  }

  const handleImageUpload = () => {
    // Simulate image upload
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        // In real app, upload to Vercel Blob
        const fakeUrl = "/placeholder.svg?height=300&width=500"
        setFeaturedImage(fakeUrl)
      }
    }
    input.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Tạo bài viết mới</h1>
                  <p className="text-sm text-gray-500">Viết câu chuyện mới về Long</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="hidden sm:flex bg-transparent">
                <Eye className="mr-2 h-4 w-4" />
                Xem trước
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSave("draft")}
                disabled={isSaving || isPublishing}
                className="bg-white"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Lưu nháp
                  </>
                )}
              </Button>
              <Button
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-lg"
                onClick={() => handleSave("published")}
                disabled={isSaving || isPublishing}
              >
                {isPublishing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Đang đăng...
                  </>
                ) : (
                  <>
                    <Globe className="mr-2 h-4 w-4" />
                    Đăng bài
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-blue-900">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Tiêu đề bài viết
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <Input
                    placeholder="Nhập tiêu đề hấp dẫn cho bài viết..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg font-semibold border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                  />
                  <p className="text-sm text-gray-500 mt-2">Tiêu đề tốt sẽ thu hút độc giả và tối ưu cho SEO</p>
                </CardContent>
              </Card>

              {/* Featured Image */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-green-900">
                    <ImageIcon className="mr-2 h-5 w-5" />
                    Ảnh đại diện
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {featuredImage ? (
                    <div className="relative group">
                      <img
                        src={featuredImage || "/placeholder.svg"}
                        alt="Featured"
                        className="w-full h-64 object-cover rounded-xl shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="secondary" onClick={handleImageUpload}>
                            <Upload className="h-4 w-4 mr-2" />
                            Thay đổi
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setFeaturedImage("")}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Xóa
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 cursor-pointer group"
                      onClick={handleImageUpload}
                    >
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Upload className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Tải lên ảnh đại diện</h3>
                      <p className="text-gray-500 mb-4">Kéo thả ảnh vào đây hoặc click để chọn</p>
                      <Button size="sm" className="bg-gradient-to-r from-orange-500 to-pink-500">
                        Chọn ảnh
                      </Button>
                      <p className="text-xs text-gray-400 mt-3">Hỗ trợ: JPG, PNG, GIF (tối đa 10MB)</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Content Editor */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-purple-900">
                    <FileText className="mr-2 h-5 w-5" />
                    Nội dung bài viết
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <RichTextEditor value={content} onChange={setContent} placeholder="Viết câu chuyện về Long..." />
                  <p className="text-sm text-gray-500 mt-3">
                    Sử dụng toolbar để định dạng văn bản, thêm ảnh và liên kết
                  </p>
                </CardContent>
              </Card>

              {/* Excerpt */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-orange-900">
                    <FileText className="mr-2 h-5 w-5" />
                    Tóm tắt bài viết
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <Textarea
                    placeholder="Viết tóm tắt ngắn gọn về bài viết..."
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="h-24 resize-none border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-500">Tóm tắt sẽ hiển thị trong danh sách bài viết và khi chia sẻ</p>
                    <span className="text-xs text-gray-400">{excerpt.length}/160 ký tự</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish Settings */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-indigo-900">
                    <Calendar className="mr-2 h-5 w-5" />
                    Cài đặt đăng bài
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label htmlFor="publish-date" className="text-sm font-medium text-gray-700">
                      Ngày đăng
                    </Label>
                    <Input
                      id="publish-date"
                      type="datetime-local"
                      className="mt-1 border-gray-200 focus:border-indigo-300 focus:ring-indigo-200"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Trạng thái</Label>
                    <select className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:border-indigo-300 focus:ring-indigo-200">
                      <option value="draft">Nháp</option>
                      <option value="published">Đã đăng</option>
                      <option value="scheduled">Lên lịch</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Category */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-green-900">
                    <Tag className="mr-2 h-5 w-5" />
                    Danh mục
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:border-green-300 focus:ring-green-200 bg-white"
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500 mt-2">Chọn danh mục phù hợp để độc giả dễ tìm kiếm</p>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-pink-900">
                    <Tag className="mr-2 h-5 w-5" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Thêm tag..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addTag()}
                        className="border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                      />
                      <Button
                        size="sm"
                        onClick={addTag}
                        className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="flex items-center space-x-1 bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors"
                          >
                            <span>{tag}</span>
                            <button onClick={() => removeTag(tag)} className="hover:text-pink-900 transition-colors">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    <p className="text-sm text-gray-500">Tags giúp phân loại và tìm kiếm bài viết dễ dàng hơn</p>
                  </div>
                </CardContent>
              </Card>

              {/* SEO Settings */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-purple-900">
                    <Globe className="mr-2 h-5 w-5" />
                    Tối ưu SEO
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label htmlFor="seo-title" className="text-sm font-medium text-gray-700">
                      SEO Title
                    </Label>
                    <Input
                      id="seo-title"
                      placeholder="Tiêu đề SEO..."
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      className="mt-1 border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                    />
                    <p className="text-xs text-gray-500 mt-1">{seoTitle.length}/60 ký tự</p>
                  </div>
                  <div>
                    <Label htmlFor="seo-description" className="text-sm font-medium text-gray-700">
                      Meta Description
                    </Label>
                    <Textarea
                      id="seo-description"
                      placeholder="Mô tả meta..."
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      className="h-20 resize-none mt-1 border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                    />
                    <p className="text-xs text-gray-500 mt-1">{seoDescription.length}/160 ký tự</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Preview Google:</h4>
                    <div className="space-y-1">
                      <div className="text-blue-600 text-sm font-medium truncate">
                        {seoTitle || title || "Tiêu đề bài viết"}
                      </div>
                      <div className="text-green-600 text-xs">longblog.com/blog/new-post</div>
                      <div className="text-gray-600 text-sm line-clamp-2">
                        {seoDescription || excerpt || "Mô tả bài viết sẽ hiển thị ở đây..."}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-orange-900">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Thao tác nhanh
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Thêm ảnh từ thư viện
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="mr-2 h-4 w-4" />
                    Import từ file
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Save className="mr-2 h-4 w-4" />
                    Lưu template
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
