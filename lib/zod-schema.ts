import { z } from 'zod';

export const ResolutionSchema = z.union([
  z.literal('1'),
  z.literal('5'),
  z.literal('15'),
  z.literal('30'),
  z.literal('60'),
  z.literal('240'),
  z.literal('720'),
  z.literal('1D'),
  z.literal('1W'),
  z.literal('1M'),
  z.literal('1Q'),
]);
