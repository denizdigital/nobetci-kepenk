import Link from 'next/link';
import { Wrench, Zap, Settings, ShieldCheck, ArrowRight, Phone } from 'lucide-react';
import { services } from '@/lib/services';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hizmetlerimiz | Otomatik Kepenk Tamiri ve Motor Değişimi',
  description: 'İstanbul Avrupa Yakası 7/24 otomatik kepenk tamiri, motor değişimi, yay değişimi ve kumanda kopyalama hizmetlerimiz. 2 yıl garanti, 45 dakikada servis.',
};

export default function ServicesPage() {
  const icons = {
    "otomatik-kepenk-tamiri": Wrench,
    "kepenk-motoru-degisimi": Zap,
    "kepenk-kumanda-alici-seti": Settings,
    "kepenk-yayi-degisimi": ShieldCheck,
  };

  return (
    <div className="min-h-screen bg-brand-light py-12 px-4 md:py-20">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-brand-dark mb-6">Profesyonel Kepenk Hizmetlerimiz</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Avrupa Yakası'nın her noktasına 45 dakikada ulaşıyor, orijinal yedek parça ve 2 yıl garanti ile kesin çözümler sunuyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service) => {
            const Icon = icons[service.slug as keyof typeof icons] || Wrench;
            return (
              <Link href={`/hizmetler/${service.slug}`} key={service.slug} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all group border border-transparent hover:border-brand-yellow/30 flex flex-col h-full">
                <div className="bg-brand-light w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="text-brand-dark" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-brand-dark font-heading mb-4">{service.title}</h2>
                <p className="text-gray-600 mb-8 flex-grow leading-relaxed">{service.shortDesc}</p>
                <div className="flex items-center text-brand-yellow font-bold mt-auto text-lg">
                  Hizmet Detayları <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* CRO Acil Durum Kutusu */}
        <div className="bg-brand-dark rounded-3xl p-8 md:p-12 text-center text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-left md:w-2/3">
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3">Listede sorununuzu bulamadınız mı?</h3>
            <p className="text-gray-400">Kepenginizden garip sesler geliyor veya hiç tepki vermiyorsa, arıza tespiti için bize ulaşın.</p>
          </div>
          <a href="tel:+905364825205" className="w-full md:w-auto flex items-center justify-center gap-2 bg-brand-yellow text-brand-dark px-8 py-4 rounded-xl text-lg font-bold hover:bg-white transition-colors">
            <Phone size={24} />
            0536 482 52 05
          </a>
        </div>
      </div>
    </div>
  );
}