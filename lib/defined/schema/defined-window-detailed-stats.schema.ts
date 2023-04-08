import { z } from 'zod';

export const definedDetailedStatsBucketTimestampSchema = z.object({
  end: z.number(),
  start: z.number(),
});
export type DefinedDetailedStatsBucketTimestamp = z.infer<
  typeof definedDetailedStatsBucketTimestampSchema
>;

export const definedDetailedStatsNumberMetricsSchema = z.object({
  buckets: z.number().array(),
  change: z.number(),
  currentValue: z.number(),
  previousValue: z.number(),
});
export type DefinedDetailedStatsNumberMetrics = z.infer<
  typeof definedDetailedStatsNumberMetricsSchema
>;

export const definedDetailedStatsStringMetricsSchema = z.object({
  buckets: z.string().array(),
  change: z.string(),
  currentValue: z.string(),
  previousValue: z.string(),
});
export type DefinedDetailedStatsStringMetrics = z.infer<
  typeof definedDetailedStatsStringMetricsSchema
>;

export const definedDetailedStatsWindowSizeSchema = z.enum([
  'day1',
  'hour1',
  'hour4',
  'hour12',
  'min5',
]);
export type DefinedDetailedStatsWindowSize = z.infer<typeof definedDetailedStatsWindowSizeSchema>;

export const definedWindowedDetailedStatsSchema = z.object({
  buckets: definedDetailedStatsBucketTimestampSchema.array(),
  buyers: definedDetailedStatsNumberMetricsSchema,
  buys: definedDetailedStatsNumberMetricsSchema,
  buyVolume: definedDetailedStatsStringMetricsSchema,
  endTimestamp: z.number(),
  sellers: definedDetailedStatsNumberMetricsSchema,
  sells: definedDetailedStatsNumberMetricsSchema,
  sellVolume: definedDetailedStatsStringMetricsSchema,
  timestamp: z.number(),
  traders: definedDetailedStatsNumberMetricsSchema,
  transactions: definedDetailedStatsNumberMetricsSchema,
  volume: definedDetailedStatsStringMetricsSchema,
  windowSize: definedDetailedStatsWindowSizeSchema,
});
export type DefinedWindowedDetailedStats = z.infer<typeof definedWindowedDetailedStatsSchema>;
