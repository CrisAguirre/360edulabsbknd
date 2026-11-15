import type { SeedMission } from './mission-types';
import {
  M2_ANIMAL_TEMPLATE_URL,
  M2_ANSWER,
  M2_INTRO,
  M2_PLANT_TEMPLATE_URL,
  M2_QUESTION,
  M2_QUIVER,
  M2_RESOURCES,
  M2_SESSION,
  M2_VIDEO,
  M2_YOUTUBE_EMBED_URL,
  M2_YOUTUBE_URL
} from './officialSource';

export const missionM2: SeedMission = {
  code: 'm2',
  order: 2,
  title: '¡Misión celular!',
  subtitle: 'Descifrando el secreto de la unidad de la vida',
  bigQuestion:
    '¿Creen que las células de nuestro cuerpo son iguales a las de una planta? ¿Qué diferencias imaginan que existen entre ellas y qué partes creen que necesitan para poder vivir y funcionar?',
  description:
    'La muestra misteriosa se abre y revela dos mundos: células animales y células vegetales. Compararás sus partes, usarás el Cubo Merge y descubrirás que cada estructura cumple una función dentro del sistema celular.',
  objectives: [
    'Identificar las partes principales de la célula y sus funciones.',
    'Comparar célula animal y célula vegetal.',
    'Usar la estación Quiver para observar un modelo coloreado.',
    'Construir la idea de célula como sistema.',
    'Explicar la relación entre estructura y función.'
  ],
  phases: [
    {
      key: 'inicio',
      title: 'Inicio: dos células, un misterio',
      description:
        'Texto oficial de la Sesión 2: pregunta motivadora y video 360 de la célula y sus partes.',
      order: 1
    },
    {
      key: 'desarrollo',
      title: 'Desarrollo: células bajo la lupa',
      description:
        'Estación Quiver obligatoria. Modelos 3D, cubo y animaciones como exploración opcional.',
      order: 2
    },
    {
      key: 'cierre',
      title: 'Cierre: mi mapa de la célula',
      description:
        'Responde la pregunta de indagación, presenta tu comparación y gana la insignia.',
      order: 3
    }
  ],
  badgeCode: 'constructor-conocimiento',
  estimatedMinutes: 90,
  status: 'published',
  version: 1,
  theme: {
    accent: '#7dd3fc',
    soft: 'rgba(125, 211, 252, 0.14)',
    icon: '🧬'
  },
  activities: [
    {
      phase: 'inicio',
      type: 'reading',
      order: 1,
      title: 'Sesión 2: Construyendo el concepto de célula',
      instructions:
        'Explora las sub-actividades de la sesión (2.1 a 2.6): saberes previos, célula vegetal, célula animal, responde la pregunta de indagación en la plataforma Vercel, visualiza el modelo 360 y video interactivo, y colorea las plantillas Quiver.',
      required: true,
      completionRule: {
        type: 'confirm',
        label: 'He completado las sub-actividades de la sesión y enviado mi respuesta'
      },
      content: {
        sessionNumber: 2,
        sessionTitle: 'Sesión 2: Construyendo el concepto de célula',
        mainTheme: 'Tema principal 1. Concepto de Célula',
        subtheme1: 'Subtema 1. Partes o componentes de la célula',
        subtheme2: 'Subtema 2. Funciones de los componentes de la célula',
        activityDescription:
          'A partir de la identificación de la célula como unidad estructural y funcional de los seres vivos, la docente, busca reconocer los saberes previos de los estudiantes de grado 5.º sobre la clasificación de las células, especialmente las animales y vegetales, así como identificar sus conocimientos acerca de las principales estructuras celulares y sus funciones, promoviendo la curiosidad, la participación y la construcción colectiva del conocimiento, planteando la pregunta\n\n¿Creen que las células de nuestro cuerpo son iguales a las de una planta? ¿Qué diferencias imaginan que existen entre ellas y qué partes creen que necesitan para poder vivir y funcionar?\n\nPara dar respuesta al planteamiento, la docente invita a los estudiantes a visualizar el video 360 de la célula y sus partes\n\nLos estudiantes dan respuesta al planteamiento en la plataforma Vercel\n\nA fin de afianzar el concepto de la célula y sus partes, la docente proporciona material impreso de Quiver y solicita a los estudiantes colorear la estructura de la célula vegetal y animal, posterior a ello, cada grupo de estudiantes proyecta la imagen a través de la aplicación de Quiver e identifican las semejanzas y diferencias de la estructura entre la célula animal y vegetal',
        initialQuestion:
          '¿Creen que las células de nuestro cuerpo son iguales a las de una planta? ¿Qué diferencias imaginan que existen entre ellas y qué partes creen que necesitan para poder vivir y funcionar?',
        mandatoryQuestion:
          '¿Creen que las células de nuestro cuerpo son iguales a las de una planta? ¿Qué diferencias imaginan que existen entre ellas y qué partes creen que necesitan para poder vivir y funcionar?',
        plantTemplateDriveUrl:
          'https://drive.google.com/file/d/1Rc_5xG1CsOAcfSwXpzT3dA5aBwOfNMMa/view?usp=sharing',
        animalTemplateDriveUrl:
          'https://drive.google.com/file/d/1euCki6yPm4LXeIMCyWAKvnBfRPPVmJmu/view?usp=sharing',
        hasQuiver: true,
        hasEvidenceResponse: true,
        platformResource: 'Plataforma Vercel',
        sourceSession: M2_SESSION,
        sourceSection: 'Descripción de la actividad',
        sourceExcerpt: [M2_INTRO, M2_QUESTION, M2_VIDEO, M2_ANSWER, M2_QUIVER],
        sourceResources: [
          ...M2_RESOURCES,
          {
            label: 'Video interactivo YouTube: Estructura y partes de la célula',
            url: M2_YOUTUBE_URL
          }
        ],
        videoUrl: M2_YOUTUBE_URL,
        videoEmbedUrl: M2_YOUTUBE_EMBED_URL,
        videoTitle: 'Video interactivo: Estructura y partes de la célula',
        videoDescription:
          'Explicación visual inmersiva de los organelos celulares, sus funciones especializadas y la comparación estructural entre seres vivos vegetales y animales.',
        videoPurposes: [
          'Identificar la localización y aspecto tridimensional de cada organelo.',
          'Entender por qué las células vegetales tienen cloroplastos y pared celular mientras las animales no las necesitan.',
          'Reconocer la función vital del núcleo, mitocondria, membrana y citoplasma en el funcionamiento diario del organismo.',
          'Preparar argumentos fundamentados para responder la pregunta de indagación en la plataforma Vercel.'
        ],
        subactivities: {
          s21: {
            number: '2.1',
            title: 'Introducción y reconocimiento de saberes previos',
            text: M2_INTRO
          },
          s22: {
            number: '2.2',
            title: 'Célula Vegetal',
            driveUrl: M2_PLANT_TEMPLATE_URL,
            description: 'Plantilla y ficha interactiva de la Célula Vegetal con pared celular de celulosa, cloroplastos con clorofila, gran vacuola central y forma poliédrica.'
          },
          s23: {
            number: '2.3',
            title: 'Célula Animal',
            driveUrl: M2_ANIMAL_TEMPLATE_URL,
            description: 'Plantilla y ficha interactiva de la Célula Animal con membrana plasmática elástica, núcleo central, mitocondrias dinámicas y nutrición heterótrofa.'
          },
          s24: {
            number: '2.4',
            title: 'Planteamiento de la pregunta y Espacio Virtual Vercel',
            question: M2_QUESTION,
            platform: 'Plataforma Vercel'
          },
          s25: {
            number: '2.5',
            title: 'Presentación del modelo 360 y video interactivo',
            videoUrl: M2_YOUTUBE_URL,
            videoEmbedUrl: M2_YOUTUBE_EMBED_URL,
            model3dDescription: 'Modelo 3D y vista panorámica 360 de la célula animal y vegetal con exploración de organelos.'
          },
          s26: {
            number: '2.6',
            title: 'Material impreso Quiver y Análisis Comparativo',
            instructions: M2_QUIVER,
            comparisonTableSummary: '7 estructuras celulares comparadas: Membrana, Núcleo, Citoplasma, Mitocondrias, Vacuolas, Pared celular y Cloroplastos.'
          }
        },
        title: 'Animal o vegetal: dos formas de ser célula',
        intro:
          'Las células animales y vegetales comparten muchas estructuras, pero también tienen diferencias que les permiten vivir de formas distintas. Ninguna es mejor: cada una está adaptada a su manera de obtener alimento y relacionarse con el ambiente.',
        sections: [
          {
            heading: 'Lo que comparten',
            body:
              'Ambas tienen membrana celular, citoplasma, núcleo, mitocondrias y vacuolas. La membrana regula el intercambio, el citoplasma es el medio de las reacciones, el núcleo dirige las actividades y las mitocondrias producen ATP.'
          },
          {
            heading: 'Lo que hace especial a la célula vegetal',
            body:
              'La célula vegetal tiene pared celular, una vacuola central grande y cloroplastos. La pared le da forma y protección; la vacuola almacena agua y mantiene la turgencia; los cloroplastos captan la luz para producir glucosa durante la fotosíntesis.'
          },
          {
            heading: 'Lo que hace especial a la célula animal',
            body:
              'La célula animal no tiene pared celular ni cloroplastos. Su membrana es flexible y su forma puede cambiar. Tiene vacuolas pequeñas y temporales, y obtiene los nutrientes de otros seres vivos.'
          }
        ],
        comparisonTable: [
          { structure: 'Membrana celular', animal: 'Sí', plant: 'Sí', function: 'Controla qué entra y sale' },
          { structure: 'Núcleo', animal: 'Sí', plant: 'Sí', function: 'Guarda la información y dirige' },
          { structure: 'Citoplasma', animal: 'Sí', plant: 'Sí', function: 'Medio de las reacciones' },
          { structure: 'Mitocondrias', animal: 'Sí', plant: 'Sí', function: 'Producen ATP' },
          { structure: 'Vacuola', animal: 'Pequeñas', plant: 'Grande y central', function: 'Almacena agua y sustancias' },
          { structure: 'Pared celular', animal: 'No', plant: 'Sí', function: 'Da forma y protección' },
          { structure: 'Cloroplastos', animal: 'No', plant: 'Sí', function: 'Captan luz para la fotosíntesis' }
        ],
        glossary: [
          { term: 'Estructura', definition: 'Parte de la célula que cumple una función determinada.' },
          { term: 'Turgencia', definition: 'Firmeza de la célula vegetal cuando su vacuola está llena de agua.' },
          { term: 'Fotosíntesis', definition: 'Proceso en el que las plantas usan luz, agua y CO2 para producir glucosa.' }
        ],
        note:
          'Evitamos decir que la célula animal "no tiene vacuolas": tiene vacuolas pequeñas o temporales. La diferencia está en su tamaño y función.'
      },
      assetKeys: ['lectura_comparacion_celular'],
      xp: 20
    },
    {
      phase: 'inicio',
      type: 'video360',
      order: 2,
      title: 'Video 360 de la célula y sus partes',
      instructions:
        'Explora la escena 360 y marca tres diferencias entre la célula animal y la vegetal. Completa al menos el 80 % del recorrido.',
      required: true,
      completionRule: { type: 'video_progress', min: 80 },
      content: {
        durationSeconds: 30,
        sceneTitle: 'Video 360 de la célula y sus partes',
        place: 'Un viaje desde una hoja hasta una célula vegetal, y desde tu piel hasta una célula animal',
        intro:
          'Cito abre la muestra y aparecen dos células. Una tiene una pared rígida y pequeños paneles verdes. La otra es más flexible. ¿Qué más puedes observar?',
        narration: [
          'Cito: esta es una célula vegetal. Mira su forma: parece una caja porque tiene pared celular.',
          'Ahora observa la célula animal. Su membrana es flexible y su forma cambia con facilidad.',
          'Las dos tienen membrana, citoplasma, núcleo y mitocondrias. ¿Qué estructuras solo ves en la vegetal?',
          'Los cloroplastos son verdes porque captan la luz. La vacuola central guarda agua y mantiene la célula firme.'
        ],
        structures: [
          { id: 'membrana', name: 'Membrana', icon: '🛡️', fact: 'Controla qué entra y qué sale.' },
          { id: 'nucleo', name: 'Núcleo', icon: '🧠', fact: 'Guarda la información y dirige las actividades.' },
          { id: 'citoplasma', name: 'Citoplasma', icon: '💧', fact: 'Medio gelatinoso donde ocurren las reacciones.' },
          { id: 'mitocondria', name: 'Mitocondrias', icon: '⚡', fact: 'Producen la energía utilizable o ATP.' },
          { id: 'vacuola', name: 'Vacuola', icon: '🫧', fact: 'Almacena agua y sustancias.' },
          { id: 'pared', name: 'Pared celular', icon: '🧱', fact: 'Da forma y protección a la célula vegetal.' },
          { id: 'cloroplasto', name: 'Cloroplastos', icon: '🌿', fact: 'Captan luz para hacer fotosíntesis.' }
        ],
        pauseQuestion: '¿Qué estructuras crees que solo tiene la célula vegetal?',
        transcriptNote: 'Puedes activar la transcripción y los subtítulos desde el reproductor.',
        sourceSession: M2_SESSION,
        sourceSection: 'Recurso obligatorio de la sesión',
        sourceExcerpt: [M2_VIDEO],
        sourceResources: [{ label: 'Video 360 de la célula y sus partes' }]
      },
      assetKeys: ['video360_celula_partes'],
      xp: 20
    },
    {
      phase: 'desarrollo',
      type: 'model3d',
      order: 2,
      title: 'Células animal y vegetal en 3D',
      instructions:
        'Exploración opcional. Gira los modelos, cambia entre célula animal y vegetal, activa las capas y toca los hotspots para conocer cada organelo.',
      required: false,
      completionRule: { type: 'confirm', label: 'Exploré ambos modelos y sus organelos' },
      content: {
        model: 'cell-compare',
        title: 'Dos células para comparar',
        intro:
          'Usa el conmutador para cambiar de célula. Activa o desactiva capas y abre la vista desarmada para ver los organelos por separado.',
        modes: [
          {
            id: 'animal',
            label: 'Célula animal',
            color: '#7dd3fc',
            hotspots: [
              { id: 'membrana', label: 'Membrana', description: 'Barrera flexible que regula el intercambio.', position: [0, 0.9, 0.9] },
              { id: 'nucleo', label: 'Núcleo', description: 'Centro de control con la información genética.', position: [0, 0.2, 0.5] },
              { id: 'mitocondria', label: 'Mitocondrias', description: 'Producen ATP mediante la respiración celular.', position: [0.7, -0.3, 0.4] },
              { id: 'vacuola', label: 'Vacuolas pequeñas', description: 'Almacenan agua y sustancias de forma temporal.', position: [-0.6, -0.2, 0.3] }
            ]
          },
          {
            id: 'vegetal',
            label: 'Célula vegetal',
            color: '#4ade80',
            hotspots: [
              { id: 'pared', label: 'Pared celular', description: 'Capa rígida que da forma y protección.', position: [0, 0.9, 0.9] },
              { id: 'cloroplasto', label: 'Cloroplastos', description: 'Captan la luz y realizan la fotosíntesis.', position: [0.7, -0.3, 0.4] },
              { id: 'vacuola-central', label: 'Vacuola central', description: 'Grande, almacena agua y mantiene la turgencia.', position: [0, 0.1, 0.4] },
              { id: 'nucleo', label: 'Núcleo', description: 'Dirige las actividades de la célula.', position: [-0.7, 0.2, 0.3] }
            ]
          }
        ],
        layers: ['Membrana', 'Citoplasma', 'Núcleo', 'Organelos'],
        controls: ['Arrastrar para girar', 'Rueda para acercar', 'Botón de capas', 'Vista desarmada']
      },
      assetKeys: ['celula_animal_kids.glb', 'celula_vegetal_kids.glb'],
      xp: 20
    },
    {
      phase: 'desarrollo',
      type: 'animation3d',
      order: 3,
      title: 'Comparación celular: recorrido por organelos',
      instructions:
        'Exploración opcional. Observa el recorrido de la cámara por los organelos y fíjate en el resaltado secuencial. Luego completa la actividad.',
      required: false,
      completionRule: { type: 'confirm', label: 'Vi la comparación completa' },
      content: {
        title: 'Célula animal vs. célula vegetal',
        intro: 'La cámara entra en ambas células al mismo tiempo y resalta una estructura en cada paso.',
        steps: [
          { title: 'Membrana', description: 'Presente en las dos. Regula el paso de sustancias.', highlight: 'membrana' },
          { title: 'Núcleo', description: 'Presente en las dos. Guarda la información y dirige.', highlight: 'nucleo' },
          { title: 'Mitocondrias', description: 'Presentes en las dos. Producen ATP.', highlight: 'mitocondria' },
          { title: 'Vacuola', description: 'Pequeña en la animal, grande y central en la vegetal.', highlight: 'vacuola' },
          { title: 'Pared celular', description: 'Solo en la vegetal. Da forma y protección.', highlight: 'pared' },
          { title: 'Cloroplastos', description: 'Solo en la vegetal. Captan la luz para la fotosíntesis.', highlight: 'cloroplasto' }
        ],
        durationSeconds: 20,
        closing: 'Las diferencias no hacen a una célula mejor que otra: cada una está adaptada a su forma de vivir.'
      },
      assetKeys: ['m2_comparacion_celular.glb'],
      xp: 15
    },
    {
      phase: 'desarrollo',
      type: 'ar_cube',
      order: 4,
      title: 'Cubo celular',
      instructions:
        'Exploración opcional. Explora al menos 4 de las 6 caras del Cubo Merge y asocia cada estructura con su función.',
      required: false,
      completionRule: { type: 'faces_explored', min: 4 },
      content: {
        cubeTitle: 'Cubo celular',
        intro: 'Cada cara del cubo es una estructura celular. Gíralo y descubre qué hace dentro de la célula.',
        faces: [
          {
            id: 'nucleo',
            label: 'Núcleo',
            icon: '🧠',
            color: '#a78bfa',
            description: 'Guarda la información y dirige las actividades de la célula.',
            fact: 'Dentro del núcleo está el ADN, como un manual de instrucciones.'
          },
          {
            id: 'membrana',
            label: 'Membrana',
            icon: '🛡️',
            color: '#7dd3fc',
            description: 'Controla qué sustancias entran y salen de la célula.',
            fact: 'Es flexible en la célula animal y está rodeada por la pared en la vegetal.'
          },
          {
            id: 'citoplasma',
            label: 'Citoplasma',
            icon: '💧',
            color: '#58e6c5',
            description: 'Medio gelatinoso donde ocurren muchas reacciones celulares.',
            fact: 'En el citoplasma flotan los organelos.'
          },
          {
            id: 'cloroplasto',
            label: 'Cloroplasto',
            icon: '🌿',
            color: '#4ade80',
            description: 'Capta la luz y produce glucosa durante la fotosíntesis.',
            fact: 'Su color verde se debe a la clorofila.'
          },
          {
            id: 'vacuola',
            label: 'Vacuola',
            icon: '🫧',
            color: '#fbbf24',
            description: 'Almacena agua y sustancias. En la vegetal es grande y central.',
            fact: 'Cuando está llena, la célula se mantiene firme: eso es la turgencia.'
          },
          {
            id: 'pared',
            label: 'Pared celular',
            icon: '🧱',
            color: '#f472b6',
            description: 'Capa rígida que da forma, protección y sostén a la célula vegetal.',
            fact: 'No es lo mismo que la membrana: la pared está por fuera.'
          }
        ]
      },
      assetKeys: ['cubo_celular'],
      xp: 15
    },
    {
      phase: 'desarrollo',
      type: 'quiver',
      order: 1,
      title: 'Estación Quiver: colorea y observa',
      instructions:
        'Imprime o descarga las plantillas, colorea la célula animal y la vegetal, escanéalas con Quiver y sube una foto clara en tu evidencia final.',
      required: true,
      completionRule: { type: 'confirm', label: 'Completé mi modelo Quiver' },
      content: {
        title: 'Estación Quiver',
        intro:
          'Quiver convierte tus dibujos en modelos con realidad aumentada. Usa las plantillas oficiales del Laboratorio 360 para colorear y luego observar tus células en 3D.',
        plantTemplateDriveUrl:
          'https://drive.google.com/file/d/1Rc_5xG1CsOAcfSwXpzT3dA5aBwOfNMMa/view?usp=sharing',
        animalTemplateDriveUrl:
          'https://drive.google.com/file/d/1euCki6yPm4LXeIMCyWAKvnBfRPPVmJmu/view?usp=sharing',
        steps: [
          { title: 'Descarga', description: 'Descarga las plantillas de célula animal y vegetal en blanco y negro.' },
          { title: 'Colorea', description: 'Sigue el código de colores: verde para cloroplastos, azul para núcleo, amarillo para vacuola y naranja para mitocondrias.' },
          { title: 'Escanea', description: 'Abre la app de Quiver y apunta la cámara a la plantilla coloreada.' },
          { title: 'Fotografía', description: 'Toma una foto clara del modelo coloreado donde se vean las estructuras.' }
        ],
        colorGuide: [
          { structure: 'Núcleo', color: 'Azul', hex: '#60a5fa' },
          { structure: 'Cloroplastos', color: 'Verde', hex: '#4ade80' },
          { structure: 'Vacuola', color: 'Amarillo', hex: '#fbbf24' },
          { structure: 'Mitocondrias', color: 'Naranja', hex: '#fb923c' },
          { structure: 'Membrana', color: 'Morado', hex: '#a78bfa' },
          { structure: 'Pared celular', color: 'Café', hex: '#b45309' }
        ],
        checklist: [
          'Coloreé las dos plantillas.',
          'Identifiqué al menos cinco estructuras.',
          'La foto muestra el modelo completo y con buena luz.'
        ],
        downloadNote: 'Las plantillas se entregan como PDF para imprimir. También puedes colorearlas en pantalla si tu docente lo indica.',
        sourceSession: M2_SESSION,
        sourceSection: 'Estación Quiver (obligatoria)',
        sourceExcerpt: [M2_QUIVER],
        sourceResources: [
          { label: 'Célula vegetal (plantilla Google Drive)', url: M2_PLANT_TEMPLATE_URL },
          { label: 'Célula animal (plantilla Google Drive)', url: M2_ANIMAL_TEMPLATE_URL }
        ]
      },
      assetKeys: ['quiver_plantilla_animal', 'quiver_plantilla_vegetal'],
      xp: 10
    },
    {
      phase: 'desarrollo',
      type: 'animation2d',
      order: 5,
      title: 'Tarjetas y comparador de organelos',
      instructions:
        'Exploración opcional. Abre las tarjetas de organelos y usa el comparador para descubrir diferencias de tamaño y cantidad entre ambas células.',
      required: false,
      completionRule: { type: 'confirm', label: 'Exploré las tarjetas y el comparador' },
      content: {
        component: 'SpotlightCard',
        title: 'Organelos en primer plano',
        intro: 'Pasa el cursor o toca cada tarjeta para iluminar un organelo y leer su función.',
        cards: [
          { id: 'nucleo', title: 'Núcleo', icon: '🧠', text: 'Guarda la información y dirige las actividades.', accent: '#a78bfa' },
          { id: 'membrana', title: 'Membrana', icon: '🛡️', text: 'Regula el intercambio con el exterior.', accent: '#7dd3fc' },
          { id: 'mitocondria', title: 'Mitocondria', icon: '⚡', text: 'Produce ATP, la energía que la célula puede usar.', accent: '#fbbf24' },
          { id: 'cloroplasto', title: 'Cloroplasto', icon: '🌿', text: 'Capta la luz y produce glucosa.', accent: '#4ade80' },
          { id: 'vacuola', title: 'Vacuola', icon: '🫧', text: 'Almacena agua y mantiene la turgencia.', accent: '#38bdf8' },
          { id: 'pared', title: 'Pared celular', icon: '🧱', text: 'Da forma y protección a la célula vegetal.', accent: '#f472b6' }
        ],
        slider: {
          title: 'Compara las vacuolas',
          leftLabel: 'Célula animal',
          rightLabel: 'Célula vegetal',
          leftValue: 'Pequeñas y temporales',
          rightValue: 'Grande y central',
          note: 'Desliza para comparar. Ambas tienen vacuolas, pero su tamaño y función cambian.'
        }
      },
      assetKeys: ['reactbits_comparador_celular'],
      xp: 10
    },
    {
      phase: 'cierre',
      type: 'evidence',
      order: 1,
      title: 'Mi mapa de la célula',
      instructions:
        'Responde la pregunta de indagación de la Sesión 2 y presenta tu mapa de la célula: foto o enlace del modelo Quiver, cuatro diferencias y reflexión final.',
      required: true,
      completionRule: { type: 'evidence_submitted' },
      content: {
        prompt:
          '¿Creen que las células de nuestro cuerpo son iguales a las de una planta? ¿Qué diferencias imaginan que existen entre ellas y qué partes creen que necesitan para poder vivir y funcionar? Responde con tus palabras y acompaña tu respuesta con la foto o el enlace de tu modelo Quiver, al menos cuatro diferencias entre célula animal y vegetal y la reflexión final.',
        minLength: 100,
        checklist: [
          'Mi foto o enlace muestra el modelo Quiver coloreado.',
          'Incluyo al menos cuatro diferencias entre célula animal y vegetal.',
          'Explico la función de tres estructuras.',
          'Respondo qué parte me sorprendió y por qué.'
        ],
        rubric: [
          { level: 'Bajo', description: 'Foto poco clara o tabla incompleta.' },
          { level: 'Básico', description: 'Foto legible y una diferencia.' },
          { level: 'Alto', description: 'Foto clara, cuatro diferencias y reflexión.' },
          { level: 'Superior', description: 'Comparación completa, vocabulario preciso y relación estructura-función.' }
        ],
        sourceSession: M2_SESSION,
        sourceSection: 'Pregunta de indagación',
        sourceExcerpt: [M2_ANSWER, M2_QUESTION],
        sourceResources: [{ label: 'Plataforma Vercel (espacio virtual de la sesión)' }]
      },
      assetKeys: [],
      xp: 20
    },
    {
      phase: 'cierre',
      type: 'quiz',
      order: 2,
      title: 'Reto final: células bajo la lupa',
      instructions:
        'Responde el quiz de 8 preguntas. Necesitas al menos el 70 % para completar la misión. Puedes intentarlo de nuevo y conservar tu mejor puntaje.',
      required: true,
      completionRule: { type: 'quiz_passed' },
      content: {
        questionCount: 8,
        passScore: 70,
        note: 'Incluye preguntas de comparación y una identificación en el modelo 3D.',
        sourceSession: M2_SESSION,
        sourceSection: 'Cierre de la sesión',
        sourceExcerpt: [M2_QUESTION],
        sourceNote:
          'El reto final no aparece en el documento curricular: es el componente de gamificación de la misión. Comprueba los aprendizajes de la Sesión 2: estructuras celulares, funciones y comparación entre célula animal y vegetal.'
      },
      assetKeys: [],
      xp: 30
    }
  ]
};
