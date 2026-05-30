import { ReactNode } from 'react';
import { GamificationProvider } from '@/context/GamificationContext';

export default function LessonLayout({ children }: { children: ReactNode }) {
    return (
        <GamificationProvider>
            <div className="min-h-screen bg-background font-body flex flex-col selection:bg-brand-gold/30">
                {children}
            </div>
        </GamificationProvider>
    );
}
