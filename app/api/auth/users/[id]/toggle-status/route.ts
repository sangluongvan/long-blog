import { type NextRequest, NextResponse } from "next/server"
import { toggleUserStatus, hasPermission } from "@/lib/auth"
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

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const sessionUser = await getSessionUser()
    if (!sessionUser || !hasPermission(sessionUser.role, "manage_users")) {
      return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 403 })
    }

    const user = await toggleUserStatus(id)
    if (!user) {
      return NextResponse.json({ error: "Không tìm thấy người dùng" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Toggle user status error:", error)
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 })
  }
}
