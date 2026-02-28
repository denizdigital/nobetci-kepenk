import Link from 'next/link';
import { Phone, MessageCircle, ShieldCheck, Clock, Wrench, Zap, Settings, ArrowRight, MapPin } from 'lucide-react';

// İstanbul Geneli Karışık İlçe Listesi (Hem Anadolu Hem Avrupa)
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
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* --- 1. PREMIUM HERO SEKSİYONU (YENİ) --- */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-gray-950 pt-20 pb-16">
        
        {/* Arka Plan Efektleri (Cyber/Industrial Grid) */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-brand-yellow opacity-20 blur-[100px]"></div>
        </div>
        
        {/* Karanlık Gradyan Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/90 via-gray-950/60 to-gray-950 z-0" />

        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
          
          {/* Canlı Durum Bildirimi */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-semibold text-brand-yellow tracking-wide uppercase">
              Şu an Nöbetçi Ekip Aktif • İstanbul Geneli
            </span>
          </div>

          {/* Ana Başlık */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-2xl">
            Kepenkleriniz <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-200">Güvende</span>,<br />
            İşiniz Yolunda Olsun.
          </h1>

          <p className="max-w-[800px] text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
            İstanbul'un tüm ilçelerine <strong>45 dakikada</strong> ulaşan profesyonel teknik servis. 
            Otomatik kepenk, motor değişimi ve alıcı kart arızalarında <span className="text-white font-medium">2 yıl garantili</span> kesin çözüm.
          </p>

          {/* CTA Butonları */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* Acil Arama - Nabız Efektli */}
            <a 
              href="tel:+905364825205" 
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-xl bg-brand-yellow px-8 font-bold text-gray-900 transition-all duration-300 hover:bg-white hover:scale-105"
            >
              <div className="absolute inset-0 flex h-full w-full animate-[spin_4s_linear_infinite] items-center justify-center opacity-20 group-hover:opacity-40">
                <div className="h-[200%] w-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]" />
              </div>
              <span className="relative flex items-center gap-2">
                <Phone className="h-5 w-5 fill-current" />
                Hemen Ara: 0536 482 52 05
              </span>
            </a>

            {/* WhatsApp Butonu */}
            <a 
              href="https://wa.me/905364825205"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center rounded-xl border border-gray-700 bg-gray-900/50 px-8 font-medium text-white backdrop-blur-sm transition-all hover:bg-[#25D366] hover:border-[#25D366] hover:text-white group"
            >
              <MessageCircle className="mr-2 h-5 w-5 group-hover:fill-white" />
              WhatsApp'tan Yaz
            </a>
          </div>

          {/* Alt Bilgi / Güven Bantları (Glassmorphism) */}
          <div className="mt-16 w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Clock, label: "45 Dk'da Servis", sub: "Hızlı Ulaşım" },
              { icon: ShieldCheck, label: "2 Yıl Garanti", sub: "Yedek Parça" },
              { icon: MapPin, label: "Tüm İstanbul", sub: "Avrupa & Anadolu" },
              { icon: Wrench, label: "Uzman Ekip", sub: "Sertifikalı Usta" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                <item.icon className="h-8 w-8 text-brand-yellow mb-2" />
                <div className="text-sm font-bold text-white">{item.label}</div>
                <div className="text-xs text-gray-400">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 2. HİZMETLER GRID (Mevcut Tasarımın İyileştirilmiş Hali) --- */}
      <section className="py-20 bg-brand-light px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark mb-4">Profesyonel Kepenk Hizmetlerimiz</h2>
            <p className="text-brand-text max-w-2xl mx-auto">Uzman ekibimizle tüm marka ve model otomatik kepenk arızalarına kesin ve uzun ömürlü çözümler sunuyoruz.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Otomatik Kepenk Tamiri", desc: "Sıkışma, palet kopması veya fiziksel hasarların aynı gün onarımı.", icon: Wrench, slug: "otomatik-kepenk-tamiri" },
              { title: "Kepenk Motoru Değişimi", desc: "Yanmış veya gücünü yitirmiş motorların 2 yıl garantili değişimi.", icon: Zap, slug: "kepenk-motoru-degisimi" },
              { title: "Kumanda & Alıcı Seti", desc: "Bozulan alıcı kartların tamiri, yeni kumanda kodlama işlemleri.", icon: Settings, slug: "kepenk-kumanda-alici-seti" },
              { title: "Kepenk Yayı Değişimi", desc: "Kopan çelik yayların kepenk ağırlığına uygun orijinal yaylarla değişimi.", icon: ShieldCheck, slug: "kepenk-yayi-degisimi" }
            ].map((service, index) => (
              <Link href={`/hizmetler/${service.slug}`} key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-transparent hover:border-brand-yellow/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-brand-yellow/5 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-150"></div>
                <div className="bg-brand-light w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-yellow group-hover:text-brand-dark transition-colors duration-300 relative z-10">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-brand-dark font-heading mb-3">{service.title}</h3>
                <p className="text-gray-500 text-sm mb-6 flex-grow">{service.desc}</p>
                <div className="flex items-center text-brand-yellow font-semibold mt-auto group-hover:translate-x-2 transition-transform">
                  Detaylı İncele <ArrowRight size={18} className="ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. ACİL DURUM BANNER --- */}
      <section className="bg-brand-dark py-16 px-4">
        <div className="container mx-auto max-w-4xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-yellow via-orange-400 to-brand-yellow"></div>
          {/* Arka plan ışık efekti */}
          <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine" />
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Gece Yarısı Kepenginiz mi Takıldı?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Dükkanınızı açık ve güvende bırakmayın. Nöbetçi ekibimiz hemen yola çıksın, sorunu kökünden çözsün.
          </p>
          <a href="tel:+905364825205" className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-brand-dark px-8 py-4 rounded-xl text-xl font-bold hover:bg-white transition-colors duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <Phone size={24} />
            Acil Servisi Ara: 0536 482 52 05
          </a>
        </div>
      </section>

      {/* --- 4. SEO & İLÇE SİLOSU (Tüm İstanbul) --- */}
      <section className="py-20 bg-white px-4 border-t border-gray-100">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-heading font-bold text-brand-dark mb-2">Hizmet Bölgelerimiz</h2>
              <p className="text-gray-500">İstanbul'un her iki yakasında 45 dakikada servis imkanı.</p>
            </div>
            <Link href="/ilceler" className="flex items-center text-brand-dark font-semibold hover:text-brand-yellow transition-colors bg-gray-50 px-4 py-2 rounded-lg">
              Tüm İlçeleri Gör <ArrowRight size={20} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {districts.map((ilce, index) => (
              <Link href={`/ilceler/${ilce.slug}-kepenk-tamiri`} key={index} className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-brand-yellow hover:bg-brand-yellow/5 transition-all group">
                <MapPin size={18} className="text-gray-400 group-hover:text-brand-yellow transition-colors" />
                <span className="font-medium text-gray-600 group-hover:text-brand-dark text-sm">{ilce.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}