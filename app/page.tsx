import Link from 'next/link';
import { Phone, MessageCircle, ShieldCheck, Clock, Wrench, Zap, Settings, ArrowRight, MapPin, AlertTriangle } from 'lucide-react';

// Avrupa Yakası Öncelikli 15 İlçe Listesi (Adım 5'ten)
const districts = [
  { name: 'Şişli', slug: 'sisli' }, { name: 'Beşiktaş', slug: 'besiktas' },
  { name: 'Bakırköy', slug: 'bakirkoy' }, { name: 'Beyoğlu', slug: 'beyoglu' },
  { name: 'Fatih', slug: 'fatih' }, { name: 'Zeytinburnu', slug: 'zeytinburnu' },
  { name: 'Bağcılar', slug: 'bagcilar' }, { name: 'Bahçelievler', slug: 'bahcelievler' },
  { name: 'Küçükçekmece', slug: 'kucukcekmece' }, { name: 'Avcılar', slug: 'avcilar' },
  { name: 'Beylikdüzü', slug: 'beylikduzu' }, { name: 'Esenyurt', slug: 'esenyurt' },
  { name: 'Başakşehir', slug: 'basaksehir' }, { name: 'Sarıyer', slug: 'sariyer' },
  { name: 'Kağıthane', slug: 'kagithane' }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SEKSİYONU */}
      <section className="relative bg-gradient-to-b from-brand-light to-white pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden px-4">
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-brand-yellow/10 text-brand-yellow px-4 py-2 rounded-full font-semibold text-sm mb-6 border border-brand-yellow/20">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-yellow"></span>
            </span>
            Şu an Avrupa Yakası'nda 3 gezici aracımız aktif
          </div>
          
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-brand-dark leading-tight mb-6">
            İstanbul Avrupa Yakası <br className="hidden md:block" />
            <span className="text-brand-yellow">7/24 Acil</span> Kepenk Tamiri
          </h1>
          
          <p className="text-lg md:text-xl text-brand-text mb-10 max-w-2xl mx-auto leading-relaxed">
            45 dakikada adresinizdeyiz. Garantili motor değişimi, otomatik kepenk onarımı ve nöbetçi teknik servis hizmeti. Sürpriz maliyet yok, işlem öncesi net fiyat.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+905364825205" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-dark text-white px-8 py-4 rounded-xl text-lg font-bold hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <Phone size={24} className="text-brand-yellow fill-brand-yellow" />
              Hemen Ara - 45 Dk'da Kapında
            </a>
            <a href="https://wa.me/905364825205" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl text-lg font-bold hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <MessageCircle size={24} className="fill-white" />
              WhatsApp'tan Konum At
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-400">🔒 Verileriniz KVKK kapsamında korunur, asla paylaşılmaz.</p>
        </div>
      </section>

      {/* 2. GÜVEN BAR (TRUST BAR) */}
      <section className="bg-white py-8 border-y border-gray-100 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="flex items-center gap-4 md:justify-center pt-4 md:pt-0">
              <div className="bg-brand-light p-3 rounded-lg"><Clock className="text-brand-dark" size={28} /></div>
              <div>
                <h3 className="font-bold text-brand-dark font-heading">45 Dakikada Müdahale</h3>
                <p className="text-sm text-gray-500">Gezici araçlarla hızlı ulaşım</p>
              </div>
            </div>
            <div className="flex items-center gap-4 md:justify-center pt-4 md:pt-0">
              <div className="bg-brand-light p-3 rounded-lg"><ShieldCheck className="text-brand-dark" size={28} /></div>
              <div>
                <h3 className="font-bold text-brand-dark font-heading">2 Yıl Garantili Hizmet</h3>
                <p className="text-sm text-gray-500">Motor ve yedek parçalarda</p>
              </div>
            </div>
            <div className="flex items-center gap-4 md:justify-center pt-4 md:pt-0">
              <div className="bg-brand-light p-3 rounded-lg"><AlertTriangle className="text-brand-dark" size={28} /></div>
              <div>
                <h3 className="font-bold text-brand-dark font-heading">7/24 Nöbetçi Ekip</h3>
                <p className="text-sm text-gray-500">Gece gündüz kesintisiz servis</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HİZMETLER GRID */}
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
              <Link href={`/hizmetler/${service.slug}`} key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full border border-transparent hover:border-brand-yellow/30">
                <div className="bg-brand-light w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="text-brand-dark" size={28} />
                </div>
                <h3 className="text-xl font-bold text-brand-dark font-heading mb-3">{service.title}</h3>
                <p className="text-gray-500 text-sm mb-6 flex-grow">{service.desc}</p>
                <div className="flex items-center text-brand-yellow font-semibold mt-auto">
                  Detaylı İncele <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ACİL DURUM BANNER */}
      <section className="bg-brand-dark py-16 px-4">
        <div className="container mx-auto max-w-4xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-yellow via-orange-400 to-brand-yellow"></div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Gece Yarısı Kepenginiz mi Takıldı?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Dükkanınızı açık ve güvende bırakmayın. Nöbetçi ekibimiz hemen yola çıksın, sorunu kökünden çözsün.
          </p>
          <a href="tel:+905364825205" className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-brand-dark px-8 py-4 rounded-xl text-xl font-bold hover:bg-white transition-colors duration-300">
            <Phone size={24} />
            Acil Servisi Ara: 0536 482 52 05
          </a>
        </div>
      </section>

      {/* 5. SEO & İLÇE SİLOSU */}
      <section className="py-20 bg-white px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-heading font-bold text-brand-dark mb-2">Avrupa Yakası Hizmet Bölgelerimiz</h2>
              <p className="text-gray-500">Tüm Avrupa yakasına 45 dakikada ulaşıyoruz.</p>
            </div>
            <Link href="/ilceler" className="flex items-center text-brand-dark font-semibold hover:text-brand-yellow transition-colors">
              Tümünü Gör <ArrowRight size={20} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {districts.map((ilce, index) => (
              <Link href={`/ilceler/${ilce.slug}`} key={index} className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-brand-yellow hover:bg-brand-light transition-all group">
                <MapPin size={18} className="text-gray-400 group-hover:text-brand-yellow transition-colors" />
                <span className="font-medium text-brand-dark group-hover:text-brand-dark">{ilce.name} Kepenk Tamiri</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}