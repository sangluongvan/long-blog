import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const adminSession = request.cookies.get("admin-session")

    if (!adminSession) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const sessionData = JSON.parse(adminSession.value)

    if (!sessionData.userId || !sessionData.email || !sessionData.role) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: sessionData.userId,
        email: sessionData.email,
        username: sessionData.username,
        role: sessionData.role,
      },
    })
  } catch (error) {
    console.error("Session check error:", error)
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
