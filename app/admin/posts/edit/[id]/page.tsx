"use client"

import { useState, useEffect } from "react"
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
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { RichTextEditor } from "@/components/rich-text-editor"

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  featured_image: string
  category: string
  tags: string[]
  status: string
  author: string
  views: number
  likes: number
  created_at: string
  updated_at: string
}

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [postId, setPostId] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [featuredImage, setFeaturedImage] = useState("")
  const [status, setStatus] = useState("draft")
  const [seoTitle, setSeoTitle] = useState("")
  const [seoDescription, setSeoDescription] = useState("")

  const categories = ["Kỷ niệm", "Hài hước", "Đồ chơi", "Ăn uống", "Huấn luyện", "Đời sống"]

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setPostId(resolvedParams.id)
      fetchPost(resolvedParams.id)
    }
    getParams()
  }, [params])

  const fetchPost = async (id: string) => {
    try {
      // Mock data - trong thực tế sẽ fetch từ API
      const mockPosts: Record<string, BlogPost> = {
        "1": {
          id: "1",
          title: "Ngày đầu tiên Long về nhà",
          content: `
            <p>Hôm nay là một ngày đặc biệt - ngày đầu tiên Long về với gia đình chúng tôi. Chú bé chỉ mới 2 tháng tuổi, nhỏ xíu như một quả bóng lông.</p>
            
            <p>Khi vừa bước vào nhà, Long tỏ ra rất ngại ngùng. Chú bé chạy ngay vào góc tường và quan sát xung quanh một cách cẩn thận. Đôi mắt to tròn của Long nhìn chúng tôi với vẻ tò mò lẫn e dè.</p>
            
            <p>Chúng tôi đã chuẩn bị sẵn một góc nhỏ ấm cúng cho Long với:</p>
            <ul>
              <li>Một chiếc giường mềm mại</li>
              <li>Bát ăn và bát nước</li>
              <li>Một vài món đồ chơi nhỏ</li>
              <li>Cây cào cho mèo</li>
            </ul>
            
            <p>Ban đầu, Long không dám ăn gì cả. Chú chỉ uống một chút nước và nằm co ro trong góc. Nhưng sau vài giờ, có lẽ do đói quá, Long đã bắt đầu ăn một chút thức ăn.
            
            <p>Đêm đầu tiên, Long khóc rất nhiều. Chú nhớ mẹ và anh chị em của mình. Chúng tôi đã thức suốt đêm để an ủi và chăm sóc Long. Từ từ, chú bé bắt đầu quen với môi trường mới.</p>
            
            <p>Sáng hôm sau, Long đã tự tin hơn một chút. Chú bắt đầu khám phá ngôi nhà nhỏ của chúng tôi. Đó là khởi đầu cho một tình bạn tuyệt vời!</p>
          `,
          excerpt: "Câu chuyện về ngày đầu tiên chú mèo nhỏ bé đến với gia đình chúng tôi...",
          featured_image: "/placeholder.svg?height=400&width=800",
          category: "Kỷ niệm",
          tags: ["Long", "Kỷ niệm", "Ngày đầu", "Gia đình"],
          status: "published",
          author: "Admin",
          views: 234,
          likes: 45,
          created_at: "2024-01-15T00:00:00Z",
          updated_at: "2024-01-15T00:00:00Z",
        },
        "2": {
          id: "2",
          title: "Những trò nghịch ngợm của Long",
          content: `
            <p>Long là một chú mèo rất nghịch ngợm! Mỗi ngày, chú đều có những trò tinh nghịch khiến cả nhà vừa cười vừa khóc.</p>
            
            <p>Sáng nay, tôi thức dậy và thấy toàn bộ giày dép trong nhà đều bị Long kéo ra khỏi tủ. Chú bé đã tạo ra một "bảo tàng giày dép" ngay giữa phòng khách!</p>
            
            <p>Không chỉ vậy, Long còn có thói quen:</p>
            <ul>
              <li>Chạy quanh nhà lúc 3 giờ sáng</li>
              <li>Trốn trong tủ quần áo</li>
              <li>Chơi với cuộn giấy vệ sinh</li>
              <li>Leo lên rèm cửa</li>
            </ul>
            
            <p>Dù nghịch ngợm nhưng Long rất đáng yêu. Mỗi khi làm hỏng gì đó, chú lại nhìn chúng tôi với đôi mắt to tròn như xin lỗi.</p>
          `,
          excerpt: "Hôm nay Long lại làm một trò nghịch ngợm khiến cả nhà cười không ngừng...",
          featured_image: "/placeholder.svg?height=400&width=800",
          category: "Hài hước",
          tags: ["Long", "Nghịch ngợm", "Hài hước", "Đời thường"],
          status: "published",
          author: "Admin",
          views: 189,
          likes: 67,
          created_at: "2024-01-10T00:00:00Z",
          updated_at: "2024-01-10T00:00:00Z",
        },
        "3": {
          id: "3",
          title: "Long và món đồ chơi yêu thích",
          content: `
            <p>Sau nhiều lần thử nghiệm, chúng tôi đã tìm ra những món đồ chơi mà Long yêu thích nhất!</p>
            
            <p>Món đồ chơi số 1 của Long chính là... một cuộn giấy vệ sinh cũ! Chú có thể chơi với nó hàng giờ liền mà không chán.</p>
            
            <p>Ngoài ra, Long còn thích:</p>
            <ul>
              <li>Bóng len đỏ</li>
              <li>Chuột nhồi bông</li>
              <li>Hộp giấy carton</li>
              <li>Dây thừng</li>
            </ul>
            
            <p>Điều thú vị là Long thường bỏ qua những đồ chơi đắt tiền mà chúng tôi mua, thay vào đó lại thích những thứ đơn giản nhất!</p>
          `,
          excerpt: "Khám phá những món đồ chơi mà Long yêu thích nhất và cách chúng tôi chọn...",
          featured_image: "/placeholder.svg?height=400&width=800",
          category: "Đồ chơi",
          tags: ["Long", "Đồ chơi", "Sở thích", "Mua sắm"],
          status: "draft",
          author: "Admin",
          views: 156,
          likes: 32,
          created_at: "2024-01-05T00:00:00Z",
          updated_at: "2024-01-05T00:00:00Z",
        },
      }

      const post = mockPosts[id]
      if (post) {
        setTitle(post.title)
        setContent(post.content)
        setExcerpt(post.excerpt)
        setCategory(post.category)
        setTags(post.tags)
        setFeaturedImage(post.featured_image)
        setStatus(post.status)
        setSeoTitle(post.title)
        setSeoDescription(post.excerpt)
      }
    } catch (error) {
      console.error("Error fetching post:", error)
    } finally {
      setLoading(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSave = async (newStatus: "draft" | "published") => {
    setSaving(true)

    try {
      // Simulate API call
      const postData = {
        title,
        content,
        excerpt,
        category,
        tags,
        featured_image: featuredImage,
        status: newStatus,
        seo_title: seoTitle,
        seo_description: seoDescription,
      }

      console.log("Updating post:", postId, postData)

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      alert(`Bài viết đã được ${newStatus === "draft" ? "lưu nháp" : "cập nhật"} thành công!`)

      if (newStatus === "published") {
        router.push("/admin")
      }
    } catch (error) {
      console.error("Error saving post:", error)
      alert("Có lỗi xảy ra khi lưu bài viết")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Bạn có chắc chắn muốn xóa bài viết này? Hành động này không thể hoàn tác.")) {
      return
    }

    setDeleting(true)

    try {
      // Simulate API call
      console.log("Deleting post:", postId)

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      alert("Bài viết đã được xóa thành công!")
      router.push("/admin")
    } catch (error) {
      console.error("Error deleting post:", error)
      alert("Có lỗi xảy ra khi xóa bài viết")
    } finally {
      setDeleting(false)
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    )
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
                  <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa bài viết</h1>
                  <p className="text-sm text-gray-500">Cập nhật nội dung bài viết</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleDelete}
                disabled={saving || deleting}
                className="bg-white text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              >
                {deleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
                    Đang xóa...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Xóa bài viết
                  </>
                )}
              </Button>
              <Button variant="outline" className="hidden sm:flex bg-transparent">
                <Eye className="mr-2 h-4 w-4" />
                Xem trước
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSave("draft")}
                disabled={saving || deleting}
                className="bg-white"
              >
                {saving ? (
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
                disabled={saving || deleting}
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Đang cập nhật...
                  </>
                ) : (
                  <>
                    <Globe className="mr-2 h-4 w-4" />
                    Cập nhật bài viết
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
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-200 rounded-lg focus:border-indigo-300 focus:ring-indigo-200"
                    >
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
                      <div className="text-green-600 text-xs">longblog.com/blog/{postId}</div>
                      <div className="text-gray-600 text-sm line-clamp-2">
                        {seoDescription || excerpt || "Mô tả bài viết sẽ hiển thị ở đây..."}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
