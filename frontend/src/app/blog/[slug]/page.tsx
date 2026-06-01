import { BLOG_POSTS } from '@/constants/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Artigo não encontrado | Nota Dentro' };

  return {
    title: `${post.title} | Blog Nota Dentro`,
    description: post.excerpt,
  };
}

// Isso permite que o Next.js gere as páginas estáticas durante o build (Otimização Máxima de SEO)
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b sticky top-0 z-20 bg-background/95 backdrop-blur">
        <Link href="/" className="flex items-center justify-center">
          <Logo className="h-8 w-8 text-foreground" />
          <span className="sr-only">Nota Dentro</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/blog">Blog</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Plataforma</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 md:py-16 max-w-3xl">
        <Button variant="ghost" asChild className="mb-8 -ml-4 text-muted-foreground hover:text-foreground">
          <Link href="/blog">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para o Blog
          </Link>
        </Button>

        <article className="prose prose-lg dark:prose-invert prose-brand max-w-none">
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8 not-prose">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
          </div>

          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </article>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t mt-auto">
        <p className="text-xs text-gray-500">© 2024 Nota Dentro. Todos os direitos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/">
            Início
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/blog">
            Blog
          </Link>
        </nav>
      </footer>
    </div>
  );
}
