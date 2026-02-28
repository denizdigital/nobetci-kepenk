import Link from 'next/link';
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
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* --- 1. HERO SEKSİYONU (Yazı ve Butonlar) --- */}
      <section className="relative w-full bg-gray-950 pt-24 pb-20 overflow-hidden">
        
        {/* Arka Plan Deseni */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center">
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-2xl">
            Kepenkleriniz <span className="text-brand-yellow">Güvende</span>,<br />
            İşiniz Yolunda Olsun.
          </h1>

          <p className="max-w-[800px] text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
            İstanbul'un tüm ilçelerine <strong>45 dakikada</strong> ulaşan profesyonel teknik servis. 
            Otomatik kepenk, motor değişimi ve alıcı kart arızalarında 2 yıl garantili kesin çözüm.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="tel:+905364825205" className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-xl bg-brand-yellow px-8 font-bold text-gray-900 hover:bg-white hover:scale-105 transition-all">
              <div className="absolute inset-0 flex h-full w-full animate-[spin_4s_linear_infinite] items-center justify-center opacity-20 group-hover:opacity-40">
                <div className="h-[200%] w-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]" />
              </div>
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

      {/* --- 2. GERÇEK HARİTA & ARAÇLAR (Canlı Takip Hissi) --- */}
      <section className="relative w-full h-[400px] md:h-[500px] bg-gray-200 border-b-8 border-brand-yellow overflow-hidden group">
        
        {/* Google Maps Iframe (Gri Tonlamalı - grayscale) */}
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192697.7932863719!2d28.87209637731353!3d41.00549580931367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1709248000000!5m2!1str!2str" 
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'grayscale(100%) contrast(1.2)' }} 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 z-0 pointer-events-none opacity-60" // Haritaya tıklamayı engelledik, arka plan gibi dursun
        ></iframe>

        {/* Harita Üzeri Overlay (Hafif karartma) */}
        <div className="absolute inset-0 bg-brand-dark/10 pointer-events-none z-0"></div>

        {/* Üst Bilgi Kartı */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-white shadow-xl px-6 py-3 rounded-full flex items-center gap-3 border border-gray-200">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <div className="text-sm font-bold text-gray-800">
            CANLI SAHA OPERASYONU: <span className="text-green-600">3 EKİP AKTİF</span>
          </div>
        </div>

        {/* --- HARİTA ÜZERİNDEKİ ARAÇLAR (Sabit Konumlar) --- */}

        {/* Araç 1: Avrupa Yakası (Beşiktaş/Şişli civarı) */}
        <div className="absolute top-[40%] left-[35%] z-10 flex flex-col items-center group cursor-pointer hover:scale-110 transition-transform">
          <div className="relative">
             <div className="absolute -inset-4 bg-brand-yellow/30 rounded-full animate-pulse"></div>
             <div className="bg-brand-dark text-white p-2 rounded-full border-2 border-brand-yellow shadow-lg relative z-10">
               <Truck size={20} />
             </div>
          </div>
          <div className="bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded shadow-md mt-2 border border-gray-200">
            Avrupa Ekibi <br/><span className="text-green-600 text-[10px]">Müsait</span>
          </div>
        </div>

        {/* Araç 2: Anadolu Yakası (Kadıköy/Ataşehir civarı) */}
        <div className="absolute top-[55%] left-[60%] z-10 flex flex-col items-center group cursor-pointer hover:scale-110 transition-transform">
          <div className="relative">
             <div className="absolute -inset-4 bg-brand-yellow/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
             <div className="bg-brand-dark text-white p-2 rounded-full border-2 border-brand-yellow shadow-lg relative z-10">
               <Truck size={20} />
             </div>
          </div>
          <div className="bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded shadow-md mt-2 border border-gray-200">
            Anadolu Ekibi <br/><span className="text-orange-500 text-[10px]">Serviste (15 dk)</span>
          </div>
        </div>

        {/* Araç 3: Uzak Bölge (Beylikdüzü/Avcılar civarı) */}
        <div className="absolute top-[35%] left-[15%] z-10 flex flex-col items-center group cursor-pointer hover:scale-110 transition-transform">
          <div className="relative">
             <div className="absolute -inset-4 bg-brand-yellow/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
             <div className="bg-brand-dark text-white p-2 rounded-full border-2 border-brand-yellow shadow-lg relative z-10">
               <Truck size={20} />
             </div>
          </div>
          <div className="bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded shadow-md mt-2 border border-gray-200">
            Mobil Ekip <br/><span className="text-green-600 text-[10px]">Seyir Halinde</span>
          </div>
        </div>

      </section>

      {/* --- 3. HİZMETLER GRID --- */}
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
              <Link href={`/hizmetler/${service.slug}`} key={index} className="bg-white p-6 rounded-xl border border-gray-100 hover:border-brand-yellow hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-brand-light rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-yellow transition-colors">
                  <service.icon className="text-brand-dark" size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <div className="text-brand-yellow text-sm font-semibold flex items-center">
                  İncele <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. ACİL DURUM BANNER --- */}
      <section className="bg-brand-dark py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Acil Kepenk Servisi mi Lazım?</h2>
          <p className="text-gray-400 mb-8">7/24 Nöbetçi ekibimiz hazır bekliyor.</p>
          <a href="tel:+905364825205" className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-brand-dark px-8 py-4 rounded-xl text-xl font-bold hover:bg-white transition-colors">
            <Phone size={24} />
            Hemen Ara
          </a>
        </div>
      </section>

      {/* --- 5. İLÇELER (DÜZELTİLDİ: "Tümünü Gör" Butonlu Modern Yapı) --- */}
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