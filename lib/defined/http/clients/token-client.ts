import { DefinedHttpApiClient } from '@/lib/defined/http/client';
import { CacheKeys } from '@/lib/constants';
import { DefinedApiTimeResolution } from '@/lib/defined/types';
import { DefinedTopToken } from '@/lib/defined/schema/defined-top-token.schema';
import {
  DefinedNewToken,
  DefinedNewTokenResult
} from '@/lib/defined/schema/defined-new-token.schema';
import { DefinedHttpApiNetworkClient } from '@/lib/defined/http/clients/network-client';
import { RedisClient } from '@/lib/redis/client';
import { gql as GqlTag } from 'graphql-request';
import { DefinedLatestToken } from '@/lib/defined/schema/defined-latest-token.schema';
import { DefinedByMarketcap } from '@/lib/defined/schema/defined-by-marketcap.schema';
import {
  DefinedFilterTokenParam,
  DefinedFilterTokenResult
} from '@/lib/defined/schema/defined-filter-token.schema';
import {
  DefinedDetailedPairStats,
  DefinedDetailedPairStatsParam
} from '@/lib/defined/schema/defined-detailed-pair-stats.schema';
import { DefinedDefaultFieldsProvider } from '@/lib/providers/defined-default-fields-provider';
import {
  DefinedTokenPrice,
  DefinedTokenPriceParams
} from '../../schema/defined-token-price.schema';
import { DefinedTokenInfo, DefinedTokenInfoParam } from '../../schema/defined-token-info.schema';
import { DefinedPair } from '../../schema/defined-pair.schema';
import {
  DefinedTokenChartData,
  DefinedTokenChartParam
} from '../../schema/defined-token-chart.schema';
import { promises } from 'dns';
import { DefinedExchange } from '../../schema/defined-exchange.schema';
import {
  DefinedPairMetaParam,
  DefinedPairMetadata
} from '../../schema/defined-pair-metadata.schema';
import { DefinedGetSymbolSchema } from '../../schema/defined-get-symbol.schema';

export class DefinedHttpApiTokenClient {
  private client!: DefinedHttpApiClient;
  private redisClient!: RedisClient;

  constructor(client: DefinedHttpApiClient, redisClient: RedisClient) {
    this.client = client;
    this.redisClient = redisClient;
  }

  private async getNetworkFilters(networkId?: number) {
    const networkClient = new DefinedHttpApiNetworkClient(this.client, this.redisClient);
    const networks = await networkClient.getNetworksFromCache();

    return networks.filter((n) => (networkId ? n.id === networkId : true)).map((n) => n.id);
  }

  /**
   * Retrieves the top tokens based on the given resolution and network ID.
   *
   * @param {DefinedApiTimeResolution} resolution - The time resolution for the token data (default: '60')
   * @param {number} networkId - The ID of the network (optional)
   * @return {Promise<DefinedTopToken[]>} A promise that resolves to an array of DefinedTopToken objects
   */
  async getTopTokens(
    resolution: DefinedApiTimeResolution = '60',
    networkId?: number
  ): Promise<DefinedTopToken[]> {
    const queryName = 'listTopTokens';
    const networkFilter = await this.getNetworkFilters(networkId);

    return await this.client
      .query<DefinedTopToken[]>(
        queryName,
        GqlTag`
          query ($networkFilter: [Int!], $limit: Int, $resolution: String) {
            ${queryName}(networkFilter: $networkFilter, limit: $limit, resolution: $resolution) {
              name
              symbol
              address
              imageSmallUrl
              imageThumbUrl
              imageLargeUrl
              volume
              liquidity
              price
              priceChange
              priceChange1
              priceChange4
              priceChange12
              priceChange24
              txnCount1
              txnCount4
              txnCount12
              txnCount24
              marketCap
              networkId
              topPairId
            }
          }`,
        {
          networkFilter,
          limit: 50,
          resolution
        }
      )
      .then((res) => {
        const uniqueItems = res.reduce((acc, currentItem) => {
          if (!acc.has(currentItem.address)) {
            acc.set(currentItem.address, currentItem);
          }

          return acc;
        }, new Map());

        return Array.from(uniqueItems.values());
      });
  }

  /**
   * Retrieve top tokens from cache for a given time resolution and network ID.
   *
   * @param {DefinedApiTimeResolution} resolution - the time resolution for token retrieval
   * @param {number} [networkId] - optional network ID for token retrieval
   * @return {Promise<DefinedTopToken[]>} the top tokens from cache
   */
  async getTopTokensFromCache(
    resolution: DefinedApiTimeResolution = '60',
    networkId?: number
  ): Promise<DefinedTopToken[]> {
    const cacheKey = CacheKeys.TOP_TOKEN(resolution, networkId);

    return await this.redisClient.getOrSet(cacheKey, async () =>
      this.getTopTokens(resolution, networkId)
    );
  }

  async getNewTokens(networkId?: number, offset?: number): Promise<DefinedNewToken[]> {
    const queryName = 'filterTokens';
    const networkFilter = await this.getNetworkFilters(networkId);

    return await this.client
      .query<DefinedNewTokenResult>(
        queryName,
        GqlTag`
          query ($networkFilter: [Int!], $limit: Int, $offset: Int) {
            ${queryName} (
              filters: {
                network: $networkFilter, 
                liquidity:{
                  gte: 100000
                },
                marketCap:{
                  lte: 100000000000
                },
                priceUSD:{
                gte: 0.00000000001
              }
              }
              rankings: {
                attribute: createdAt, 
                direction: DESC
              }
              limit: $limit,
              offset: $offset,
            ) {
              results {
                priceUSD,
                liquidity,
                marketCap,
                uniqueTransactions1,
                uniqueTransactions4,
                uniqueTransactions12,
                uniqueTransactions24,
                change1,
                change4,
                change12,
                change24
                liquidity,
                volume1,
                volume4,
                volume12,
                volume24,
                pair {
                  id,
                  address,
                  networkId,
                },
                token {
                  name,
                  id,
                  address,
                  symbol,
                  networkId,
                  info {
                    imageLargeUrl,
                    imageSmallUrl
                    imageThumbUrl
                  }
                },
              }
            }
          }`,
        {
          networkFilter,
          limit: 50,
          offset
        }
      )
      .then((res) => {
        const { results } = res;
        const uniqueItems = results.reduce((acc, currentItem) => {
          if (!acc.has(currentItem.token.address)) {
            acc.set(currentItem.token.address, currentItem);
          }

          return acc;
        }, new Map());

        return Array.from(uniqueItems.values());
      });
  }

  async getLatestTokens(networkId?: number, offset?: number, limit?: number) {
    const queryName = 'getLatestTokens';
    const networkFilter = await this.getNetworkFilters(networkId);

    return await this.client
      .query<{ items: DefinedLatestToken[] }>(
        queryName,
        GqlTag`
          query ($networkFilter: [Int!], $limit: Int, $offset: Int) {
            ${queryName} (
              networkFilter: $networkFilter,
              limit: $limit,
              offset: $offset,
            ) 
            {
              items {
                id
                tokenAddress
                networkId
                blockNumber
                transactionIndex
                traceIndex
                transactionHash
                blockHash
                timeCreated
                creatorAddress
                creatorBalance
                tokenName
                totalSupply
                tokenSymbol
                decimals
                simulationResults {
                  buySuccess
                  buyTax
                  buyGasUsed
                  maxBuyAmount
                  sellSuccess
                  sellTax
                  sellGasUsed
                  maxSellAmount
                  canTransferOwnership
                  canRenounceOwnership
                  isOwnerRenounced
                  openTradingCall
                }
              }
            }
          }`,
        {
          networkFilter,
          limit,
          offset
        }
      )
      .then((res) => {
        const { items: results } = res;
        const uniqueItems = results.reduce((acc, currentItem) => {
          if (!acc.has(currentItem.id)) {
            acc.set(currentItem.id, currentItem);
          }

          return acc;
        }, new Map());

        return Array.from(uniqueItems.values());
      });
  }

  async getTokensByMarketCap(props: {
    networkId?: number;
    volume?: string;
    offset?: number;
    limit?: number;
  }) {
    const { networkId, volume = 'volume24', offset, limit } = props;
    const queryName = 'filterTokens';
    const networkFilter = await this.getNetworkFilters(networkId);

    return await this.client
      .query<{ results: DefinedByMarketcap[] }>(
        queryName,
        GqlTag`
          query ($networkFilter: [Int!], $limit: Int, $offset: Int) {
            ${queryName} (
              filters: {
                network: $networkFilter,
                liquidity:{
                  gte: 100000,
                },
                ${volume}: {
                  gte: 100000
                },
                marketCap:{
                  lte: 100000000000
                },
              },
              rankings: {
                attribute: marketCap,
                direction: DESC
              },
              limit: $limit,
              offset: $offset,
            )
            {
              results {
                pair {
                  id,
                  address,
                  networkId,
                },
                priceUSD,
                liquidity,
                marketCap,
                change1,
                change4,
                change12,
                change24,
                volume1,
                volume4,
                volume12,
                volume24,
                uniqueTransactions1,
                uniqueTransactions4,
                uniqueTransactions12,
                uniqueTransactions24,
                token {
                  name,
                  id,
                  address,
                  symbol,
                  networkId,
                  info {
                    imageLargeUrl,
                    imageSmallUrl,
                    imageThumbUrl,
                  }
                }
              }
            }
          }
        `,
        {
          networkFilter,
          limit,
          offset
        }
      )
      .then(({ results }) => {
        return results;
      });
  }

  async filterTokens(props: DefinedFilterTokenParam): Promise<DefinedFilterTokenResult[]> {
    const queryName = 'filterTokens';

    //const filters = props.filters;
    return await this.client
      .query<{ results: DefinedFilterTokenResult[] }>(
        queryName,
        GqlTag`
          query (
          $filters: TokenFilters, 
          $statsType: TokenPairStatisticsType,
          $rankings: [TokenRanking],
          $tokens: [String],
          $phrase: String, 
          $limit: Int, 
          $offset: Int) {
            ${queryName} (
              filters: $filters,
              rankings: $rankings,
              limit: $limit,
              offset: $offset,
              statsType: $statsType,
              tokens: $tokens,
              phrase: $phrase
            )
            {
              results ${props.fields ?? DefinedDefaultFieldsProvider.getFilterTokenFields()}
            }
          }
        `,
        {
          filters: props.filters,
          rankings: props.rankings,
          limit: props.limit,
          offset: props.offset,
          phrase: props.phrase,
          statsType: props.statsType,
          tokens: props.tokens
        }
      )
      .then(({ results }) => {
        return results;
      });
  }

  async getDetailedPairStats(
    props: DefinedDetailedPairStatsParam
  ): Promise<DefinedDetailedPairStats> {
    const queryName = 'getDetailedPairStats';

    return await this.client
      .query<DefinedDetailedPairStats>(
        queryName,
        GqlTag`
          query (
          $bucketCount: Int, 
          $durations: [DetailedPairStatsDuration],
          $networkId: Int!,
          $pairAddress:	String!,
          $statsType: TokenPairStatisticsType, 
          $timestamp: Int, 
          $tokenOfInterest: TokenOfInterest) {
            ${queryName} (
              bucketCount: $bucketCount,
              durations: $durations,
              networkId: $networkId,
              pairAddress: $pairAddress,
              statsType: $statsType,
              timestamp: $timestamp,
              tokenOfInterest: $tokenOfInterest
            )
            ${props.fields ?? DefinedDefaultFieldsProvider.getDetailedPairStatsFields()}
          }
        `,
        props
      )
      .then((results) => results);
  }

  async getTokenInfo(props: DefinedTokenInfoParam): Promise<DefinedTokenInfo> {
    const queryName = 'token';

    return await this.client
      .query<DefinedTokenInfo>(
        queryName,
        GqlTag`
          query (
            $input: TokenInput!
          ) {
            ${queryName}(input: $input) {
              address
              cmcId
              id
              isScam
              name
              networkId
              symbol
              createdAt
              totalSupply
              info {
                circulatingSupply,
                imageSmallUrl
              }
              explorerData {
                blueCheckmark
                description
                tokenType
              }
              socialLinks {
                bitcointalk,
                blog,
                coingecko,
                coinmarketcap,
                discord,
                email,
                facebook,
                github,
                instagram,
                linkedin,
                reddit,
                slack,
                telegram,
                twitch,
                twitter,
                website,
                wechat,
                whitepaper,
                youtube,
              }
            }
          }
        `,
        { input: props }
      )
      .then((results) => results);
  }

  async getTokenPrice(props: DefinedTokenPriceParams): Promise<DefinedTokenPrice[]> {
    const queryName = 'getTokenPrices';

    return await this.client
      .query<DefinedTokenPrice[]>(
        queryName,
        GqlTag`
          query (
            $inputs: [GetPriceInput]
          ) {
            ${queryName}(inputs: $inputs) {
              address
              networkId
              priceUsd
            }
          }
        `,
        { inputs: props }
      )
      .then((results) => results);
  }

  async getTokenPair(props: { tokenAddress: string; networkId: number }): Promise<DefinedPair[]> {
    const queryName = 'listPairsWithMetadataForToken';

    return await this.client
      .query<{ results: [DefinedPair] }>(
        queryName,
        GqlTag`
          query (
            $tokenAddress: String!,
            $networkId: Int!
          ) {
            ${queryName}(tokenAddress: $tokenAddress, networkId: $networkId) {
              results {
                pair {
                  address
                }
                token {
                  symbol
                }
                backingToken {
                  address
                  symbol
                }
                volume
                liquidity
              }
            }
          }
        `,
        { tokenAddress: props.tokenAddress, networkId: props.networkId }
      )
      .then(({ results }) => results);
  }

  async getTokenChartData(props: DefinedTokenChartParam): Promise<DefinedTokenChartData> {
    const queryName = 'getBars';

    return await this.client
      .query<DefinedTokenChartData>(
        queryName,
        GqlTag`
          query (
            $symbol: String!, 
            $from: Int!, 
            $to: Int!, 
            $resolution: String!
          ) {
            getBars(
              symbol: $symbol, 
              from: $from, 
              to: $to, 
              resolution: $resolution, 
              quoteToken: token0,
              statsType: FILTERED
            ) {
                o
                h
                l
                c
                v
                volume
                t
              }
            }
        `,
        {
          symbol: props.symbol,
          from: props.from,
          to: props.to,
          resolution: props.resolution
        }
      )
      .then((res) => res);
  }

  async getExchangs(): Promise<DefinedExchange[]> {
    const queryName = 'getExchanges';

    return await this.client
      .query<DefinedExchange[]>(
        queryName,
        GqlTag`
          query{
            getExchanges{
              name
              tradeUrl
              address
              id
              color
              exchangeVersion
              iconUrl
            }
          }
        `
      )
      .then((res) => res);
  }

  async getPairMetadata(props: DefinedPairMetaParam): Promise<DefinedPairMetadata> {
    const queryName = 'pairMetadata';

    return await this.client
      .query<DefinedPairMetadata>(
        queryName,
        GqlTag`
          query($pairId: String!) {
            ${queryName} (pairId: $pairId) {
              token0 {
                symbol
              }
              token1 {
                symbol
              }
            }
          }
        `,
        {
          pairId: props.pairId
        }
      )
      .then((res) => res);
  }

  async getSymbol(props: DefinedGetSymbolSchema): Promise<DefinedPairMetadata> {
    const queryName = 'getSymbol';

    return await this.client
      .query<DefinedPairMetadata>(
        queryName,
        GqlTag`
          query($symbol: String!, $currencyCode: String!) {
            ${queryName} (symbol: $symbol currencyCode: $currencyCode) {
              name
              description
              currency_code
              supported_resolutions
              pricescale
              ticker
              original_currency_code
            }
          }
        `,
        {
          symbol: props.symbol,
          currencyCode: props.currencyCode
        }
      )
      .then((res) => res);
  }
}
