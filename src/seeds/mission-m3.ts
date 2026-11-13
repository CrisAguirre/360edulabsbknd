import type { SeedMission } from './mission-types';

export const missionM3: SeedMission = {
  code: 'm3',
  order: 3,
  title: '¡Misión energía!',
  subtitle: 'Descubriendo la fábrica de la vida celular',
  bigQuestion: '¿Cómo obtienen y usan la energía las células?',
  description:
    'La célula es una fábrica que necesita energía, agua y materiales. En esta misión explorarás el metabolismo celular, el trabajo de las mitocondrias y los cloroplastos, la ósmosis y el equilibrio que mantiene viva a la célula.',
  objectives: [
    'Explicar el metabolismo celular con lenguaje sencillo.',
    'Relacionar mitocondrias, cloroplastos, vacuola, membrana y núcleo con las funciones vitales.',
    'Comprender el movimiento de agua y los estados de turgencia y plasmólisis.',
    'Elaborar una infografía en Canva y una tabla de estructuras.',
    'Explicar la diferencia entre fotosíntesis y respiración celular.'
  ],
  phases: [
    {
      key: 'inicio',
      title: 'Inicio: la fábrica se detiene',
      description: 'Activa tus ideas sobre la energía y observa cómo trabaja una célula.',
      order: 1
    },
    {
      key: 'desarrollo',
      title: 'Desarrollo: dentro de la fábrica celular',
      description: 'Explora la célula de la energía, el cubo fábrica y las partículas del metabolismo.',
      order: 2
    },
    {
      key: 'cierre',
      title: 'Cierre: mi bitácora de energía',
      description: 'Comparte tu infografía, completa la tabla, responde el quiz y recibe la última insignia.',
      order: 3
    }
  ],
  badgeCode: 'guardian-energia',
  estimatedMinutes: 90,
  status: 'published',
  version: 1,
  theme: {
    accent: '#fbbf24',
    soft: 'rgba(251, 191, 36, 0.14)',
    icon: '⚡'
  },
  activities: [
    {
      phase: 'inicio',
      type: 'video360',
      order: 1,
      title: 'Fábrica de producción',
      instructions:
        'Entra a la célula-fábrica y observa qué ocurre cuando faltan materiales o energía. Completa al menos el 80 % del recorrido.',
      required: true,
      completionRule: { type: 'video_progress', min: 80 },
      content: {
        durationSeconds: 30,
        sceneTitle: 'Fábrica de producción',
        place: 'El interior de una célula vegetal, imaginado como una fábrica',
        intro:
          'Cito te muestra una fábrica muy especial: no tiene chimeneas, pero sí puertas, generadores, paneles solares y un tanque de agua. Es la célula.',
        narration: [
          'Cito: imagina una fábrica que debe recibir materiales, producir energía y sacar desechos. La célula hace algo muy parecido.',
          'La membrana es la puerta: decide qué entra y qué sale. El núcleo es la oficina de gerencia: dirige las actividades.',
          'Las mitocondrias son los generadores. Los cloroplastos, los paneles solares. La vacuola, el tanque de agua.',
          'Si la fábrica deja de recibir energía o materiales, las máquinas se detienen. En la célula, eso también afecta la vida.'
        ],
        factoryMap: [
          { id: 'membrana', structure: 'Membrana', analog: 'Puerta de entrada y salida', icon: '🚪' },
          { id: 'citoplasma', structure: 'Citoplasma', analog: 'Planta de producción', icon: '🏭' },
          { id: 'nucleo', structure: 'Núcleo', analog: 'Oficina de gerencia', icon: '🗂️' },
          { id: 'mitocondria', structure: 'Mitocondria', analog: 'Generador de energía', icon: '⚡' },
          { id: 'cloroplasto', structure: 'Cloroplasto', analog: 'Panel solar', icon: '🌞' },
          { id: 'vacuola', structure: 'Vacuola', analog: 'Tanque de agua', icon: '🛢️' }
        ],
        pauseQuestion: '¿Qué pasaría si una fábrica dejara de recibir materiales o energía? ¿Pasaría algo parecido en nuestras células?',
        transcriptNote: 'Subtítulos y transcripción disponibles.'
      },
      assetKeys: ['video360_fabrica_celular'],
      xp: 15
    },
    {
      phase: 'inicio',
      type: 'video360',
      order: 2,
      title: 'Metabolismo celular',
      instructions:
        'Observa la escena 360 y registra dos ideas sobre cómo la célula obtiene y usa la energía. Completa al menos el 80 % del recorrido.',
      required: true,
      completionRule: { type: 'video_progress', min: 80 },
      content: {
        durationSeconds: 30,
        sceneTitle: 'Metabolismo celular',
        place: 'Un viaje por el interior de una célula que trabaja sin descanso',
        intro:
          'Mientras lees esto, tus células están trabajando. Rompen nutrientes, producen ATP y construyen nuevas moléculas. Ese conjunto de reacciones es el metabolismo.',
        narration: [
          'Cito: metabolismo no significa solo comer o respirar. Es el conjunto de reacciones que obtienen y usan energía.',
          'En la respiración celular, la mitocondria usa oxígeno y nutrientes para producir ATP.',
          'En la fotosíntesis, el cloroplasto usa luz, agua y CO2 para producir glucosa y oxígeno.',
          'Las plantas hacen las dos cosas: fotosíntesis y respiración celular. Los animales solo hacen respiración celular.'
        ],
        keyIdeas: [
          'El metabolismo es el conjunto de reacciones para obtener y usar energía.',
          'La mitocondria produce ATP mediante la respiración celular.',
          'El cloroplasto capta luz y produce glucosa mediante la fotosíntesis.',
          'La célula necesita agua, nutrientes y un equilibrio interno para funcionar.'
        ],
        pauseQuestion: '¿En qué se parecen y en qué se diferencian la fotosíntesis y la respiración celular?',
        transcriptNote: 'Puedes leer la transcripción completa desde el botón de accesibilidad.'
      },
      assetKeys: ['video360_metabolismo'],
      xp: 10
    },
    {
      phase: 'inicio',
      type: 'reading',
      order: 3,
      title: 'El metabolismo celular',
      instructions:
        'Lee la explicación, compara fotosíntesis y respiración celular, y elige dos ideas para tu bitácora final.',
      required: true,
      completionRule: { type: 'confirm', label: 'Ya leí y comprendí el metabolismo' },
      content: {
        title: '¿Cómo obtienen y utilizan la energía las células?',
        intro:
          'Las células necesitan energía para crecer, repararse, mover sustancias y reproducirse. Esa energía se obtiene de los nutrientes y se transforma en una molécula llamada ATP, que funciona como una pequeña batería de uso inmediato.',
        sections: [
          {
            heading: 'Metabolismo: la fábrica en marcha',
            body:
              'El metabolismo es el conjunto de reacciones químicas que permiten obtener energía y usarla para construir o transformar moléculas. Incluye procesos de construcción y de degradación. Ocurre en el citoplasma y en organelos como las mitocondrias y los cloroplastos.'
          },
          {
            heading: 'Respiración celular: liberar energía',
            body:
              'En la respiración celular, la célula usa oxígeno para transformar nutrientes como la glucosa y obtener ATP. Ocurre en las mitocondrias de las células animales y vegetales. El dióxido de carbono y el agua son productos de este proceso.'
          },
          {
            heading: 'Fotosíntesis: captar la luz',
            body:
              'En la fotosíntesis, los cloroplastos captan la luz y usan agua y dióxido de carbono para producir glucosa y oxígeno. Las plantas, las algas y algunas bacterias la realizan. La glucosa puede usarse como nutriente o almacenarse.'
          },
          {
            heading: 'Agua y equilibrio: ósmosis, turgencia y plasmólisis',
            body:
              'El agua entra y sale de la célula a través de la membrana mediante ósmosis. Cuando una célula vegetal tiene mucha agua, su vacuola se infla y la célula se mantiene firme: es la turgencia. Cuando pierde agua, la vacuola se reduce y la célula se arruga: es la plasmólisis.'
          }
        ],
        comparison: [
          { process: 'Fotosíntesis', where: 'Cloroplasto', needs: 'Luz, agua y CO2', produces: 'Glucosa y oxígeno', who: 'Plantas, algas y algunas bacterias' },
          { process: 'Respiración celular', where: 'Mitocondria', needs: 'Nutrientes y oxígeno', produces: 'ATP, agua y CO2', who: 'Plantas y animales' }
        ],
        glossary: [
          { term: 'ATP', definition: 'Molécula que almacena y libera energía para las actividades celulares.' },
          { term: 'Ósmosis', definition: 'Paso de agua a través de una membrana permeable.' },
          { term: 'Turgencia', definition: 'Firmeza de la célula vegetal cuando su vacuola está llena de agua.' },
          { term: 'Plasmólisis', definition: 'Pérdida de agua que hace que la célula vegetal se arrugue.' },
          { term: 'Metabolismo', definition: 'Conjunto de reacciones para obtener y usar energía.' }
        ],
        note:
          'La célula no respira como nosotros: realiza respiración celular, un proceso químico que ocurre en las mitocondrias.'
      },
      assetKeys: ['lectura_metabolismo'],
      xp: 10
    },
    {
      phase: 'desarrollo',
      type: 'model3d',
      order: 1,
      title: 'La célula de la energía',
      instructions:
        'Explora el modelo, mueve los controles de agua, luz y nutrientes y observa qué ocurre con la vacuola y la producción de ATP.',
      required: true,
      completionRule: { type: 'confirm', label: 'Experimenté con los controles y observé los estados' },
      content: {
        model: 'energy-cell',
        title: 'Célula de la energía',
        intro:
          'Esta célula vegetal reacciona a tus decisiones. Ajusta el agua, la luz y los nutrientes y observa los cambios en la vacuola, los cloroplastos y las mitocondrias.',
        sliders: [
          { id: 'water', label: 'Agua', min: 0, max: 100, initial: 70, lowLabel: 'Poca agua', highLabel: 'Mucha agua', icon: '💧' },
          { id: 'light', label: 'Luz', min: 0, max: 100, initial: 60, lowLabel: 'Oscuridad', highLabel: 'Luz intensa', icon: '☀️' },
          { id: 'nutrients', label: 'Nutrientes', min: 0, max: 100, initial: 65, lowLabel: 'Escasos', highLabel: 'Abundantes', icon: '🥗' }
        ],
        hotspots: [
          { id: 'vacuola', label: 'Vacuola central', description: 'Con agua abundante se infla y mantiene la turgencia.', position: [0, 0.15, 0.4] },
          { id: 'cloroplasto', label: 'Cloroplastos', description: 'Con luz producen glucosa y oxígeno.', position: [0.7, -0.2, 0.35] },
          { id: 'mitocondria', label: 'Mitocondrias', description: 'Con nutrientes y oxígeno producen ATP.', position: [-0.7, -0.3, 0.3] },
          { id: 'membrana', label: 'Membrana', description: 'Regula la entrada y salida de agua y sustancias.', position: [0, 0.9, 0.8] }
        ],
        states: {
          turgent: 'Con agua suficiente, la vacuola está llena y la célula se ve firme.',
          plasmolyzed: 'Con poca agua, la vacuola se reduce y la célula se arruga: plasmólisis.',
          energy: 'Con luz y nutrientes, los cloroplastos producen glucosa y las mitocondrias generan ATP.'
        }
      },
      assetKeys: ['celula_energia_kids.glb'],
      xp: 20
    },
    {
      phase: 'desarrollo',
      type: 'animation3d',
      order: 2,
      title: 'Plasmólisis, turgencia y producción de ATP',
      instructions:
        'Observa la secuencia completa: la célula pierde agua, se arruga, vuelve a hidratarse y la mitocondria libera ATP.',
      required: true,
      completionRule: { type: 'confirm', label: 'Vi la secuencia completa' },
      content: {
        title: 'La célula que respira y se hidrata',
        intro: 'Sigue la vacuola y la mitocondria en tres momentos de la vida celular.',
        steps: [
          { title: 'Turgencia', description: 'La vacuola está llena de agua. La célula se ve firme y la membrana empuja la pared.', highlight: 'turgencia' },
          { title: 'Pérdida de agua', description: 'El agua sale por ósmosis. La vacuola se reduce y la célula comienza a arrugarse.', highlight: 'osmosi' },
          { title: 'Plasmólisis', description: 'La célula pierde turgencia y la membrana se separa de la pared celular.', highlight: 'plasmolisis' },
          { title: 'Recuperación', description: 'Al entrar agua dulce, la vacuola se infla otra vez y la célula recupera la turgencia.', highlight: 'recuperacion' },
          { title: 'ATP', description: 'La mitocondria late y libera ATP, la energía que la célula puede usar.', highlight: 'atp' }
        ],
        durationSeconds: 25,
        closing: 'El equilibrio del agua es vital: sin él, la célula no puede funcionar correctamente.'
      },
      assetKeys: ['m3_plasmolisis_atp.glb'],
      xp: 15
    },
    {
      phase: 'desarrollo',
      type: 'ar_cube',
      order: 3,
      title: 'Cubo fábrica celular',
      instructions:
        'Explora al menos 4 de las 6 caras del Cubo Merge y relaciona cada estructura con su función en la fábrica celular.',
      required: true,
      completionRule: { type: 'faces_explored', min: 4 },
      content: {
        cubeTitle: 'Cubo fábrica celular',
        intro: 'Cada cara del cubo representa una estación de la fábrica. ¿Puedes descubrir qué produce o controla cada una?',
        faces: [
          {
            id: 'mitocondria',
            label: 'Mitocondria',
            icon: '⚡',
            color: '#fbbf24',
            description: 'Produce ATP mediante la respiración celular.',
            fact: 'Es el generador de energía de la fábrica celular.'
          },
          {
            id: 'cloroplasto',
            label: 'Cloroplasto',
            icon: '🌞',
            color: '#4ade80',
            description: 'Capta la luz y produce glucosa en la fotosíntesis.',
            fact: 'Funciona como un panel solar que transforma la luz en alimento.'
          },
          {
            id: 'vacuola',
            label: 'Vacuola',
            icon: '🛢️',
            color: '#38bdf8',
            description: 'Almacena agua y mantiene la turgencia.',
            fact: 'Es el tanque de agua que evita que la célula se arrugue.'
          },
          {
            id: 'nucleo',
            label: 'Núcleo',
            icon: '🗂️',
            color: '#a78bfa',
            description: 'Dirige las actividades de la célula.',
            fact: 'Es la oficina de gerencia: decide qué se produce y cuándo.'
          },
          {
            id: 'membrana',
            label: 'Membrana',
            icon: '🚪',
            color: '#7dd3fc',
            description: 'Regula el paso de sustancias y agua.',
            fact: 'Es la puerta de entrada y salida de la fábrica.'
          },
          {
            id: 'citoplasma',
            label: 'Citoplasma',
            icon: '🏭',
            color: '#58e6c5',
            description: 'Medio donde ocurren las reacciones celulares.',
            fact: 'Es la planta de producción donde trabajan los organelos.'
          }
        ]
      },
      assetKeys: ['cubo_fabrica_celular'],
      xp: 15
    },
    {
      phase: 'desarrollo',
      type: 'animation2d',
      order: 4,
      title: 'Partículas de ATP, agua y CO2',
      instructions:
        'Observa las partículas y recorre los pasos del metabolismo. Marca la actividad cuando termines.',
      required: true,
      completionRule: { type: 'confirm', label: 'Recorrí los pasos del metabolismo' },
      content: {
        component: 'ParticlesBackground',
        title: 'La danza del metabolismo',
        intro: 'ATP, agua y dióxido de carbono se mueven sin parar dentro y fuera de la célula.',
        particles: [
          { id: 'atp', label: 'ATP', icon: '⚡', color: '#fbbf24', description: 'Energía disponible para la célula.' },
          { id: 'water', label: 'Agua', icon: '💧', color: '#38bdf8', description: 'Entra y sale por ósmosis.' },
          { id: 'co2', label: 'CO₂', icon: '🫧', color: '#a78bfa', description: 'Se usa en la fotosíntesis y se produce en la respiración.' }
        ],
        steps: [
          { title: 'Entran los materiales', text: 'La membrana permite el paso de agua, oxígeno y nutrientes.' },
          { title: 'La mitocondria produce ATP', text: 'La respiración celular transforma nutrientes en energía utilizable.' },
          { title: 'El cloroplasto capta la luz', text: 'Con luz, agua y CO2 produce glucosa y oxígeno.' },
          { title: 'La célula usa la energía', text: 'El ATP impulsa el crecimiento, la reparación y el transporte.' },
          { title: 'Se eliminan desechos', text: 'El CO2 y otras sustancias salen de la célula.' }
        ]
      },
      assetKeys: ['reactbits_particulas_metabolismo'],
      xp: 5
    },
    {
      phase: 'desarrollo',
      type: 'infographic',
      order: 5,
      title: 'Mi infografía en Canva',
      instructions:
        'Crea una infografía en Canva con las dos preguntas guía, tres estructuras celulares y una analogía de fábrica. Guarda el enlace público de solo lectura.',
      required: true,
      completionRule: { type: 'confirm', label: 'Terminé mi infografía y guardé el enlace' },
      content: {
        tool: 'Canva',
        title: 'Diseña la fábrica de la vida',
        intro:
          'Tu infografía debe explicar cómo las células obtienen energía y cómo usan el agua y los nutrientes. Puedes partir de la plantilla del Laboratorio 360 o crear tu propio diseño.',
        guidingQuestions: [
          '¿De qué manera las células vegetales y animales llevan a cabo sus actividades para conservar la vida?',
          '¿Cómo se llama el proceso mediante el cual las células adquieren energía y eliminan desechos?'
        ],
        structure: [
          'Un título llamativo y tu nombre.',
          'Las dos preguntas guía con sus respuestas.',
          'Tres estructuras celulares con su función.',
          'Una analogía de la fábrica.',
          'Una conclusión sobre la importancia de la energía para la vida.'
        ],
        templateUrl: 'https://www.canva.com/design/citoindagar-plantilla/view',
        checklist: [
          'Incluí las dos preguntas guía.',
          'Expliqué al menos tres estructuras.',
          'Usé una analogía de fábrica.',
          'Mi enlace es público y de solo lectura.'
        ]
      },
      assetKeys: ['canva_plantilla_energia'],
      xp: 10
    },
    {
      phase: 'cierre',
      type: 'evidence',
      order: 1,
      title: 'Mi bitácora de energía',
      instructions:
        'Comparte el enlace de tu infografía de Canva, escribe tu tabla de estructuras y funciones y responde la reflexión final.',
      required: true,
      completionRule: { type: 'evidence_submitted' },
      content: {
        prompt:
          'Comparte el enlace público de tu infografía de Canva. Luego escribe la tabla de estructuras y funciones (membrana, citoplasma, núcleo, mitocondria, cloroplasto y vacuola) y una reflexión sobre por qué la energía es indispensable para la vida.',
        requiresLink: true,
        minLength: 100,
        checklist: [
          'El enlace de Canva es público y de solo lectura.',
          'Incluyo las seis estructuras con su función.',
          'Explico la diferencia entre fotosíntesis y respiración celular.',
          'Reflexiono sobre la importancia de la energía para la vida.'
        ],
        rubric: [
          { level: 'Bajo', description: 'Enlace inválido o tabla incompleta.' },
          { level: 'Básico', description: 'Infografía básica y tres estructuras.' },
          { level: 'Alto', description: 'Infografía clara, tabla completa y explicación del metabolismo.' },
          { level: 'Superior', description: 'Conecta energía, ósmosis y funciones vitales con una analogía propia.' }
        ]
      },
      assetKeys: [],
      xp: 20
    },
    {
      phase: 'cierre',
      type: 'quiz',
      order: 2,
      title: 'Reto final: la fábrica de la vida',
      instructions:
        'Responde el quiz de 8 preguntas. Necesitas al menos el 70 % para completar la misión y obtener la insignia de Guardián de la Energía.',
      required: true,
      completionRule: { type: 'quiz_passed' },
      content: {
        questionCount: 8,
        passScore: 70,
        note: 'Incluye metabolismo, fotosíntesis, respiración celular, ósmosis y turgencia.'
      },
      assetKeys: [],
      xp: 30
    },
    {
      phase: 'cierre',
      type: 'lab',
      order: 3,
      title: 'Laboratorio optativo: la papa y la ósmosis',
      instructions:
        'Reto opcional. Coloca bastones de papa en agua pura, agua con poca sal y agua con mucha sal. Mide y explica qué ocurre.',
      required: false,
      completionRule: { type: 'confirm', label: 'Registré mis observaciones del laboratorio' },
      content: {
        title: 'Laboratorio de ósmosis con papa',
        intro:
          '¿Qué le pasa a una papa cuando la sumerges en agua con distintas concentraciones de sal? Formula una hipótesis y compruébala.',
        materials: ['3 vasos', 'Papa', 'Sal', 'Agua', 'Regla', 'Cuchillo (con ayuda de un adulto)'],
        steps: [
          'Corta tres bastones de papa del mismo tamaño y mide su longitud.',
          'Prepara tres vasos: agua pura, agua con poca sal y agua con mucha sal.',
          'Sumerge un bastón en cada vaso y espera 30 minutos.',
          'Mide de nuevo y registra la flexibilidad de cada bastón.',
          'Explica tus resultados usando los conceptos de ósmosis, turgencia y plasmólisis.'
        ],
        tableColumns: ['Vaso', 'Salinidad', 'Longitud inicial', 'Longitud final', 'Flexibilidad', 'Explicación'],
        hypothesisPrompt: '¿En qué vaso crees que el bastón de papa ganará agua y en cuál la perderá? ¿Por qué?',
        safety: 'Pide ayuda a un adulto para cortar la papa. No consumas los bastones del experimento.'
      },
      assetKeys: [],
      xp: 15
    }
  ]
};
