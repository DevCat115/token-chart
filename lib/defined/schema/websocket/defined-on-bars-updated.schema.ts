import { z } from 'zod';
import { definedTokenPairStatisticsTypeSchema } from '@/lib/defined/schema/defined-filter-token.schema';

export const definedIndividualBarData = z.object({
    buyers: z.number(),
    buys: z.number(),
    buyVolume: z.string(),
    c: z.number(),
    h: z.number(),
    l: z.number(),
    liquidity: z.string(),
    o: z.number(),
    sellers: z.number(),
    sells: z.number(),
    sellVolume: z.string(),
    t: z.number(),
    traders: z.number(),
    transactions: z.number(),
    v: z.number(),
    volume: z.string(),
    volumeNativeToken: z.string(),
});

export const definedCurrencyBarData = z.object({
    t: z.number(),
    token: definedIndividualBarData.optional(),
    usd: definedIndividualBarData.optional(),
});

export const definedResolutionBarData = z.object({
    r1: definedCurrencyBarData.optional(),
    r1D: definedCurrencyBarData.optional(),
    r1S: definedCurrencyBarData.optional(),
    r5: definedCurrencyBarData.optional(),
    r5S: definedCurrencyBarData.optional(),
    r7D: definedCurrencyBarData.optional(),
    r15: definedCurrencyBarData.optional(),
    r15S: definedCurrencyBarData.optional(),
    r30: definedCurrencyBarData.optional(),
    r60: definedCurrencyBarData.optional(),
    r240: definedCurrencyBarData.optional(),
    r720: definedCurrencyBarData.optional(),
});

export type DefinedResolutionBarData = z.infer<typeof definedResolutionBarData>;

export const definedOnBarsUpdated = z.object({
    aggregates: definedResolutionBarData.optional(),
    eventSortKey: z.string(),
    networkId: z.number(),
    pairAddress: z.string(),
    pairId: z.string(),
    quoteToken: z.string(),
    statsType: definedTokenPairStatisticsTypeSchema.optional(),
    timestamp: z.number(),
});

export type DefinedOnBarsUpdated = z.infer<typeof definedOnBarsUpdated>;
