export type DemoRole = 'student' | 'teacher' | 'admin';
export type EvidenceSeedStatus = 'submitted' | 'approved' | 'changes_requested' | 'draft';
export type EvidenceSeedLevel = 'bajo' | 'basico' | 'alto' | 'superior';

export interface DemoUser {
  username: string;
  password: string;
  role: DemoRole;
  displayName: string;
  avatarKey: string;
}

export const demoUsers: DemoUser[] = [
  {
    username: 'estudiante01',
    password: 'Cito2026*',
    role: 'student',
    displayName: 'Sofía Rojas',
    avatarKey: 'explorer'
  },
  {
    username: 'estudiante02',
    password: 'Cito2026*',
    role: 'student',
    displayName: 'Mateo García',
    avatarKey: 'explorer'
  },
  {
    username: 'estudiante03',
    password: 'Cito2026*',
    role: 'student',
    displayName: 'Valentina Díaz',
    avatarKey: 'explorer'
  },
  {
    username: 'estudiante04',
    password: 'Cito2026*',
    role: 'student',
    displayName: 'Samuel Pérez',
    avatarKey: 'explorer'
  },
  {
    username: 'estudiante05',
    password: 'Cito2026*',
    role: 'student',
    displayName: 'Isabella Mora',
    avatarKey: 'explorer'
  },
  {
    username: 'estudiante06',
    password: 'Cito2026*',
    role: 'student',
    displayName: 'Tomás Jiménez',
    avatarKey: 'explorer'
  },
  {
    username: 'estudiante07',
    password: 'Cito2026*',
    role: 'student',
    displayName: 'Lucía Fernández',
    avatarKey: 'explorer'
  },
  {
    username: 'estudiante08',
    password: 'Cito2026*',
    role: 'student',
    displayName: 'Emiliano Castro',
    avatarKey: 'explorer'
  },
  {
    username: 'docente01',
    password: 'Docente2026*',
    role: 'teacher',
    displayName: 'Profe Camila Torres',
    avatarKey: 'teacher'
  },
  {
    username: 'admin',
    password: 'Admin2026*',
    role: 'admin',
    displayName: 'Administrador Lab 360',
    avatarKey: 'admin'
  }
];

export interface EvidenceScenario {
  missionCode: string;
  status: EvidenceSeedStatus;
  text: string;
  linkUrl?: string;
  teacherScore?: EvidenceSeedLevel;
  feedback?: string;
}

export interface ProgressScenario {
  username: string;
  completedMissions: string[];
  inProgress?: {
    missionCode: string;
    completedRequired: number;
    bestQuizPercentage?: number;
  };
  availableMissions?: string[];
  quizPercentages?: Record<string, number>;
  evidences?: EvidenceScenario[];
}

export const progressScenarios: ProgressScenario[] = [
  {
    username: 'estudiante01',
    completedMissions: [],
    inProgress: { missionCode: 'm1', completedRequired: 4 }
  },
  {
    username: 'estudiante02',
    completedMissions: ['m1'],
    inProgress: { missionCode: 'm2', completedRequired: 3 },
    quizPercentages: { m1: 83 },
    evidences: [
      {
        missionCode: 'm1',
        status: 'submitted',
        text: 'Una idea importante es que todos los seres vivos están formados por células, desde una bacteria hasta un árbol. Otra idea es que toda célula proviene de otra célula, así que la vida se continúa. Esto me ayuda a entender que somos parte de la misma historia natural.'
      }
    ]
  },
  {
    username: 'estudiante03',
    completedMissions: ['m1', 'm2'],
    inProgress: { missionCode: 'm3', completedRequired: 4 },
    quizPercentages: { m1: 100, m2: 88 },
    evidences: [
      {
        missionCode: 'm1',
        status: 'approved',
        teacherScore: 'alto',
        feedback:
          'Muy buen trabajo: explicas dos ideas con vocabulario científico y las relacionas con la teoría celular. Como sugerencia, agrega un ejemplo propio para el próximo cierre.',
        text: 'La primera idea es que la célula es la unidad estructural de los seres vivos: todos estamos formados por una o muchas células. La segunda es que la célula es la unidad funcional, porque realiza las funciones vitales. Por ejemplo, mi cuerpo está formado por células que trabajan juntas.'
      },
      {
        missionCode: 'm2',
        status: 'submitted',
        text: 'Comparé una célula animal y una vegetal. Ambas tienen membrana, citoplasma, núcleo y mitocondrias. La célula vegetal además tiene pared celular, cloroplastos y una vacuola central grande. La pared le da forma y los cloroplastos captan la luz para la fotosíntesis.'
      }
    ]
  },
  {
    username: 'estudiante04',
    completedMissions: [],
    inProgress: { missionCode: 'm1', completedRequired: 2 }
  },
  {
    username: 'estudiante05',
    completedMissions: []
  },
  {
    username: 'estudiante06',
    completedMissions: ['m1'],
    availableMissions: ['m2'],
    quizPercentages: { m1: 100 },
    evidences: [
      {
        missionCode: 'm1',
        status: 'approved',
        teacherScore: 'superior',
        feedback:
          'Excelente argumentación. Conectas la teoría celular con un ejemplo propio y usas el vocabulario con precisión. Puedes compartir este ejemplo con el resto del aula.',
        text: 'Dos ideas centrales de la lectura son que todos los seres vivos están formados por células y que toda célula proviene de otra. Para mí esto explica por qué una herida puede cicatrizar: las células se dividen para reparar el tejido. También muestra que los virus no son células porque necesitan una célula para reproducirse.'
      }
    ]
  },
  {
    username: 'estudiante07',
    completedMissions: ['m1'],
    availableMissions: ['m2'],
    quizPercentages: { m1: 71 },
    evidences: [
      {
        missionCode: 'm1',
        status: 'changes_requested',
        teacherScore: 'basico',
        feedback:
          'Identificas dos ideas, pero necesitas explicar por qué son importantes. Agrega un ejemplo propio y conecta cada idea con la teoría celular. Tu trabajo no se pierde: puedes editarlo y reenviarlo.',
        text: 'La lectura dice que todos los seres vivos están hechos de células y que las células vienen de otras células. Elegí esas dos ideas porque me parecen importantes.'
      }
    ]
  },
  {
    username: 'estudiante08',
    completedMissions: ['m1', 'm2', 'm3'],
    quizPercentages: { m1: 100, m2: 100, m3: 94 },
    evidences: [
      {
        missionCode: 'm1',
        status: 'approved',
        teacherScore: 'superior',
        feedback:
          'Conectas la teoría celular con una experiencia cotidiana y explicas por qué los virus no son células. Excelente nivel de argumentación.',
        text: 'Una idea importante es que la célula es la unidad funcional de la vida: en ella ocurren las funciones vitales. Otra es que toda célula proviene de otra. Esto se relaciona con la teoría celular y con la reproducción de los seres vivos. Los virus no son células porque no realizan funciones vitales por sí mismos.'
      },
      {
        missionCode: 'm2',
        status: 'approved',
        teacherScore: 'alto',
        feedback:
          'La comparación es clara y completa. Incluye cuatro diferencias bien explicadas y una relación adecuada entre estructura y función.',
        text: 'La célula animal y la vegetal comparten membrana, citoplasma, núcleo y mitocondrias. La vegetal tiene pared celular, cloroplastos y una vacuola central grande. La pared da protección, los cloroplastos realizan la fotosíntesis y la vacuola almacena agua. La animal tiene vacuolas pequeñas y temporales.'
      },
      {
        missionCode: 'm3',
        status: 'approved',
        teacherScore: 'superior',
        feedback:
          'Tu infografía integra energía, ósmosis y funciones vitales con una analogía propia muy potente. Es un excelente cierre de la ruta.',
        linkUrl: 'https://www.canva.com/design/citoindagar-demo/view',
        text: 'Mi infografía explica la célula como una fábrica: la membrana es la puerta, el núcleo la oficina de gerencia, las mitocondrias los generadores y los cloroplastos los paneles solares. La vacuola es el tanque de agua. Si la célula pierde agua, entra en plasmólisis; en agua dulce recupera la turgencia. Los nutrientes se transforman en ATP para mantener la vida.'
      }
    ]
  }
];
