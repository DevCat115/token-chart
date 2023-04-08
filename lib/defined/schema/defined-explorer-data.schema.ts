import { z } from 'zod';

export const definedExplorerTokenDataSchema = z.object({
  blueCheckmark: z.boolean().optional(),
  description: z.string().optional(),
  divisor: z.string().optional(),
  id: z.string(),
  tokenPriceUSD: z.string().optional(),
  tokenType: z.string().optional(),
});

export type DefinedExplorerData = z.infer<typeof definedExplorerTokenDataSchema>;
