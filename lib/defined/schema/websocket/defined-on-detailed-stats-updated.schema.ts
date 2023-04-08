import { z } from 'zod';
import { definedTokenOfInterestSchema } from '../defined-token-of-intereset.schema';
import { definedWindowedDetailedStatsSchema } from '../defined-window-detailed-stats.schema';
import { definedTokenPairStatisticsTypeSchema } from '../defined-filter-token.schema';

export const definedOnDetailedStatsUpdatedParamSchema = z.object({
  pairId: z.string(),
  tokenOfInterest: definedTokenOfInterestSchema.optional(),
});

export type DefinedOnDetailedStatsUpdatedParamSchema = z.infer<
  typeof definedOnDetailedStatsUpdatedParamSchema
>;

export const definedOnDetailedStatsUpdatedSchema = z.object({
  bucketCount: z.string().optional(),
  pairId: z.string(),
  queryTimestamp: z.number().optional(),
  stats_day1: definedWindowedDetailedStatsSchema.optional(),
  stats_hour1: definedWindowedDetailedStatsSchema.optional(),
  stats_hour4: definedWindowedDetailedStatsSchema.optional(),
  stats_hour12: definedWindowedDetailedStatsSchema.optional(),
  stats_min5: definedWindowedDetailedStatsSchema.optional(),
  statsType: definedTokenPairStatisticsTypeSchema,
  tokenOfInterest: definedTokenOfInterestSchema.optional(),
});
export type DefinedOnDetailedStatsUpdated = z.infer<typeof definedOnDetailedStatsUpdatedSchema>;
