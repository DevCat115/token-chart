import { z } from 'zod';

export const definedPairMetadataToken = z.object({
  address: z.string(),
  decimals: z.number(),
  labels: z.string().array(),
  name: z.string(),
  networkId: z.number(),
  pooled: z.string(),
  price: z.string(),
  symbol: z.string(),
});

export type DefinedPairMetadataToken = z.infer<typeof definedPairMetadataToken>;

export const definedOnPairMetadataUpdated = z.object({
  exchangeId: z.string(),
  id: z.string(),
  liquidity: z.string(),
  liquidityToken: z.string(),
  nonLiquidityToken: z.string(),
  pairAddress: z.string(),
  price: z.string(),
  priceChange1: z.number(),
  priceChange4: z.number(),
  priceChange12: z.number(),
  priceChange24: z.number(),
  quoteToken: z.string(),
  statsType: z.string(),
  token0: definedPairMetadataToken,
  token1: definedPairMetadataToken,
  volume1: z.string(),
  volume4: z.string(),
  volume12: z.string(),
  volume24: z.string(),
});

export type DefinedOnPairMetadataUpdated = z.infer<typeof definedOnPairMetadataUpdated>;
