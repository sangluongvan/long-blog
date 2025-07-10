import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Heart, Share2, MessageSquare, User } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  image: string
  date: string
  category: string
  readTime: string
  author: string
  tags: string[]
  likes: number
  views: number
}

// Mock data - trong thực tế sẽ fetch từ database
const getBlogPost = async (id: string): Promise<BlogPost> => {
  const posts: Record<string, BlogPost> = {
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
        
        <p>Ban đầu, Long không dám ăn gì cả. Chú chỉ uống một chút nước và nằm co ro trong góc. Nhưng sau vài giờ, có lẽ do đói quá, Long đã bắt đầu ăn một chút thức ăn.</p>
        
        <p>Đêm đầu tiên, Long khóc rất nhiều. Chú nhớ mẹ và anh chị em của mình. Chúng tôi đã thức suốt đêm để an ủi và chăm sóc Long. Từ từ, chú bé bắt đầu quen với môi trường mới.</p>
        
        <p>Sáng hôm sau, Long đã tự tin hơn một chút. Chú bắt đầu khám phá ngôi nhà nhỏ của chúng tôi. Đó là khởi đầu cho một tình bạn tuyệt vời!</p>
      `,
      excerpt: "Câu chuyện về ngày đầu tiên chú mèo nhỏ bé đến với gia đình chúng tôi...",
      image: "/placeholder.svg?height=400&width=800",
      date: "15 Tháng 1, 2024",
      category: "Kỷ niệm",
      readTime: "5 phút đọc",
      author: "Chủ nhân của Long",
      tags: ["Long", "Kỷ niệm", "Ngày đầu", "Gia đình"],
      likes: 45,
      views: 234,
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
      image: "/placeholder.svg?height=400&width=800",
      date: "10 Tháng 1, 2024",
      category: "Hài hước",
      readTime: "3 phút đọc",
      author: "Chủ nhân của Long",
      tags: ["Long", "Nghịch ngợm", "Hài hước", "Đời thường"],
      likes: 67,
      views: 189,
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
      image: "/placeholder.svg?height=400&width=800",
      date: "5 Tháng 1, 2024",
      category: "Đồ chơi",
      readTime: "4 phút đọc",
      author: "Chủ nhân của Long",
      tags: ["Long", "Đồ chơi", "Sở thích", "Mua sắm"],
      likes: 32,
      views: 156,
    },
  }

  return posts[id] || posts["1"]
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getBlogPost(id)

  const relatedPosts = [
    {
      id: "2",
      title: "Những trò nghịch ngợm của Long",
      image: "/placeholder.svg?height=150&width=200",
      category: "Hài hước",
    },
    {
      id: "3",
      title: "Long và món đồ chơi yêu thích",
      image: "/placeholder.svg?height=150&width=200",
      category: "Đồ chơi",
    },
  ].filter((p) => p.id !== id)

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/blog" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
              <span>Quay lại blog</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🐱</span>
              </div>
              <span className="font-semibold text-gray-800">Blog của Long</span>
            </div>
          </nav>
        </div>
      </header>

      <article className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Article Header */}
          <header className="mb-8">
            <div className="mb-4">
              <Badge className="bg-orange-500 text-white">{post.category}</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {post.date}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {post.readTime}
              </div>
            </div>

            <div className="flex items-center justify-between py-4 border-y border-gray-200">
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-gray-600">
                  <Heart className="h-5 w-5 mr-2" />
                  {post.likes} lượt thích
                </div>
                <div className="flex items-center text-gray-600">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  12 bình luận
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Chia sẻ
              </Button>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-8">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-orange-200 text-orange-600">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Like & Share Actions */}
          <div className="flex items-center justify-center space-x-4 py-8 border-y border-gray-200 mb-12">
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              <Heart className="h-5 w-5 mr-2" />
              Thích bài viết ({post.likes})
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Chia sẻ
            </Button>
          </div>

          {/* Comments Section */}
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Bình luận (12)</h3>

            {/* Comment Form */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4">Để lại bình luận</h4>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Tên của bạn"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <input
                      type="email"
                      placeholder="Email của bạn"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <textarea
                    placeholder="Viết bình luận của bạn..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  />
                  <Button className="bg-orange-500 hover:bg-orange-600">Gửi bình luận</Button>
                </div>
              </CardContent>
            </Card>

            {/* Comments List */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-medium">A</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h5 className="font-semibold text-gray-900">Nguyễn Văn A</h5>
                      <span className="text-sm text-gray-500">2 giờ trước</span>
                    </div>
                    <p className="text-gray-700">
                      Long thật đáng yêu! Tôi cũng có một chú mèo giống vậy. Cảm ơn bạn đã chia sẻ những câu chuyện thú
                      vị.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-medium">B</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h5 className="font-semibold text-gray-900">Trần Thị B</h5>
                      <span className="text-sm text-gray-500">5 giờ trước</span>
                    </div>
                    <p className="text-gray-700">
                      Mèo cưng của tôi cũng rất nghịch ngợm như Long. Đọc blog này khiến tôi nhớ đến những kỷ niệm đẹp!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Posts */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Bài viết liên quan</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      width={200}
                      height={150}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-orange-500 text-white">{relatedPost.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-gray-900 hover:text-orange-500 transition-colors">
                      <Link href={`/blog/${relatedPost.id}`}>{relatedPost.title}</Link>
                    </h4>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </article>
    </div>
  )
}
