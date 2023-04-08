import { z } from 'zod';

export const definedTokenOfInterestSchema = z.enum(['token0', 'token1']);

export type DefinedTokenOfInterest = z.infer<typeof definedTokenOfInterestSchema>;
