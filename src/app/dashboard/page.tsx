'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { UserProgress } from '@/components/dashboard/user-progress';
import { RecommendedLessons } from '@/components/dashboard/recommended-lessons';
import { AchievementIcon } from '@/components/dashboard/achievement-icon';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const continueLessonImage = PlaceHolderImages.find(img => img.id === 'lesson-continue');
    const { user } = useUser();
    const router = useRouter();

    const achievements = [
        { title: "Iniciante", description: "Completou 10 lições" },
        { title: "Ouvido de Ouro", description: "Acertou 50 notas" },
        { title: "Maratonista", description: "Estudou por 7 dias" },
        { title: "Maestro", description: "Alcançou o nível 10" },
    ];

    return (
        <div className="p-4 md:p-6 space-y-6">
            <h1 className="text-3xl font-bold font-headline">Olá, {user?.displayName?.split(' ')[0] || 'Aluno'}! 👋</h1>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="overflow-hidden">
                        <div className="grid md:grid-cols-2">
                            <div className="p-6">
                                <CardHeader className="p-0 mb-4">
                                    <CardTitle className="font-headline text-xl">Continue Aprendendo</CardTitle>
                                    <CardDescription>Sua próxima lição: Ritmos Básicos</CardDescription>
                                </CardHeader>
                                <CardContent className="p-0 mb-6">
                                    <p className="text-sm text-muted-foreground">Aprenda a diferenciar semínimas, colcheias e semicolcheias para dominar o tempo na música.</p>
                                </CardContent>
                                <CardFooter className="p-0">
                                    <Button size="lg" className="w-full sm:w-auto">
                                        <span>Começar</span>
                                        <ChevronRight />
                                    </Button>
                                </CardFooter>
                            </div>
                            {continueLessonImage &&
                                <div className="relative min-h-[200px] md:min-h-0">
                                    <Image
                                        src={continueLessonImage.imageUrl}
                                        alt={continueLessonImage.description}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={continueLessonImage.imageHint}
                                    />
                                     <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-card to-transparent"></div>
                                </div>
                            }
                        </div>
                    </Card>

                    <div>
                        <h2 className="text-2xl font-bold font-headline mb-4">Recomendado para você</h2>
                        <RecommendedLessons />
                    </div>
                </div>

                <div className="space-y-6">
                    <UserProgress />
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-lg">Conquistas Recentes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-around gap-4">
                                {achievements.slice(0,3).map(ach => (
                                    <AchievementIcon key={ach.title} title={ach.title} description={ach.description}/>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                           <Button variant="outline" className="w-full" onClick={() => router.push('/dashboard/conquistas')}>Ver todas as conquistas</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
