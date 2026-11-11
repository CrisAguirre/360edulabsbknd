import { connectDatabase, disconnectDatabase } from '../config/database';
import { logger } from '../config/logger';
import { seedDatabase } from './seed';

async function main(): Promise<void> {
  await connectDatabase();
  const summary = await seedDatabase();
  logger.info(summary, 'Datos de demostración creados');
  logger.info(
    {
      estudiante: 'estudiante01 / Cito2026*',
      docente: 'docente01 / Docente2026*',
      admin: 'admin / Admin2026*',
      aula: summary.classroomCode
    },
    'Cuentas de demostración'
  );
  await disconnectDatabase();
}

main().catch(async (error) => {
  logger.error({ err: error }, 'Error al sembrar los datos');
  await disconnectDatabase().catch(() => undefined);
  process.exit(1);
});
