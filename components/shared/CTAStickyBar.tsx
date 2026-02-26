import { Phone, MessageCircle } from 'lucide-react';

export default function CTAStickyBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.1)] z-50 p-3 flex gap-3">
      <a href="tel:+905364825205" className="flex-1 bg-brand-dark text-white h-14 rounded-xl flex items-center justify-center gap-2 font-bold active:scale-95 transition-transform shadow-sm">
        <Phone size={22} className="text-brand-yellow fill-brand-yellow" />
        <span>Hemen Ara</span>
      </a>
      <a href="https://wa.me/905364825205" target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#25D366] text-white h-14 rounded-xl flex items-center justify-center gap-2 font-bold active:scale-95 transition-transform shadow-sm">
        <MessageCircle size={22} className="fill-white" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}