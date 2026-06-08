'use client';

import { ShoppingCart, ShoppingBag, Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export default function LojaExternaPage() {
  const products = [
    {
      id: 'f1',
      name: 'Apostila Método Scliar Vol 1',
      price: 45.90,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600&h=800',
      tag: 'Mais Vendido'
    },
    {
      id: 'f2',
      name: 'Caderno de Pautas Nota Dentro',
      price: 29.90,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600&h=800',
      tag: 'Novo'
    },
    {
      id: 'f3',
      name: 'Flashcards de Acordes',
      price: 35.00,
      image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=600&h=800',
      tag: ''
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      {/* Header Público */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Logo className="w-28 h-auto" />
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600">
              <Link href="#" className="text-slate-900">Todos os Produtos</Link>
              <Link href="#" className="hover:text-slate-900">Apostilas</Link>
              <Link href="#" className="hover:text-slate-900">Acessórios</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-gold rounded-full"></span>
            </Button>
            <Button asChild className="hidden sm:flex bg-[#2D8A5C] hover:bg-[#2D8A5C]/90 text-white font-bold rounded-full px-6">
              <Link href="/">Plataforma de Aulas</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-brand-black text-white py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <span className="inline-block py-1 px-3 bg-[#2D8A5C]/20 text-[#2D8A5C] font-bold text-xs uppercase tracking-wider rounded-full mb-4">
              Loja Oficial
            </span>
            <h1 className="text-4xl md:text-6xl font-bold font-headline leading-tight mb-6">
              O Material Físico para a sua Aprovação.
            </h1>
            <p className="text-lg text-brand-gray mb-8">
              Apostilas, cadernos de pauta e resumos diagramados para estudantes de música focados em THE e concursos militares.
            </p>
          </div>
          <div className="hidden md:block">
            <ShoppingBag className="w-64 h-64 text-brand-graphite/40" />
          </div>
        </div>
      </section>

      {/* Produtos */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold font-headline text-slate-900">Lançamentos</h2>
          <Button variant="ghost" className="text-indigo-600 font-bold hover:text-indigo-700 hover:bg-indigo-50">
            Ver todos <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-200 mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.tag && (
                  <div className="absolute top-4 left-4 bg-white text-slate-900 text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-full shadow-sm">
                    {product.tag}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-8">
                    Comprar Rápido
                  </Button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
              <p className="text-lg font-medium text-slate-500">R$ {product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Público Simples */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 font-medium">© {new Date().getFullYear()} Nota Dentro Store. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
