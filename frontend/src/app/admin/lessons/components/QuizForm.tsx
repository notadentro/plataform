'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { QuizStep } from '@/types/lesson';

interface Props {
  data: Partial<QuizStep>;
  onChange: (data: Partial<QuizStep>) => void;
}

export function QuizForm({ data, onChange }: Props) {
  const options = data.options || ['', '', '', ''];

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    onChange({ ...data, options: newOptions });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-muted-foreground mb-1">Pergunta do Quiz</label>
        <Textarea 
          value={data.question || ''} 
          onChange={(e) => onChange({ ...data, question: e.target.value })}
          placeholder="Digite a pergunta principal..."
          className="bg-card h-20"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((opt, index) => (
          <div key={index}>
            <label className="block text-sm font-bold text-muted-foreground mb-1">Opção {index + 1}</label>
            <Input 
              value={opt} 
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Alternativa ${index + 1}`}
              className="bg-card"
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-bold text-muted-foreground mb-1">Resposta Correta (Deve ser igual a uma das opções acima)</label>
        <Input 
          value={data.correctAnswer || ''} 
          onChange={(e) => onChange({ ...data, correctAnswer: e.target.value })}
          placeholder="Digite exatamente o texto da opção correta"
          className="bg-card border-brand-gold/50 focus:border-brand-gold"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-muted-foreground mb-1">Explicação da Resposta Correta (Feedback)</label>
        <Textarea 
          value={data.explanation || ''} 
          onChange={(e) => onChange({ ...data, explanation: e.target.value })}
          placeholder="Explique por que esta resposta está certa..."
          className="bg-card h-20"
        />
      </div>
    </div>
  );
}
