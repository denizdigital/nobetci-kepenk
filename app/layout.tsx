import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

// --- BİLEŞEN İMPORTLARI ---

import Navbar from "@/components/shared/Navbar";

// Footer 'shared' klasöründe değilse bu satırı: import Footer from "@/components/Footer"; yapın.
import Footer from "@/components/shared/Footer"; 

import CTAStickyBar from "@/components/shared/CTAStickyBar";
import ClientTracker from "@/components/shared/ClientTracker";
import ShutterAnimation from "@/components/ui/ShutterAnimation";

// ✅ COOKIE BANNER (Doğru Import)
import CookieBanner from "@/components/ui/CookieBanner"; 

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({ 
  weight: ["300", "400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nobetcikepenk.com'),
  title: {
    default: "İstanbul Kepenk Tamiri | 7/24 Acil Servis & 45 Dk'da Kapınızda",
    template: "%s | Nöbetçi Kepenk"
  },
  // 👇 GÜNCELLENEN KISIM: "Avrupa Yakası" yerine "İstanbul genelinde" yazıldı
  description: "İstanbul genelinde 7/24 nöbetçi kepenk tamiri servisi. Anadolu ve Avrupa yakasında garantili motor değişimi, otomatik kepenk onarımı için hemen arayın: 0536 482 52 05.",
  // 👇 GÜNCELLENEN KISIM: Anahtar kelimelere "anadolu yakası" eklendi
  keywords: ["kepenk tamiri", "otomatik kepenk servisi", "kepenk motoru", "istanbul kepenk tamircisi", "7/24 kepenk tamiri", "anadolu yakası kepenk tamiri"],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    // 👇 GÜNCELLENEN KISIM
    title: "Nöbetçi Kepenk | İstanbul 7/24 Acil Servis",
    description: "İstanbul'un tüm ilçelerinde 45 dakikada kepenk arızalarına kesin çözüm.",
    url: 'https://www.nobetcikepenk.com',
    siteName: 'Nöbetçi Kepenk',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'Nöbetçi Kepenk Servisi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    // 👇 GÜNCELLENEN KISIM
    title: "Nöbetçi Kepenk | İstanbul 7/24 Acil Servis",
    description: "İstanbul'un tüm ilçelerinde 45 dakikada kepenk arızalarına kesin çözüm.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans pb-[80px] md:pb-0">
        
        {/* Animasyonlar ve Takip Kodları (Sayfa en üstünde çalışmalı) */}
        <ShutterAnimation />
        <ClientTracker />
        
        {/* Üst Menü */}
        <Navbar />
        
        {/* Sayfa İçeriği */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Alt Menü (Footer) */}
        <Footer />
        
        {/* Mobil Yapışkan Menü */}
        <CTAStickyBar />

        {/* COOKIE BANNER (En Üste Çıkması İçin En Sona Ekledik) */}
        <CookieBanner />
        
      </body>
    </html>
  );
}