import { z } from 'zod';

export const definedTokenPriceParamsSchema = z.array(
  z.object({
    address: z.string(),
    networkId: z.number(),
  }),
);

export type DefinedTokenPriceParams = z.infer<typeof definedTokenPriceParamsSchema>;

export const definedTokenPriceSchema = z.object({
  address: z.string(),
  networkId: z.number(),
  priceUsd: z.number(),
});

export type DefinedTokenPrice = z.infer<typeof definedTokenPriceSchema>;
