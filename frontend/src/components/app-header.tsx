'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserNav } from '@/components/user-nav';
import { Flame, Heart, Star, BookOpen, Home, Trophy, Menu } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';
import { motion } from 'framer-motion';
import { NotificationsPopover } from '@/modules/dashboard/components/notifications-popover';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Início', icon: Home },
  { href: '/dashboard/licoes', label: 'Lições', icon: BookOpen },
  { href: '/dashboard/conquistas', label: 'Conquistas', icon: Trophy },
];

export function AppHeader() {
  const pathname = usePathname();
  const { lives, xp, streak, isHydrated } = useGamification();

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
      
      {/* Esquerda: Mobile Menu Hambúrguer */}
      <div className="flex md:hidden items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Alternar menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SheetHeader>
               <SheetTitle className="sr-only">Navegação</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 pt-4">
              <Link href="/dashboard" className="flex items-center gap-2 mb-4">
                <Logo className="size-6 text-primary" />
                <span className="font-headline text-xl font-bold">Nota Dentro</span>
              </Link>
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                      pathname === item.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Esquerda: Desktop Navegação */}
      <nav className="hidden md:flex items-center gap-6 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-2 text-sm font-semibold transition-colors hover:text-primary font-body',
              pathname === item.href ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Centro: Logo */}
      <div className="flex justify-center flex-1 md:flex-none">
        <Link href="/dashboard" className="flex items-center gap-2 transition-transform hover:scale-105">
          <Logo className="size-6 text-primary" />
          <span className="font-headline text-xl font-bold hidden sm:inline-block">Nota Dentro</span>
        </Link>
      </div>

      {/* Direita: Gamificação e Ações */}
      <div className="flex items-center justify-end gap-2 md:gap-4 flex-1">
        
        {isHydrated && (
          <div className="hidden sm:flex items-center gap-3 md:gap-4 mr-2">
            {/* Vidas */}
            <div className={`flex items-center gap-1 font-bold ${lives > 0 ? 'text-red-500' : 'text-gray-400'}`}>
              <Heart size={18} className={lives > 0 ? "fill-red-500" : "fill-transparent"} />
              <motion.span key={lives} initial={{ scale: 1.5 }} animate={{ scale: 1 }}>
                {lives}
              </motion.span>
            </div>

            {/* Ofensiva */}
            <div className={`flex items-center gap-1 font-bold ${streak > 0 ? 'text-orange-500' : 'text-gray-400'}`}>
              <Flame size={18} className={streak > 0 ? "fill-orange-500" : "fill-transparent"} />
              <span>{streak}</span>
            </div>
            
            {/* XP */}
            <div className="flex items-center gap-1 text-[#2D8A5C] font-bold">
              <Star size={18} className="fill-[#2D8A5C]" />
              <motion.span key={xp} initial={{ scale: 1.5, color: '#FFD700' }} animate={{ scale: 1, color: '#2D8A5C' }}>
                {xp}
              </motion.span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-1">
          <NotificationsPopover />
          <UserNav />
        </div>
      </div>
      
    </header>
  );
}
