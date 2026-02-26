import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'], // İleride kuracağımız admin ve api rotalarını gizliyoruz
    },
    sitemap: 'https://www.nobetcikepenk.com/sitemap.xml',
  };
}