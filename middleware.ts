import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Only protect admin routes (except auth page)
  if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.includes("/admin/auth")) {
    // Check for admin session cookie
    const adminSession = request.cookies.get("admin-session")

    if (!adminSession) {
      // Redirect to login page
      const loginUrl = new URL("/admin/auth", request.url)
      return NextResponse.redirect(loginUrl)
    }

    try {
      // Verify session data
      const sessionData = JSON.parse(adminSession.value)
      if (!sessionData.userId || !sessionData.email || !sessionData.role) {
        const loginUrl = new URL("/admin/auth", request.url)
        return NextResponse.redirect(loginUrl)
      }
    } catch (error) {
      // Invalid session data
      const loginUrl = new URL("/admin/auth", request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
