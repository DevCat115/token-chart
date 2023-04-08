import { z } from 'zod';

export const definedNetworkSchema = z.object({
  id: z.number(),
  name: z.string(),
  logo: z.string(),
  nameString: z.string(),
});

export type DefinedNetwork = z.infer<typeof definedNetworkSchema>;
