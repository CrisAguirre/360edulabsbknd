import type { SeedMission } from './mission-types';
import {
  M3_ANSWER,
  M3_CUBE,
  M3_FACTORY_ANALOGY,
  M3_FACTORY_INTRO,
  M3_QUESTIONS,
  M3_READING_URL,
  M3_RESOURCES,
  M3_SESSION,
  M3_TABLE,
  M3_VIDEO_READING
} from './officialSource';

export const missionM3: SeedMission = {
  code: 'm3',
  order: 3,
  title: '¡Misión energía!',
  subtitle: 'Descubriendo la fábrica de la vida celular',
  bigQuestion:
    '¿Qué creen que sucedería si una fábrica dejara de recibir materiales o energía para funcionar? ¿Pasaría algo parecido en nuestras células si no recibieran los nutrientes que necesitan?',
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
      description:
        'Texto oficial de la Sesión 3: preguntas motivadoras, video 360 de la fábrica y video 360 del metabolismo.',
      order: 1
    },
    {
      key: 'desarrollo',
      title: 'Desarrollo: dentro de la fábrica celular',
      description:
        'Infografía en Canva y cubo Merge obligatorios. Modelos y animaciones como exploración opcional.',
      order: 2
    },
    {
      key: 'cierre',
      title: 'Cierre: mi bitácora de energía',
      description:
        'Completa el cuadro de estructuras, comparte tu infografía y recibe la última insignia.',
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
      type: 'reading',
      order: 1,
      title: 'Sesión 3: Procesos metabólicos de la célula',
      instructions:
        'Lee el texto oficial de la Sesión 3, explora el funcionamiento de la fábrica celular y revisa el cuadro de estructuras. El cuadro y las preguntas se responden en la actividad de cierre «Mi bitácora de energía».',
      required: true,
      completionRule: {
        type: 'confirm',
        label: 'He leído los contenidos de la Sesión 3 y revisado el cuadro de estructuras'
      },
      content: {
        sessionNumber: 3,
        sessionTitle: 'Sesión 3: Procesos metabólicos de la célula',
        mainTheme: 'Tema principal 1. Concepto de Célula',
        subtheme1: 'Subtema 1. Catabolismo',
        subtheme2: 'Subtema 2. Estructura celular',
        activityDescription:
          'Al inicio la docente, activa los saberes previos de los estudiantes mediante una situación cercana a su realidad, promoviendo la reflexión sobre la importancia de los nutrientes, la energía y las transformaciones que ocurren dentro de las células, como punto de partida para comprender el metabolismo celular, presenta el video 360 de una fábrica de producción, comparando a la célula con una pequeña fábrica que trabaja día y noche.\n\nEn esta fábrica llegan materiales que son transformados para elaborar productos, se utiliza energía para que las máquinas funcionen y cada trabajador cumple una tarea especial, de manera parecida, las células de nuestro cuerpo reciben nutrientes, los transforman, obtienen energía y producen sustancias necesarias para mantenerse vivas y realizar sus funciones. A todo este conjunto de procesos lo llamamos metabolismo celular”.\n\nLa docente plantea los siguientes cuestionamientos\n\n¿Qué creen que sucedería si una fábrica dejara de recibir materiales o energía para funcionar? ¿Pasaría algo parecido en nuestras células si no recibieran los nutrientes que necesitan?\n\nLos estudiantes dan respuesta a pregunta motivadora en la plataforma Vercel\n\nLa docente presenta el video el video 360 y solicita a los estudiantes visualizarlo y dar respuesta al siguiente cuestionamiento: ¿De qué manera las células vegetales y animales llevan a cabo sus actividades para conservar la vida? ¿Cómo se llama el proceso mediante el cual las células adquieren energía y eliminan desechos?, se solicita los estudiantes apoyarse en el contenido del recurso multimedial como también en la lectura “El metabolismo celular: ¿Cómo obtienen y utilizan la energía las células?” para dar respuesta a los cuestionamientos a través de la elaboración de una infografía en la herramienta Canva\n\nA partir de la visualización, la docente, presenta y proporciona a los estudiantes un cubo Merge e indica las funcionalidades de la herramienta y propone hacer uso del cubo superponiendo la imagen de la célula vegetal con el propósito de identificar las estructuras celulares para llevar a cabo el metabolismo celular\n\nLos estudiantes completan el cuadro de la estructura celular en la plataforma Vercel',
        initialQuestion:
          '¿Qué creen que sucedería si una fábrica dejara de recibir materiales o energía para funcionar? ¿Pasaría algo parecido en nuestras células si no recibieran los nutrientes que necesitan?',
        mandatoryQuestion:
          '¿De qué manera las células vegetales y animales llevan a cabo sus actividades para conservar la vida? ¿Cómo se llama el proceso mediante el cual las células adquieren energía y eliminan desechos?',
        docUrl:
          'https://docs.google.com/document/d/1RNF1OnvpUMINXE-p-D-T9ZF2B6ycDj3x/edit?usp=sharing&ouid=107395200434224073532&rtpof=true&sd=true',
        hasCanva: true,
        hasMergeCube: true,
        hasEvidenceResponse: false,
        platformResource: 'Plataforma Vercel',
        sourceSession: M3_SESSION,
        sourceSection: 'Descripción de la actividad',
        sourceExcerpt: [
          M3_FACTORY_INTRO,
          M3_FACTORY_ANALOGY,
          M3_QUESTIONS,
          M3_ANSWER,
          M3_VIDEO_READING,
          M3_CUBE,
          M3_TABLE
        ],
        sourceResources: M3_RESOURCES,
        structuresTable: [
          {
            id: 'membrana',
            name: 'Membrana celular',
            placeholder: 'Función: controla la entrada de nutrientes y salida de desechos...'
          },
          {
            id: 'cloroplastos',
            name: 'Cloroplastos',
            placeholder: 'Función: captan la luz y producen glucosa en la fotosíntesis...'
          },
          {
            id: 'mitocondrias',
            name: 'Mitocondrias',
            placeholder: 'Función: transforman nutrientes en energía ATP (respiración celular)...'
          },
          {
            id: 'citoplasma',
            name: 'Citoplasma',
            placeholder: 'Función: medio gelatinoso donde ocurren las reacciones metabólicas...'
          },
          {
            id: 'vacuola',
            name: 'Vacuola central',
            placeholder: 'Función: almacena agua y sustancias, manteniendo la turgencia...'
          },
          {
            id: 'nucleo',
            name: 'Núcleo',
            placeholder: 'Función: dirige y coordina todas las actividades de la célula...'
          }
        ],
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
          {
            process: 'Fotosíntesis',
            where: 'Cloroplasto',
            needs: 'Luz, agua y CO2',
            produces: 'Glucosa y oxígeno',
            who: 'Plantas, algas y algunas bacterias'
          },
          {
            process: 'Respiración celular',
            where: 'Mitocondria',
            needs: 'Nutrientes y oxígeno',
            produces: 'ATP, agua y CO2',
            who: 'Plantas y animales'
          }
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
      xp: 20
    },
    {
      phase: 'inicio',
      type: 'video360',
      order: 2,
      title: 'video 360 de una fábrica de producción',
      instructions:
        'Entra a la célula-fábrica y observa qué ocurre cuando faltan materiales o energía. Completa al menos el 80 % del recorrido.',
      required: true,
      completionRule: { type: 'video_progress', min: 80 },
      content: {
        durationSeconds: 30,
        sceneTitle: 'video 360 de una fábrica de producción',
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
        pauseQuestion:
          '¿Qué pasaría si una fábrica dejara de recibir materiales o energía? ¿Pasaría algo parecido en nuestras células?',
        transcriptNote: 'Subtítulos y transcripción disponibles.',
        sourceSession: M3_SESSION,
        sourceSection: 'Recurso obligatorio de la sesión',
        sourceExcerpt: [M3_FACTORY_INTRO, M3_FACTORY_ANALOGY],
        sourceResources: [{ label: 'Video 360 de una fábrica de producción' }]
      },
      assetKeys: ['video360_fabrica_celular'],
      xp: 15
    },
    {
      phase: 'inicio',
      type: 'video360',
      order: 3,
      title: 'Video 360 Metabolismo celular',
      instructions:
        'Observa la escena 360 y registra dos ideas sobre cómo la célula obtiene y usa la energía. Completa al menos el 80 % del recorrido.',
      required: true,
      completionRule: { type: 'video_progress', min: 80 },
      content: {
        durationSeconds: 30,
        sceneTitle: 'Video 360 Metabolismo celular',
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
        transcriptNote: 'Puedes leer la transcripción completa desde el botón de accesibilidad.',
        sourceSession: M3_SESSION,
        sourceSection: 'Video y lectura del metabolismo',
        sourceExcerpt: [M3_VIDEO_READING],
        sourceResources: [
          { label: 'Lectura: El metabolismo celular (Google Docs)', url: M3_READING_URL }
        ]
      },
      assetKeys: ['video360_metabolismo'],
      xp: 15
    },
    {
      phase: 'desarrollo',
      type: 'model3d',
      order: 3,
      title: 'La célula de la energía',
      instructions:
        'Exploración opcional. Explora el modelo, mueve los controles de agua, luz y nutrientes y observa qué ocurre con la vacuola y la producción de ATP.',
      required: false,
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
      order: 4,
      title: 'Plasmólisis, turgencia y producción de ATP',
      instructions:
        'Exploración opcional. Observa la secuencia completa: la célula pierde agua, se arruga, vuelve a hidratarse y la mitocondria libera ATP.',
      required: false,
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
      order: 2,
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
        ],
        sourceSession: M3_SESSION,
        sourceSection: 'Cubo Merge (obligatorio)',
        sourceExcerpt: [M3_CUBE],
        sourceResources: [{ label: 'Aplicación RA de Cubo Merge' }]
      },
      assetKeys: ['cubo_fabrica_celular'],
      xp: 15
    },
    {
      phase: 'desarrollo',
      type: 'animation2d',
      order: 5,
      title: 'Partículas de ATP, agua y CO2',
      instructions:
        'Exploración opcional. Observa las partículas y recorre los pasos del metabolismo. Marca la actividad cuando termines.',
      required: false,
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
      order: 1,
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
        templateUrl: 'https://www.canva.com/design/360-plantilla/view',
        checklist: [
          'Incluí las dos preguntas guía.',
          'Expliqué al menos tres estructuras.',
          'Usé una analogía de fábrica.',
          'Mi enlace es público y de solo lectura.'
        ],
        sourceSession: M3_SESSION,
        sourceSection: 'Infografía en Canva (obligatoria)',
        sourceExcerpt: [M3_VIDEO_READING],
        sourceResources: [
          { label: 'Herramienta Canva', url: 'https://www.canva.com' },
          { label: 'Lectura: El metabolismo celular (Google Docs)', url: M3_READING_URL }
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
        'Completa el cuadro de la estructura celular de la Sesión 3, comparte el enlace público de tu infografía de Canva y responde las preguntas de indagación.',
      required: true,
      completionRule: { type: 'evidence_submitted' },
      content: {
        prompt:
          'Los estudiantes completan el cuadro de la estructura celular en la plataforma Vercel. Completa la función principal de las 6 estructuras y responde: ¿De qué manera las células vegetales y animales llevan a cabo sus actividades para conservar la vida? ¿Cómo se llama el proceso mediante el cual las células adquieren energía y eliminan desechos? Acompaña tu respuesta con el enlace público de tu infografía de Canva.',
        requiresLink: true,
        structuresTable: [
          { id: 'membrana', name: 'Membrana celular', placeholder: 'Describe la función principal de la membrana celular...' },
          { id: 'cloroplastos', name: 'Cloroplastos', placeholder: 'Describe la función principal de los cloroplastos...' },
          { id: 'mitocondrias', name: 'Mitocondrias', placeholder: 'Describe la función principal de las mitocondrias...' },
          { id: 'citoplasma', name: 'Citoplasma', placeholder: 'Describe la función principal del citoplasma...' },
          { id: 'vacuola', name: 'Vacuola central', placeholder: 'Describe la función principal de la vacuola central...' },
          { id: 'nucleo', name: 'Núcleo', placeholder: 'Describe la función principal del núcleo...' }
        ],
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
        ],
        sourceSession: M3_SESSION,
        sourceSection: 'Cuadro de estructura celular (cierre)',
        sourceExcerpt: [M3_ANSWER, M3_TABLE],
        sourceResources: [{ label: 'Plataforma Vercel (espacio virtual de la sesión)' }]
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
        note: 'Incluye metabolismo, fotosíntesis, respiración celular, ósmosis y turgencia.',
        sourceSession: M3_SESSION,
        sourceSection: 'Cierre de la sesión',
        sourceExcerpt: [M3_FACTORY_ANALOGY],
        sourceNote:
          'El reto final no aparece en el documento curricular: es el componente de gamificación de la misión. Comprueba los aprendizajes de la Sesión 3: metabolismo, fotosíntesis, respiración celular y ósmosis.'
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
        'Exploración opcional. Coloca bastones de papa en agua pura, agua con poca sal y agua con mucha sal. Mide y explica qué ocurre.',
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
