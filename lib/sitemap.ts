import { MetadataRoute } from 'next';
import { services } from '@/lib/services';
import { districts } from '@/lib/districts';
import { blogPosts } from '@/lib/blog';

const baseUrl = 'https://www.nobetcikepenk.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Ana Statik Sayfalar
  const routes = [
    '',
    '/hizmetler',
    '/ilceler',
    '/acil-kepenk-tamiri',
    '/iletisim',
    '/sss',
    '/is-ornekleri',
    '/blog'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Dinamik Hizmet Sayfaları (Yüksek Öncelik)
  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/hizmetler/${service.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // 3. Dinamik İlçe Sayfaları (Yerel SEO)
  const districtRoutes = districts.map((district) => ({
    url: `${baseUrl}/ilceler/${district.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 4. Dinamik Blog Sayfaları (Otorite)
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...routes, ...serviceRoutes, ...districtRoutes, ...blogRoutes];
}