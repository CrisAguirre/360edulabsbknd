import type { SeedMission } from './mission-types';

export const missionM2: SeedMission = {
  code: 'm2',
  order: 2,
  title: '¡Misión celular!',
  subtitle: 'Descifrando el secreto de la unidad de la vida',
  bigQuestion: '¿Son iguales las células de nuestro cuerpo y las de una planta?',
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
      description: 'Observa una hoja y tu piel, y formula tus primeras hipótesis.',
      order: 1
    },
    {
      key: 'desarrollo',
      title: 'Desarrollo: células bajo la lupa',
      description: 'Compara modelos 3D, explora el cubo AR y colorea tus plantillas Quiver.',
      order: 2
    },
    {
      key: 'cierre',
      title: 'Cierre: mi mapa de la célula',
      description: 'Construye tu comparación, responde el quiz y gana la insignia.',
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
      type: 'video360',
      order: 1,
      title: 'La célula y sus partes',
      instructions:
        'Explora la escena 360 y marca tres diferencias entre la célula animal y la vegetal. Completa al menos el 80 % del recorrido.',
      required: true,
      completionRule: { type: 'video_progress', min: 80 },
      content: {
        durationSeconds: 30,
        sceneTitle: 'La célula y sus partes',
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
        transcriptNote: 'Puedes activar la transcripción y los subtítulos desde el reproductor.'
      },
      assetKeys: ['video360_celula_partes'],
      xp: 20
    },
    {
      phase: 'inicio',
      type: 'reading',
      order: 2,
      title: 'Animal o vegetal: dos formas de ser célula',
      instructions:
        'Lee la comparación y observa la tabla. Al finalizar, podrás explicar al menos cuatro diferencias entre ambos tipos de célula.',
      required: true,
      completionRule: { type: 'confirm', label: 'Ya leí la comparación' },
      content: {
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
      xp: 10
    },
    {
      phase: 'desarrollo',
      type: 'model3d',
      order: 1,
      title: 'Células animal y vegetal en 3D',
      instructions:
        'Gira los modelos, cambia entre célula animal y vegetal, activa las capas y toca los hotspots para conocer cada organelo.',
      required: true,
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
      order: 2,
      title: 'Comparación celular: recorrido por organelos',
      instructions:
        'Observa el recorrido de la cámara por los organelos y fíjate en el resaltado secuencial. Luego completa la actividad.',
      required: true,
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
      order: 3,
      title: 'Cubo celular',
      instructions:
        'Explora al menos 4 de las 6 caras del Cubo Merge y asocia cada estructura con su función.',
      required: true,
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
      order: 4,
      title: 'Estación Quiver: colorea y observa',
      instructions:
        'Imprime o descarga las plantillas, colorea la célula animal y la vegetal, escanéalas con Quiver y sube una foto clara en tu evidencia final.',
      required: true,
      completionRule: { type: 'confirm', label: 'Completé mi modelo Quiver' },
      content: {
        title: 'Estación Quiver',
        intro:
          'Quiver convierte tus dibujos en modelos con realidad aumentada. Usa las plantillas de CitoIndagar para colorear y luego observar tus células en 3D.',
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
        downloadNote: 'Las plantillas se entregan como PDF para imprimir. También puedes colorearlas en pantalla si tu docente lo indica.'
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
        'Abre las tarjetas de organelos y usa el comparador para descubrir diferencias de tamaño y cantidad entre ambas células.',
      required: true,
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
        'Sube una foto de tu modelo Quiver, escribe tu tabla comparativa con al menos cuatro diferencias y responde la reflexión final.',
      required: true,
      completionRule: { type: 'evidence_submitted' },
      content: {
        prompt:
          'Presenta tu mapa de la célula: describe la foto de tu modelo Quiver, escribe al menos cuatro diferencias entre célula animal y vegetal y responde: ¿qué parte de la célula te sorprendió más y por qué? Puedes agregar el enlace de tu foto o de un documento.',
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
        ]
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
        note: 'Incluye preguntas de comparación y una identificación en el modelo 3D.'
      },
      assetKeys: [],
      xp: 30
    }
  ]
};
