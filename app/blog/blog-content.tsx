"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Tag, ArrowLeft } from "lucide-react"

export default function BlogContent() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    const category = searchParams.get("category")
    if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  const blogPosts = [
    {
      id: 1,
      title: "Ngày đầu tiên Long về nhà",
      excerpt:
        "Câu chuyện về ngày đầu tiên chú mèo nhỏ bé đến với gia đình chúng tôi. Từ sự ngại ngùng ban đầu đến những khoảnh khắc đáng yêu...",
      image: "/placeholder.svg?height=250&width=400",
      date: "15 Tháng 1, 2024",
      category: "ky-niem",
      categoryLabel: "Kỷ niệm",
      readTime: "5 phút đọc",
    },
    {
      id: 2,
      title: "Những trò nghịch ngợm của Long",
      excerpt: "Hôm nay Long lại làm một trò nghịch ngợm khiến cả nhà cười không ngừng. Chú bé đã làm gì thế nhỉ?",
      image: "/placeholder.svg?height=250&width=400",
      date: "10 Tháng 1, 2024",
      category: "hai-huoc",
      categoryLabel: "Hài hước",
      readTime: "3 phút đọc",
    },
    {
      id: 3,
      title: "Long và món đồ chơi yêu thích",
      excerpt: "Khám phá những món đồ chơi mà Long yêu thích nhất và cách chúng tôi chọn đồ chơi phù hợp cho mèo cưng.",
      image: "/placeholder.svg?height=250&width=400",
      date: "5 Tháng 1, 2024",
      category: "do-choi",
      categoryLabel: "Đồ chơi",
      readTime: "4 phút đọc",
    },
    {
      id: 4,
      title: "Bữa ăn ngon của Long",
      excerpt: "Chia sẻ thực đơn hàng ngày của Long và những món ăn mà chú bé yêu thích nhất.",
      image: "/placeholder.svg?height=250&width=400",
      date: "1 Tháng 1, 2024",
      category: "an-uong",
      categoryLabel: "Ăn uống",
      readTime: "6 phút đọc",
    },
    {
      id: 5,
      title: "Long học cách sử dụng cây cào",
      excerpt: "Quá trình huấn luyện Long sử dụng cây cào và những bài học thú vị trong việc chăm sóc mèo.",
      image: "/placeholder.svg?height=250&width=400",
      date: "28 Tháng 12, 2023",
      category: "huan-luyen",
      categoryLabel: "Huấn luyện",
      readTime: "7 phút đọc",
    },
    {
      id: 6,
      title: "Giấc ngủ đáng yêu của Long",
      excerpt: "Những tư thế ngủ siêu đáng yêu của Long và câu chuyện về giấc ngủ của mèo cưng.",
      image: "/placeholder.svg?height=250&width=400",
      date: "25 Tháng 12, 2023",
      category: "doi-song",
      categoryLabel: "Đời sống",
      readTime: "4 phút đọc",
    },
  ]

  const categories = [
    { id: "all", label: "Tất cả", count: blogPosts.length },
    { id: "ky-niem", label: "Kỷ niệm", count: blogPosts.filter((p) => p.category === "ky-niem").length },
    { id: "hai-huoc", label: "Hài hước", count: blogPosts.filter((p) => p.category === "hai-huoc").length },
    { id: "do-choi", label: "Đồ chơi", count: blogPosts.filter((p) => p.category === "do-choi").length },
    { id: "an-uong", label: "Ăn uống", count: blogPosts.filter((p) => p.category === "an-uong").length },
    { id: "huan-luyen", label: "Huấn luyện", count: blogPosts.filter((p) => p.category === "huan-luyen").length },
    { id: "doi-song", label: "Đời sống", count: blogPosts.filter((p) => p.category === "doi-song").length },
  ]

  const filteredPosts =
    selectedCategory === "all" ? blogPosts : blogPosts.filter((post) => post.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🐱</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Blog của Long</h1>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Tất cả câu chuyện của Long</h1>
          <p className="text-xl opacity-90">Khám phá những khoảnh khắc đáng yêu và câu chuyện thú vị</p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={
                  selectedCategory === category.id
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "border-orange-200 text-gray-600 hover:bg-orange-50"
                }
                onClick={() => setSelectedCategory(category.id)}
              >
                <Tag className="mr-2 h-4 w-4" />
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {post.categoryLabel}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl hover:text-orange-500 transition-colors">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </CardTitle>
                    <div className="flex items-center text-gray-500 text-sm space-x-4">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {post.date}
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-orange-500 hover:text-orange-600 font-medium inline-flex items-center group"
                    >
                      Đọc tiếp
                      <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">😿</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Chưa có bài viết nào</h3>
              <p className="text-gray-600">Danh mục này chưa có câu chuyện nào của Long</p>
            </div>
          )}
        </div>
      </section>

      {/* Load More */}
      {filteredPosts.length > 0 && (
        <section className="py-8 px-4 text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
          >
            Tải thêm bài viết
          </Button>
        </section>
      )}
    </div>
  )
}
