import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Star, Calendar, MapPin } from "lucide-react"

export default function AboutPage() {
  const traits = [
    { name: "Tính cách", value: "Hiền lành, thân thiện" },
    { name: "Màu lông", value: "Cam trắng" },
    { name: "Cân nặng", value: "3.5 kg" },
    { name: "Tuổi", value: "2 tuổi" },
    { name: "Giống", value: "Mèo ta" },
    { name: "Sở thích", value: "Ngủ, chơi bóng len" },
  ]

  const favorites = [
    { icon: "🐟", name: "Cá hồi", category: "Đồ ăn" },
    { icon: "🧶", name: "Bóng len", category: "Đồ chơi" },
    { icon: "☀️", name: "Tắm nắng", category: "Hoạt động" },
    { icon: "🛏️", name: "Giường chủ", category: "Nơi ngủ" },
    { icon: "🎵", name: "Nhạc cổ điển", category: "Âm nhạc" },
    { icon: "👥", name: "Chơi với người", category: "Xã hội" },
  ]

  const timeline = [
    {
      date: "Tháng 3, 2022",
      title: "Long được sinh ra",
      description: "Chào đời tại một trang trại nhỏ ở ngoại thành",
    },
    {
      date: "Tháng 5, 2022",
      title: "Về nhà mới",
      description: "Được gia đình chúng tôi nhận nuôi khi 2 tháng tuổi",
    },
    {
      date: "Tháng 7, 2022",
      title: "Lần đầu đi khám bác sĩ",
      description: "Tiêm phòng và kiểm tra sức khỏe định kỳ",
    },
    {
      date: "Tháng 12, 2022",
      title: "Sinh nhật đầu tiên",
      description: "Tổ chức sinh nhật với bánh cá và đồ chơi mới",
    },
    {
      date: "Tháng 6, 2023",
      title: "Học được nhiều kỹ năng",
      description: "Biết sử dụng cây cào và toilet riêng",
    },
    {
      date: "Tháng 1, 2024",
      title: "Ra mắt blog",
      description: "Blog cá nhân của Long chính thức hoạt động",
    },
  ]

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
              <h1 className="text-2xl font-bold text-gray-800">Về Long</h1>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-800 mb-6">
                Xin chào, tôi là <span className="text-orange-500">Long</span>! 🐾
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Tôi là một chú mèo 2 tuổi, sống tại Việt Nam cùng với gia đình yêu thương. Tôi thích ngủ dưới ánh nắng
                mặt trời, chơi với bóng len và ăn cá hồi ngon lành.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Blog này là nơi tôi chia sẻ những câu chuyện hàng ngày, những khoảnh khắc vui vẻ và cuộc sống thú vị của
                một chú mèo nhà. Hy vọng bạn sẽ thích những câu chuyện của tôi!
              </p>
              <div className="flex items-center space-x-4">
                <Badge className="bg-orange-500 text-white px-4 py-2">
                  <MapPin className="mr-2 h-4 w-4" />
                  Việt Nam
                </Badge>
                <Badge variant="outline" className="border-orange-500 text-orange-500 px-4 py-2">
                  <Calendar className="mr-2 h-4 w-4" />2 tuổi
                </Badge>
              </div>
            </div>
            <div className="text-center">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Long - Chú mèo đáng yêu"
                width={400}
                height={400}
                className="rounded-2xl shadow-2xl mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Traits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Thông tin về tôi</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {traits.map((trait, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-orange-500">{trait.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 font-medium">{trait.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Favorites Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Những thứ tôi yêu thích</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
                  <Badge variant="outline" className="border-orange-200 text-orange-600">
                    {item.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Hành trình của tôi</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-orange-200"></div>

              {timeline.map((event, index) => (
                <div key={index} className="relative flex items-start mb-8">
                  {/* Timeline Dot */}
                  <div className="flex-shrink-0 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                    <Star className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <div className="ml-6 flex-grow">
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl text-gray-800">{event.title}</CardTitle>
                          <Badge variant="outline" className="border-orange-200 text-orange-600">
                            {event.date}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{event.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <Heart className="mx-auto mb-6 h-16 w-16" />
          <h2 className="text-4xl font-bold mb-4">Cảm ơn bạn đã đọc về tôi!</h2>
          <p className="text-xl mb-8 opacity-90">
            Hãy theo dõi blog để cập nhật những câu chuyện mới nhất của Long nhé!
          </p>
          <Link href="/blog">
            <button className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Đọc câu chuyện của tôi
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
