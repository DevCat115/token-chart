import { z } from 'zod';

export const definedTopTokenSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  address: z.string(),
  imageLargeUrl: z.string().optional(),
  imageSmallUrl: z.string().optional(),
  imageThumbUrl: z.string().optional(),
  volume: z.string(),
  liquidity: z.string(),
  price: z.number(),
  priceChange: z.number(),
  priceChange1: z.number(),
  priceChange4: z.number(),
  priceChange12: z.number(),
  priceChange24: z.number(),
  txnCount1: z.number(),
  txnCount4: z.number(),
  txnCount12: z.number(),
  txnCount24: z.number(),
  marketCap: z.string(),
  networkId: z.number(),
  topPairId: z.string(),
});
export type DefinedTopToken = z.infer<typeof definedTopTokenSchema>;
