import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const AUTH_COOKIE = "cms-auth"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isLoginRoute = pathname === "/login"
  const isNextAsset = pathname.startsWith("/_next")
  const isPublicFile = /\.[^/]+$/.test(pathname)

  if (isNextAsset || isPublicFile) {
    return NextResponse.next()
  }

  const isAuthed = request.cookies.get(AUTH_COOKIE)?.value === "1"

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