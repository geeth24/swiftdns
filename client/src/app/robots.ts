import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://swiftdns.io';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/providers/', '/config', '/dns', '/api/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
