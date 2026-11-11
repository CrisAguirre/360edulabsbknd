import type { CompletionRule } from '../models/Activity';
import type { ActivityType } from '../models/Activity';
import type { MissionPhaseKey, MissionStatus } from '../models/Mission';

export interface SeedActivity {
  phase: MissionPhaseKey;
  type: ActivityType;
  order: number;
  title: string;
  instructions: string;
  required: boolean;
  completionRule: CompletionRule;
  content: Record<string, unknown>;
  assetKeys: string[];
  xp: number;
}

export interface SeedMission {
  code: string;
  order: number;
  title: string;
  subtitle: string;
  bigQuestion: string;
  description: string;
  objectives: string[];
  phases: Array<{ key: MissionPhaseKey; title: string; description: string; order: number }>;
  badgeCode: string;
  estimatedMinutes: number;
  status: MissionStatus;
  version: number;
  theme: { accent: string; soft: string; icon: string };
  activities: SeedActivity[];
}
