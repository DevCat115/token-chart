import { z } from 'zod';
import { definedPooledTokenValuesSchema } from '@/lib/defined/schema/defined-pooled-token-values.schema';
import { definedEnhancedTokenSchema } from '@/lib/defined/schema/defined-enhanced-token.schema';

export const definedPairSchema = z.object({
  pair: z.object({
    address: z.string()
  }),
  token: z.object({
    symbol: z.string()
  }),
  backingToken: z.object({
    address: z.string(),
    symbol: z.string()
  })
});
export type DefinedPair = z.infer<typeof definedPairSchema>;
