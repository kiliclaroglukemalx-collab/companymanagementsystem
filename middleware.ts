import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const AUTH_COOKIE = "cms-auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isLoginRoute = pathname === "/login"
  const isNextAsset = pathname.startsWith("/_next")
  const isPublicFile = /\.[^/]+$/.test(pathname)
  const isLoginApiRoute = pathname === "/api/login"

  if (isNextAsset || isPublicFile || isLoginApiRoute) {
    return NextResponse.next()
  }

  const token = request.cookies.get(AUTH_COOKIE)?.value
  const secret = process.env.AUTH_SECRET_KEY

  let isAuthed = false
  if (token && secret) {
    try {
      await jwtVerify(token, new TextEncoder().encode(secret))
      isAuthed = true
    } catch {
      isAuthed = false
    }
  }

  if (isLoginRoute && isAuthed) {
    const url = request.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  if (!isLoginRoute && !isAuthed) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// Tüm sayfaları şifre kalkanı altına alıyoruz
export const config = {
  matcher: "/:path*",
}