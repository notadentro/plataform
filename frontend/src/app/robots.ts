import { MetadataRoute } from 'next';

const BASE_URL = 'https://notadentro.com.br';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/dashboard/', '/api/', '/cursos/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}