/**
 * Texto literal de `Estrategia Indagación.docx`.
 *
 * Cada fragmento se copia palabra por palabra del documento curricular para que
 * las actividades de la plataforma puedan mostrar el bloque «Texto oficial».
 * No se debe parafrasear ni corregir la redacción original.
 */

export interface SourceResource {
  label: string;
  url?: string;
}

export interface OfficialFragment {
  sourceSession: number;
  sourceSection: string;
  sourceExcerpt: string[];
  sourceResources?: SourceResource[];
  sourceNote?: string;
}

/* ── Sesión 1 · ¡Misión microscópica! ─────────────────────────────── */

export const M1_SESSION = 1;

export const M1_OPENING =
  'La docente inicia la sesión motivando a los estudiantes a dar respuesta a la pregunta ¿Sabías que tu cuerpo, las plantas y los animales están formados por millones de pequeñas estructuras que no podemos ver a simple vista? ¿se imaginan cómo son y qué hacen para mantenernos vivos?';

export const M1_PARTICIPATION =
  'Los estudiantes participan de forma oral y escrita en la plataforma, dan a conocer sus aportes y socializan con el grupo sus ideas, la docente, proyecta un recurso multimedial que explica los aportes, sus inicios y representantes en la construcción del conocimiento de lo que actualmente se reconoce como teoría celular,';

export const M1_CONCEPT =
  'La docente realiza un aporte conceptual explicando que La Teoría celular explica por qué razón la célula es la unidad estructural y funcional de todos los seres vivos que habitan el planeta, excepto los virus que son acelulares. Incluye los siguientes postulados:';

export const M1_POSTULATES = [
  'Todos los seres vivos que habitan el planeta se componen de una (unicelulares) o más células (pluricelulares).',
  'Toda célula procede de otra preexistente, que ha copiado su información genética antes de dividirse en dos células hijas.',
  'Toda célula se compone básicamente de las mismas sustancias químicas: agua, trazas de minerales, carbohidratos, lípidos, proteínas y ácidos nucleicos, conocidas como "moléculas de la vida o biomoléculas".',
  'La célula es la unidad funcional de los seres vivos, porque independientemente del organismo al cual se haga referencia, es en ella donde ocurre las reacciones químicas que se necesitan para vivir.'
];

export const M1_REQUEST =
  'Se solicita los estudiantes visualizar el video y realizar la lectura que se aloja en la plataforma para dar respuesta a la siguiente pregunta en el espacio virtual de la plataforma Vercel.';

export const M1_QUESTION =
  'Identifique dos ideas mencionadas en la lectura que usted considera importantes para el estudio de la biología. Argumente cada una de ellas.';

export const M1_RESOURCES: SourceResource[] = [
  {
    label: 'Video YouTube: la extraña historia de la teoría celular',
    url: 'https://youtu.be/OOXO3fGImoU'
  },
  {
    label: 'Lectura oficial (Google Docs)',
    url: 'https://docs.google.com/document/d/1sP7mzPT9L0z-RH3FDHUBztziEnZ56rqG/edit?usp=sharing&ouid=107395200434224073532&rtpof=true&sd=true'
  },
  { label: 'Plataforma Vercel' }
];

/* ── Sesión 2 · Construyendo el concepto de célula ────────────────── */

export const M2_SESSION = 2;

export const M2_INTRO =
  'A partir de la identificación de la célula como unidad estructural y funcional de los seres vivos, la docente, busca reconocer los saberes previos de los estudiantes de grado 5.º sobre la clasificación de las células, especialmente las animales y vegetales, así como identificar sus conocimientos acerca de las principales estructuras celulares y sus funciones, promoviendo la curiosidad, la participación y la construcción colectiva del conocimiento, planteando la pregunta';

export const M2_QUESTION =
  '¿Creen que las células de nuestro cuerpo son iguales a las de una planta? ¿Qué diferencias imaginan que existen entre ellas y qué partes creen que necesitan para poder vivir y funcionar?';

export const M2_VIDEO =
  'Para dar respuesta al planteamiento, la docente invita a los estudiantes a visualizar el video 360 de la célula y sus partes';

export const M2_ANSWER = 'Los estudiantes dan respuesta al planteamiento en la plataforma Vercel';

export const M2_QUIVER =
  'A fin de afianzar el concepto de la célula y sus partes, la docente proporciona material impreso de Quiver y solicita a los estudiantes colorear la estructura de la célula vegetal y animal, posterior a ello, cada grupo de estudiantes proyecta la imagen a través de la aplicación de Quiver e identifican las semejanzas y diferencias de la estructura entre la célula animal y vegetal';

export const M2_PLANT_TEMPLATE_URL =
  'https://drive.google.com/file/d/1Rc_5xG1CsOAcfSwXpzT3dA5aBwOfNMMa/view?usp=sharing';

export const M2_ANIMAL_TEMPLATE_URL =
  'https://drive.google.com/file/d/1euCki6yPm4LXeIMCyWAKvnBfRPPVmJmu/view?usp=sharing';

export const M2_YOUTUBE_URL = 'https://www.youtube.com/watch?v=h1gryskdtmk';
export const M2_YOUTUBE_EMBED_URL = 'https://www.youtube-nocookie.com/embed/h1gryskdtmk';

export const M2_RESOURCES: SourceResource[] = [
  { label: 'Video 360 de la célula y sus partes' },
  { label: 'Video interactivo YouTube: Estructura y partes de la célula', url: M2_YOUTUBE_URL },
  { label: 'Aplicación de RA Quiver' },
  { label: 'Célula vegetal (plantilla Google Drive)', url: M2_PLANT_TEMPLATE_URL },
  { label: 'Célula animal (plantilla Google Drive)', url: M2_ANIMAL_TEMPLATE_URL },
  { label: 'Plataforma Vercel' }
];

/* ── Sesión 3 · Procesos metabólicos de la célula ─────────────────── */

export const M3_SESSION = 3;

export const M3_FACTORY_INTRO =
  'Al inicio la docente, activa los saberes previos de los estudiantes mediante una situación cercana a su realidad, promoviendo la reflexión sobre la importancia de los nutrientes, la energía y las transformaciones que ocurren dentro de las células, como punto de partida para comprender el metabolismo celular, presenta el video 360 de una fábrica de producción, comparando a la célula con una pequeña fábrica que trabaja día y noche.';

export const M3_FACTORY_ANALOGY =
  'En esta fábrica llegan materiales que son transformados para elaborar productos, se utiliza energía para que las máquinas funcionen y cada trabajador cumple una tarea especial, de manera parecida, las células de nuestro cuerpo reciben nutrientes, los transforman, obtienen energía y producen sustancias necesarias para mantenerse vivas y realizar sus funciones. A todo este conjunto de procesos lo llamamos metabolismo celular”.';

export const M3_QUESTIONS =
  'La docente plantea los siguientes cuestionamientos ¿Qué creen que sucedería si una fábrica dejara de recibir materiales o energía para funcionar? ¿Pasaría algo parecido en nuestras células si no recibieran los nutrientes que necesitan?';

export const M3_ANSWER = 'Los estudiantes dan respuesta a pregunta motivadora en la plataforma Vercel';

export const M3_VIDEO_READING =
  'La docente presenta el video el video 360 y solicita a los estudiantes visualizarlo y dar respuesta al siguiente cuestionamiento: ¿De qué manera las células vegetales y animales llevan a cabo sus actividades para conservar la vida? ¿Cómo se llama el proceso mediante el cual las células adquieren energía y eliminan desechos?, se solicita los estudiantes apoyarse en el contenido del recurso multimedial como también en la lectura “El metabolismo celular: ¿Cómo obtienen y utilizan la energía las células?” para dar respuesta a los cuestionamientos a través de la elaboración de una infografía en la herramienta Canva';

export const M3_CUBE =
  'A partir de la visualización, la docente, presenta y proporciona a los estudiantes un cubo Merge e indica las funcionalidades de la herramienta y propone hacer uso del cubo superponiendo la imagen de la célula vegetal con el propósito de identificar las estructuras celulares para llevar a cabo el metabolismo celular';

export const M3_TABLE =
  'Los estudiantes completan el cuadro de la estructura celular en la plataforma Vercel';

export const M3_READING_URL =
  'https://docs.google.com/document/d/1RNF1OnvpUMINXE-p-D-T9ZF2B6ycDj3x/edit?usp=sharing&ouid=107395200434224073532&rtpof=true&sd=true';

export const M3_RESOURCES: SourceResource[] = [
  { label: 'Video 360 de una fábrica de producción' },
  { label: 'Lectura: El metabolismo celular (Google Docs)', url: M3_READING_URL },
  { label: 'Video 360 Metabolismo celular' },
  { label: 'Aplicación RA de Cubo Merge' },
  { label: 'Plataforma Vercel' }
];

export const M3_STRUCTURE_ROWS = [
  'Membrana celular',
  'Cloroplastos',
  'Mitocondrias',
  'Citoplasma',
  'Vacuola central',
  'Núcleo'
];
