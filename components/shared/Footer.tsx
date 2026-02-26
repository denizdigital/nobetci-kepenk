import Link from 'next/link';
import Logo from './Logo';
import { Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-gray-300 py-12 mt-auto border-t-[4px] border-brand-yellow">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="bg-white inline-block p-2 rounded-xl mb-4">
            <Logo className="w-32 h-auto" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            İstanbul Avrupa Yakası'nda 7/24 nöbetçi kepenk tamiri servisi. 45 dakikada hızlı müdahale, orijinal yedek parça ve 2 yıl garantili kesin çözüm.
          </p>
        </div>
        
        <div>
          <h3 className="text-white font-bold text-lg mb-4 font-heading">Hızlı Bağlantılar</h3>
          <ul className="space-y-2">
            <li><Link href="/hizmetler" className="hover:text-brand-yellow transition-colors">Otomatik Kepenk Tamiri</Link></li>
            <li><Link href="/hizmetler" className="hover:text-brand-yellow transition-colors">Kepenk Motoru Değişimi</Link></li>
            <li><Link href="/ilceler" className="hover:text-brand-yellow transition-colors">Avrupa Yakası Hizmet Bölgeleri</Link></li>
            <li><Link href="/iletisim" className="hover:text-brand-yellow transition-colors">İletişim</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-4 font-heading">İletişim & Destek</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Phone className="text-brand-yellow shrink-0 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-400">7/24 Acil Servis</p>
                <a href="tel:+905364825205" className="text-white font-bold text-lg hover:text-brand-yellow transition-colors">0536 482 52 05</a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="text-brand-yellow shrink-0 mt-1" size={20} />
              <p className="text-sm">7 Gün 24 Saat Açık<br/>Nöbetçi Servis Aktif</p>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="text-brand-yellow shrink-0 mt-1" size={20} />
              <p className="text-sm">İstanbul / Avrupa Yakası</p>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Nöbetçi Kepenk. Tüm hakları saklıdır.</p>
        <p>🔒 Verileriniz KVKK kapsamında korunmaktadır. IP adresleri maskelenerek şifrelenir.</p>
      </div>
    </footer>
  );
}