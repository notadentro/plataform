'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ProductCategory, CurrencyType } from '@/types/store';

export default function CreateProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'virtual' as ProductCategory,
    price: 0,
    currency: 'cache' as CurrencyType,
    stock: 0,
    isActive: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular o delay de rede e salvamento no Firestore
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Produto Cadastrado!",
        description: `"${formData.name}" foi adicionado com sucesso à loja.`,
        className: "bg-emerald-100 text-emerald-900 border-emerald-300"
      });
      router.push('/admin/store');
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 font-body">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild className="rounded-full shrink-0">
          <Link href="/admin/store">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-headline text-foreground">Novo Produto</h1>
          <p className="text-muted-foreground mt-1">Preencha os detalhes para disponibilizar na Lojinha.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Informações Básicas</CardTitle>
            <CardDescription>Nome, categoria e preço que os alunos vão visualizar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Produto</Label>
              <Input 
                id="name" 
                placeholder="Ex: 5 Vidas Extras ou Caderno Scliar" 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <textarea 
                id="description" 
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Detalhes sobre o que o aluno receberá..."
                required
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <select 
                  id="category"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value as ProductCategory})}
                >
                  <option value="virtual">Virtual (Genérico)</option>
                  <option value="lives">Vidas</option>
                  <option value="cosmetic">Cosmético (Avatares, Cores)</option>
                  <option value="physical">Físico (Apostilas, Camisetas)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Moeda</Label>
                <select 
                  id="currency"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={formData.currency}
                  onChange={e => setFormData({...formData, currency: e.target.value as CurrencyType})}
                >
                  <option value="cache">Cachê (Moeda Virtual)</option>
                  <option value="brl">Reais - BRL (Pagamento Real)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price">Preço</Label>
                <Input 
                  id="price" 
                  type="number"
                  step="0.01"
                  min="0"
                  required 
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                />
              </div>

              {formData.category === 'physical' && (
                <div className="space-y-2">
                  <Label htmlFor="stock">Estoque Inicial</Label>
                  <Input 
                    id="stock" 
                    type="number"
                    min="0"
                    required 
                    value={formData.stock}
                    onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/store">Cancelar</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-[#2D8A5C] hover:bg-[#2D8A5C]/90 text-white font-bold">
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? "Salvando..." : "Salvar Produto"}
          </Button>
        </div>
      </form>
    </div>
  );
}
