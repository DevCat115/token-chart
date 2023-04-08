import { z } from 'zod';


export const definedTokenChartSchema = z.object({
  from: z.number(),
  resolution: z.string(),
  symbol: z.string(),
  to: z.number(),
});

export type DefinedTokenChartParam = z.infer<typeof definedTokenChartSchema>;

export const definedTokenChartDataSchema = z.object({
  o: z.array(z.number()),
  h: z.array(z.number()),
  l: z.array(z.number()),
  c: z.array(z.number()),
  v: z.array(z.number()),
  t: z.array(z.number()),
  volume: z.array(z.string())
});

export type DefinedTokenChartData = z.infer<typeof definedTokenChartDataSchema>;

