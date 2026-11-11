import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { config } from './env';
import { logger } from './logger';

let memoryServer: MongoMemoryServer | null = null;

export async function connectDatabase(): Promise<void> {
  if (config.mongoUri) {
    await mongoose.connect(config.mongoUri);
    logger.info('MongoDB connected');
    return;
  }

  if (config.isProduction) {
    throw new Error('MONGODB_URI is required in production');
  }

  memoryServer = await MongoMemoryServer.create({
    instance: { dbName: 'citoindagar360' }
  });
  await mongoose.connect(memoryServer.getUri(), { dbName: 'citoindagar360' });
  logger.warn('MongoDB en memoria activo (solo desarrollo). Los datos se pierden al reiniciar.');
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }
}

export function databaseStatus(): string {
  return ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] ?? 'unknown';
}
