"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Logo />
        
        {/* Masaüstü Menü */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/" className="hover:text-brand-yellow transition-colors">Ana Sayfa</Link>
          <Link href="/hizmetler" className="hover:text-brand-yellow transition-colors">Hizmetler</Link>
          <Link href="/ilceler" className="hover:text-brand-yellow transition-colors">Hizmet Bölgeleri</Link>
          <Link href="/iletisim" className="hover:text-brand-yellow transition-colors">İletişim</Link>
        </nav>

        {/* Masaüstü CTA Butonu */}
        <div className="hidden md:flex">
          <a href="tel:+905364825205" className="flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors font-bold shadow-md">
            <Phone size={20} className="text-brand-yellow" />
            <span>0536 482 52 05</span>
          </a>
        </div>

        {/* Mobil Hamburger Butonu */}
        <button className="md:hidden p-2 text-brand-dark" onClick={() => setIsOpen(!isOpen)} aria-label="Menüyü aç">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobil Açılır Menü */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-200 shadow-lg py-4 px-4 flex flex-col gap-4">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-medium py-2 border-b border-gray-100">Ana Sayfa</Link>
          <Link href="/hizmetler" onClick={() => setIsOpen(false)} className="text-lg font-medium py-2 border-b border-gray-100">Hizmetler</Link>
          <Link href="/ilceler" onClick={() => setIsOpen(false)} className="text-lg font-medium py-2 border-b border-gray-100">Hizmet Bölgeleri</Link>
          <Link href="/iletisim" onClick={() => setIsOpen(false)} className="text-lg font-medium py-2 border-b border-gray-100">İletişim</Link>
          <a href="tel:+905364825205" className="flex justify-center items-center gap-2 bg-brand-yellow text-brand-dark px-6 py-3 rounded-xl font-bold mt-2">
            <Phone size={20} />
            Hemen Ara
          </a>
        </div>
      )}
    </header>
  );
}