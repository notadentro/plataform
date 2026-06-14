import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/utils/content';

const BASE_URL = 'https://notadentro.com.br';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Exemplo de URL de curso (conforme critério do card, posteriormente virão do banco de dados/CMS)
    {
      url: `${BASE_URL}/curso/teoria-basica`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // 2. Rotas Dinâmicas (Artigos do Blog)
  try {
    const posts = await getBlogPosts();
    
    const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      // Se houver uma data de atualização no post, usamos ela. Caso contrário, a data de publicação ou hoje.
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    return [...staticRoutes, ...blogRoutes];
  } catch (error) {
    console.error('Erro ao buscar posts para o sitemap:', error);
    // Em caso de erro ao buscar o blog, pelo menos as rotas estáticas são retornadas
    return staticRoutes; 
  }
}