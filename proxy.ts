import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const response = NextResponse.next()

  const existingVisitorId = request.cookies.get('vid')?.value

  if (!existingVisitorId) {
    response.cookies.set('vid', crypto.randomUUID(), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 180, // 180 gün
    })
  }

  return response
}

export const config = {
  matcher: [
    /*
      API route'larını, static dosyaları, görselleri ve favicon'u hariç tutuyoruz.
      Ana sayfalar ve landing page'ler izlenecek.
    */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}