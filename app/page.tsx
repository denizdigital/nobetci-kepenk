'use client'; 

import { useEffect } from 'react'; 
import Link from 'next/link';
// DİKKAT: FingerprintJS importunu tamamen sildik, artık bizim HOX mühür sistemimiz devrede!
import { Phone, MessageCircle, ShieldCheck, Clock, Wrench, Zap, Settings, ArrowRight, MapPin, Truck, Navigation } from 'lucide-react';

const districts = [
  { name: 'Kadıköy', slug: 'kadikoy' }, { name: 'Beşiktaş', slug: 'besiktas' },
  { name: 'Ümraniye', slug: 'umraniye' }, { name: 'Şişli', slug: 'sisli' },
  { name: 'Ataşehir', slug: 'atasehir' }, { name: 'Bakırköy', slug: 'bakirkoy' },
  { name: 'Üsküdar', slug: 'uskudar' }, { name: 'Fatih', slug: 'fatih' },
  { name: 'Maltepe', slug: 'maltepe' }, { name: 'Beylikdüzü', slug: 'beylikduzu' },
  { name: 'Pendik', slug: 'pendik' }, { name: 'Bahçelievler', slug: 'bahcelievler' },
  { name: 'Çekmeköy', slug: 'cekmekoy' }, { name: 'Sarıyer', slug: 'sariyer' },
  { name: 'Kartal', slug: 'kartal' }
];

export default function Home() {
  
  // --- CLICKGUARD İNFAZ TİMİ 3.0 (HOX_ MÜHÜR + ZOMBİ RADARI) ---
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. İNSANLIK TESTİ (Fare/Dokunmatik Takibi)
    let isHuman = false;
    const setHuman = () => {
      isHuman = true;
      window.removeEventListener('mousemove', setHuman);
      window.removeEventListener('touchstart', setHuman);
      window.removeEventListener('scroll', setHuman);
      console.log("ClickGuard: İnsan belirtisi doğrulandı.");
    };
    window.addEventListener('mousemove', setHuman);
    window.addEventListener('touchstart', setHuman);
    window.addEventListener('scroll', setHuman);

    // 2. KUSURSUZ KİMLİK MÜHRÜ (LocalStorage)
    const getFingerprint = () => {
      let fp = localStorage.getItem('hox_cihaz_kimligi');
      if (!fp) {
        const screenData = window.screen.width + "x" + window.screen.height;
        const coreData = navigator.hardwareConcurrency || '0';
        const randomSalt = Math.random().toString(36).substring(2, 10);
        const timeStamp = Date.now().toString(36);
        fp = 'HOX_' + timeStamp + '_' + screenData + '_' + coreData + '_' + randomSalt;
        localStorage.setItem('hox_cihaz_kimligi', fp);
      }
      return fp;
    };

    const startTracking = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        
        const gclid = urlParams.get('gclid');
        const gbraid = urlParams.get('gbraid');
        const wbraid = urlParams.get('wbraid');
        const gad_source = urlParams.get('gad_source');

        // SADECE ADS TRAFİĞİNİ RADARA AL
        if (gclid || gbraid || wbraid || gad_source) {
          
          // Site açıldıktan sonra botların donup kalmasını avlamak için 5 saniye bekle
          setTimeout(async () => {
            const BACKEND_URL = 'https://clickguard-backend-m8dg.onrender.com/api/track';
            const visitorId = getFingerprint();
            let statusOverride = undefined;

            if (!isHuman) {
              console.log("ClickGuard: 5 saniyedir hareket yok, Zombi Ban sinyali gönderiliyor...");
              statusOverride = 'ZOMBI_BOT_BAN';
            }

            // MERKEZE VERİ GÖNDERİMİ
            const response = await fetch(BACKEND_URL, {
              method: 'POST',
              mode: 'cors',
              headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                gclid: gclid || gbraid || wbraid || "Apple_Click",
                gad_source: gad_source || null,
                fingerprint: visitorId,
                userAgent: navigator.userAgent,
                is_human: isHuman,
                status_override: statusOverride
              })
            });
            
            const data = await response.json();

            // --- 🚨 İNFAZ PROTOKOLÜ 🚨 ---
            if (data.status && data.status.includes('SALDIRGAN')) {
              console.warn("ClickGuard: Zehirli cihaz tespit edildi. İnfaz başlatılıyor...");

              // Zehirli Ok (Google'a Bildir - Çocuğun Tag'i G-E5LFKT77Q3 için)
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('set', 'user_properties', {
                  'clickguard_status': 'SALDIRGAN'
                });
                (window as any).gtag('event', 'fraud_detected', {
                  'device_id': visitorId
                });
              }

              // KÖR ETME: Sahte 404
              window.location.replace("https://www.google.com/search?q=404+sayfa+bulunamadi+sunucu+coktu");
            } else {
              console.log('ClickGuard: Radar Mühürlendi. Trafik temiz.');
            }
          }, 5000); // 5 Saniye Zombi Bekleme Süresi
        }
      } catch (err) {
        console.warn('ClickGuard: Gözetleme Pasif.', err);
      }
    };

    startTracking();

    return () => {
      window.removeEventListener('mousemove', setHuman);
      window.removeEventListener('touchstart', setHuman);
      window.removeEventListener('scroll', setHuman);
    };
  }, []);

  // Bal Tuzağı Tetikleyici
  const handleHoneypot = async (e: React.MouseEvent) => {
    e.preventDefault();
    const fp = localStorage.getItem('hox_cihaz_kimligi') || "GHOST_BOT";
    await fetch('https://clickguard-backend-m8dg.onrender.com/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gad_source: 'HONEYPOT_TRAP', fingerprint: fp, userAgent: navigator.userAgent })
    });
    window.location.replace("https://www.google.com/search?q=404");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      
      {/* --- CLICKGUARD BAL TUZAĞI (Sadece Botlar Görür ve Tıklar) --- */}
      <div style={{ display: 'none', visibility: 'hidden', position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <a href="#" id="hox_secure_portal" tabIndex={-1} onClick={handleHoneypot}>
          Gizli Sistem Paneli
        </a>
      </div>

      {/* 1. HERO SEKSİYONU */}
      <section className="relative w-full bg-gray-950 pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
        <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-2xl">
            Kepenkleriniz <span className="text-yellow-400">Güvende</span>,<br />
            İşiniz Yolunda Olsun.
          </h1>
          <p className="max-w-[800px] text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
            İstanbul'un tüm ilçelerine <strong>45 dakikada</strong> ulaşan profesyonel teknik servis. 
            Otomatik kepenk, motor değişimi ve alıcı kart arızalarında 2 yıl garantili kesin çözüm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="tel:+905364825205" className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-xl bg-yellow-400 px-8 font-bold text-gray-900 hover:bg-white hover:scale-105 transition-all">
              <Phone className="mr-2 h-5 w-5 fill-current relative z-10" />
              <span className="relative z-10">Hemen Ara: 0536 482 52 05</span>
            </a>
            <a href="https://wa.me/905364825205" className="inline-flex h-14 items-center justify-center rounded-xl border border-gray-700 bg-gray-900/50 px-8 font-medium text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all">
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 2. HARİTA SEKSİYONU */}
      <section className="relative w-full h-[400px] md:h-[500px] bg-gray-200 border-b-8 border-yellow-400 overflow-hidden">
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500 italic">
          Harita Yükleniyor...
        </div>
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-white shadow-xl px-6 py-3 rounded-full flex items-center gap-3 border border-gray-200">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <div className="text-sm font-bold text-gray-800 uppercase tracking-tight">
            CANLI SAHA OPERASYONU: <span className="text-green-600">3 EKİP AKTİF</span>
          </div>
        </div>
      </section>

      {/* 3. HİZMETLER GRID */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Profesyonel Hizmetlerimiz</h2>
            <p className="text-gray-500 mt-2">Kepenk ve otomatik kapı sistemlerinde uzman çözümler.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Otomatik Kepenk Tamiri", icon: Wrench, slug: "otomatik-kepenk-tamiri" },
              { title: "Kepenk Motoru Değişimi", icon: Zap, slug: "kepenk-motoru-degisimi" },
              { title: "Kumanda & Alıcı Seti", icon: Settings, slug: "kepenk-kumanda-alici-seti" },
              { title: "Kepenk Yayı Değişimi", icon: ShieldCheck, slug: "kepenk-yayi-degisimi" }
            ].map((service, index) => (
              <Link href={`/hizmetler/${service.slug}`} key={index} className="bg-white p-6 rounded-xl border border-gray-100 hover:border-yellow-400 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-400 transition-colors">
                  <service.icon className="text-gray-900" size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <div className="text-yellow-600 text-sm font-semibold flex items-center">
                  İncele <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. İLÇELER */}
      <section className="py-20 bg-white px-4 border-t border-gray-100">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Hizmet Bölgelerimiz</h2>
              <p className="text-gray-500">İstanbul'un her iki yakasında 45 dakikada servis imkanı.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {districts.map((ilce, index) => (
              <Link href={`/ilceler/${ilce.slug}-kepenk-tamiri`} key={index} className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 transition-all group text-decoration-none">
                <MapPin size={18} className="text-gray-400 group-hover:text-yellow-600" />
                <span className="font-medium text-gray-600 group-hover:text-gray-900 text-sm">{ilce.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}