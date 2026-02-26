import { Phone, AlertTriangle, Clock, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acil Kepenk Tamiri 7/24 | Gece Açık Nöbetçi Kepenkçi',
  description: 'Kepenginiz mi takıldı? Dükkanınız açık mı kaldı? Gece gündüz demeden 45 dakikada acil kepenk tamiri için 0536 482 52 05 numarasını hemen arayın.',
};

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center py-20 px-4 text-center relative overflow-hidden">
      {/* Kırmızı/Sarı Acil Durum Işığı Efekti */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-yellow/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto max-w-3xl relative z-10">
        <div className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-full font-bold text-sm mb-8 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.5)]">
          <AlertTriangle size={18} /> 7/24 NÖBETÇİ EKİP AKTİF
        </div>

        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-6 leading-tight">
          7/24 Acil Kepenk Tamiri
        </h1>
        
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Gece yarısı dükkanınız açık kalmasın. Avrupa Yakası'nın tüm ilçelerine tam <span className="text-brand-yellow font-bold">45 dakikada</span> ulaşıyor, sorunu anında çözüyoruz.
        </p>

        <div className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl mb-12">
          <p className="text-gray-400 mb-4 text-lg">Hemen Nöbetçi Ustamıza Bağlanın</p>
          <a href="tel:+905364825205" className="flex flex-col md:flex-row items-center justify-center gap-4 bg-brand-yellow text-brand-dark px-10 py-6 rounded-2xl text-2xl md:text-4xl font-extrabold hover:bg-white transition-all duration-300 transform hover:scale-105">
            <Phone size={40} className="animate-bounce" />
            0536 482 52 05
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
            <Clock className="text-brand-yellow shrink-0" size={32} />
            <div>
              <h3 className="text-white font-bold">45 Dakika Sözü</h3>
              <p className="text-sm text-gray-400">Gezici araçlarla en hızlı müdahale</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
            <ShieldCheck className="text-brand-yellow shrink-0" size={32} />
            <div>
              <h3 className="text-white font-bold">2 Yıl Garanti</h3>
              <p className="text-sm text-gray-400">Değişen motor ve parçalarda</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}