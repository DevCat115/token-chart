import { z } from 'zod';
import { definedTokenOfInterestSchema } from '@/lib/defined/schema/defined-token-of-intereset.schema';
import { definedPairSchema } from '@/lib/defined/schema/defined-pair.schema';
import { definedTokenPairStatisticsTypeSchema } from '@/lib/defined/schema/defined-filter-token.schema';

export const detaildPairStatsDurationSchema = z.enum([
  'day1',
  'day30',
  'hour1',
  'hour4',
  'hour12',
  'min5',
  'min15',
  'week1',
]);
export type DetaildPairStatsDuration = z.infer<typeof detaildPairStatsDurationSchema>;

export const definedDetailedPairStatsParamSchema = z.object({
  bucketCount: z.number().optional(),
  durations: detaildPairStatsDurationSchema.array().optional(),
  networkId: z.number(),
  pairAddress: z.string(),
  statsType: definedTokenPairStatisticsTypeSchema.optional(),
  timestamp: z.number().optional(),
  tokenOfInterest: definedTokenOfInterestSchema.optional(),
  fields: z.string().optional(),
});
export type DefinedDetailedPairStatsParam = z.infer<typeof definedDetailedPairStatsParamSchema>;

export const definedDetailedPairStatsNumberMetricsSchema = z.object({
  buckets: z.number().array().optional(),
  change: z.number().optional(),
  currentValue: z.number().optional(),
  previousValue: z.number().optional(),
});
export type DefinedDetailedPairStatsNumberMetrics = z.infer<
  typeof definedDetailedPairStatsNumberMetricsSchema
>;

export const definedWindowedDetailedNonCurrencyPairStatsSchema = z.object({
  buyers: definedDetailedPairStatsNumberMetricsSchema.optional(),
  buys: definedDetailedPairStatsNumberMetricsSchema.optional(),
  sellers: definedDetailedPairStatsNumberMetricsSchema.optional(),
  sells: definedDetailedPairStatsNumberMetricsSchema.optional(),
  traders: definedDetailedPairStatsNumberMetricsSchema.optional(),
  transactions: definedDetailedPairStatsNumberMetricsSchema.optional(),
});
export type DefinedWindowedDetailedNonCurrencyPairStats = z.infer<
  typeof definedWindowedDetailedNonCurrencyPairStatsSchema
>;

export const definedDetailedPairStatsStringMetricsSchema = z.object({
  buckets: z.string().array().optional(),
  change: z.string().optional(),
  currentValue: z.string().optional(),
  previousValue: z.string().optional(),
});
export type DefinedDetailedPairStatsStringMetrics = z.infer<
  typeof definedDetailedPairStatsStringMetricsSchema
>;

export const definedWindowedDetailedCurrencyPairStatsSchema = z.object({
  buyVolume: definedDetailedPairStatsStringMetricsSchema.optional(),
  close: definedDetailedPairStatsStringMetricsSchema.optional(),
  highest: definedDetailedPairStatsStringMetricsSchema.optional(),
  liquidity: definedDetailedPairStatsStringMetricsSchema.optional(),
  lowest: definedDetailedPairStatsStringMetricsSchema.optional(),
  open: definedDetailedPairStatsStringMetricsSchema.optional(),
  sellVolume: definedDetailedPairStatsStringMetricsSchema.optional(),
  volume: definedDetailedPairStatsStringMetricsSchema.optional(),
});
export type DefinedWindowedDetailedCurrencyPairStats = z.infer<
  typeof definedWindowedDetailedCurrencyPairStatsSchema
>;

export const definedDetailedPairStatsBucketTimestampSchema = z.object({
  end: z.number(),
  start: z.number(),
});
export type DefinedDetailedPairStatsBucketTimestamp = z.infer<
  typeof definedDetailedPairStatsBucketTimestampSchema
>;

export const definedWindowedDetailedPairStatsSchema = z.object({
  duration: detaildPairStatsDurationSchema,
  end: z.number(),
  start: z.number(),
  statsNonCurrency: definedWindowedDetailedNonCurrencyPairStatsSchema,
  statsUsd: definedWindowedDetailedCurrencyPairStatsSchema,
  timestamps: definedDetailedPairStatsBucketTimestampSchema.array(),
});
export type DefinedWindowedDetailedPairStats = z.infer<
  typeof definedWindowedDetailedPairStatsSchema
>;

export const definedDetailedPairStatsSchema = z.object({
  bucketCount: z.number().optional(),
  lastTransaction: z.number().optional(),
  networkId: z.number(),
  pair: definedPairSchema.optional(),
  pairAddress: z.string(),
  queryTimestamp: z.number().optional(),
  stats_day1: definedWindowedDetailedPairStatsSchema.optional(),
  stats_day30: definedWindowedDetailedPairStatsSchema.optional(),
  stats_hour1: definedWindowedDetailedPairStatsSchema.optional(),
  stats_hour4: definedWindowedDetailedPairStatsSchema.optional(),
  stats_hour12: definedWindowedDetailedPairStatsSchema.optional(),
  stats_min5: definedWindowedDetailedPairStatsSchema.optional(),
  stats_min15: definedWindowedDetailedPairStatsSchema.optional(),
  stats_week1: definedWindowedDetailedPairStatsSchema.optional(),
  statsType: definedTokenPairStatisticsTypeSchema,
  tokenOfInterest: definedTokenOfInterestSchema.optional(),
});
export type DefinedDetailedPairStats = z.infer<typeof definedDetailedPairStatsSchema>;
