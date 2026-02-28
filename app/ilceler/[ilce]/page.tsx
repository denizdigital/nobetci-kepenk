import { notFound } from 'next/navigation';
import { districts, getDistrictBySlug, getNeighborDistricts } from '@/lib/districts';
import { MapPin, Phone, ShieldCheck, Clock, Navigation } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

// Next.js 15 için Props tipi
type Props = {
  params: Promise<{ ilce: string }>;
};

// Next.js SSG
export function generateStaticParams() {
  return districts.map((d) => ({ ilce: d.slug }));
}

// Dinamik Metadata (Async yapıldı)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const district = getDistrictBySlug(resolvedParams.ilce);
  if (!district) return { title: 'Bölge Bulunamadı' };

  return {
    title: `${district.name} Kepenk Tamiri | 7/24 Nöbetçi Kepenkçi - 45 Dk`,
    description: `${district.name} bölgesi acil kepenk tamiri ihtiyacınızda 45 dakikada adresinizdeyiz. 7/24 açık nöbetçi kepenk servisi, orijinal parça ve 2 yıl garanti: 0536 482 52 05.`,
  };
}

// Ana Sayfa Bileşeni (Async yapıldı)
export default async function DistrictDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const district = getDistrictBySlug(resolvedParams.ilce);
  
  if (!district) notFound();

 const neighbors = getNeighborDistricts(district.slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Nöbetçi Kepenk - ${district.name} Servisi`,
    "telephone": "+905364825205",
    "areaServed": `${district.name}, İstanbul`,
    "priceRange": "$$",
    "description": `${district.name} otomatik kepenk tamiri, motor değişimi ve 7/24 acil servis.`
  };

  return (
    <div className="bg-brand-light min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <div className="bg-brand-dark pt-20 pb-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-brand-yellow/20 text-brand-yellow px-4 py-2 rounded-full font-medium text-sm mb-6 border border-brand-yellow/30">
            <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-brand-yellow"></span></span>
            {district.name} bölgesinde nöbetçi aracımız aktif
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            {district.name} 7/24 Acil Kepenk Tamiri Servisi
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            {district.name} ilçesi ve çevresi için kepenk arızalarınıza 45 dakikada müdahale ediyoruz. İş yerinizin güvenliğini riske atmayın, uzman ekibimiz hemen yola çıksın.
          </p>
          <a href="tel:+905364825205" className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-brand-dark px-8 py-4 rounded-xl text-lg font-bold hover:bg-white transition-colors">
            <Phone size={24} />
            {district.name} Acil Servis: 0536 482 52 05
          </a>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 space-y-12">
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold font-heading text-brand-dark mb-4 flex items-center gap-2">
                <ShieldCheck className="text-brand-yellow" /> {district.name} Otomatik Kepenk Motoru Değişimi
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {district.name} bölgesindeki dükkan, mağaza ve garaj kapılarınızda meydana gelen motor yanması, kumanda alıcısı arızası veya palet sıkışması gibi durumlarda profesyonel destek sağlıyoruz. Kepenk motorunuzu, sisteminizin ağırlığına uygun, sertifikalı ve tam 2 yıl garantili yeni motorlarla aynı gün içinde değiştiriyoruz.
              </p>
            </section>

            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold font-heading text-brand-dark mb-4 flex items-center gap-2">
                <Clock className="text-brand-yellow" /> {district.name} İçin Ortalama Servis Süremiz (45 Dk)
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Trafiğin ve aciliyetin farkındayız. Özellikle gece saatlerinde açık kalan dükkanların yarattığı güvenlik zafiyetini önlemek için Avrupa Yakası gezici servis ağımızı {district.name} merkezli olarak optimize ettik. Bizi aradığınız andan itibaren en yakın nöbetçi ekibimiz bulunduğunuz konuma yönlendirilir.
              </p>
              <div className="bg-brand-light p-4 rounded-xl border border-gray-200">
                <strong className="text-brand-dark block mb-1">Şeffaf Fiyatlandırma Garantisi</strong>
                <span className="text-sm text-gray-500">{district.name} semtindeki müşterilerimize arıza tespiti sonrası net fiyat sunulur. İşlem onaylanmadan ekstra veya sürpriz bir maliyet kesinlikle çıkarılmaz.</span>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-brand-dark p-6 rounded-3xl text-white shadow-lg">
              <h3 className="text-xl font-heading font-bold mb-4 border-b border-gray-700 pb-4">Yakın Servis Bölgelerimiz</h3>
              <p className="text-sm text-gray-400 mb-4">{district.name} dışındaki komşu ilçelerde de 7/24 aktif servisimiz bulunmaktadır:</p>
              <ul className="space-y-3">
                {neighbors.map(n => (
                  <li key={n.slug}>
                    <Link href={`/ilceler/${n.slug}`} className="flex items-center gap-2 text-gray-300 hover:text-brand-yellow transition-colors group">
                      <Navigation size={16} className="group-hover:translate-x-1 transition-transform" /> {n.name} Kepenk Tamiri
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 p-6 rounded-3xl border border-amber-200 text-center">
              <p className="text-sm text-gray-600 mb-2 font-medium">WhatsApp'tan Konum Gönderin</p>
              <a href="https://wa.me/905364825205" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors shadow-sm w-full">
                Hemen Ulaşın
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}