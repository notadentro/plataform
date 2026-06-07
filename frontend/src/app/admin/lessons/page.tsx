'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, Edit2, Trash2 } from 'lucide-react';
import { Lesson } from '@/types/lesson';

export default function AdminLessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const res = await fetch('/api/admin/content?type=lessons');
      if (!res.ok) throw new Error('Falha ao buscar lições');
      const data = await res.json();
      setLessons(data.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline text-foreground flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-brand-gold" />
            Gerenciar Lições
          </h1>
          <p className="text-muted-foreground mt-2">Crie e gerencie o conteúdo interativo da plataforma.</p>
        </div>
        
        <Button asChild className="bg-[#2D8A5C] hover:bg-[#2D8A5C]/90 text-white font-bold h-12 px-6">
          <Link href="/admin/lessons/create">
            <Plus className="w-5 h-5 mr-2" />
            Criar Nova Lição
          </Link>
        </Button>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Carregando lições...</div>
        ) : lessons.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-brand-graphite/10 rounded-full flex items-center justify-center mb-4 text-brand-gray">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-headline mb-2 text-foreground">Nenhuma lição encontrada</h3>
            <p className="text-muted-foreground mb-6">Você ainda não criou nenhuma lição no repositório.</p>
            <Button asChild className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black">
              <Link href="/admin/lessons/create">Começar a criar</Link>
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/50 transition-colors">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-lg text-foreground">{lesson.title}</h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-graphite/20 text-muted-foreground">
                      Módulo {lesson.module}
                    </span>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                      lesson.status === 'available' ? 'bg-[#2D8A5C]/20 text-[#2D8A5C]' : 
                      lesson.status === 'completed' ? 'bg-brand-gold/20 text-brand-gold' : 
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {lesson.status === 'available' ? 'Disponível' : lesson.status === 'completed' ? 'Concluída' : 'Bloqueada'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate max-w-2xl">{lesson.description}</p>
                  <p className="text-xs text-brand-gray mt-2 font-mono">{lesson.steps?.length || 0} passos cadastrados</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/lessons/edit/${lesson.id}`}>
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
