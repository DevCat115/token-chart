import { z } from 'zod';

export const definedSocialLinksSchema = z.object({
  bitcointalk: z.string().optional(),
  blog: z.string().optional(),
  coingecko: z.string().optional(),
  coinmarketcap: z.string().optional(),
  discord: z.string().optional(),
  email: z.string().optional(),
  facebook: z.string().optional(),
  github: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  reddit: z.string().optional(),
  slack: z.string().optional(),
  telegram: z.string().optional(),
  twitch: z.string().optional(),
  twitter: z.string().optional(),
  website: z.string().optional(),
  wechat: z.string().optional(),
  whitepaper: z.string().optional(),
  youtube: z.string().optional(),
});
export type DefinedSocialLinks = z.infer<typeof definedSocialLinksSchema>;
