import Link from 'next/link';
import { blogPosts } from '@/lib/blogData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kepenk Tamiri Blog & Pratik Bilgiler | Nöbetçi Kepenk',
  description: 'Kepenk gıcırdaması, kumanda arızası ve yarıda kalma gibi sorunlar için pratik çözümler ve bakım önerileri.',
};

export default function BlogPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-4">
            Kepenk <span className="text-brand-yellow">Sorun & Çözüm Merkezi</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Ustasından tavsiyeler: Servis çağırmadan önce bunları deneyebilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link 
              href={`/blog/${post.slug}`} 
              key={post.id}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-2 bg-brand-yellow w-0 group-hover:w-full transition-all duration-500"></div>
              <div className="p-8">
                <div className="text-sm text-gray-400 font-bold mb-3">{post.date}</div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-dark transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 line-clamp-3 mb-4 text-sm">
                  {post.excerpt}
                </p>
                <span className="text-brand-dark font-semibold text-sm underline decoration-brand-yellow decoration-2 underline-offset-4 group-hover:text-brand-yellow transition-colors">
                  Çözümü Oku →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}