import { z } from 'zod';

export const definedGetSymbolSchema = z.object({
  symbol: z.string(),
  currencyCode: z.string(),
});

export type DefinedGetSymbolSchema = z.infer<typeof definedGetSymbolSchema>;
