'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { MemoryGameStep } from '@/types/lesson';

interface Props {
  data: Partial<MemoryGameStep>;
  onChange: (data: Partial<MemoryGameStep>) => void;
}

export function MemoryGameForm({ data, onChange }: Props) {
  const pairs = data.pairs || [{ item1: '', item2: '' }];

  const updatePair = (index: number, side: 'item1' | 'item2', value: string) => {
    const newPairs = [...pairs];
    newPairs[index] = { ...newPairs[index], [side]: value };
    onChange({ ...data, pairs: newPairs });
  };

  const addPair = () => {
    onChange({ ...data, pairs: [...pairs, { item1: '', item2: '' }] });
  };

  const removePair = (index: number) => {
    const newPairs = pairs.filter((_, i) => i !== index);
    onChange({ ...data, pairs: newPairs });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-muted-foreground mb-1">Instrução</label>
        <Input 
          value={data.question || ''} 
          onChange={(e) => onChange({ ...data, question: e.target.value })}
          placeholder="Ex: Encontre os pares entre símbolos e seus nomes!"
          className="bg-card"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-muted-foreground mb-2">Pares (Cartas que combinam)</label>
        <div className="space-y-3">
          {pairs.map((pair, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input 
                value={pair.item1} 
                onChange={(e) => updatePair(index, 'item1', e.target.value)}
                placeholder="Ex: Clave de Sol"
                className="bg-card flex-1"
              />
              <span className="font-bold text-muted-foreground">↔</span>
              <Input 
                value={pair.item2} 
                onChange={(e) => updatePair(index, 'item2', e.target.value)}
                placeholder="Ex: 𝄞"
                className="bg-card flex-1 text-center font-serif text-lg"
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
          placeholder="Explicação exibida quando todas as cartas forem viradas..."
          className="bg-card h-20"
        />
      </div>
    </div>
  );
}
