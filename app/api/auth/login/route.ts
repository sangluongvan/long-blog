import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email và mật khẩu là bắt buộc" }, { status: 400 })
    }

    const user = await AuthService.authenticate(email, password)

    if (!user) {
      return NextResponse.json({ error: "Email hoặc mật khẩu không đúng" }, { status: 401 })
    }

    // Create session
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
    })

    // Set secure cookie
    response.cookies.set(
      "admin_session",
      JSON.stringify({
        userId: user.id,
        email: user.email,
        role: user.role,
        loginTime: Date.now(),
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    )

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Đăng nhập thất bại" }, { status: 500 })
  }
}
