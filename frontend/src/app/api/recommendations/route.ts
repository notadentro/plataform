import { NextResponse } from 'next/server';
import { personalizedLessonRecommendations } from '@/ai/flows/personalized-lesson-recommendations';

export async function POST(req: Request) {
  try {
    const input = await req.json();
    const recommendations = await personalizedLessonRecommendations(input);
    return NextResponse.json(recommendations, { status: 200 });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
