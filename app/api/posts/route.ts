import { type NextRequest, NextResponse } from "next/server"

// Mock data for posts
const mockPosts = [
  {
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
  {
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
  {
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
    status: "published",
    author: "Admin",
    views: 156,
    likes: 32,
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-05T00:00:00Z",
  },
]

export async function GET() {
  try {
    // Return mock data
    return NextResponse.json({ posts: mockPosts })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Create mock post
    const newPost = {
      id: Date.now().toString(),
      ...body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      views: 0,
      likes: 0,
    }

    // In a real app, this would save to database
    mockPosts.push(newPost)

    return NextResponse.json({ post: newPost }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
