import { NextResponse } from 'next/server';
import { hashIp, logEvent } from '@/lib/logger';

export async function POST(req: Request) {
  try {
    // 1. IP Adresini Al ve Maskele (KVKK)
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
    const visitorId = hashIp(realIp);

    // 2. User-Agent ve Bot Kontrolü
    const userAgent = req.headers.get('user-agent') || '';
    const isSuspicious = userAgent.toLowerCase().includes('bot') || userAgent.toLowerCase().includes('headless');

    // 3. İstemci Verisini Al
    const body = await req.json();

    // 4. Veriyi Zenginleştir ve Kaydet
    const eventPayload = {
      visitor_id: visitorId,
      event_type: body.type, // page_view, click, scroll, heartbeat
      url: body.url,
      data: body.data || {},
      timestamp: body.timestamp,
      risk_flags: {
        is_suspicious_ua: isSuspicious,
        webdriver: body.webdriver || false,
      }
    };

    logEvent(eventPayload);

    return NextResponse.json({ success: true, message: 'Tracked' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}