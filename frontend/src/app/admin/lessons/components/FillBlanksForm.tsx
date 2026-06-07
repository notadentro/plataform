'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { FillBlanksStep } from '@/types/lesson';

interface Props {
  data: Partial<FillBlanksStep>;
  onChange: (data: Partial<FillBlanksStep>) => void;
}

export function FillBlanksForm({ data, onChange }: Props) {
  const blanks = data.blanks || [];
  const options = data.options || [];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-muted-foreground mb-1">Enunciado / Instrução</label>
        <Input 
          value={data.question || ''} 
          onChange={(e) => onChange({ ...data, question: e.target.value })}
          placeholder="Ex: Preencha as lacunas com as propriedades corretas:"
          className="bg-card"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-muted-foreground mb-1">Texto Base (Use {'{0}'}, {'{1}'} para as lacunas)</label>
        <Textarea 
          value={data.text || ''} 
          onChange={(e) => onChange({ ...data, text: e.target.value })}
          placeholder="O som possui quatro qualidades: {0}, {1}, intensidade e timbre."
          className="bg-card h-20 font-mono"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Blanks - Respostas Exatas */}
        <div>
          <label className="block text-sm font-bold text-muted-foreground mb-2">
            Respostas das Lacunas (Na Ordem)
          </label>
          <div className="space-y-2">
            {blanks.map((ans, i) => (
              <div key={i} className="flex gap-2 items-center">
                <span className="text-muted-foreground font-mono font-bold w-6 text-right">{`{${i}}`}</span>
                <Input 
                  value={ans} 
                  onChange={(e) => {
                    const newB = [...blanks];
                    newB[i] = e.target.value;
                    onChange({ ...data, blanks: newB });
                  }}
                  className="bg-card flex-1"
                  placeholder="Resposta exata"
                />
                <Button variant="ghost" size="icon" onClick={() => {
                  onChange({ ...data, blanks: blanks.filter((_, idx) => idx !== i) });
                }} className="text-red-500 h-9 w-9 p-0">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => onChange({ ...data, blanks: [...blanks, ''] })}>
              <Plus className="w-4 h-4 mr-2" /> Adicionar Resposta
            </Button>
          </div>
        </div>

        {/* Options - Banco de Palavras */}
        <div>
          <label className="block text-sm font-bold text-muted-foreground mb-2">
            Banco de Palavras Extras (Misturadas com as respostas)
          </label>
          <div className="space-y-2">
            {options.map((opt, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input 
                  value={opt} 
                  onChange={(e) => {
                    const newO = [...options];
                    newO[i] = e.target.value;
                    onChange({ ...data, options: newO });
                  }}
                  className="bg-card flex-1"
                  placeholder="Palavra extra para confundir"
                />
                <Button variant="ghost" size="icon" onClick={() => {
                  onChange({ ...data, options: options.filter((_, idx) => idx !== i) });
                }} className="text-red-500 h-9 w-9 p-0">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => onChange({ ...data, options: [...options, ''] })}>
              <Plus className="w-4 h-4 mr-2" /> Adicionar Opção Extra
            </Button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-muted-foreground mb-1">Explicação Final (Feedback)</label>
        <Textarea 
          value={data.explanation || ''} 
          onChange={(e) => onChange({ ...data, explanation: e.target.value })}
          placeholder="Explicação final..."
          className="bg-card h-20"
        />
      </div>
    </div>
  );
}
