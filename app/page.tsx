import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Camera, BookOpen, Star, ArrowRight, Calendar, Eye, MessageSquare, Sparkles } from "lucide-react"

export default function HomePage() {
  const recentPosts = [
    {
      id: 1,
      title: "Ngày đầu tiên Long về nhà",
      excerpt: "Câu chuyện cảm động về ngày đầu tiên chú mèo nhỏ bé đến với gia đình chúng tôi...",
      image: "/placeholder.svg?height=300&width=400",
      date: "15 Tháng 1, 2024",
      category: "Kỷ niệm",
      views: 234,
      likes: 45,
      readTime: "5 phút",
    },
    {
      id: 2,
      title: "Những trò nghịch ngợm của Long",
      excerpt: "Hôm nay Long lại làm một trò nghịch ngợm khiến cả nhà cười không ngừng...",
      image: "/placeholder.svg?height=300&width=400",
      date: "10 Tháng 1, 2024",
      category: "Hài hước",
      views: 189,
      likes: 67,
      readTime: "3 phút",
    },
    {
      id: 3,
      title: "Long và món đồ chơi yêu thích",
      excerpt: "Khám phá những món đồ chơi mà Long yêu thích nhất và cách chúng tôi chọn...",
      image: "/placeholder.svg?height=300&width=400",
      date: "5 Tháng 1, 2024",
      category: "Đồ chơi",
      views: 156,
      likes: 32,
      readTime: "4 phút",
    },
  ]

  const categories = [
    { name: "Kỷ niệm", count: 12, color: "bg-pink-100 text-pink-700", icon: "💝", href: "/blog?category=ky-niem" },
    { name: "Hài hước", count: 8, color: "bg-yellow-100 text-yellow-700", icon: "😸", href: "/blog?category=hai-huoc" },
    { name: "Đồ chơi", count: 6, color: "bg-blue-100 text-blue-700", icon: "🧸", href: "/blog?category=do-choi" },
    { name: "Ăn uống", count: 10, color: "bg-green-100 text-green-700", icon: "🍽️", href: "/blog?category=an-uong" },
    {
      name: "Huấn luyện",
      count: 4,
      color: "bg-purple-100 text-purple-700",
      icon: "🎯",
      href: "/blog?category=huan-luyen",
    },
    {
      name: "Đời sống",
      count: 15,
      color: "bg-orange-100 text-orange-700",
      icon: "🏠",
      href: "/blog?category=doi-song",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl">🐱</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  Blog của Long
                </h1>
                <p className="text-xs text-gray-500">Cuộc sống của một chú mèo đáng yêu</p>
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              {[
                { href: "/", label: "Trang chủ" },
                { href: "/blog", label: "Blog" },
                { href: "/gallery", label: "Thư viện" },
                { href: "/about", label: "Về Long" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-orange-500 font-medium transition-all duration-200 hover:scale-105 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-pink-100/50"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <Image
                src="/placeholder.svg?height=350&width=350"
                alt="Long - Chú mèo đáng yêu"
                width={350}
                height={350}
                className="rounded-full mx-auto shadow-2xl border-8 border-white relative z-10 hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                Online 🟢
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <h1 className="text-6xl md:text-7xl font-bold text-gray-800 leading-tight">
                Xin chào, tôi là{" "}
                <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
                  Long
                </span>
                !<span className="inline-block animate-bounce">🐾</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                Chào mừng bạn đến với thế giới nhỏ bé của tôi! Đây là nơi tôi chia sẻ những câu chuyện hàng ngày, những
                khoảnh khắc đáng yêu và cuộc sống thú vị của một chú mèo nhà tên Long.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link href="/blog">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Đọc câu chuyện của tôi
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-orange-300 text-orange-600 hover:bg-orange-50 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link href="/gallery">
                  <Camera className="mr-2 h-5 w-5" />
                  Xem ảnh của tôi
                  <Sparkles className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "2", label: "Tuổi", icon: "🎂", color: "from-pink-400 to-rose-500" },
              { value: "50+", label: "Bài viết", icon: "📝", color: "from-blue-400 to-cyan-500" },
              { value: "200+", label: "Ảnh đẹp", icon: "📸", color: "from-green-400 to-emerald-500" },
              { value: "∞", label: "Tình yêu", icon: "💖", color: "from-purple-400 to-pink-500" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110`}
                >
                  <span className="text-3xl">{stat.icon}</span>
                </div>
                <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Khám phá theo chủ đề</h2>
            <p className="text-gray-600 text-lg">Tìm hiểu về Long qua các câu chuyện được phân loại</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href={category.href}>
                <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                    <Badge className={`${category.color} border-0`}>{category.count} bài viết</Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Recent Posts */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Câu chuyện mới nhất</h2>
            <p className="text-gray-600 text-lg">Những khoảnh khắc đáng nhớ được chia sẻ gần đây</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <Card
                key={post.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 bg-white"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={300}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 shadow-lg">
                      {post.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {post.views}
                      </div>
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm flex items-center">
                        <Heart className="h-3 w-3 mr-1 text-red-500" />
                        {post.likes}
                      </div>
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center text-gray-500 text-sm space-x-4 mb-2">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="mr-1 h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-orange-500 transition-colors duration-300 line-clamp-2">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-orange-500 hover:text-orange-600 font-semibold group/link transition-all duration-300"
                  >
                    Đọc tiếp
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-orange-300 text-orange-600 hover:bg-orange-50 bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="/blog">
                Xem tất cả bài viết
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section - Removed problematic buttons */}
      <section className="py-20 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-bounce mb-6">
            <Heart className="mx-auto h-20 w-20" />
          </div>
          <h2 className="text-5xl font-bold mb-6">Yêu thích Long?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Theo dõi những câu chuyện mới nhất và khoảnh khắc đáng yêu của Long! Đừng bỏ lỡ bất kỳ khoảnh khắc nào của
            chú mèo đáng yêu nhất.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-orange-500 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="/blog">
                <Star className="mr-2 h-5 w-5" />
                Đọc thêm câu chuyện
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-500 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-transparent"
              asChild
            >
              <Link href="/about">
                <MessageSquare className="mr-2 h-5 w-5" />
                Tìm hiểu về Long
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">🐱</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                    Blog của Long
                  </h3>
                  <p className="text-gray-400 text-sm">Cuộc sống của một chú mèo đáng yêu</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Chia sẻ cuộc sống hàng ngày của một chú mèo đáng yêu với những câu chuyện thú vị, khoảnh khắc đáng nhớ
                và tình yêu vô bờ bến dành cho những người bạn bốn chân.
              </p>
              <div className="flex space-x-4">
                {["📧", "📱", "🐾", "💌"].map((icon, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 bg-gray-700 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-110"
                  >
                    <span>{icon}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-orange-400">Danh mục</h4>
              <ul className="space-y-3">
                {[
                  { href: "/blog", label: "Tất cả bài viết" },
                  { href: "/gallery", label: "Thư viện ảnh" },
                  { href: "/about", label: "Về Long" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-pink-400">Liên hệ</h4>
              <div className="space-y-3 text-gray-300">
                <p className="flex items-center">
                  <span className="mr-2">📧</span>
                  long@catblog.com
                </p>
                <p className="flex items-center">
                  <span className="mr-2">📍</span>
                  Nhà của Long, Việt Nam
                </p>
                <p className="flex items-center">
                  <span className="mr-2">🕒</span>
                  Online 24/7
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 Blog của Long. Được làm với <span className="text-red-400 animate-pulse">❤️</span> cho những
              người yêu mèo.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
