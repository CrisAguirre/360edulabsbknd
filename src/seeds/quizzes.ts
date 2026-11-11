import type { QuizQuestion } from '../models/Quiz';

export interface QuizSeed {
  missionCode: string;
  title: string;
  passScore: number;
  maxAttempts: number;
  questions: QuizQuestion[];
}

export const quizzesSeed: QuizSeed[] = [
  {
    missionCode: 'm1',
    title: '¿Qué aprendiste sobre la célula?',
    passScore: 70,
    maxAttempts: 0,
    questions: [
      {
        id: 'm1q1',
        type: 'single',
        text: '¿Qué tienen en común una planta, un animal y una bacteria?',
        options: [
          { id: 'a', text: 'Todos están formados por células.' },
          { id: 'b', text: 'Todos tienen cloroplastos.' },
          { id: 'c', text: 'Todos son del mismo tamaño.' },
          { id: 'd', text: 'Todos pueden volar.' }
        ],
        correctAnswers: ['a'],
        feedback: 'Correcto: todos los seres vivos están formados por una o más células. La bacteria es unicelular; la planta y el animal son pluricelulares.'
      },
      {
        id: 'm1q2',
        type: 'single',
        text: '¿Quién observó por primera vez células en el corcho y les dio ese nombre?',
        options: [
          { id: 'a', text: 'Robert Hooke.' },
          { id: 'b', text: 'Anton van Leeuwenhoek.' },
          { id: 'c', text: 'Rudolf Virchow.' },
          { id: 'd', text: 'Theodor Schwann.' }
        ],
        correctAnswers: ['a'],
        feedback: 'Hooke observó en 1665 unas celdas parecidas a un panal en el corcho. Las llamó células, aunque eran paredes vacías.'
      },
      {
        id: 'm1q3',
        type: 'single',
        text: '¿Cuál de estos postulados pertenece a la teoría celular?',
        options: [
          { id: 'a', text: 'Toda célula proviene de otra célula.' },
          { id: 'b', text: 'Solo los animales tienen células.' },
          { id: 'c', text: 'Las células no tienen núcleo.' },
          { id: 'd', text: 'Los virus son células.' }
        ],
        correctAnswers: ['a'],
        feedback: 'La teoría celular afirma que toda célula proviene de otra célula. Las células se dividen; no aparecen de la nada.'
      },
      {
        id: 'm1q4',
        type: 'single',
        text: '¿Cuál es el orden correcto de estos aportes a la teoría celular?',
        options: [
          { id: 'a', text: 'Hooke observa células en el corcho → Leeuwenhoek descubre microorganismos → Schleiden y Schwann proponen que todos los seres vivos tienen células → Virchow afirma que toda célula proviene de otra.' },
          { id: 'b', text: 'Virchow → Hooke → Leeuwenhoek → Schleiden.' },
          { id: 'c', text: 'Leeuwenhoek → Virchow → Hooke → Schwann.' },
          { id: 'd', text: 'Schleiden → Hooke → Virchow → Leeuwenhoek.' }
        ],
        correctAnswers: ['a'],
        feedback: 'Cada científico aportó una pieza distinta y el conocimiento se construyó poco a poco, durante casi dos siglos.'
      },
      {
        id: 'm1q5',
        type: 'single',
        text: '¿Por qué se dice que la célula es la unidad funcional de la vida?',
        options: [
          { id: 'a', text: 'Porque realiza las funciones vitales del ser vivo.' },
          { id: 'b', text: 'Porque es la estructura más grande del cuerpo.' },
          { id: 'c', text: 'Porque solo existe en las plantas.' },
          { id: 'd', text: 'Porque nunca cambia ni se divide.' }
        ],
        correctAnswers: ['a'],
        feedback: 'La célula es la unidad funcional porque en ella ocurren las funciones vitales: obtener energía, crecer, responder y reproducirse.'
      },
      {
        id: 'm1q6',
        type: 'true_false',
        text: 'Los virus son seres celulares.',
        options: [
          { id: 'true', text: 'Verdadero.' },
          { id: 'false', text: 'Falso.' }
        ],
        correctAnswers: ['false'],
        feedback: 'Falso: los virus no son células. Necesitan una célula para reproducirse, por eso la teoría celular no los incluye como seres celulares.'
      }
    ]
  },
  {
    missionCode: 'm2',
    title: 'Células bajo la lupa',
    passScore: 70,
    maxAttempts: 0,
    questions: [
      {
        id: 'm2q1',
        type: 'single',
        text: '¿Qué estructura rodea a la célula y controla el intercambio de sustancias?',
        options: [
          { id: 'a', text: 'La membrana celular.' },
          { id: 'b', text: 'La pared celular.' },
          { id: 'c', text: 'El cloroplasto.' },
          { id: 'd', text: 'La vacuola central.' }
        ],
        correctAnswers: ['a'],
        feedback: 'La membrana celular regula qué entra y qué sale. Está presente en células animales y vegetales.'
      },
      {
        id: 'm2q2',
        type: 'single',
        text: '¿Cuál de estas estructuras es exclusiva de la célula vegetal?',
        options: [
          { id: 'a', text: 'La pared celular.' },
          { id: 'b', text: 'El núcleo.' },
          { id: 'c', text: 'La membrana.' },
          { id: 'd', text: 'Las mitocondrias.' }
        ],
        correctAnswers: ['a'],
        feedback: 'La pared celular rodea a la membrana de la célula vegetal y le da forma y protección. Las células animales no tienen pared.'
      },
      {
        id: 'm2q3',
        type: 'single',
        text: '¿Qué organelo produce ATP, la energía utilizable por la célula?',
        options: [
          { id: 'a', text: 'La mitocondria.' },
          { id: 'b', text: 'El cloroplasto.' },
          { id: 'c', text: 'La vacuola.' },
          { id: 'd', text: 'El núcleo.' }
        ],
        correctAnswers: ['a'],
        feedback: 'La mitocondria produce ATP mediante la respiración celular. Está en células animales y vegetales.'
      },
      {
        id: 'm2q4',
        type: 'single',
        text: '¿Qué hace la vacuola central de la célula vegetal?',
        options: [
          { id: 'a', text: 'Almacena agua y mantiene la turgencia.' },
          { id: 'b', text: 'Produce ATP.' },
          { id: 'c', text: 'Capta la luz para la fotosíntesis.' },
          { id: 'd', text: 'Dirige las actividades de la célula.' }
        ],
        correctAnswers: ['a'],
        feedback: 'La vacuola central almacena agua y sustancias. Cuando está llena, la célula se mantiene firme: eso es la turgencia.'
      },
      {
        id: 'm2q5',
        type: 'single',
        text: 'En el modelo 3D, ¿qué estructura guarda la información y dirige las actividades de la célula?',
        options: [
          { id: 'a', text: 'El núcleo.' },
          { id: 'b', text: 'La membrana.' },
          { id: 'c', text: 'El citoplasma.' },
          { id: 'd', text: 'La vacuola.' }
        ],
        correctAnswers: ['a'],
        feedback: 'El núcleo guarda la información genética y dirige las actividades celulares. Está en ambas células.'
      },
      {
        id: 'm2q6',
        type: 'multiple',
        text: 'Selecciona todas las estructuras que tiene la célula vegetal y no la célula animal.',
        options: [
          { id: 'a', text: 'Pared celular.' },
          { id: 'b', text: 'Cloroplastos.' },
          { id: 'c', text: 'Mitocondrias.' },
          { id: 'd', text: 'Membrana celular.' }
        ],
        correctAnswers: ['a', 'b'],
        feedback: 'La pared celular y los cloroplastos son exclusivos de la célula vegetal en esta comparación. Mitocondrias y membrana están en ambas.'
      },
      {
        id: 'm2q7',
        type: 'single',
        text: '¿Por qué la célula vegetal necesita cloroplastos?',
        options: [
          { id: 'a', text: 'Para captar la luz y producir glucosa en la fotosíntesis.' },
          { id: 'b', text: 'Para producir ATP sin oxígeno.' },
          { id: 'c', text: 'Para almacenar agua.' },
          { id: 'd', text: 'Para dar forma rígida a la célula.' }
        ],
        correctAnswers: ['a'],
        feedback: 'Los cloroplastos captan la luz y realizan la fotosíntesis, produciendo glucosa y oxígeno.'
      },
      {
        id: 'm2q8',
        type: 'single',
        text: '¿Qué estructura da forma rígida y protección a la célula vegetal?',
        options: [
          { id: 'a', text: 'La pared celular.' },
          { id: 'b', text: 'La membrana celular.' },
          { id: 'c', text: 'El citoplasma.' },
          { id: 'd', text: 'El núcleo.' }
        ],
        correctAnswers: ['a'],
        feedback: 'La pared celular es una capa rígida que rodea la membrana y da forma, sostén y protección a la célula vegetal.'
      }
    ]
  },
  {
    missionCode: 'm3',
    title: 'La fábrica de la vida',
    passScore: 70,
    maxAttempts: 0,
    questions: [
      {
        id: 'm3q1',
        type: 'single',
        text: '¿Qué es el metabolismo?',
        options: [
          { id: 'a', text: 'El conjunto de reacciones que permiten obtener y usar energía.' },
          { id: 'b', text: 'Solo el proceso de comer y respirar.' },
          { id: 'c', text: 'La estructura que da forma a la célula.' },
          { id: 'd', text: 'El paso de agua por la membrana.' }
        ],
        correctAnswers: ['a'],
        feedback: 'El metabolismo es el conjunto de reacciones químicas que obtienen energía y la usan para construir o transformar moléculas.'
      },
      {
        id: 'm3q2',
        type: 'single',
        text: '¿Qué organelo produce ATP?',
        options: [
          { id: 'a', text: 'La mitocondria.' },
          { id: 'b', text: 'El cloroplasto.' },
          { id: 'c', text: 'La vacuola central.' },
          { id: 'd', text: 'La pared celular.' }
        ],
        correctAnswers: ['a'],
        feedback: 'La mitocondria produce ATP mediante la respiración celular, usando nutrientes y oxígeno.'
      },
      {
        id: 'm3q3',
        type: 'single',
        text: '¿Qué necesita el cloroplasto para producir glucosa?',
        options: [
          { id: 'a', text: 'Luz, agua y dióxido de carbono.' },
          { id: 'b', text: 'Solo oscuridad y sales.' },
          { id: 'c', text: 'ATP y pared celular.' },
          { id: 'd', text: 'Oxígeno y glucosa.' }
        ],
        correctAnswers: ['a'],
        feedback: 'En la fotosíntesis, el cloroplasto usa luz, agua y CO2 para producir glucosa y oxígeno.'
      },
      {
        id: 'm3q4',
        type: 'single',
        text: '¿Qué ocurre cuando una célula vegetal pierde mucha agua?',
        options: [
          { id: 'a', text: 'Entra en plasmólisis: la vacuola se reduce y la célula se arruga.' },
          { id: 'b', text: 'Aumenta su turgencia y se pone firme.' },
          { id: 'c', text: 'Produce más cloroplastos.' },
          { id: 'd', text: 'Se convierte en célula animal.' }
        ],
        correctAnswers: ['a'],
        feedback: 'La pérdida de agua reduce la vacuola y la membrana se separa de la pared: eso es la plasmólisis.'
      },
      {
        id: 'm3q5',
        type: 'single',
        text: '¿Qué es la ósmosis?',
        options: [
          { id: 'a', text: 'El paso de agua a través de una membrana.' },
          { id: 'b', text: 'La producción de ATP en la mitocondria.' },
          { id: 'c', text: 'La captura de luz por los cloroplastos.' },
          { id: 'd', text: 'La división del núcleo.' }
        ],
        correctAnswers: ['a'],
        feedback: 'La ósmosis es el movimiento de agua a través de una membrana permeable, desde donde hay más agua hacia donde hay menos.'
      },
      {
        id: 'm3q6',
        type: 'single',
        text: '¿Qué pasa con la vacuola de una célula vegetal cuando se coloca en agua dulce?',
        options: [
          { id: 'a', text: 'Se infla y aumenta la turgencia.' },
          { id: 'b', text: 'Se reduce y la célula se arruga.' },
          { id: 'c', text: 'Desaparece.' },
          { id: 'd', text: 'Se convierte en cloroplasto.' }
        ],
        correctAnswers: ['a'],
        feedback: 'En agua dulce entra agua por ósmosis, la vacuola se infla y la célula recupera la turgencia.'
      },
      {
        id: 'm3q7',
        type: 'single',
        text: '¿Cuál es la relación entre los nutrientes y la energía celular?',
        options: [
          { id: 'a', text: 'Los nutrientes se transforman en ATP mediante la respiración celular.' },
          { id: 'b', text: 'Los nutrientes son energía sin transformarse.' },
          { id: 'c', text: 'Los nutrientes solo sirven para dar color.' },
          { id: 'd', text: 'Los nutrientes impiden la producción de ATP.' }
        ],
        correctAnswers: ['a'],
        feedback: 'La célula transforma los nutrientes en ATP durante la respiración celular. El ATP es la energía que puede usar de inmediato.'
      },
      {
        id: 'm3q8',
        type: 'single',
        text: '¿Qué estructura controla el intercambio de sustancias entre la célula y su entorno?',
        options: [
          { id: 'a', text: 'La membrana celular.' },
          { id: 'b', text: 'La vacuola central.' },
          { id: 'c', text: 'El núcleo.' },
          { id: 'd', text: 'El cloroplasto.' }
        ],
        correctAnswers: ['a'],
        feedback: 'La membrana celular regula el paso de agua, nutrientes y desechos. Es la puerta de la fábrica celular.'
      }
    ]
  }
];
