'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function ClientTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Ziyaretçinin girdiği sayfa ve tarih
    const logData = {
      path: pathname,
      search: searchParams.toString(),
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };

    // Veriyi API'ye (Merkeze) gönder
    // navigator.sendBeacon sayfa kapanırken bile veri göndermeyi garantiler
    const blob = new Blob([JSON.stringify(logData)], { type: 'application/json' });
    navigator.sendBeacon('/api/track', blob);

    // Yedek olarak fetch kullanımı (Daha güvenilir loglama için)
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logData),
    }).catch(err => console.error('Takip hatası:', err));

  }, [pathname, searchParams]);

  return null; // Bu bileşen ekranda görünmez, arka planda çalışır.
}