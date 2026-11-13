import http from 'node:http';
import { createApp } from './app';
import { config } from './config/env';
import { logger } from './config/logger';
import { connectDatabase, disconnectDatabase } from './config/database';
import { seedIfEmpty } from './seeds/seed';

async function main(): Promise<void> {
  await connectDatabase();

  if (config.autoSeed) {
    const planted = await seedIfEmpty();
    if (planted) {
      logger.info('Datos de demostración sembrados');
    }
  }

  const app = createApp();
  const server = http.createServer(app);

  server.listen(config.port, () => {
    logger.info(`Laboratorio 360 La Célula API escuchando en http://localhost:${config.port}`);
    logger.info(`Orígenes permitidos: ${config.clientOrigins.join(', ')}`);
  });

  let shuttingDown = false;
  const shutdown = (signal: string) => {
    if (shuttingDown) return;
    shuttingDown = true;
    logger.info({ signal }, 'Cerrando servidor');

    const forceExit = setTimeout(() => {
      logger.error('Cierre forzado por tiempo de espera');
      process.exit(1);
    }, 10_000);
    forceExit.unref();

    server.close(() => {
      disconnectDatabase()
        .then(() => {
          clearTimeout(forceExit);
          logger.info('Servidor cerrado');
          process.exit(0);
        })
        .catch((error) => {
          logger.error({ err: error }, 'Error al cerrar la base de datos');
          process.exit(1);
        });
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

main().catch((error) => {
  logger.fatal({ err: error }, 'No fue posible iniciar el servidor');
  process.exit(1);
});
