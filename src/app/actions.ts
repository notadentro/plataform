'use server';

import { personalizedLessonRecommendations, type PersonalizedLessonRecommendationsInput, type PersonalizedLessonRecommendationsOutput } from '@/ai/flows/personalized-lesson-recommendations';

const availableLessons: Array<{ lessonId: string; topic: string; difficulty: 'easy' | 'medium' | 'hard' }> = [
    { lessonId: '1', topic: 'Clave de Sol', difficulty: 'easy' },
    { lessonId: '2', topic: 'Clave de Fá', difficulty: 'easy' },
    { lessonId: '3', topic: 'Valores das Notas', difficulty: 'easy' },
    { lessonId: '4', topic: 'Compasso Simples', difficulty: 'medium' },
    { lessonId: '5', topic: 'Escalas Maiores', difficulty: 'medium' },
    { lessonId: '6', topic: 'Formação de Acordes', difficulty: 'hard' },
    { lessonId: '7', topic: 'Intervalos Musicais', difficulty: 'hard' },
];

export async function getPersonalizedRecommendations(): Promise<PersonalizedLessonRecommendationsOutput> {
    const learningHistory = [
        { lessonId: '1', score: 95, completionTime: 300 },
        { lessonId: '2', score: 80, completionTime: 400 },
        { lessonId: '3', score: 55, completionTime: 600 },
    ];

    const input: PersonalizedLessonRecommendationsInput = {
        userId: 'user123',
        learningHistory,
        availableLessons,
    };

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
        const recommendations = await personalizedLessonRecommendations(input);
        
        // Add topic and difficulty to recommendations for frontend use
        return recommendations.map(rec => {
            const lessonDetails = availableLessons.find(l => l.lessonId === rec.lessonId);
            return {
                ...rec,
                topic: lessonDetails?.topic || 'Tópico Desconhecido',
                difficulty: lessonDetails?.difficulty || 'normal',
            };
        });

    } catch (error) {
        console.error('Error fetching personalized recommendations:', error);
        return [];
    }
}
