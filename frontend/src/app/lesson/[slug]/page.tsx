'use client';

import { useParams, useRouter } from 'next/navigation';
import { SCLIAR_CURRICULUM } from '@/constants/curriculum';
import { LessonEngine } from '@/modules/lesson/components/LessonEngine';
import { Button } from '@/components/ui/button';
import { useGamification } from '@/context/GamificationContext';

export default function LessonPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const { isHydrated } = useGamification();

    const lesson = SCLIAR_CURRICULUM.find(l => l.slug === slug);

    if (!isHydrated) return null;

    if (!lesson) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold font-headline text-brand-black dark:text-brand-white">Lição não encontrada</h1>
                <Button onClick={() => router.push('/dashboard')} className="mt-4 bg-brand-gold text-brand-black hover:bg-yellow-500">
                    Voltar ao Mapa
                </Button>
            </div>
        );
    }

    return (
        <LessonEngine lesson={lesson} onClose={() => router.push('/dashboard')} />
    );
}
