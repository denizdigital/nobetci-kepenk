"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Kullanıcı daha önce onay verdiyse gösterme
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[999999] bg-gray-900 text-white p-4 md:p-6 shadow-2xl border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-sm text-gray-300">
        Sitemizdeki deneyiminizi kişiselleştirmek ve reklam/analiz faaliyetlerini yürütmek için KVKK kapsamında çerezler (cookies) kullanıyoruz. 
        <Link href="#" className="text-brand-yellow ml-1 hover:underline">Detaylı bilgi için tıklayın.</Link>
      </div>
      <div className="flex shrink-0 gap-3">
        <button 
          onClick={handleAccept} 
          className="bg-brand-yellow text-brand-dark font-bold px-6 py-2 rounded-lg hover:bg-white transition-colors"
        >
          Kabul Ediyorum
        </button>
      </div>
    </div>
  );
}