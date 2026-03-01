import { NextResponse } from 'next/server';
import { logEvent, hashIp } from '@/lib/logger';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // 1. IP Adresini Yakala
    let ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    if (ip.includes(',')) ip = ip.split(',')[0]; // Proxy varsa ilk IP'yi al

    // 2. IP Adresinden Konum Bul (GeoIP Servisi)
    let geoData = { city: 'Bilinmiyor', country: 'TR' };
    
    // Localhost değilse sorgula
    if (ip !== '127.0.0.1' && ip !== '::1') {
      try {
        // ip-api.com ücretsiz ve key gerektirmez (Ticari olmayan kullanım için)
        const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=city,countryCode`);
        if (geoRes.ok) {
          const geoJson = await geoRes.json();
          geoData = { 
            city: geoJson.city || 'Bilinmiyor', 
            country: geoJson.countryCode || 'TR' 
          };
        }
      } catch (e) {
        console.error('GeoIP hatası:', e);
      }
    } else {
      geoData = { city: 'Yerel Sunucu', country: 'Local' };
    }
    
    // 3. Veriyi Kaydet
    // IP'yi açıkça görmek istediğin için hem şifreli ID hem gerçek IP'yi yolluyoruz
    const visitorId = hashIp(ip); 

    logEvent({
      ...data,
      ip: ip,                 // <--- ARTIK GERÇEK IP'Yİ GÖNDERİYORUZ
      visitor_id: visitorId,
      geo: geoData,           // <--- ŞEHİR VE ÜLKE BİLGİSİ
      event_type: 'page_view',
      risk_flags: {
        is_suspicious_ua: !data.userAgent || data.userAgent.length < 10
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}