'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { TrueFalseStep } from '@/types/lesson';

interface Props {
  data: Partial<TrueFalseStep>;
  onChange: (data: Partial<TrueFalseStep>) => void;
}

export function TrueFalseForm({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-muted-foreground mb-1">Afirmação</label>
        <Textarea 
          value={data.statement || ''} 
          onChange={(e) => onChange({ ...data, statement: e.target.value })}
          placeholder="Ex: A altura é a propriedade que define se um som é forte ou fraco."
          className="bg-card h-20"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-muted-foreground mb-2">A afirmação é Verdadeira ou Falsa?</label>
        <div className="flex gap-4">
          <Button 
            type="button"
            variant={data.isTrue === true ? "default" : "outline"}
            className={data.isTrue === true ? "bg-brand-gold text-brand-black" : ""}
            onClick={() => onChange({ ...data, isTrue: true })}
          >
            Verdadeira
          </Button>
          <Button 
            type="button"
            variant={data.isTrue === false ? "default" : "outline"}
            className={data.isTrue === false ? "bg-red-500 text-white" : ""}
            onClick={() => onChange({ ...data, isTrue: false })}
          >
            Falsa
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-muted-foreground mb-1">Explicação Geral</label>
          <Textarea 
            value={data.explanation || ''} 
            onChange={(e) => onChange({ ...data, explanation: e.target.value })}
            placeholder="A explicação para mostrar ao aluno..."
            className="bg-card h-20"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-muted-foreground mb-1">Mensagem de Erro (Opcional)</label>
          <Textarea 
            value={data.wrongExplanation || ''} 
            onChange={(e) => onChange({ ...data, wrongExplanation: e.target.value })}
            placeholder="Dica extra caso ele erre..."
            className="bg-card h-20"
          />
        </div>
      </div>
    </div>
  );
}
