import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  // Vercel kasasından çektiğimiz şifreyi kullanıyoruz
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

  if (authHeader !== `Basic ${btoa(`admin:${ADMIN_PASSWORD}`)}`) {
    return new NextResponse('Kimlik doğrulaması gerekli.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Giriş Yapın"',
      },
    })
  }

  return NextResponse.next()
}

// Tüm sayfaları şifre kalkanı altına alıyoruz
export const config = {
  matcher: '/:path*',
}