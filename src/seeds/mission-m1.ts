import type { SeedMission } from './mission-types';
import {
  M1_CONCEPT,
  M1_OPENING,
  M1_PARTICIPATION,
  M1_POSTULATES,
  M1_QUESTION,
  M1_REQUEST,
  M1_RESOURCES,
  M1_SESSION
} from './officialSource';

export const missionM1: SeedMission = {
  code: 'm1',
  order: 1,
  title: '¡Misión microscópica!',
  subtitle: 'Exploradores en busca de los secretos de la célula',
  bigQuestion:
    '¿Sabías que tu cuerpo, las plantas y los animales están formados por millones de pequeñas estructuras que no podemos ver a simple vista? ¿Se imaginan cómo son y qué hacen para mantenernos vivos?',
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
      description:
        'Texto oficial de la Sesión 1: pregunta motivadora, video, lectura y postulados de la teoría celular.',
      order: 1
    },
    {
      key: 'desarrollo',
      title: 'Desarrollo: viaje al interior de la vida',
      description:
        'Exploración opcional: microscopio 3D, cubo de la teoría celular y animaciones de apoyo.',
      order: 2
    },
    {
      key: 'cierre',
      title: 'Cierre: demuestra lo que descubriste',
      description:
        'Responde la pregunta de indagación del documento y presenta el reto final para ganar tu insignia.',
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
      type: 'reading',
      order: 1,
      title: 'Sesión 1: ¡Misión microscópica! Acercamiento a la teoría celular',
      instructions:
        'Visualiza el recurso multimedial y realiza la lectura oficial de la Sesión 1. Revisa la pregunta de indagación: la responderás en la actividad de cierre «Dos ideas que cambian la mirada».',
      required: true,
      completionRule: { type: 'confirm', label: 'He realizado la lectura y visto el video de la Sesión 1' },
      content: {
        sessionNumber: 1,
        sessionTitle: 'Sesión 1: ¡Misión microscópica! Exploradores en busca de los secretos de la célula',
        mainTheme: 'Tema principal 1. Acercamiento a la teoría celular',
        subtheme1: 'Subtema 1. Teoría Celular',
        subtheme2: 'Subtema 2. La célula como unidad estructural y funcional',
        activityDescription:
          'La docente inicia la sesión motivando a los estudiantes a dar respuesta a la pregunta ¿Sabías que tu cuerpo, las plantas y los animales están formados por millones de pequeñas estructuras que no podemos ver a simple vista? ¿se imaginan cómo son y qué hacen para mantenernos vivos?\n\nLos estudiantes participan de forma oral y escrita en la plataforma, dan a conocer sus aportes y socializan con el grupo sus ideas, la docente, proyecta un recurso multimedial que explica los aportes, sus inicios y representantes en la construcción del conocimiento de lo que actualmente se reconoce como teoría celular,\n\nLa docente realiza un aporte conceptual explicando que La Teoría celular explica por qué razón la célula es la unidad estructural y funcional de todos los seres vivos que habitan el planeta, excepto los virus que son acelulares. Incluye los siguientes postulados:\n\n• Todos los seres vivos que habitan el planeta se componen de una (unicelulares) o más células (pluricelulares).\n\n• Toda célula procede de otra preexistente, que ha copiado su información genética antes de dividirse en dos células hijas.\n\n• Toda célula se compone básicamente de las mismas sustancias químicas: agua, trazas de minerales, carbohidratos, lípidos, proteínas y ácidos nucleicos, conocidas como "moléculas de la vida o biomoléculas".\n\n• La célula es la unidad funcional de los seres vivos, porque independientemente del organismo al cual se haga referencia, es en ella donde ocurre las reacciones químicas que se necesitan para vivir.\n\nSe solicita los estudiantes visualizar el video y realizar la lectura que se aloja en la plataforma para dar respuesta a la siguiente pregunta en el espacio virtual de la plataforma Vercel.',
        initialQuestion:
          '¿Sabías que tu cuerpo, las plantas y los animales están formados por millones de pequeñas estructuras que no podemos ver a simple vista? ¿se imaginan cómo son y qué hacen para mantenernos vivos?',
        mandatoryQuestion:
          'Identifique dos ideas mencionadas en la lectura que usted considera importantes para el estudio de la biología. Argumente cada una de ellas.',
        videoTitle: 'Video YouTube: La extraña historia de la teoría celular',
        videoUrl: 'https://youtu.be/OOXO3fGImoU',
        videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/OOXO3fGImoU',
        docUrl:
          'https://docs.google.com/document/d/1sP7mzPT9L0z-RH3FDHUBztziEnZ56rqG/edit?usp=sharing&ouid=107395200434224073532&rtpof=true&sd=true',
        platformResource: 'Plataforma Vercel',
        hasEvidenceResponse: false,
        sourceSession: M1_SESSION,
        sourceSection: 'Descripción de la actividad',
        sourceExcerpt: [
          M1_OPENING,
          M1_PARTICIPATION,
          M1_CONCEPT,
          ...M1_POSTULATES,
          M1_REQUEST,
          M1_QUESTION
        ],
        sourceResources: M1_RESOURCES,
        postulates: [
          'Todos los seres vivos que habitan el planeta se componen de una (unicelulares) o más células (pluricelulares).',
          'Toda célula procede de otra preexistente, que ha copiado su información genética antes de dividirse en dos células hijas.',
          'Toda célula se compone básicamente de las mismas sustancias químicas: agua, trazas de minerales, carbohidratos, lípidos, proteínas y ácidos nucleicos, conocidas como "moléculas de la vida o biomoléculas".',
          'La célula es la unidad funcional de los seres vivos, porque independientemente del organismo al cual se haga referencia, es en ella donde ocurre las reacciones químicas que se necesitan para vivir.'
        ],
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
        glossary: [
          { term: 'Célula', definition: 'Unidad más pequeña que forma a los seres vivos y realiza sus funciones vitales.' },
          { term: 'Microscopio', definition: 'Instrumento que usa lentes para ampliar objetos muy pequeños.' },
          { term: 'Teoría celular', definition: 'Explicación científica que reúne los postulados sobre las células.' },
          { term: 'Biomoléculas', definition: 'Sustancias químicas indispensables para la vida: agua, minerales, carbohidratos, lípidos, proteínas y ácidos nucleicos.' }
        ],
        didYouKnow:
          'Los virus no son células: necesitan una célula para reproducirse. Por eso la teoría celular explica que la célula es la unidad de todos los seres vivos excepto los virus, que son acelulares.'
      },
      assetKeys: ['lectura_teoria_celular'],
      xp: 20
    },
    {
      phase: 'inicio',
      type: 'video360',
      order: 2,
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
          'A tu izquierda, observa una célula absorbiendo nutrientes del agua: su volumen aumenta gradualmente, un claro signo de crecimiento celular.',
          'A tu derecha, fíjate en esa célula alargándose: su núcleo se duplica, su membrana se estrangula por el centro y se divide en dos células hijas vivas. ¡Es la reproducción celular en acción!',
          'Crecimiento, reproducción y nutrición: todos los seres vivos unicelulares comparten estas funciones vitales.'
        ],
        organisms: [
          {
            id: 'crecimiento-celular',
            name: 'Signo de Crecimiento Celular',
            icon: '🌱',
            color: '#10b981',
            fact: 'La célula viva asimila agua y nutrientes de la gota, aumentando su masa y volumen antes de poder dividirse.'
          },
          {
            id: 'reproduccion-biparticion',
            name: 'Signo de Reproducción (Bipartición)',
            icon: '🧬',
            color: '#f43f5e',
            fact: 'Fisión binaria: La célula madre duplica su ADN, se estrangula en el centro y se divide en 2 células hijas independientes.'
          },
          {
            id: 'paramecio',
            name: 'Paramecio nadador',
            icon: '🦠',
            color: '#38bdf8',
            fact: 'Microorganismo unicelular con cilios vibrantes que le permiten desplazarse y alimentarse en el agua.'
          },
          {
            id: 'alga',
            name: 'Alga verde fotosintética',
            icon: '🌿',
            color: '#22c55e',
            fact: 'Realiza fotosíntesis dentro de la gota, transformando luz solar en energía y liberando burbujas de oxígeno.'
          }
        ],
        pauseQuestion: '¿Qué signos de vida observaste en las células de la gota de agua (nutrición, crecimiento o reproducción)?',
        transcriptNote: 'La transcripción completa está disponible en el botón de accesibilidad.',
        sourceSession: M1_SESSION,
        sourceSection: 'Pregunta motivadora de la sesión',
        sourceExcerpt: [M1_OPENING],
        sourceNote:
          'El documento invita a imaginar cómo son esas estructuras invisibles y qué hacen para mantenernos vivos. Esta escena 360 responde a esa invitación observando células en una gota de agua.'
      },
      assetKeys: ['video360_gota_agua'],
      xp: 20
    },
    {
      phase: 'desarrollo',
      type: 'model3d',
      order: 1,
      title: 'El microscopio y la célula',
      instructions:
        'Exploración opcional. Gira el microscopio, cambia el aumento y toca los puntos brillantes para descubrir los tres postulados de la teoría celular.',
      required: false,
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
        'Exploración opcional. Explora al menos 4 de las 6 caras del Cubo Merge. Gíralo con el ratón, el dedo o las flechas del teclado.',
      required: false,
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
        'Exploración opcional. Observa la animación y sigue el viaje de la cámara: desde un organismo completo hasta una célula y su núcleo.',
      required: false,
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
        'Exploración opcional. Recorre la línea de tiempo, abre cada tarjeta y descubre cómo cada científico aportó una pieza de la teoría celular.',
      required: false,
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
        'Responde la pregunta de indagación de la Sesión 1: identifica dos ideas de la lectura y argumenta cada una con tus propias palabras. Puedes guardar un borrador antes de enviar.',
      required: true,
      completionRule: { type: 'evidence_submitted' },
      content: {
        prompt:
          'Identifique dos ideas mencionadas en la lectura que usted considera importantes para el estudio de la biología. Argumente cada una de ellas. Usa tus propias palabras, relaciónalas con la teoría celular y explica por qué son importantes.',
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
        ],
        sourceSession: M1_SESSION,
        sourceSection: 'Pregunta de indagación',
        sourceExcerpt: [M1_REQUEST, M1_QUESTION],
        sourceResources: [{ label: 'Plataforma Vercel (espacio virtual de la sesión)' }]
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
        note: 'Cada respuesta recibe retroalimentación. La insignia se entrega al completar todas las actividades y aprobar el quiz.',
        sourceSession: M1_SESSION,
        sourceSection: 'Cierre de la sesión',
        sourceExcerpt: [M1_CONCEPT],
        sourceNote:
          'El reto final no aparece en el documento curricular: es el componente de gamificación de la misión. Comprueba los aprendizajes de la Sesión 1: los postulados, la teoría celular y el vocabulario científico.'
      },
      assetKeys: [],
      xp: 30
    }
  ]
};
