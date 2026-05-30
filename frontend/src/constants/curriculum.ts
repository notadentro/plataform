import { Lesson } from '@/types/lesson';

export const SCLIAR_CURRICULUM: Lesson[] = [
  {
    id: '1',
    slug: 'propriedades-do-som',
    title: 'O Som e Suas Propriedades',
    description: 'A matéria-prima da música e suas quatro qualidades fundamentais: Altura, Duração, Intensidade e Timbre.',
    status: 'available',
    module: 1,
    steps: [
      {
        id: '1-1',
        type: 'theory',
        title: 'A Matéria-Prima',
        data: {
          content: 'Na obra de Esther Scliar, aprendemos que a **música é a arte dos sons**. Portanto, o som é a matéria-prima da música. Sem som, não há música.'
        }
      },
      {
        id: '1-2',
        type: 'quiz',
        title: 'Teste rápido',
        data: {
          question: 'Segundo Esther Scliar, qual é a matéria-prima da música?',
          options: ['O silêncio', 'Os instrumentos', 'O som', 'A partitura'],
          correctAnswer: 'O som',
          explanation: 'O som é a base e a matéria-prima da música. É através dele que a arte musical se materializa.'
        }
      },
      {
        id: '1-3',
        type: 'theory',
        title: 'As Quatro Qualidades',
        data: {
          content: 'Todo som possui quatro qualidades (ou propriedades) fundamentais: **Altura**, **Duração**, **Intensidade** e **Timbre**.'
        }
      },
      {
        id: '1-4',
        type: 'quiz',
        title: 'Quais são as qualidades?',
        data: {
          question: 'Quais são as quatro qualidades fundamentais do som?',
          options: [
            'Agudo, Grave, Forte e Fraco',
            'Altura, Duração, Intensidade e Timbre',
            'Ritmo, Melodia, Harmonia e Timbre',
            'Semibreve, Mínima, Semínima e Colcheia'
          ],
          correctAnswer: 'Altura, Duração, Intensidade e Timbre',
          explanation: 'Estas são as propriedades físicas do som descritas por Scliar. Agudo/Grave são tipos de Altura, não propriedades independentes.'
        }
      },
      {
        id: '1-5',
        type: 'true_false',
        title: 'Mito ou Verdade?',
        data: {
          statement: 'A "Altura" é a propriedade que define se um som é forte ou fraco (o seu "volume").',
          isTrue: false,
          explanation: 'Falso! O volume é definido pela Intensidade. A Altura define se o som é Grave ou Agudo.'
        }
      }
    ]
  },
  {
    id: '2',
    slug: 'propriedades-visuais',
    title: 'Propriedades Visuais da Música',
    description: 'Aprenda como os sons são representados no papel através de figuras, claves e pautas.',
    status: 'available',
    module: 1,
    steps: [
      {
        id: '2-1',
        type: 'match_columns',
        title: 'Ligue os pontos',
        data: {
          question: 'Conecte cada propriedade do som ao seu significado na teoria musical:',
          pairs: [
            { left: 'Altura', right: 'Grave ou Agudo' },
            { left: 'Intensidade', right: 'Forte ou Fraco' },
            { left: 'Duração', right: 'Curto ou Longo' },
            { left: 'Timbre', right: 'Cor do Som' }
          ],
          explanation: 'Perfeito! O Timbre é o que nos permite distinguir a "cor" de cada instrumento. A altura define se é agudo ou grave, a intensidade se é forte ou fraco, e a duração o tempo do som.'
        }
      },
      {
        id: '2-2',
        type: 'memory_game',
        title: 'Jogo da Memória',
        data: {
          question: 'Encontre os pares entre símbolos musicais e seus nomes!',
          pairs: [
            { item1: 'Clave de Sol', item2: '𝄞' },
            { item1: 'Clave de Fá', item2: '𝄢' },
            { item1: 'Sustenido', item2: '♯' },
            { item1: 'Bemol', item2: '♭' }
          ],
          explanation: 'Muito bem! A Clave de Sol e Fá dão nome às notas nas pautas, enquanto os acidentes (♯ e ♭) alteram a altura original.'
        }
      },
      {
        id: '2-3',
        type: 'fill_blanks',
        title: 'Complete a Frase',
        data: {
          question: 'Preencha as lacunas com os conceitos do Pentagrama (Pauta Musical):',
          text: 'O pentagrama ou pauta musical é formado por {0} linhas e {1} espaços, que são sempre contados de {2} para {3}.',
          blanks: ['5', '4', 'baixo', 'cima'],
          options: ['5', '4', 'baixo', 'cima', '7', 'trás', 'frente', '6'],
          explanation: 'Exato! As cinco linhas e quatro espaços formam a pauta, e contamos sempre começando da linha mais inferior até a superior.'
        }
      }
    ]
  },
  {
    id: '3',
    slug: 'duracao-e-intensidade',
    title: 'Duração e Intensidade',
    description: 'Descubra a diferença entre sons longos/curtos e fortes/fracos.',
    status: 'locked',
    module: 1,
    steps: []
  }
];
