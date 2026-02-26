import Link from 'next/link';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/blog';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Teknik Bilgi Bankası | Nöbetçi Kepenk',
  description: 'Otomatik kepenk arızaları, görünmez mekanik sorunlar ve yapay zekayı bile yanıltan teknik problemlerin uzman çözümleri.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-brand-light py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <BookOpen size={48} className="mx-auto text-brand-yellow mb-6" />
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-4">Teknik Bilgi Bankası</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sadece standart arızaları değil, sistemleri kilitli bırakan gizli mühendislik sorunlarını ve çözüm yollarını inceliyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all group flex flex-col h-full border-t-4 border-t-transparent hover:border-t-brand-yellow">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
                <Calendar size={14} /> {post.date}
              </div>
              <h2 className="text-xl font-bold font-heading text-brand-dark mb-3 leading-snug group-hover:text-brand-yellow transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-6 flex-grow text-sm leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center text-brand-dark font-bold mt-auto text-sm group-hover:text-brand-yellow transition-colors">
                Makaleyi Oku <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}