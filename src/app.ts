import express, { type Request } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';
import { config } from './config/env';
import { logger } from './config/logger';
import { requestId } from './middleware/requestId.middleware';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import { authRouter } from './routes/auth.routes';
import { missionRouter } from './routes/missions.routes';
import { activityRouter } from './routes/activities.routes';
import { progressRouter } from './routes/progress.routes';
import { quizRouter } from './routes/quizzes.routes';
import { evidenceRouter } from './routes/evidence.routes';
import { badgeRouter } from './routes/badges.routes';
import { classroomRouter } from './routes/classrooms.routes';
import { healthRouter } from './routes/health.routes';
import { userRouter } from './routes/users.routes';
import { adminRouter } from './routes/admin.routes';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 40,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: {
        code: 'RATE_LIMITED',
        message: 'Demasiados intentos de inicio de sesión. Espera unos minutos.',
        requestId: (req as Request).requestId
      }
    });
  }
});

export function createApp() {
  const app = express();

  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.use(requestId);
  app.use(
    pinoHttp({
      logger,
      genReqId: (req) => (req as Request).requestId,
      customProps: (req) => ({ requestId: (req as Request).requestId }),
      serializers: {
        req: (req) => ({ method: req.method, url: req.url }),
        res: (res) => ({ statusCode: res.statusCode })
      },
      autoLogging: {
        ignore: (req) => req.url === '/api/v1/health'
      }
    })
  );

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' }
    })
  );

  app.use(
    cors({
      credentials: true,
      origin(origin, callback) {
        if (!origin) {
          callback(null, true);
          return;
        }
        // Coincidencia directa con orígenes configurados
        if (config.clientOrigins.includes(origin)) {
          callback(null, true);
          return;
        }
        // Permitir subdominios de despliegue y vistas previas en Vercel
        if (/^https:\/\/edulabs360.*\.vercel\.app$/.test(origin)) {
          callback(null, true);
          return;
        }
        // Permitir localhost en entornos que no sean producción estricta
        if (!config.isProduction && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
          callback(null, true);
          return;
        }
        callback(null, false);
      }
    })
  );

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.get('/', (_req, res) => {
    res.json({
      data: {
        name: 'Laboratorio 360 La Célula API',
        version: '0.1.0',
        docs: '/api/v1/health'
      }
    });
  });

  app.use('/api/v1/health', healthRouter);
  app.use('/api/v1/auth/login', loginLimiter);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/missions', missionRouter);
  app.use('/api/v1/activities', activityRouter);
  app.use('/api/v1/progress', progressRouter);
  app.use('/api/v1/quizzes', quizRouter);
  app.use('/api/v1/evidence', evidenceRouter);
  app.use('/api/v1/badges', badgeRouter);
  app.use('/api/v1/classrooms', classroomRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/admin', adminRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
