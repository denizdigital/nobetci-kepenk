import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

// Bileşen importları
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CTAStickyBar from "@/components/shared/CTAStickyBar";
import ClientTracker from "@/components/shared/ClientTracker";
import ShutterAnimation from "@/components/ui/ShutterAnimation"; // Kepenk Animasyonu Eklendi

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

// Gelişmiş SEO, Open Graph ve Teknik Metadatalar
export const metadata: Metadata = {
  metadataBase: new URL('https://www.nobetcikepenk.com'),
  title: {
    default: "İstanbul Kepenk Tamiri | 7/24 Acil Servis & 45 Dk'da Kapınızda",
    template: "%s | Nöbetçi Kepenk"
  },
  description: "Avrupa Yakası 7/24 nöbetçi kepenk tamiri servisi. Garantili motor değişimi, otomatik kepenk onarımı için hemen arayın: 0536 482 52 05. 45 dakikada yanınızdayız.",
  keywords: ["kepenk tamiri", "otomatik kepenk servisi", "kepenk motoru", "istanbul kepenk tamircisi", "7/24 kepenk tamiri"],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Nöbetçi Kepenk | 7/24 Acil Servis",
    description: "Avrupa Yakası'nda 45 dakikada kepenk arızalarına kesin çözüm.",
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
    title: "Nöbetçi Kepenk | 7/24 Acil Servis",
    description: "Avrupa Yakası'nda 45 dakikada kepenk arızalarına kesin çözüm.",
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
      {/* pb-[80px] mobil sticky bar'ın footer'ı kapatmasını engeller */}
      <body className="min-h-screen flex flex-col font-sans pb-[80px] md:pb-0">
        <ShutterAnimation /> {/* İlk açılış kepenk efekti eklendi */}
        <ClientTracker />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <CTAStickyBar />
      </body>
    </html>
  );
}