import { CacheKeys, NetworkNames, TimeResolution } from '../../../constants';
import { BlockchainDataProvider } from '../../../providers/blockchain-data-provider';
import { DefinedHttpApiClient } from '../client';
import { DefinedNetwork } from '../../schema/defined-network.schema';
import { RedisClient } from '@/lib/redis/client';
import { gql as GqlTag } from 'graphql-request';

export class DefinedHttpApiNetworkClient {
  private client!: DefinedHttpApiClient;
  private redisClient!: RedisClient;

  /**
   * Constructor for initializing the client and redis client.
   *
   * @param {DefinedHttpApiClient} client - the defined API client
   * @param {RedisClient} redisClient - the Redis client
   */
  constructor(client: DefinedHttpApiClient, redisClient: RedisClient) {
    this.client = client;
    this.redisClient = redisClient;
  }

  /**
   * Retrieves the networks from the client and filters them based on available blockchains.
   *
   * @return {DefinedNetwork[]} the filtered and mapped network data
   */
  async getNetworks() {
    const queryName = 'getNetworks';
    const res = await this.client.query<DefinedNetwork[]>(
      queryName,
      GqlTag`{
              ${queryName} {
              name
              id
              }
          }`,
    );

    const dataProvider = new BlockchainDataProvider();
    const availableBlockChains = dataProvider.getData();

    return res
      .filter((d) => availableBlockChains.indexOf(d.name) !== -1)
      .map((d) => {
        return {
          ...d,
          ...{
            logo: `/logos/networks/${d.name}.png`,
            nameString: NetworkNames[d.name as keyof typeof NetworkNames] || d.name,
          },
        };
      });
  }

  /**
   * Retrieves networks from cache if available, otherwise fetches and caches them.
   *
   * @return {Promise<any>} The network data from cache or fetched from the source.
   */
  async getNetworksFromCache() {
    return await this.redisClient.getOrSet(
      CacheKeys.NETWORK_DATA,
      () => this.getNetworks(),
      TimeResolution['1D'],
    );
  }
}
