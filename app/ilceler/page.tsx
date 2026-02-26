import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { districts } from '@/lib/districts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Avrupa Yakası Kepenk Tamiri Hizmet Bölgelerimiz',
  description: 'İstanbul Avrupa Yakası 15 ilçede 7/24 nöbetçi kepenk tamiri ve motor değişimi hizmeti. 45 dakikada hızlı servis bölgelerimiz.',
};

export default function DistrictsPage() {
  return (
    <div className="min-h-screen bg-brand-light py-12 px-4 md:py-20">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-brand-dark mb-6">Avrupa Yakası Hizmet Bölgelerimiz</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Geniş servis ağımızla İstanbul Avrupa Yakası'nın tüm ilçelerine gezici araçlarımızla 45 dakikada ulaşıyoruz. Nerede olursanız olun, nöbetçi ekibimiz bir telefon uzağınızda.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {districts.map((ilce) => (
            <Link href={`/ilceler/${ilce.slug}`} key={ilce.slug} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group border border-transparent hover:border-brand-yellow/50 flex flex-col items-center text-center">
              <div className="bg-brand-light w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:bg-brand-yellow/10 transition-colors">
                <MapPin className="text-brand-dark group-hover:text-brand-yellow transition-colors" size={24} />
              </div>
              <h2 className="text-lg font-bold text-brand-dark font-heading">{ilce.name}</h2>
              <p className="text-sm text-gray-500 mt-1">Kepenk Servisi</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}