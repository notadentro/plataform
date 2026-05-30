import { SCLIAR_CURRICULUM } from '@/constants/curriculum';
import { LessonEngine } from '@/modules/lessons/components/LessonEngine';
import { redirect } from 'next/navigation';

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const resolvedParams = await params;
  const lesson = SCLIAR_CURRICULUM.find(l => l.id === resolvedParams.lessonId);

  if (!lesson) {
    redirect('/dashboard');
  }

  return <LessonEngine lesson={lesson} />;
}
