import { Router } from 'express';
import { databaseStatus } from '../config/database';

export const healthRouter = Router();

healthRouter.get('/', (_req, res) => {
  res.json({
    data: {
      status: 'ok',
      service: 'laboratorio360-api',
      version: '0.1.0',
      database: databaseStatus(),
      uptimeSeconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString()
    }
  });
});
