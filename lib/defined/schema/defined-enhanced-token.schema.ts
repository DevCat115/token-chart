import { z } from 'zod';
import { definedExchangeSchema } from '@/lib/defined/schema/defined-exchange.schema';
import { definedExplorerTokenDataSchema } from '@/lib/defined/schema/defined-explorer-data.schema';
import { definedTokenInfoSchema } from '@/lib/defined/schema/defined-token-info.schema';
import { definedSocialLinksSchema } from '@/lib/defined/schema/defined-social-links.schema';

export const definedEnhancedTokenSchema = z.object({
  address: z.string(),
  cmcId: z.number().optional(),
  createBlockNumber: z.number().optional(),
  createdAt: z.number().optional(),
  createTransactionHash: z.string().optional(),
  creatorAddress: z.string().optional(),
  decimals: z.number(),
  exchanges: definedExchangeSchema.array(),
  explorerData: definedExplorerTokenDataSchema.optional(),
  id: z.string(),
  info: definedTokenInfoSchema.optional(),
  isScam: z.boolean().optional(),
  name: z.string().optional(),
  networkId: z.number(),
  pooled: z.string().optional(),
  symbol: z.string().optional(),
  socialLinks: definedSocialLinksSchema.optional(),
});
export type DefinedEnhancedToken = z.infer<typeof definedEnhancedTokenSchema>;
