import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const AUTH_COOKIE = "cms-auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isLoginRoute = pathname === "/login"
  const isNextAsset = pathname.startsWith("/_next")
  const isPublicFile = /\.[^/]+$/.test(pathname)
  const isLoginApiRoute = pathname === "/api/auth/login"
  const isLegacyLoginRoute = pathname === "/api/login"
  const isFirstPasswordRoute = pathname === "/api/auth/first-password"
  const isApiRoute = pathname.startsWith("/api")

  if (
    isNextAsset ||
    isPublicFile ||
    isLoginApiRoute ||
    isLegacyLoginRoute ||
    isFirstPasswordRoute
  ) {
    return NextResponse.next()
  }

  const token = request.cookies.get(AUTH_COOKIE)?.value
  const secret = process.env.AUTH_SECRET_KEY
  let authPayload: { siteId: string; role: string; userId?: string; sessionId?: string } | null = null

  if (token && secret) {
    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(secret))
      const siteId = payload.siteId
      const role = payload.role
      const userId = payload.sub
      const sessionId = payload.sid
      if (typeof siteId === "string" && typeof role === "string") {
        authPayload = {
          siteId,
          role,
          userId: typeof userId === "string" ? userId : undefined,
          sessionId: typeof sessionId === "string" ? sessionId : undefined,
        }
      }
    } catch {
      authPayload = null
    }
  }

  const isAuthed = Boolean(authPayload)

  // Login olan kullanıcı /login'e giderse anasayfaya yönlendir
  if (isLoginRoute && isAuthed) {
    const url = request.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  // Login olmayan kullanıcı /login dışında bir yere giderse /login'e yönlendir
  if (!isLoginRoute && !isAuthed) {
    if (isApiRoute) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  if (authPayload) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-site-id", authPayload.siteId)
    requestHeaders.set("x-user-role", authPayload.role)
    if (authPayload.userId) {
      requestHeaders.set("x-user-id", authPayload.userId)
    }
    if (authPayload.sessionId) {
      requestHeaders.set("x-session-id", authPayload.sessionId)
    }
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  return NextResponse.next()
}

// Tüm sayfaları şifre kalkanı altına alıyoruz
export const config = {
  matcher: "/:path*",
}