'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Target, BookOpen, Trophy, Compass, Star, GraduationCap, Zap, Music, Check } from 'lucide-react';

type OnboardingStep = 'goal' | 'focus' | 'instrument' | 'level' | 'success';

const GOALS = [
  { id: 'esa', label: 'ESA', icon: Trophy, description: 'Sargento do Exército' },
  { id: 'eags', label: 'EAGS', icon: Target, description: 'Sargento da Aeronáutica' },
  { id: 'fuzileiros', label: 'Fuzileiros Navais', icon: Compass, description: 'Sargento da Marinha' },
  { id: 'the', label: 'THE Universitário', icon: GraduationCap, description: 'Vestibular de Música' },
  { id: 'livre', label: 'Estudo Livre', icon: BookOpen, description: 'Aprender sem pressão' },
];

const FOCUS_OPTIONS = [
  { id: 'harmonia', label: 'Harmonia', description: 'Cifras, Acordes e Acompanhamento' },
  { id: 'melodia', label: 'Melodia', description: 'Leitura de Partitura e Solfejo' },
  { id: 'ritmo', label: 'Ritmo & Percussão', description: 'Leitura rítmica e divisão de tempo' },
  { id: 'geral', label: 'Um pouco de tudo', description: 'Quero aprender as bases primeiro' },
];

const INSTRUMENTS_HARMONIC = [
  { id: 'violao', label: 'Violão' },
  { id: 'piano', label: 'Piano' },
  { id: 'teclado', label: 'Teclado' },
  { id: 'guitarra', label: 'Guitarra' },
  { id: 'ukulele', label: 'Ukulele' },
  { id: 'acordeon', label: 'Acordeon' },
  { id: 'harpa', label: 'Harpa' },
];

const INSTRUMENTS_MELODIC = [
  { id: 'voz', label: 'Voz / Canto' },
  { id: 'violino', label: 'Violino' },
  { id: 'viola-classica', label: 'Viola Clássica' },
  { id: 'violoncelo', label: 'Violoncelo' },
  { id: 'baixo', label: 'Contrabaixo / Baixo Elétrico' },
  { id: 'flauta', label: 'Flauta (Doce / Transversal)' },
  { id: 'clarinete', label: 'Clarinete' },
  { id: 'saxofone', label: 'Saxofone' },
  { id: 'trompete', label: 'Trompete' },
  { id: 'trombone', label: 'Trombone' },
  { id: 'trompa', label: 'Trompa' },
  { id: 'tuba', label: 'Tuba' },
  { id: 'oboe', label: 'Oboé / Fagote' },
];

const INSTRUMENTS_PERCUSSION = [
  { id: 'bateria', label: 'Bateria' },
  { id: 'percussao-sinfonica', label: 'Percussão Sinfônica (Tímpanos, etc)' },
  { id: 'teclas-percussivas', label: 'Xilofone / Marimba / Vibrafone' },
  { id: 'percussao-popular', label: 'Percussão Popular (Cajón, Pandeiro)' },
];

const ALL_INSTRUMENTS = [...INSTRUMENTS_HARMONIC, ...INSTRUMENTS_MELODIC, ...INSTRUMENTS_PERCUSSION];

const LEVELS = [
  { id: 'iniciante', label: 'Iniciante', icon: Star, description: 'Estou começando do zero' },
  { id: 'intermediario', label: 'Intermediário', icon: Music, description: 'Já sei ler partituras' },
  { id: 'avancado', label: 'Avançado', icon: Zap, description: 'Domino teoria musical' },
];

export function OnboardingModal() {
  const { completeOnboarding, user } = useUser();
  const [step, setStep] = useState<OnboardingStep>('goal');
  
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedFocus, setSelectedFocus] = useState('');
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [showAllInstruments, setShowAllInstruments] = useState(false);

  const handleNext = () => {
    if (step === 'goal' && selectedGoal) {
      if (selectedGoal === 'livre') {
        setStep('focus');
      } else {
        setStep('level');
      }
    } else if (step === 'focus' && selectedFocus) {
      setStep('instrument');
    } else if (step === 'instrument' && selectedInstruments.length > 0) {
      setStep('level');
    } else if (step === 'level' && selectedLevel) {
      setStep('success');
    }
  };

  const handleBack = () => {
    if (step === 'level') {
      if (selectedGoal === 'livre') setStep('instrument');
      else setStep('goal');
    } else if (step === 'instrument') {
      setStep('focus');
    } else if (step === 'focus') {
      setStep('goal');
    }
  };

  const toggleInstrument = (id: string) => {
    setSelectedInstruments(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleComplete = () => {
    completeOnboarding(
      selectedGoal, 
      selectedLevel, 
      selectedGoal === 'livre' ? selectedFocus : undefined, 
      selectedGoal === 'livre' ? selectedInstruments : undefined
    );
  };

  const displayedInstruments = selectedFocus === 'geral' || showAllInstruments
    ? ALL_INSTRUMENTS
    : selectedFocus === 'harmonia' 
      ? INSTRUMENTS_HARMONIC 
      : selectedFocus === 'melodia' 
        ? INSTRUMENTS_MELODIC 
        : INSTRUMENTS_PERCUSSION;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden bg-brand-black/95 backdrop-blur-md flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 min-h-screen">
        <div className="w-full max-w-2xl relative pb-8">
          <AnimatePresence mode="wait">
          
          {/* STEP 1: GOAL */}
          {step === 'goal' && (
            <motion.div
              key="goal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-white">
                  Bem-vindo(a), {user?.name?.split(' ')[0]}! 👋
                </h2>
                <p className="text-lg text-brand-white/70">
                  Qual é o seu principal objetivo na plataforma?
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {GOALS.map((goal) => {
                  const Icon = goal.icon;
                  const isSelected = selectedGoal === goal.id;
                  
                  return (
                    <Card
                      key={goal.id}
                      onClick={() => setSelectedGoal(goal.id)}
                      className={`p-4 cursor-pointer border-2 transition-all hover:-translate-y-1 ${
                        isSelected 
                          ? 'border-brand-gold bg-brand-gold/10' 
                          : 'border-white/10 bg-white/5 hover:border-brand-gold/50'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-full ${isSelected ? 'bg-brand-gold text-brand-black' : 'bg-white/10 text-brand-gold'}`}>
                          <Icon size={24} />
                        </div>
                        <div className="text-left">
                          <h3 className="font-heading font-bold text-brand-white">{goal.label}</h3>
                          <p className="text-sm text-brand-white/60">{goal.description}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div className="pt-8 w-full flex justify-center">
                <Button 
                  onClick={handleNext} 
                  disabled={!selectedGoal}
                  className="w-full md:w-1/2 py-6 text-lg font-bold bg-brand-gold text-brand-black hover:bg-brand-gold/90"
                >
                  Continuar
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: FOCUS (Only for Livre) */}
          {step === 'focus' && (
            <motion.div
              key="focus"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-white">
                  Em que área você quer focar? 🎯
                </h2>
                <p className="text-lg text-brand-white/70">
                  Como é um estudo livre, vamos alinhar o melhor ponto de partida.
                </p>
              </div>

              <div className="flex flex-col space-y-4 max-w-md mx-auto">
                {FOCUS_OPTIONS.map((foc) => {
                  const isSelected = selectedFocus === foc.id;
                  return (
                    <Card
                      key={foc.id}
                      onClick={() => setSelectedFocus(foc.id)}
                      className={`p-4 cursor-pointer border-2 transition-all hover:-translate-y-1 ${
                        isSelected 
                          ? 'border-brand-gold bg-brand-gold/10' 
                          : 'border-white/10 bg-white/5 hover:border-brand-gold/50'
                      }`}
                    >
                      <div className="text-center">
                        <h3 className="font-heading font-bold text-brand-white">{foc.label}</h3>
                        <p className="text-sm text-brand-white/60 mt-1">{foc.description}</p>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div className="pt-8 flex space-x-4 max-w-md mx-auto w-full">
                <Button onClick={handleBack} variant="outline" className="w-1/3 py-6 text-lg border-white/20 hover:bg-white/10">Voltar</Button>
                <Button onClick={handleNext} disabled={!selectedFocus} className="w-2/3 py-6 text-lg font-bold bg-brand-gold text-brand-black hover:bg-brand-gold/90">Continuar</Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: INSTRUMENTS (Only for Livre) */}
          {step === 'instrument' && (
            <motion.div
              key="instrument"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-white">
                  Qual o seu instrumento? 🎸
                </h2>
                <p className="text-lg text-brand-white/70">
                  Selecione um ou mais instrumentos do seu interesse.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {displayedInstruments.map((inst) => {
                  const isSelected = selectedInstruments.includes(inst.id);
                  return (
                    <Card
                      key={inst.id}
                      onClick={() => toggleInstrument(inst.id)}
                      className={`p-4 flex items-center justify-between cursor-pointer border-2 transition-all ${
                        isSelected 
                          ? 'border-[#2D8A5C] bg-[#2D8A5C]/20' 
                          : 'border-white/10 bg-white/5 hover:border-brand-gold/30'
                      }`}
                    >
                      <span className="font-bold text-brand-white">{inst.label}</span>
                      {isSelected && <Check size={18} className="text-[#2D8A5C]" />}
                    </Card>
                  );
                })}
              </div>

              {selectedFocus !== 'geral' && !showAllInstruments && (
                <div className="mt-6 flex justify-center">
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowAllInstruments(true)}
                    className="text-brand-gold hover:text-brand-gold/80 hover:bg-brand-gold/10 font-bold"
                  >
                    + Explorar instrumentos de outras áreas
                  </Button>
                </div>
              )}

              <div className="pt-8 flex space-x-4 mx-auto w-full max-w-md">
                <Button onClick={handleBack} variant="outline" className="w-1/3 py-6 text-lg border-white/20 hover:bg-white/10">Voltar</Button>
                <Button onClick={handleNext} disabled={selectedInstruments.length === 0} className="w-2/3 py-6 text-lg font-bold bg-brand-gold text-brand-black hover:bg-brand-gold/90">Continuar</Button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: LEVEL */}
          {step === 'level' && (
            <motion.div
              key="level"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-white">
                  Qual o seu nível atual? 📊
                </h2>
                <p className="text-lg text-brand-white/70">
                  Isso nos ajuda a calibrar os seus exercícios iniciais.
                </p>
              </div>

              <div className="flex flex-col space-y-4 max-w-md mx-auto">
                {LEVELS.map((lvl) => {
                  const Icon = lvl.icon;
                  const isSelected = selectedLevel === lvl.id;
                  
                  return (
                    <Card
                      key={lvl.id}
                      onClick={() => setSelectedLevel(lvl.id)}
                      className={`p-4 cursor-pointer border-2 transition-all hover:-translate-y-1 ${
                        isSelected 
                          ? 'border-brand-gold bg-brand-gold/10' 
                          : 'border-white/10 bg-white/5 hover:border-brand-gold/50'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-full ${isSelected ? 'bg-brand-gold text-brand-black' : 'bg-white/10 text-brand-gold'}`}>
                          <Icon size={24} />
                        </div>
                        <div className="text-left">
                          <h3 className="font-heading font-bold text-brand-white">{lvl.label}</h3>
                          <p className="text-sm text-brand-white/60">{lvl.description}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div className="pt-8 flex space-x-4 max-w-md mx-auto w-full">
                <Button onClick={handleBack} variant="outline" className="w-1/3 py-6 text-lg border-white/20 hover:bg-white/10">Voltar</Button>
                <Button onClick={handleNext} disabled={!selectedLevel} className="w-2/3 py-6 text-lg font-bold bg-brand-gold text-brand-black hover:bg-brand-gold/90">Finalizar</Button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: SUCCESS */}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#2D8A5C]/20 text-[#2D8A5C] mb-4">
                <Target size={48} />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-white">
                  Tudo Pronto! 🚀
                </h2>
                <p className="text-xl text-brand-white/70 max-w-lg mx-auto">
                  Anotamos suas preferências. Prepare-se para transformar a teoria musical em um jogo viciante.
                </p>
              </div>

              <Button 
                onClick={handleComplete} 
                className="w-full md:w-1/2 py-6 text-xl font-bold bg-brand-gold text-brand-black hover:bg-brand-gold/90 animate-pulse"
              >
                Começar a Jogar
              </Button>
            </motion.div>
          )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
