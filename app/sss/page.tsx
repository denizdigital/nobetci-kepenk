import type { Metadata } from 'next';
import { HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular | Kepenk Tamiri',
  description: 'Kepenk tamiri, motor değişimi, garanti koşulları ve servis sürelerimiz hakkında en çok merak edilen soruların cevapları.',
};

const faqs = [
  {
    q: "Servis süreniz ortalama ne kadar?",
    a: "İstanbul Avrupa Yakası'nın tüm ilçelerine, trafiğe ve bulunduğunuz konuma bağlı olarak ortalama 45 dakika içerisinde ulaşıyoruz. Gezici araçlarımız 7/24 aktiftir."
  },
  {
    q: "Değiştirilen parçalarda garanti var mı?",
    a: "Evet, taktığımız tüm sıfır kepenk motorları, alıcı kartlar ve çelik yaylar firmamız ve üretici firma tarafından 2 yıl boyunca resmi garanti altındadır."
  },
  {
    q: "Gece saatlerinde fiyat farkı alıyor musunuz?",
    a: "Fiyatlandırmamız arızanın türüne ve kullanılacak yedek parçaya göre belirlenir. İşlem öncesi size net fiyat sunulur, sürpriz veya gizli maliyet çıkarılmaz."
  },
  {
    q: "Kepengim yarıda kaldı, zorlamalı mıyım?",
    a: "Kesinlikle hayır. Sıkışan kepengi kumanda ile zorlamak, motorun yanmasına veya paletlerin tamamen parçalanmasına sebep olabilir. Sistemi durdurup hemen bizi aramalısınız."
  }
];

export default function FAQPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-brand-light py-20 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <HelpCircle size={48} className="mx-auto text-brand-yellow mb-6" />
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-4">Sıkça Sorulan Sorular</h1>
          <p className="text-gray-600">Hizmetlerimiz hakkında merak ettiğiniz detaylar.</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold font-heading text-brand-dark mb-3 flex items-start gap-3">
                <span className="text-brand-yellow mt-1">Q.</span> {faq.q}
              </h2>
              <p className="text-gray-600 leading-relaxed ml-8">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-brand-dark p-8 rounded-2xl text-center text-white">
          <p className="mb-4">Aradığınız cevabı bulamadınız mı?</p>
          <a href="tel:+905364825205" className="text-brand-yellow font-bold text-xl hover:underline">Bizimle İletişime Geçin: 0536 482 52 05</a>
        </div>
      </div>
    </div>
  );
}