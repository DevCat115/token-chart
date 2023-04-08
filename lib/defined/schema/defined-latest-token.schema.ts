import { z } from 'zod';

export const definedLatestTokenSchema = z.object({
  id: z.number(),
  name: z.string(),
  networkId: z.number(),
  blockNumber: z.number(),
  transactionIndex: z.number(),
  traceIndex: z.number(),
  transactionHash: z.string(),
  blockHash: z.string(),
  timeCreated: z.number(),
  creatorAddress: z.string(),
  creatorBalanc: z.string(),
  tokenName: z.string(),
  totalSupply: z.string(),
  tokenSymbol: z.string(),
  decimals: z.number(),
  simulationResults: z.object({
    buySuccess: z.boolean(),
    buyTax: z.string().or(z.null()),
    buyGasUsed: z.string().or(z.null()),
    maxBuyAmount: z.string().or(z.null()),
    sellSuccess: z.boolean(),
    sellTax: z.string().or(z.null()),
    sellGasUsed: z.string().or(z.null()),
    maxSellAmount: z.string().or(z.null()),
    canTransferOwnership: z.boolean().or(z.null()),
    canRenounceOwnership: z.boolean().or(z.null()),
    isOwnerRenounced: z.boolean().or(z.null()),
  }),
});

export type DefinedLatestToken = z.infer<typeof definedLatestTokenSchema>;
