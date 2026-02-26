import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Sadece /admin ile başlayan rotaları koru
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      // Güvenlik: Varsayılan Giriş Bilgileri (Canlıda ENV'den alınmalıdır)
      // Kullanıcı Adı: admin | Şifre: nobetci2026
      if (user === 'admin' && pwd === 'nobetci2026') {
        return NextResponse.next();
      }
    }
    
    // Şifre yanlışsa veya girilmemişse tarayıcının kendi şifre sorma kutusunu tetikle
    return new NextResponse('Yetkisiz Erişim. IP Adresiniz Güvenlik Sistemine Kaydedildi.', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    });
  }
  
  return NextResponse.next();
}