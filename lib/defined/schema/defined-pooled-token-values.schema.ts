import { z } from 'zod';

export const definedPooledTokenValuesSchema = z.enum(['token0', 'token1']);
export type DefinedPooledTokenValues = z.infer<typeof definedPooledTokenValuesSchema>;
