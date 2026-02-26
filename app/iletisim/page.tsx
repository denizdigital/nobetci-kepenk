import type { Metadata } from 'next';
import { Phone, MapPin, MessageCircle } from 'lucide-react';
import ContactForm from '@/components/ui/ContactForm';

export const metadata: Metadata = {
  title: 'İletişim | Nöbetçi Kepenk Tamiri',
  description: '7/24 acil kepenk tamiri için iletişim bilgilerimiz. Telefon, WhatsApp ve servis talep formu. Avrupa Yakası 45 dk servis.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-light py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-4">İletişim & Servis Talebi</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Kepenk arızalarınız için 7/24 bize ulaşabilir, WhatsApp üzerinden fotoğraf veya video göndererek hızlı ön bilgi alabilirsiniz.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* İletişim Bilgileri */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6">
              <div className="bg-brand-yellow/20 p-4 rounded-full text-brand-dark"><Phone size={32} /></div>
              <div>
                <h3 className="text-xl font-bold text-brand-dark mb-2">7/24 Acil Servis Hattı</h3>
                <a href="tel:+905364825205" className="text-2xl font-bold text-brand-yellow hover:text-brand-dark transition-colors">0536 482 52 05</a>
                <p className="text-gray-500 text-sm mt-2">Gece gündüz kesintisiz ulaşabilirsiniz.</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6">
              <div className="bg-[#25D366]/20 p-4 rounded-full text-[#25D366]"><MessageCircle size={32} /></div>
              <div>
                <h3 className="text-xl font-bold text-brand-dark mb-2">WhatsApp Destek</h3>
                <p className="text-gray-600 mb-4">Arızalı kepenginizin fotoğrafını veya videosunu göndererek hızlıca fiyat alabilirsiniz.</p>
                <a href="https://wa.me/905364825205" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#25D366] text-white px-6 py-2 rounded-xl font-bold hover:bg-green-600 transition-colors">WhatsApp'tan Yaz</a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6">
              <div className="bg-brand-dark/10 p-4 rounded-full text-brand-dark"><MapPin size={32} /></div>
              <div>
                <h3 className="text-xl font-bold text-brand-dark mb-2">Hizmet Bölgemiz</h3>
                <p className="text-gray-600">İstanbul Avrupa Yakası (Tüm İlçeler)</p>
                <p className="text-gray-500 text-sm mt-1">Gezici araçlarımızla 45 dakikada adresinizdeyiz.</p>
              </div>
            </div>
          </div>

          {/* İletişim Formu (Client Component) */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-md border-t-4 border-brand-yellow">
            <h2 className="text-2xl font-bold font-heading text-brand-dark mb-6">Servis Talep Formu</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}