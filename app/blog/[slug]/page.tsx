import { notFound } from 'next/navigation';
import { blogPosts, getBlogPostBySlug } from '@/lib/blog';
import { Calendar, User, ArrowLeft, AlertTriangle } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const cleanSlug = decodeURIComponent(resolvedParams.slug);
  const post = getBlogPostBySlug(cleanSlug);
  
  if (!post) return { title: 'Makale Bulunamadı' };

  return { title: `${post.title} | Nöbetçi Kepenk Blog`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const cleanSlug = decodeURIComponent(resolvedParams.slug);
  const post = getBlogPostBySlug(cleanSlug);
  
  if (!post) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "datePublished": "2026-02-24", // Dinamik yapılabilir
    "author": {
      "@type": "Organization",
      "name": "Nöbetçi Kepenk Mühendislik Ekibi"
    }
  };

  return (
    <div className="bg-brand-light min-h-screen py-12 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <div className="container mx-auto max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-dark transition-colors mb-8 font-medium text-sm">
          <ArrowLeft size={16} /> Tüm Makalelere Dön
        </Link>

        <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-2"><Calendar size={16} className="text-brand-yellow" /> {post.date}</div>
            <div className="flex items-center gap-2"><User size={16} className="text-brand-yellow" /> Uzman Ekip</div>
          </div>

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark mb-8 leading-tight">
            {post.title}
          </h1>

          {/* İçerik Render Alanı - Prose class'ları ile otomatik tipografi stili */}
          <div 
            className="prose prose-lg max-w-none text-gray-600 prose-headings:font-heading prose-headings:text-brand-dark prose-headings:font-bold prose-a:text-brand-yellow prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>

        {/* Makale Altı Acil Durum Yönlendirmesi (İç Link & CRO) */}
        <div className="mt-8 bg-brand-dark rounded-3xl p-8 text-center text-white shadow-lg border-t-4 border-brand-yellow flex flex-col items-center">
          <AlertTriangle size={40} className="text-brand-yellow mb-4" />
          <h3 className="text-2xl font-bold font-heading mb-2">Bu Sorunu Mu Yaşıyorsunuz?</h3>
          <p className="text-gray-300 mb-6 max-w-lg">
            Teorik bilgi her zaman yeterli değildir. Sisteminize kalıcı zarar vermeden profesyonel destek alın. Avrupa yakasına 45 dakikada ulaşıyoruz.
          </p>
          <a href="tel:+905364825205" className="bg-brand-yellow text-brand-dark px-8 py-4 rounded-xl font-bold text-lg hover:bg-white transition-colors w-full md:w-auto">
            Uzmana Danış: 0536 482 52 05
          </a>
        </div>

      </div>
    </div>
  );
}