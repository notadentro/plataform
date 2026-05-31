import Image from 'next/image';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

// Ajustamos as propriedades para o que o componente Image espera
export function Logo({ className, ...props }: Omit<ComponentProps<typeof Image>, 'src' | 'alt'>) {
  return (
    <>
      <Image
        src="/logo_black_full.png" 
        alt="Nota Dentro Logo"
        width={140}     
        height={45}     
        className={cn("object-contain dark:hidden", className)}
        priority
        {...props}      
      />
      <Image
        src="/logo_yellow_full.png" 
        alt="Nota Dentro Logo"
        width={140}     
        height={45}     
        className={cn("object-contain hidden dark:block", className)}
        priority
        {...props}      
      />
    </>
  );
}
