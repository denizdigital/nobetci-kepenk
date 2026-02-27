import { blogPosts } from '@/lib/blogData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { Phone, ArrowLeft, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

// 1. STATİK SAYFA ÜRETİMİ (SSG)
// Bu fonksiyon sayesinde, 10 makalenin tamamı site yüklenirken (build anında) oluşturulur.
// Kullanıcı tıkladığında veritabanı sorgusu olmaz, sayfa 0.1 saniyede açılır.
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// 2. DİNAMİK SEO METADATA
// Her makalenin başlığı ve özeti Google'a otomatik bildirilir.
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  
  return {
    title: `${post.title} | Nöbetçi Kepenk Tamiri`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: '2026-03-01', // Sabit veya dinamik tarih
      authors: ['Nöbetçi Kepenk Uzman Ekibi'],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // URL'den gelen slug ile doğru makaleyi bul
  const post = blogPosts.find((p) => p.slug === params.slug);

  // Makale yoksa 404 sayfasına at
  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Üst Header Kısmı */}
      <div className="bg-gray-50 border-b border-gray-100 pt-32 pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-brand-dark mb-8 transition-colors group"
          >
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Tüm Rehberlere Dön
          </Link>
          
          <div className="flex items-center gap-3 mb-4 text-sm text-brand-yellow font-bold uppercase tracking-wider">
            <span className="bg-brand-dark px-3 py-1 rounded-full text-xs text-white">Pratik Çözüm</span>
            <span>{post.date}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-dark leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-500 text-sm border-t border-gray-200 pt-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center text-brand-dark font-bold">N</div>
              <span className="font-medium text-gray-900">Nöbetçi Uzman</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>3 dk okuma süresi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Makale İçeriği */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* İçerik Gövdesi - HTML Render */}
        <div 
          className="prose prose-lg prose-headings:font-bold prose-headings:text-brand-dark prose-p:text-gray-600 prose-a:text-brand-yellow prose-strong:text-gray-900 prose-li:text-gray-600 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Ara Uyarı Kutusu (Güvenlik Uyarısı) */}
        <div className="my-12 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
          <div className="flex items-start gap-4">
            <AlertTriangle className="text-red-600 shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-bold text-red-900 text-lg mb-1">Dikkat Edin!</h4>
              <p className="text-red-800 text-sm leading-relaxed">
                Kepenk sistemleri yüksek gerilimli yaylarla çalışır. Yukarıdaki yöntemler sorunu çözmediyse <strong>zorlamaya devam etmeyin.</strong> Motoru yakabilir veya yayın fırlamasına sebep olabilirsiniz.
              </p>
            </div>
          </div>
        </div>

        {/* SATIŞ KAPATMA KUTUSU (Conversion Box) */}
        {/* Burası müşteriyi aramaya ikna ettiğimiz en önemli yer */}
        <div className="mt-16 relative overflow-hidden bg-brand-dark rounded-3xl text-white shadow-2xl transform transition-transform hover:scale-[1.01] duration-300">
          {/* Arka plan süslemeleri */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500 opacity-10 rounded-full blur-3xl -ml-16 -mb-16"></div>
          
          <div className="relative z-10 p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6 text-brand-yellow">
              <CheckCircle2 size={32} />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Sorun Devam mı Ediyor? <span className="text-brand-yellow">Riske Girmeyin.</span>
            </h3>
            
            <p className="text-gray-300 mb-8 max-w-lg mx-auto text-lg">
              Denemenize rağmen kepenk düzelmediyse mekanik bir parça kırılmış olabilir. İstanbul'un her yerine 45 dakikada gelip, garantili parça değişimi yapıyoruz.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:05364825205" 
                className="group flex items-center justify-center gap-3 bg-brand-yellow text-brand-dark font-bold text-lg px-8 py-4 rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(255,193,7,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
              >
                <Phone className="group-hover:rotate-12 transition-transform" size={24} />
                Hemen Usta Çağır
              </a>
              <a 
                href="https://wa.me/905364825205" 
                className="flex items-center justify-center gap-3 bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-green-500 transition-colors"
              >
                WhatsApp Destek
              </a>
            </div>
            <p className="mt-6 text-sm text-gray-400">
              ⚡ 7/24 Açığız • 🛡️ 2 Yıl Garanti • 🕒 45 Dk Varış Süresi
            </p>
          </div>
        </div>

      </div>
    </article>
  );
}