export interface BadgeSeed {
  code: string;
  name: string;
  description: string;
  icon: string;
  xpBonus: number;
  order: number;
  missionCode: string | null;
}

export const badgeSeed: BadgeSeed[] = [
  {
    code: 'explorador-celular',
    name: 'Explorador Celular',
    description:
      'Descubriste que todos los seres vivos están formados por células y que la célula es la unidad de la vida.',
    icon: '🔬',
    xpBonus: 50,
    order: 1,
    missionCode: 'm1'
  },
  {
    code: 'constructor-conocimiento',
    name: 'Constructor del Conocimiento Celular',
    description:
      'Comparaste células animales y vegetales, identificaste sus partes y explicaste sus funciones.',
    icon: '🧩',
    xpBonus: 50,
    order: 2,
    missionCode: 'm2'
  },
  {
    code: 'guardian-energia',
    name: 'Guardián de la Energía Celular',
    description:
      'Comprendiste cómo las células obtienen energía, cómo usan el agua y por qué el metabolismo mantiene la vida.',
    icon: '⚡',
    xpBonus: 50,
    order: 3,
    missionCode: 'm3'
  },
  {
    code: 'cientifico-citoindagar',
    name: 'Científico Laboratorio 360',
    description:
      'Obtuviste las tres insignias de la ruta y presentaste tu bitácora como un verdadero científico del Laboratorio.',
    icon: '🏆',
    xpBonus: 100,
    order: 4,
    missionCode: null
  },
  {
    code: 'persistente',
    name: 'Persistente',
    description:
      'Reintentaste un quiz y mejoraste tu puntaje. En la ciencia, volver a intentarlo también es avanzar.',
    icon: '🔁',
    xpBonus: 10,
    order: 5,
    missionCode: null
  }
];
