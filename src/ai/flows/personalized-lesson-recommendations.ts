'use server';
/**
 * @fileOverview AI-powered lesson personalization flow.
 *
 * This file defines a Genkit flow that analyzes a user's learning progress and recommends personalized lessons based on their areas of difficulty.
 *
 * - personalizedLessonRecommendations -  A function that retrieves personalized lesson recommendations for a user.
 * - PersonalizedLessonRecommendationsInput - The input type for the personalizedLessonRecommendations function.
 * - PersonalizedLessonRecommendationsOutput - The return type for the personalizedLessonRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedLessonRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user for whom to generate lesson recommendations.'),
  learningHistory: z.array(z.object({
    lessonId: z.string(),
    score: z.number().min(0).max(100),
    completionTime: z.number(),
  })).describe('A list of the user\'s past lessons, scores, and completion times.'),
  availableLessons: z.array(z.object({
    lessonId: z.string(),
    topic: z.string(),
    difficulty: z.enum(['easy', 'medium', 'hard']),
  })).describe('A list of all available lessons with their topics and difficulty levels.'),
});

export type PersonalizedLessonRecommendationsInput = z.infer<typeof PersonalizedLessonRecommendationsInputSchema>;

const PersonalizedLessonRecommendationsOutputSchema = z.array(z.object({
  lessonId: z.string().describe('The ID of the recommended lesson.'),
  reason: z.string().describe('The reason why this lesson was recommended.'),
}));

export type PersonalizedLessonRecommendationsOutput = z.infer<typeof PersonalizedLessonRecommendationsOutputSchema>;

export async function personalizedLessonRecommendations(input: PersonalizedLessonRecommendationsInput): Promise<PersonalizedLessonRecommendationsOutput> {
  return personalizedLessonRecommendationsFlow(input);
}

const personalizedLessonRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedLessonRecommendationsPrompt',
  input: {schema: PersonalizedLessonRecommendationsInputSchema},
  output: {schema: PersonalizedLessonRecommendationsOutputSchema},
  prompt: `You are an AI-powered music education assistant that specializes in providing personalized lesson recommendations to users.

Analyze the user's learning history and available lessons to recommend lessons that will help them improve their musical skills.

Consider the user's performance on past lessons, focusing on areas where they struggled or performed poorly. 

Recommend lessons that cover those specific topics or skills, and explain why each lesson is recommended.

User ID: {{userId}}
Learning History: {{learningHistory}}
Available Lessons: {{availableLessons}}`,
});

const personalizedLessonRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedLessonRecommendationsFlow',
    inputSchema: PersonalizedLessonRecommendationsInputSchema,
    outputSchema: PersonalizedLessonRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedLessonRecommendationsPrompt(input);
    return output!;
  }
);
