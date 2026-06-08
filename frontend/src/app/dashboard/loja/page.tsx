'use client';

import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { Coins, Heart, ShoppingBag, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserEconomy } from '@/types/user';
import Link from 'next/link';

export default function LojaVirtualPage() {
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  if (isUserLoading) return <div className="p-8 text-center text-muted-foreground">Carregando lojinha...</div>;

  const cacheBalance = user?.economy?.cache || 0;
  const isSpalla = user?.isSpalla || false;

  const handleBuyWithCache = async (cost: number, itemName: string, type: 'lives') => {
    if (!user) return;
    if (cacheBalance < cost) {
      toast({
        title: "Saldo Insuficiente",
        description: `Você precisa de ${cost} cachês para comprar ${itemName}. Continue estudando!`,
        variant: "destructive",
      });
      return;
    }

    if (isSpalla && type === 'lives') {
      toast({
        title: "Você já é Spalla!",
        description: "Assinantes Spalla possuem vidas infinitas, não é necessário comprar.",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      const newCache = cacheBalance - cost;
      
      let newLives = user.economy?.lives || 5;
      if (type === 'lives') {
        newLives += 1;
      }

      const updatedEconomy: UserEconomy = {
        maxLives: 5,
        cache: 0,
        ...user.economy,
        cache: newCache,
        lives: newLives,
      };

      await updateDoc(userRef, { economy: updatedEconomy });
      
      toast({
        title: "Compra Concluída! 🎉",
        description: `Você adquriu ${itemName} por ${cost} cachês.`,
        className: "bg-emerald-100 text-emerald-900 border-emerald-300"
      });
    } catch (error) {
      toast({ title: "Erro na compra", description: "Tente novamente mais tarde.", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBuyWithGooglePay = async () => {
    if (isSpalla) {
      toast({
        title: "Você já é Spalla!",
        description: "Assinantes Spalla possuem vidas infinitas.",
      });
      return;
    }

    setIsProcessing(true);
    // Simulação do Google Pay Modal
    setTimeout(async () => {
      try {
        if (!user) return;
        const userRef = doc(db, 'users', user.uid);
        const updatedEconomy: UserEconomy = {
          maxLives: 5,
          cache: 0,
          ...user.economy,
          lives: (user.economy?.lives || 5) + 5,
        };
        await updateDoc(userRef, { economy: updatedEconomy });
        
        toast({
          title: "Pagamento Aprovado! 💳",
          description: "Você recebeu +5 Vidas.",
          className: "bg-[#2D8A5C]/20 text-[#2D8A5C] border-[#2D8A5C]"
        });
      } catch (e) {
        console.error(e);
      } finally {
        setIsProcessing(false);
      }
    }, 1500);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 min-h-[calc(100vh-4rem)] font-body">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline text-foreground flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-brand-gold" />
            Lojinha do Conservatório
          </h1>
          <p className="text-muted-foreground mt-2">Troque seus cachês por vantagens exclusivas ou pague usando Google Pay.</p>
        </div>

        <div className="flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-2 rounded-xl border border-amber-300 font-bold">
          <Coins className="w-5 h-5 fill-amber-500" />
          <span>Meu Saldo: {cacheBalance} Cachês</span>
        </div>
      </header>

      {isSpalla && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 flex items-start gap-4">
          <Crown className="w-8 h-8 text-indigo-600 shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-indigo-900 font-headline">Área VIP Spalla</h3>
            <p className="text-indigo-700 text-sm mt-1">
              Como você tem o Plano Spalla, não precisa se preocupar em comprar vidas! Fique de olho, em breve teremos cosméticos exclusivos aqui.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Item 1: 1 Vida com Cachês */}
        <Card className="border-2 border-brand-graphite/20 hover:border-amber-400 transition-all">
          <CardHeader>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            </div>
            <CardTitle className="font-headline text-xl">1 Vida Extra</CardTitle>
            <CardDescription>Restaurar energia para continuar a lição.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-500 flex items-center gap-2">
              <Coins className="w-6 h-6 fill-amber-500" />
              5
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold" 
              onClick={() => handleBuyWithCache(5, "1 Vida Extra", "lives")}
              disabled={isProcessing || isSpalla}
            >
              Comprar
            </Button>
          </CardFooter>
        </Card>

        {/* Item 2: Microtransação em Reais (GPay Mock) */}
        <Card className="border-2 border-brand-graphite/20 hover:border-[#2D8A5C] transition-all relative overflow-hidden">
          <div className="absolute top-3 right-[-30px] bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-8 rotate-45">
            Oferta
          </div>
          <CardHeader>
            <div className="w-12 h-12 bg-[#2D8A5C]/20 rounded-full flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-[#2D8A5C] fill-[#2D8A5C]" />
            </div>
            <CardTitle className="font-headline text-xl">Kit 5 Vidas</CardTitle>
            <CardDescription>Estudou muito e as vidas zeraram? Compre o pack rápido!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 flex items-center gap-2">
              <span className="text-lg">R$</span> 5,00
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center gap-2" 
              onClick={handleBuyWithGooglePay}
              disabled={isProcessing || isSpalla}
            >
              <svg viewBox="0 0 40 40" className="w-5 h-5 fill-current"><path d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0zm0 30c-5.523 0-10-4.477-10-10S14.477 10 20 10s10 4.477 10 10-4.477 10-10 10zm-2-15h4v10h-4z"/></svg>
              Comprar com GPay
            </Button>
          </CardFooter>
        </Card>

        {/* Item 3: Teaser Produtos Físicos */}
        <Card className="border-2 border-slate-200 border-dashed bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 opacity-50">
              <ShoppingBag className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="font-bold text-lg text-slate-700 font-headline mb-2">Produtos Físicos</h3>
            <p className="text-sm text-slate-500 mb-6">Apostilas impressas e materiais exclusivos estão na nossa loja externa!</p>
            <Button variant="outline" asChild className="w-full border-slate-300">
              <Link href="/loja" target="_blank">Acessar Loja Externa</Link>
            </Button>
        </Card>
      </div>
    </div>
  );
}
