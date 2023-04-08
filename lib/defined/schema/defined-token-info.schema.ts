import { z } from 'zod';
import { definedSocialLinksSchema } from './defined-social-links.schema';

export const definedTokenInfoParam = z.object({
  address: z.string(),
  networkId: z.number(),
});

export type DefinedTokenInfoParam = z.infer<typeof definedTokenInfoParam>;

export const definedTokenInfoSchema = z.object({
  address: z.string(),
  cmcId: z.number(),
  id: z.string(),
  imageSmallUrl: z.string(),
  createdAt: z.number(),
  info: z.object({
    circulatingSupply: z.string(),
  }),
  explorerData: z.object({
    tokenType: z.string(),
    description: z.string(),
  }),
  socialLinks: definedSocialLinksSchema.optional(),
  isScam: z.boolean(),
  name: z.string(),
  networkId: z.number(),
  symbol: z.string(),
  totalSupply: z.string(),
});

export type DefinedTokenInfo = z.infer<typeof definedTokenInfoSchema>;
