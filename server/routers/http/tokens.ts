import { z } from 'zod';
import RedisManager from '@/lib/redis/manager';
import { DefinedHttpApiClient } from '@/lib/defined/http/client';
import { DefinedHttpApiTokenClient } from '@/lib/defined/http/clients/token-client';
import { definedFilterTokenParamSchema } from '@/lib/defined/schema/defined-filter-token.schema';
import { publicProcedure, router } from '@/server/trpc';
import { definedDetailedPairStatsParamSchema } from '@/lib/defined/schema/defined-detailed-pair-stats.schema';
import { definedTokenPriceParamsSchema } from '@/lib/defined/schema/defined-token-price.schema';
import { definedTokenInfoParam } from '@/lib/defined/schema/defined-token-info.schema';
import { definedTokenChartSchema } from '@/lib/defined/schema/defined-token-chart.schema';
import { definedPairMetaParam } from '@/lib/defined/schema/defined-pair-metadata.schema';
import { definedGetSymbolSchema } from '@/lib/defined/schema/defined-get-symbol.schema';





const redisManager = RedisManager.getInstance();
const redisClient = redisManager.getClient();

const httpClient = DefinedHttpApiClient.getInstance();
const httpTokenClient = new DefinedHttpApiTokenClient(httpClient, redisClient);

export const httpTokenRoutes = router({
  getNewTokes: publicProcedure
    .input(
      z.object({
        networkId: z.number().optional(),
        cursor: z.number().nullish(), // is the offset
      }),
    )
    .query(async ({ input }) => {
      const { cursor = 0, networkId } = input;
      const offset = cursor ?? 0;

      const items = await httpTokenClient.getNewTokens(networkId, offset);

      return {
        items,
        nextCursor: offset + items.length,
      };
    }),

  getLatestTokens: publicProcedure
    .input(
      z.object({
        networkId: z.number().optional(),
        cursor: z.number().nullish(), // is the offset
      }),
    )
    .query(async ({ input }) => {
      const { cursor = 0, networkId } = input;
      const offset = cursor ?? 0;

      const items = await httpTokenClient.getLatestTokens(networkId, offset, 50);

      return {
        items,
        nextCursor: offset + items.length,
      };
    }),

  getTokensByMarketCap: publicProcedure
    .input(
      z.object({
        networkId: z.number().optional(),
        volume: z.string().optional(),
        cursor: z.number().nullish(), // is the offset
      }),
    )
    .query(async ({ input }) => {
      const { cursor = 0, networkId } = input;
      const offset = cursor ?? 0;

      const items = await httpTokenClient.getTokensByMarketCap({
        networkId,
        offset,
        limit: 50,
      });

      return {
        items,
        nextCursor: offset + items.length,
      };
    }),

  filterTokens: publicProcedure.input(definedFilterTokenParamSchema).query(async ({ input }) => {
    return await httpTokenClient.filterTokens(input);
  }),
  getTokenInfo: publicProcedure.input(definedTokenInfoParam).query(async ({ input }) => {
    return await httpTokenClient.getTokenInfo(input);
  }),
  getTokenPairDetails: publicProcedure
    .input(definedDetailedPairStatsParamSchema)
    .query(async ({ input }) => {
      return await httpTokenClient.getDetailedPairStats(input);
    }),
  getTokenPrice: publicProcedure.input(definedTokenPriceParamsSchema).query(async ({ input }) => {
    return await httpTokenClient.getTokenPrice(input);
  }),
  getTokenPair: publicProcedure
    .input(
      z.object({
        networkId: z.number(),
        tokenAddress: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await httpTokenClient.getTokenPair(input);
    }),
  getChartData: publicProcedure.input(definedTokenChartSchema).query(async ({ input }) => {
    return await httpTokenClient.getTokenChartData(input);
  }),
  getExchanges: publicProcedure.query(async () => {
    return await httpTokenClient.getExchangs();
  }),
  getPairMetadata: publicProcedure.input(definedPairMetaParam).query(async ({ input }) => {
    return await httpTokenClient.getPairMetadata(input);
  }),
  getSymbol: publicProcedure.input(definedGetSymbolSchema).query(async ({ input }) => {
    return await httpTokenClient.getSymbol(input);
  }),
});
