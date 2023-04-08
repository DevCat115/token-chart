import { DefinedHttpApiClient } from '@/lib/defined/http/client';
import { router, publicProcedure } from '../../trpc';
import { DefinedHttpApiNetworkClient } from '@/lib/defined/http/clients/network-client';
import RedisManager from '@/lib/redis/manager';

const redisManager = RedisManager.getInstance();
const redisClient = redisManager.getClient();

const apiClient = DefinedHttpApiClient.getInstance();
const networkClient = new DefinedHttpApiNetworkClient(apiClient, redisClient);

export const networksRouter = router({
  getNetworks: publicProcedure.query(async () => {
    const res = await networkClient.getNetworksFromCache();

    return res;
  }),
});
