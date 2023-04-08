import { z } from 'zod';

export const definedExchangeSchema = z.object({
  address: z.string(),
  color: z.string().optional(),
  exchangeVersion: z.string().optional(),
  iconUrl: z.string().optional(),
  id: z.string(),
  name: z.string().optional(),
  networkId: z.number(),
  tradeUrl: z.string().optional(),
});
export type DefinedExchange = z.infer<typeof definedExchangeSchema>;
