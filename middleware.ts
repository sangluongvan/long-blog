import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Only protect admin routes (except auth page)
  if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.includes("/admin/auth")) {
    // Check for admin session cookie
    const adminLoggedIn = request.cookies.get("admin_logged_in")

    if (!adminLoggedIn || adminLoggedIn.value !== "true") {
      // Redirect to login page
      const loginUrl = new URL("/admin/auth", request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
