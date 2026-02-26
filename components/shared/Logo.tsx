import Link from 'next/link';

export default function Logo({ className = "w-72 h-auto" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Nöbetçi Kepenk Ana Sayfa" className="group flex items-center">
      <svg 
        viewBox="0 0 460 80" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
      >
        {/* --- İKON BÖLÜMÜ --- */}
        <g className="transition-transform duration-500 ease-out group-hover:scale-105 origin-left">
          {/* Kurumsal Keskin Kalkan (Güven ve Dayanıklılık) */}
          <path 
            d="M10 10 H 60 V 45 L 35 65 L 10 45 Z" 
            fill="#0F172A" 
          />
          
          {/* Premium Kepenk Çıtaları (Altın / Kehribar) */}
          <rect x="20" y="20" width="30" height="4" rx="0.5" fill="#D97706" />
          <rect x="20" y="28" width="30" height="4" rx="0.5" fill="#D97706" />
          <rect x="20" y="36" width="30" height="4" rx="0.5" fill="#D97706" />
          
          {/* Kepenk Alt Kilit/Baza Vurgusu */}
          <rect x="25" y="44" width="20" height="4" rx="0.5" fill="#D97706" />
        </g>

        {/* --- DİKEY AYIRICI ÇİZGİ (Kurumsal Detay) --- */}
        <line 
          x1="85" y1="15" 
          x2="85" y2="60" 
          stroke="#CBD5E1" 
          strokeWidth="2" 
          strokeLinecap="round" 
        />

        {/* --- METİN BÖLÜMÜ --- */}
        {/* x="105" ile metni çizgiden yeterince uzağa, rahat bir nefes alanına taşıdık */}
        <text x="105" y="52">
          {/* NÖBETÇİ - Baskın, Kalın ve Güçlü */}
          <tspan 
            fill="#0F172A" 
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
            fontSize="36" 
            fontWeight="900" 
            letterSpacing="-0.03em"
          >
            NÖBETÇİ
          </tspan>
          
          {/* KEPENK - Zarif, İnce ve Modern */}
          <tspan 
            dx="12" 
            fill="#64748B" 
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
            fontSize="36" 
            fontWeight="300"
            letterSpacing="0.02em"
          >
            KEPENK
          </tspan>
        </text>
      </svg>
    </Link>
  );
}