import { z } from 'zod';

export const definedOnPriceUpdatedSchma = z.object({
  priceUsd: z.string(),
  timestamp: z.number(),
});

export type DefinedOnPriceUpdate = z.infer<typeof definedOnPriceUpdatedSchma>;
