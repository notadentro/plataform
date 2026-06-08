'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Plus, Edit2, Trash2, Box } from 'lucide-react';
import { Product } from '@/types/store';

export default function AdminStorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular busca de produtos
    setTimeout(() => {
      setProducts([
        {
          id: 'p1',
          name: 'Apostila Método Scliar Vol 1',
          description: 'Apostila física impressa. Frete não incluso.',
          category: 'physical',
          price: 45.90,
          currency: 'brl',
          stock: 15,
          isActive: true
        },
        {
          id: 'v1',
          name: '1 Vida Extra',
          description: 'Restaura a energia imediatamente.',
          category: 'lives',
          price: 5,
          currency: 'cache',
          isActive: true
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline text-foreground flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-brand-gold" />
            Gerenciar Produtos
          </h1>
          <p className="text-muted-foreground mt-2">Adicione itens virtuais ou produtos físicos à loja da plataforma.</p>
        </div>
        
        <Button asChild className="bg-[#2D8A5C] hover:bg-[#2D8A5C]/90 text-white font-bold h-12 px-6">
          <Link href="/admin/store/create">
            <Plus className="w-5 h-5 mr-2" />
            Adicionar Produto
          </Link>
        </Button>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Carregando catálogo...</div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-brand-graphite/10 rounded-full flex items-center justify-center mb-4 text-brand-gray">
              <Box className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-headline mb-2 text-foreground">A vitrine está vazia</h3>
            <p className="text-muted-foreground mb-6">Cadastre seu primeiro produto físico ou pacote de vidas.</p>
            <Button asChild className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black">
              <Link href="/admin/store/create">Começar a cadastrar</Link>
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {products.map((product) => (
              <div key={product.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/50 transition-colors">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-lg text-foreground">{product.name}</h3>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                      product.category === 'physical' ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {product.category === 'physical' ? 'Físico' : 'Virtual'}
                    </span>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                      product.isActive ? 'bg-[#2D8A5C]/20 text-[#2D8A5C]' : 'bg-red-500/20 text-red-500'
                    }`}>
                      {product.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate max-w-2xl">{product.description}</p>
                  <p className="text-sm font-bold text-slate-800 mt-2">
                    {product.currency === 'brl' ? `R$ ${product.price.toFixed(2)}` : `${product.price} Cachês`}
                    {product.category === 'physical' && ` • Estoque: ${product.stock}`}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/store/edit/${product.id}`}>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Editar
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
