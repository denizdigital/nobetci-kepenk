"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "../shared/Logo";

export default function ShutterAnimation() {
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    // Animasyon bitince DOM'dan tamamen kaldırmak ve sayfa kaydırmasını geri açmak için
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setIsRendered(false);
      document.body.style.overflow = "auto";
    }, 1500); // Animasyon süresi (1.5 saniye)

    return () => {
      document.body.style.overflow = "auto";
      clearTimeout(timer);
    };
  }, []);

  if (!isRendered) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      // Kepenk sarılma hissi için özel cubic-bezier (yavaş başlar, hızla çekilir)
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }} 
      className="fixed inset-0 z-[99999] bg-slate-100 flex flex-col pointer-events-none"
    >
      {/* Merkezdeki Logo - Kepenk lamellerinin ÜSTÜNDE durur (z-10) */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-200"
        >
          <Logo className="w-48 h-auto" />
        </motion.div>
      </div>

      {/* Kepenk Paletleri (Yatay Çizgiler) - GRİ VE BELİRGİN KATMANLI */}
      <div className="flex-grow flex flex-col">
        {Array.from({ length: 24 }).map((_, i) => (
          <div 
            key={i} 
            className="flex-1 w-full border-b border-slate-500 bg-slate-400 shadow-[0_3px_5px_rgba(0,0,0,0.4)_inset]" 
          />
        ))}
      </div>

      {/* Kepenginizin Yere Değen Alt Baza (Etek) Profili */}
      <div className="h-8 w-full bg-brand-yellow shrink-0 border-t-2 border-amber-400 shadow-[0_-4px_10px_rgba(0,0,0,0.5)] flex items-center justify-center">
        <div className="w-32 h-2 bg-amber-600 rounded-full opacity-50"></div>
      </div>
    </motion.div>
  );
}