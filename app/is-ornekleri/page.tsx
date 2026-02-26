import type { Metadata } from 'next';
import { Camera, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'İş Örneklerimiz | Öncesi ve Sonrası Kepenk Tamiri',
  description: 'Nöbetçi Kepenk olarak İstanbul Avrupa Yakasında gerçekleştirdiğimiz motor değişimi, palet onarımı ve otomatik kepenk tamiri referanslarımız.',
};

export default function PortfolioPage() {
  // Gelecekte gerçek resim yolları eklenecek veri yapısı
  const works = [
    { title: "Şişli - Motor ve Palet Değişimi", desc: "Sıkışma sonucu tamamen dağılan kepenk sistemi yeni motor ve paletlerle 2 saatte yenilendi.", type: "Kapsamlı Onarım" },
    { title: "Beşiktaş - Gece Acil Müdahale", desc: "Gece 02:30'da açık kalan mağaza kepengi, alıcı kart değişimi ile 45 dakikada güvenliğe kavuşturuldu.", type: "Acil Servis" },
    { title: "Bakırköy - Çelik Yay Değişimi", desc: "Kopan çelik zemberek yayı, kepenk ağırlığına uygun ağır hizmet tipi yeni yay ile değiştirildi.", type: "Yay Değişimi" },
    { title: "Beylikdüzü - Kepenk Motoru", desc: "Yanmış olan 600 kg kapasiteli motor, 2 yıl garantili yeni nesil tüp motor ile güncellendi.", type: "Motor Değişimi" },
  ];

  return (
    <div className="min-h-screen bg-brand-light py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Camera size={48} className="mx-auto text-brand-dark mb-6" />
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-4">Tamamlanan İşlerimiz</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Görüntü kalitesi değil, işçilik kalitesi konuşur. Avrupa Yakası'nda başarıyla tamamladığımız, işletmeleri güvene kavuşturan onarım örneklerimizden bazıları.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {works.map((work, index) => (
            <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group">
              {/* Gerçek fotoğraflar gelene kadar Placeholder Alanı */}
              <div className="h-64 bg-gray-200 relative flex items-center justify-center border-b border-gray-100">
                <span className="text-gray-400 font-medium">📷 Öncesi / Sonrası Görsel Alanı</span>
                <div className="absolute top-4 right-4 bg-brand-yellow text-brand-dark text-xs font-bold px-3 py-1 rounded-full">
                  {work.type}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold font-heading text-brand-dark mb-3">{work.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{work.desc}</p>
                <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
                  <CheckCircle2 size={18} />
                  2 Yıl Garanti Kapsamında Teslim Edildi
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}