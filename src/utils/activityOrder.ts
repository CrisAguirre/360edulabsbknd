import type { MissionPhaseKey } from '../models/Mission';

const PHASE_ORDER: Record<MissionPhaseKey, number> = {
  inicio: 0,
  desarrollo: 1,
  cierre: 2
};

export function sortActivities<T extends { phase: MissionPhaseKey; order: number }>(activities: T[]): T[] {
  return [...activities].sort(
    (a, b) => PHASE_ORDER[a.phase] - PHASE_ORDER[b.phase] || a.order - b.order
  );
}
