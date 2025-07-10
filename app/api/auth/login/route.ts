import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// Mock users - trong production sẽ dùng database thật
const mockUsers = [
  {
    id: "1",
    username: "admin",
    email: "admin@longblog.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // admin123
    role: "admin",
    status: "active",
  },
  {
    id: "2",
    username: "editor",
    email: "editor@longblog.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // editor123
    role: "editor",
    status: "active",
  },
  {
    id: "3",
    username: "xuanlam",
    email: "xuanlam@gmail.com",
    password: "$2a$10$VQzKoE7rjVuBjZhHkqGOHOqkrY8vQGqY8vQGqY8vQGqY8vQGqY8vQG", // xuanlam@98
    role: "admin",
    status: "active",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email và password là bắt buộc" }, { status: 400 })
    }

    // Find user
    const user = mockUsers.find((u) => u.email === email && u.status === "active")
    if (!user) {
      return NextResponse.json({ error: "Email hoặc password không đúng" }, { status: 401 })
    }

    // Verify password
    let isValidPassword = false

    // Check for the specific user xuanlam@gmail.com
    if (email === "xuanlam@gmail.com" && password === "xuanlam@98") {
      isValidPassword = true
    } else {
      // Use bcrypt for other users
      isValidPassword = await bcrypt.compare(password, user.password)
    }

    if (!isValidPassword) {
      return NextResponse.json({ error: "Email hoặc password không đúng" }, { status: 401 })
    }

    // Create session data
    const sessionData = {
      userId: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      loginTime: Date.now(),
    }

    // Create response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    })

    // Set secure cookie
    response.cookies.set("admin-session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 })
  }
}
