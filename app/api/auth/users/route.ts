import { type NextRequest, NextResponse } from "next/server"
import { getAllUsers, createUser, hasPermission } from "@/lib/auth"
import { cookies } from "next/headers"

async function getSessionUser() {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin-session")
  if (!session) return null

  try {
    return JSON.parse(session.value)
  } catch {
    return null
  }
}

export async function GET() {
  try {
    const sessionUser = await getSessionUser()
    if (!sessionUser || !hasPermission(sessionUser.role, "manage_users")) {
      return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 403 })
    }

    const users = await getAllUsers()
    return NextResponse.json({ users })
  } catch (error) {
    console.error("Get users error:", error)
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionUser = await getSessionUser()
    if (!sessionUser || !hasPermission(sessionUser.role, "manage_users")) {
      return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 403 })
    }

    const userData = await request.json()

    // Validate required fields
    if (!userData.username || !userData.email || !userData.password || !userData.role) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 })
    }

    const user = await createUser({
      ...userData,
      status: userData.status || "active",
    })

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    console.error("Create user error:", error)
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 })
  }
}
