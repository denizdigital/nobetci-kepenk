"use client";
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function ClientTracker() {
  const pathname = usePathname();
  const maxScrollRef = useRef(0);

  useEffect(() => {
    // API'ye veri gönderme fonksiyonu (Sayfa kapanırken bile çalışması için keepalive kullanıyoruz)
    const sendEvent = (type: string, data: any = {}) => {
      try {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          keepalive: true, // Kullanıcı sayfayı kapatsa bile istek gider
          body: JSON.stringify({
            type,
            url: window.location.pathname,
            data,
            timestamp: new Date().toISOString(),
            // Temel bot kontrolü (Selenium/Puppeteer tespiti)
            webdriver: navigator.webdriver || false,
          }),
        }).catch(() => {}); // Hataları yut, kullanıcı deneyimini bozma
      } catch (e) {}
    };

    // 1. PAGE VIEW (Sayfa Görüntüleme)
    sendEvent('page_view', { referrer: document.referrer });

    // 2. HEARTBEAT (Sitede kalma süresini ölçmek için her 15 saniyede bir sinyal)
    const heartbeatInterval = setInterval(() => {
      sendEvent('heartbeat');
    }, 15000);

    // 3. SCROLL (Sayfanın yüzde kaçını okuduğunu ölçer - Debounce ile)
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        if (scrollPercent > maxScrollRef.current) {
          maxScrollRef.current = scrollPercent;
          // Sadece %25, %50, %75 ve %100 dönüm noktalarında gönder (API'yi yormamak için)
          if ([25, 50, 75, 100].includes(Math.floor(scrollPercent / 25) * 25)) {
            sendEvent('scroll', { depth: scrollPercent });
          }
        }
      }, 500); // Kullanıcı kaydırmayı bıraktıktan yarım saniye sonra tetikle
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 4. CLICK (Özellikle WhatsApp ve Telefon tıklamalarını yakala)
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      const button = target.closest('button');

      if (link) {
        const href = link.getAttribute('href') || '';
        if (href.startsWith('tel:') || href.startsWith('https://wa.me')) {
          sendEvent('click', { type: 'conversion', target: href });
        } else {
          sendEvent('click', { type: 'nav', target: href });
        }
      } else if (button) {
        sendEvent('click', { type: 'button', text: button.innerText });
      }
    };
    document.addEventListener('click', handleClick);

    // Temizlik (Cleanup)
    return () => {
      clearInterval(heartbeatInterval);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
    };
  }, [pathname]); // Pathname değiştiğinde (sayfa geçişlerinde) yeniden çalıştır

  return null; // Arayüzde hiçbir şey render etmez, arka planda çalışır
}