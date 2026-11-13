import type { SeedMission } from './mission-types';

export const missionM1: SeedMission = {
  code: 'm1',
  order: 1,
  title: '¡Misión microscópica!',
  subtitle: 'Exploradores en busca de los secretos de la célula',
  bigQuestion: '¿De qué están hechos todos los seres vivos?',
  description:
    'Una muestra misteriosa llegó al Laboratorio 360 La Célula. Con Cito como guía, observarás una gota de agua, viajarás a la historia de la teoría celular y descubrirás por qué la célula es la unidad de la vida.',
  objectives: [
    'Reconocer que todos los seres vivos están formados por una o más células.',
    'Identificar los postulados de la teoría celular.',
    'Comprender que la célula es la unidad estructural y funcional de la vida.',
    'Valorar el aporte de Hooke, Leeuwenhoek, Schleiden, Schwann y Virchow.'
  ],
  phases: [
    {
      key: 'inicio',
      title: 'Inicio: la muestra misteriosa',
      description: 'Observa, pregunta y activa lo que ya sabes sobre los seres vivos.',
      order: 1
    },
    {
      key: 'desarrollo',
      title: 'Desarrollo: viaje al interior de la vida',
      description: 'Explora el microscopio 3D, el cubo AR y las animaciones de la teoría celular.',
      order: 2
    },
    {
      key: 'cierre',
      title: 'Cierre: demuestra lo que descubriste',
      description: 'Argumenta con evidencias, responde el quiz y recibe tu insignia.',
      order: 3
    }
  ],
  badgeCode: 'explorador-celular',
  estimatedMinutes: 60,
  status: 'published',
  version: 1,
  theme: {
    accent: '#58e6c5',
    soft: 'rgba(88, 230, 197, 0.14)',
    icon: '🔬'
  },
  activities: [
    {
      phase: 'inicio',
      type: 'video360',
      order: 1,
      title: 'Dentro de una gota de agua',
      instructions:
        'Ponte los audífonos, explora la escena 360 y observa con atención. Completa al menos el 80 % del recorrido para continuar.',
      required: true,
      completionRule: { type: 'video_progress', min: 80 },
      content: {
        durationSeconds: 30,
        sceneTitle: 'Dentro de una gota de agua',
        place: 'Estanque de la escuela, visto desde dentro',
        intro:
          'Cito te invita a encogerte hasta el tamaño de un microbio. Gira la vista y descubre quién vive en una gota de agua.',
        narration: [
          'Cito: respira profundo. Estás dentro de una gota de agua tomada del estanque de la escuela.',
          'A tu alrededor flotan seres invisibles a simple vista. Algunos se mueven con pequeños remos llamados cilios.',
          'Observa sus formas: hay uno alargado, otro verde y pequeñas esferas que se dividen.',
          'Todos ellos son seres vivos. ¿Qué crees que tienen en común?'
        ],
        organisms: [
          {
            id: 'paramecio',
            name: 'Paramecio',
            icon: '🦠',
            color: '#7dd3fc',
            fact: 'Es un ser vivo unicelular que se mueve con pequeños cilios.'
          },
          {
            id: 'alga',
            name: 'Alga verde',
            icon: '🌿',
            color: '#4ade80',
            fact: 'Realiza fotosíntesis y produce oxígeno dentro del agua.'
          },
          {
            id: 'bacteria',
            name: 'Bacteria',
            icon: '🧫',
            color: '#fbbf24',
            fact: 'Es un organismo unicelular sin núcleo definido.'
          }
        ],
        pauseQuestion: '¿Qué tienen en común estos tres seres vivos aunque parezcan tan distintos?',
        transcriptNote: 'La transcripción completa está disponible en el botón de accesibilidad.'
      },
      assetKeys: ['video360_gota_agua'],
      xp: 20
    },
    {
      phase: 'inicio',
      type: 'reading',
      order: 2,
      title: 'La extraña historia de la teoría celular',
      instructions:
        'Lee la historia de Cito y elige dos ideas que te parezcan importantes. Las usarás en tu evidencia final.',
      required: true,
      completionRule: { type: 'confirm', label: 'Ya leí la historia y elegí dos ideas' },
      content: {
        title: 'La extraña historia de la teoría celular',
        intro:
          'Durante siglos, los seres vivos fueron un misterio. Nadie sabía de qué estaban hechos ni por qué crecían. Todo cambió cuando varias personas se atrevieron a mirar más allá de lo que el ojo podía ver.',
        scientists: [
          {
            name: 'Robert Hooke',
            year: '1665',
            icon: '🔎',
            contribution:
              'Observó una lámina de corcho con un microscopio y vio pequeñas celdas parecidas a las de un panal. Las llamó células, aunque en realidad estaba viendo paredes vacías.'
          },
          {
            name: 'Anton van Leeuwenhoek',
            year: '1674',
            icon: '💧',
            contribution:
              'Fabricó lentes muy potentes y descubrió microorganismos vivos en el agua. Fue el primero en ver bacterias y protozoos.'
          },
          {
            name: 'Matthias Schleiden y Theodor Schwann',
            year: '1838-1839',
            icon: '🌱',
            contribution:
              'Después de estudiar muchas plantas y animales, concluyeron que todos los seres vivos están formados por células.'
          },
          {
            name: 'Rudolf Virchow',
            year: '1855',
            icon: '🧬',
            contribution:
              'Completó la teoría al afirmar que toda célula proviene de otra célula. Las células no aparecen de la nada: se dividen.'
          }
        ],
        postulates: [
          'Todos los seres vivos están formados por una o más células.',
          'La célula es la unidad estructural y funcional de la vida.',
          'Toda célula proviene de otra célula.'
        ],
        glossary: [
          { term: 'Célula', definition: 'Unidad más pequeña que forma a los seres vivos y realiza sus funciones vitales.' },
          { term: 'Microscopio', definition: 'Instrumento que usa lentes para ampliar objetos muy pequeños.' },
          { term: 'Teoría celular', definition: 'Explicación científica que reúne los postulados sobre las células.' }
        ],
        didYouKnow:
          'Los virus no son células: necesitan una célula para reproducirse. Por eso la teoría celular no los incluye como seres celulares.'
      },
      assetKeys: ['lectura_teoria_celular'],
      xp: 10
    },
    {
      phase: 'desarrollo',
      type: 'model3d',
      order: 1,
      title: 'El microscopio y la célula',
      instructions:
        'Gira el microscopio, cambia el aumento y toca los puntos brillantes para descubrir los tres postulados de la teoría celular.',
      required: true,
      completionRule: { type: 'confirm', label: 'Exploré el microscopio y los tres postulados' },
      content: {
        model: 'microscope',
        title: 'Microscopio del Laboratorio 360',
        intro:
          'Arrastra para girar el modelo. Usa los botones de aumento y toca cada hotspot para descubrir qué hay dentro.',
        controls: ['Arrastrar para girar', 'Rueda o botones para acercar', 'Flechas del teclado para moverse'],
        hotspots: [
          {
            id: 'ocular',
            label: 'Ocular',
            description: 'Lente por donde se mira. Amplía la imagen que llega desde el objetivo.',
            position: [0, 1.35, 0.2]
          },
          {
            id: 'objetivo',
            label: 'Objetivos',
            description: 'Lentes de distintos aumentos: 10x, 40x y 100x. Cada una muestra un detalle diferente.',
            position: [0, 0.55, 0.65]
          },
          {
            id: 'placa',
            label: 'Placa con la muestra',
            description: 'Aquí colocamos la muestra misteriosa. La luz la atraviesa para que podamos verla.',
            position: [0, -0.05, 0.55]
          },
          {
            id: 'fuente',
            label: 'Fuente de luz',
            description: 'Ilumina la muestra desde abajo para que los detalles se vean con claridad.',
            position: [0, -0.65, 0.15]
          }
        ],
        zoomLevels: [
          { id: '10x', label: '10x', description: 'Ves el tejido completo, como una tela con muchos hilos.' },
          { id: '40x', label: '40x', description: 'Aparecen grupos de células unidas formando el tejido.' },
          { id: '100x', label: '100x', description: 'Observas una sola célula: membrana, citoplasma y núcleo.' }
        ],
        postulates: [
          'Todos los seres vivos están formados por células.',
          'La célula es la unidad estructural y funcional.',
          'Toda célula proviene de otra célula.'
        ]
      },
      assetKeys: ['microscopio_celula.glb'],
      xp: 20
    },
    {
      phase: 'desarrollo',
      type: 'ar_cube',
      order: 2,
      title: 'Cubo de la teoría celular',
      instructions:
        'Explora al menos 4 de las 6 caras del Cubo Merge. Gíralo con el ratón, el dedo o las flechas del teclado.',
      required: true,
      completionRule: { type: 'faces_explored', min: 4 },
      content: {
        cubeTitle: 'Cubo de la teoría celular',
        intro: 'Cada cara guarda una pista sobre cómo se construyó la teoría celular. ¿Te atreves a descubrirlas todas?',
        faces: [
          {
            id: 'hooke',
            label: 'Hooke',
            icon: '🔎',
            color: '#58e6c5',
            description: 'En 1665 observó células en el corcho y les dio su nombre.',
            fact: 'Hooke comparó las celdas del corcho con las habitaciones de un monasterio.'
          },
          {
            id: 'leeuwenhoek',
            label: 'Leeuwenhoek',
            icon: '💧',
            color: '#7dd3fc',
            description: 'Descubrió microorganismos vivos con sus lentes artesanales.',
            fact: 'Sus microscopios podían ampliar hasta 270 veces.'
          },
          {
            id: 'schleiden-schwann',
            label: 'Schleiden y Schwann',
            icon: '🌱',
            color: '#4ade80',
            description: 'Propusieron que plantas y animales están formados por células.',
            fact: 'Estudiaron miles de muestras antes de llegar a su conclusión.'
          },
          {
            id: 'virchow',
            label: 'Virchow',
            icon: '🧬',
            color: '#fbbf24',
            description: 'Afirmó que toda célula proviene de otra célula.',
            fact: 'Su idea explicó por qué los seres vivos crecen y se reparan.'
          },
          {
            id: 'unicelulares',
            label: 'Unicelulares',
            icon: '🦠',
            color: '#f472b6',
            description: 'Seres vivos formados por una sola célula, como las bacterias.',
            fact: 'Aunque no los veas, están en el agua, el suelo y tu piel.'
          },
          {
            id: 'pluricelulares',
            label: 'Pluricelulares',
            icon: '🐘',
            color: '#a78bfa',
            description: 'Seres vivos formados por muchas células que trabajan juntas.',
            fact: 'Tu cuerpo tiene miles de millones de células de muchos tipos.'
          }
        ]
      },
      assetKeys: ['cubo_teoria_celular'],
      xp: 15
    },
    {
      phase: 'desarrollo',
      type: 'animation3d',
      order: 3,
      title: 'Zoom microscópico: del organismo a la célula',
      instructions:
        'Observa la animación y sigue el viaje de la cámara: desde un organismo completo hasta una célula y su núcleo.',
      required: true,
      completionRule: { type: 'confirm', label: 'Vi la animación completa' },
      content: {
        title: 'Zoom microscópico',
        intro: 'La cámara se acerca una y otra vez. ¿Hasta dónde puedes llegar?',
        steps: [
          { title: 'El organismo', description: 'Un ser vivo completo, como una planta o un animal.', highlight: 'organismo' },
          { title: 'El tejido', description: 'Muchas células del mismo tipo trabajan juntas.', highlight: 'tejido' },
          { title: 'La célula', description: 'Aparece la membrana, el citoplasma y el núcleo.', highlight: 'celula' },
          { title: 'El núcleo', description: 'Dentro está la información que dirige las actividades.', highlight: 'nucleo' },
          { title: 'Los postulados', description: 'La teoría celular resume lo que descubrimos.', highlight: 'teoria' }
        ],
        durationSeconds: 25,
        closing: 'No importa si es una hoja, una bacteria o una persona: la célula está allí, sosteniendo la vida.'
      },
      assetKeys: ['m1_zoom_celular.glb'],
      xp: 15
    },
    {
      phase: 'desarrollo',
      type: 'animation2d',
      order: 4,
      title: 'Línea de tiempo de los científicos',
      instructions:
        'Recorre la línea de tiempo, abre cada tarjeta y descubre cómo cada científico aportó una pieza de la teoría celular.',
      required: true,
      completionRule: { type: 'confirm', label: 'Recorrí la línea de tiempo completa' },
      content: {
        component: 'AnimatedList',
        title: 'La línea de tiempo de la célula',
        intro: 'La ciencia no avanza sola: se construye con muchas preguntas y personas.',
        items: [
          { year: '1665', name: 'Robert Hooke', icon: '🔎', text: 'Observa células en el corcho y les da nombre.' },
          { year: '1674', name: 'Anton van Leeuwenhoek', icon: '💧', text: 'Descubre microorganismos vivos en el agua.' },
          { year: '1838', name: 'Matthias Schleiden', icon: '🌱', text: 'Concluye que las plantas están formadas por células.' },
          { year: '1839', name: 'Theodor Schwann', icon: '🐾', text: 'Extiende la idea a los animales.' },
          { year: '1855', name: 'Rudolf Virchow', icon: '🧬', text: 'Afirma que toda célula proviene de otra célula.' }
        ],
        spotlight: {
          title: 'Los tres postulados',
          cards: [
            { title: 'Estructura', text: 'Todos los seres vivos están formados por una o más células.' },
            { title: 'Función', text: 'La célula realiza las funciones vitales del ser vivo.' },
            { title: 'Origen', text: 'Toda célula proviene de otra célula.' }
          ]
        }
      },
      assetKeys: ['reactbits_teoria_celular'],
      xp: 15
    },
    {
      phase: 'cierre',
      type: 'evidence',
      order: 1,
      title: 'Dos ideas que cambian la mirada',
      instructions:
        'Elige dos ideas de la lectura y explica por qué son importantes para estudiar la biología. Puedes guardar un borrador antes de enviar.',
      required: true,
      completionRule: { type: 'evidence_submitted' },
      content: {
        prompt:
          'Identifica dos ideas de la lectura que consideres importantes para estudiar la biología y argumenta cada una. Usa tus propias palabras y relaciona las ideas con la teoría celular.',
        minLength: 80,
        checklist: [
          'Nombro dos ideas de la lectura.',
          'Explico con mis palabras por qué son importantes.',
          'Uso al menos dos palabras científicas del glosario.',
          'Relaciono las ideas con la teoría celular.'
        ],
        rubric: [
          { level: 'Bajo', description: 'Menciona ideas sin explicarlas.' },
          { level: 'Básico', description: 'Explica una idea con vocabulario limitado.' },
          { level: 'Alto', description: 'Explica dos ideas con vocabulario científico.' },
          { level: 'Superior', description: 'Conecta las ideas con la teoría celular y da un ejemplo propio.' }
        ]
      },
      assetKeys: [],
      xp: 20
    },
    {
      phase: 'cierre',
      type: 'quiz',
      order: 2,
      title: 'Reto final: ¿qué aprendiste?',
      instructions:
        'Responde el quiz de 6 preguntas. Necesitas al menos el 70 % para completar la misión. Puedes intentarlo de nuevo.',
      required: true,
      completionRule: { type: 'quiz_passed' },
      content: {
        questionCount: 6,
        passScore: 70,
        note: 'Cada respuesta recibe retroalimentación. La insignia se entrega al completar todas las actividades y aprobar el quiz.'
      },
      assetKeys: [],
      xp: 30
    }
  ]
};
