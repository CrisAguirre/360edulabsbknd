import type { Request, Response } from 'express';
import { objectIdSchema } from '../validators/common.schemas';
import {
  getAdminOverview,
  listAdminClassrooms,
  listAdminMissions,
  listAdminQuizzes,
  listAssetLibrary,
  listBadgeCatalogWithUsage,
  listRecentAdminEvidence,
  setMissionStatus
} from '../services/admin.service';

export async function adminOverviewController(_req: Request, res: Response): Promise<void> {
  const overview = await getAdminOverview();
  res.json({ data: overview, meta: { requestId: _req.requestId } });
}

export async function adminMissionsController(req: Request, res: Response): Promise<void> {
  const missions = await listAdminMissions();
  res.json({ data: missions, meta: { requestId: req.requestId } });
}

export async function adminPublishMissionController(req: Request, res: Response): Promise<void> {
  const missionId = objectIdSchema.parse(req.params.id);
  const mission = await setMissionStatus(missionId, 'published');
  res.json({ data: mission, meta: { requestId: req.requestId } });
}

export async function adminArchiveMissionController(req: Request, res: Response): Promise<void> {
  const missionId = objectIdSchema.parse(req.params.id);
  const mission = await setMissionStatus(missionId, 'archived');
  res.json({ data: mission, meta: { requestId: req.requestId } });
}

export async function adminQuizzesController(req: Request, res: Response): Promise<void> {
  const quizzes = await listAdminQuizzes();
  res.json({ data: quizzes, meta: { requestId: req.requestId } });
}

export async function adminAssetsController(req: Request, res: Response): Promise<void> {
  const library = await listAssetLibrary();
  res.json({ data: library, meta: { requestId: req.requestId } });
}

export async function adminRecentEvidenceController(req: Request, res: Response): Promise<void> {
  const evidence = await listRecentAdminEvidence();
  res.json({ data: evidence, meta: { requestId: req.requestId } });
}

export async function adminClassroomsController(req: Request, res: Response): Promise<void> {
  const classrooms = await listAdminClassrooms();
  res.json({ data: classrooms, meta: { requestId: req.requestId } });
}

export async function adminBadgesController(req: Request, res: Response): Promise<void> {
  const badges = await listBadgeCatalogWithUsage();
  res.json({ data: badges, meta: { requestId: req.requestId } });
}
