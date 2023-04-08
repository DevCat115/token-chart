import { symbol, z } from 'zod';


export const definedPairMetaParam = z.object({
  pairId: z.string()
});

export type DefinedPairMetaParam = z.infer<typeof definedPairMetaParam>;

export const definedPairMetadataSchema = z.object({
  token0: z.object({
    symbol: z.string()
  }),
  token1: z.object({
    symbol: z.string()
  })
});

export type DefinedPairMetadata = z.infer<typeof definedPairMetadataSchema>;

