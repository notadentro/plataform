'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { MatchColumnsStep } from '@/types/lesson';

interface Props {
  data: Partial<MatchColumnsStep>;
  onChange: (data: Partial<MatchColumnsStep>) => void;
}

export function MatchColumnsForm({ data, onChange }: Props) {
  const pairs = data.pairs || [{ left: '', right: '' }];

  const updatePair = (index: number, side: 'left' | 'right', value: string) => {
    const newPairs = [...pairs];
    newPairs[index] = { ...newPairs[index], [side]: value };
    onChange({ ...data, pairs: newPairs });
  };

  const addPair = () => {
    onChange({ ...data, pairs: [...pairs, { left: '', right: '' }] });
  };

  const removePair = (index: number) => {
    const newPairs = pairs.filter((_, i) => i !== index);
    onChange({ ...data, pairs: newPairs });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-muted-foreground mb-1">Enunciado / Pergunta</label>
        <Input 
          value={data.question || ''} 
          onChange={(e) => onChange({ ...data, question: e.target.value })}
          placeholder="Ex: Conecte cada propriedade ao seu significado:"
          className="bg-card"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-muted-foreground mb-2">Pares Corretos</label>
        <div className="space-y-3">
          {pairs.map((pair, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input 
                value={pair.left} 
                onChange={(e) => updatePair(index, 'left', e.target.value)}
                placeholder="Ex: Altura"
                className="bg-card flex-1"
              />
              <span className="font-bold text-muted-foreground">↔</span>
              <Input 
                value={pair.right} 
                onChange={(e) => updatePair(index, 'right', e.target.value)}
                placeholder="Ex: Grave ou Agudo"
                className="bg-card flex-1"
              />
              {pairs.length > 1 && (
                <Button variant="ghost" size="icon" onClick={() => removePair(index)} className="text-red-500 hover:bg-red-500/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={addPair} className="mt-3">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Par
        </Button>
      </div>

      <div>
        <label className="block text-sm font-bold text-muted-foreground mb-1">Explicação Final (Feedback)</label>
        <Textarea 
          value={data.explanation || ''} 
          onChange={(e) => onChange({ ...data, explanation: e.target.value })}
          placeholder="Explicação exibida ao concluir o desafio..."
          className="bg-card h-20"
        />
      </div>
    </div>
  );
}
