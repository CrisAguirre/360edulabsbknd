import { missionM1 } from './mission-m1';
import { missionM2 } from './mission-m2';
import { missionM3 } from './mission-m3';
import type { SeedMission } from './mission-types';

export const missionsSeed: SeedMission[] = [missionM1, missionM2, missionM3];
export type { SeedActivity, SeedMission } from './mission-types';
