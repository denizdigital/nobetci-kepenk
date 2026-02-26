import { notFound } from 'next/navigation';
import { services, getServiceBySlug } from '@/lib/services';
import { Phone, CheckCircle2, AlertTriangle } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

// Next.js 15 için Props tipi
type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  // Güvenlik: URL'den gelen parametreyi decode ediyoruz
  const cleanSlug = decodeURIComponent(resolvedParams.slug);
  const service = getServiceBySlug(cleanSlug);
  
  if (!service) return { title: 'Sayfa Bulunamadı' };

  return { title: service.metaTitle, description: service.metaDesc };
}

export default async function ServiceDetailPage({ params }: Props) {
  const resolvedParams = await params;
  // Güvenlik: URL'den gelen parametreyi decode ediyoruz
  const cleanSlug = decodeURIComponent(resolvedParams.slug);
  const service = getServiceBySlug(cleanSlug);
  
  if (!service) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.title,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Nöbetçi Kepenk",
      "telephone": "+905364825205",
      "areaServed": "İstanbul Avrupa Yakası",
      "priceRange": "$$"
    },
    "description": service.metaDesc
  };

  return (
    <div className="bg-brand-light min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="bg-brand-dark pt-16 pb-24 px-4 text-center relative overflow-hidden">
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-brand-yellow px-4 py-2 rounded-full font-medium text-sm mb-6 border border-white/20 backdrop-blur-sm">
            <CheckCircle2 size={16} /> 2 Yıl Garantili Hizmet
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            {service.h1}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            {service.metaDesc}
          </p>
          <a href="tel:+905364825205" className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-brand-dark px-8 py-4 rounded-xl text-lg font-bold hover:bg-white transition-colors shadow-lg">
            <Phone size={24} />
            Hemen Ara: 0536 482 52 05
          </a>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #ffffff 40px, #ffffff 41px)' }}></div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 -mt-12 relative z-20 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="lg:w-2/3 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
            <div className="prose prose-lg max-w-none text-brand-text">
              {service.sections.map((sec, index) => (
                <div key={index} className="mb-10 last:mb-0">
                  <h2 className="text-2xl font-bold font-heading text-brand-dark mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-brand-yellow/20 flex items-center justify-center text-brand-yellow text-sm">{index + 1}</span>
                    {sec.h2}
                  </h2>
                  <p className="leading-relaxed text-gray-600">{sec.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-brand-dark flex items-center gap-2"><AlertTriangle size={20} className="text-brand-yellow"/> Acil Durum Mu Var?</h4>
                <p className="text-sm text-gray-600 mt-1">Sisteminizi zorlamayın. Gece gündüz demeden yanınızdayız.</p>
              </div>
              <Link href="/acil-kepenk-tamiri" className="shrink-0 bg-white border-2 border-brand-dark text-brand-dark px-6 py-2 rounded-xl font-bold hover:bg-brand-dark hover:text-white transition-colors text-sm">
                Acil Servis Çağır
              </Link>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-28 space-y-6">
              <div className="bg-brand-dark rounded-3xl p-8 text-white shadow-lg border-t-4 border-brand-yellow">
                <h3 className="text-xl font-heading font-bold mb-6">Neden Biz?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-brand-yellow shrink-0 mt-0.5" size={20} /><span className="text-sm text-gray-300">Avrupa Yakası 45 Dakikada Hızlı Ulaşım</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-brand-yellow shrink-0 mt-0.5" size={20} /><span className="text-sm text-gray-300">Kullanılan Tüm Parçalarda 2 Yıl Garanti</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-brand-yellow shrink-0 mt-0.5" size={20} /><span className="text-sm text-gray-300">İşlem Öncesi Şeffaf Net Fiyatlandırma</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-brand-yellow shrink-0 mt-0.5" size={20} /><span className="text-sm text-gray-300">Uzman ve Sertifikalı Teknik Kadro</span></li>
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
                <p className="text-gray-500 mb-2">Hızlı Destek Hattı</p>
                <a href="tel:+905364825205" className="text-2xl font-bold font-heading text-brand-dark hover:text-brand-yellow transition-colors block mb-4">0536 482 52 05</a>
                <a href="https://wa.me/905364825205" target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-colors">WhatsApp'tan Yaz</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}