import type { Request, Response } from 'express';
import { missionCodeSchema } from '../validators/common.schemas';
import {
  getActivityById,
  getMissionDetail,
  listMissions,
  startMission
} from '../services/mission.service';

export async function listMissionsController(req: Request, res: Response): Promise<void> {
  const missions = await listMissions(req.auth!.userId, req.auth!.role);
  res.json({ data: missions, meta: { requestId: req.requestId } });
}

export async function getMissionController(req: Request, res: Response): Promise<void> {
  const code = missionCodeSchema.parse(req.params.code);
  const mission = await getMissionDetail(code, req.auth!.userId, req.auth!.role);
  res.json({ data: mission, meta: { requestId: req.requestId } });
}

export async function getMissionActivitiesController(req: Request, res: Response): Promise<void> {
  const code = missionCodeSchema.parse(req.params.code);
  const mission = await getMissionDetail(code, req.auth!.userId, req.auth!.role);
  res.json({
    data: { mission: { code: mission.code, title: mission.title, phases: mission.phases }, activities: mission.activities },
    meta: { requestId: req.requestId }
  });
}

export async function getActivityController(req: Request, res: Response): Promise<void> {
  const activity = await getActivityById(String(req.params.id));
  res.json({ data: activity, meta: { requestId: req.requestId } });
}

export async function startMissionController(req: Request, res: Response): Promise<void> {
  const code = missionCodeSchema.parse(req.params.missionCode);
  await startMission(code, req.auth!.userId, req.auth!.role);
  const mission = await getMissionDetail(code, req.auth!.userId, req.auth!.role);
  res.json({ data: mission, meta: { requestId: req.requestId } });
}
