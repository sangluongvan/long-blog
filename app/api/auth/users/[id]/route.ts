import { type NextRequest, NextResponse } from "next/server"
import { getUserById, updateUser, deleteUser, hasPermission } from "@/lib/auth"
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

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const sessionUser = await getSessionUser()
    if (!sessionUser || !hasPermission(sessionUser.role, "manage_users")) {
      return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 403 })
    }

    const user = await getUserById(id)
    if (!user) {
      return NextResponse.json({ error: "Không tìm thấy người dùng" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const sessionUser = await getSessionUser()
    if (!sessionUser || !hasPermission(sessionUser.role, "manage_users")) {
      return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 403 })
    }

    const userData = await request.json()
    const user = await updateUser(id, userData)

    if (!user) {
      return NextResponse.json({ error: "Không tìm thấy người dùng" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Update user error:", error)
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const sessionUser = await getSessionUser()
    if (!sessionUser || !hasPermission(sessionUser.role, "manage_users")) {
      return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 403 })
    }

    const success = await deleteUser(id)
    if (!success) {
      return NextResponse.json({ error: "Không thể xóa người dùng" }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete user error:", error)
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 })
  }
}
