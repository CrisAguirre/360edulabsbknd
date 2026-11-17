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
  // Estudiantes · acceso solo con su código de 2 letras (inicial del 1.er nombre + inicial del apellido), sin contraseña.
  { username: 'sb', password: '', role: 'student', displayName: 'Samuel Steven Barcos Vivas', avatarKey: 'explorer' },
  { username: 'ab', password: '', role: 'student', displayName: 'Antonella Bastidas Gutiérrez', avatarKey: 'explorer' },
  { username: 'ec', password: '', role: 'student', displayName: 'Estefanía Cortés Egas', avatarKey: 'explorer' },
  { username: 'sc', password: '', role: 'student', displayName: 'Samuel Chicangana Ortiz', avatarKey: 'explorer' },
  { username: 'gd', password: '', role: 'student', displayName: 'Guadalupe Díaz Franco', avatarKey: 'explorer' },
  { username: 'jg', password: '', role: 'student', displayName: 'Julianie Gómez Sanoja', avatarKey: 'explorer' },
  { username: 'bg', password: '', role: 'student', displayName: 'Brainer Guevara Campo', avatarKey: 'explorer' },
  { username: 'sh', password: '', role: 'student', displayName: 'Sara Monsalve Hernández', avatarKey: 'explorer' },
  { username: 'sv', password: '', role: 'student', displayName: 'Salome Hernández Valencia', avatarKey: 'explorer' },
  { username: 'yj', password: '', role: 'student', displayName: 'Yuri Joven Toquica', avatarKey: 'explorer' },
  { username: 'zm', password: '', role: 'student', displayName: 'Zahira Mantilla Rodríguez', avatarKey: 'explorer' },
  { username: 'yt', password: '', role: 'student', displayName: 'Yeiler Medina Torres', avatarKey: 'explorer' },
  { username: 'hm', password: '', role: 'student', displayName: 'Heiber Mejia Barona', avatarKey: 'explorer' },
  { username: 'sm', password: '', role: 'student', displayName: 'Sara Nicole Montaño Montaño', avatarKey: 'explorer' },
  { username: 'ym', password: '', role: 'student', displayName: 'Yobanezca Murillo', avatarKey: 'explorer' },
  { username: 'im', password: '', role: 'student', displayName: 'Isabela Murillo Zamora', avatarKey: 'explorer' },
  { username: 'jb', password: '', role: 'student', displayName: 'Johan Ocoro Bagui', avatarKey: 'explorer' },
  { username: 'jv', password: '', role: 'student', displayName: 'Jeremy Ortiz Vargas', avatarKey: 'explorer' },
  { username: 'ap', password: '', role: 'student', displayName: 'Arianis Peñeres Rivero', avatarKey: 'explorer' },
  { username: 'sr', password: '', role: 'student', displayName: 'Santiago Rentería Caicedo', avatarKey: 'explorer' },
  { username: 'lr', password: '', role: 'student', displayName: 'Liam Rodríguez Levin', avatarKey: 'explorer' },
  { username: 'er', password: '', role: 'student', displayName: 'Enrique Jesús Rojas Alfonso', avatarKey: 'explorer' },
  { username: 'ys', password: '', role: 'student', displayName: 'Yari Salas Riescos', avatarKey: 'explorer' },
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

// Sin escenarios de progreso de demostración: los estudiantes del aula inician desde cero.
export const progressScenarios: ProgressScenario[] = [];
