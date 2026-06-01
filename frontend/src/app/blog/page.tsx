import Link from 'next/link';
import { BLOG_POSTS } from '@/constants/blog';
import { Logo } from '@/components/logo';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Blog | Nota Dentro',
  description: 'Artigos, tutoriais e dicas sobre teoria musical, harmonia, ritmo e muito mais.',
};

export default function BlogListPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar Simplificada para o Blog */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b sticky top-0 z-20 bg-background/95 backdrop-blur">
        <Link href="/" className="flex items-center justify-center">
          <Logo className="h-8 w-8 text-foreground" />
          <span className="sr-only">Nota Dentro</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">Início</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Plataforma</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 md:py-16 max-w-5xl">
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Blog Nota Dentro</h1>
          <p className="text-xl text-muted-foreground">Dicas, tutoriais e teoria musical na prática.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-card rounded-2xl border hover:border-primary transition-colors overflow-hidden hover:shadow-lg">
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-2xl font-bold font-headline mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-6 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center text-primary font-bold">
                    <span>Ler mais</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t mt-auto">
        <p className="text-xs text-gray-500">© 2024 Nota Dentro. Todos os direitos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/">
            Voltar ao Início
          </Link>
        </nav>
      </footer>
    </div>
  );
}
