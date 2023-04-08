import { DefinedApiTimeResolution } from './defined/types';
import dotenv from 'dotenv';

dotenv.config();

export const apiPort = process.env.NEXT_PUBLIC_API_HOST_PORT
  ? Number(process.env.NEXT_PUBLIC_API_HOST_PORT)
  : 3001;

export const hostPort = process.env.NEXT_PUBLIC_HOST_PORT
  ? Number(process.env.NEXT_PUBLIC_HOST_PORT)
  : 3000;

export const httpApiProtocol = process.env.NEXT_PUBLIC_API_HOST_PROTOCOL ?? 'http';
export const wsApiProtocol = httpApiProtocol === 'http' ? 'ws' : 'wss';
export const hostProtocol = process.env.NEXT_PUBLIC_HOST_PROTOCOL ?? 'http';

export const hostDomain = process.env.NEXT_PUBLIC_HOST_DOMAIN ?? 'localhost';
export const apiDomain = process.env.NEXT_PUBLIC_API_HOST_DOMAIN ?? `localhost`;

export const wsApiHostUrl = `${wsApiProtocol}://${apiDomain}${apiPort === 80 ? '' : `:${apiPort}`}`;
export const httpApiHostUrl = `${httpApiProtocol}://${apiDomain}${apiPort === 80 ? '' : `:${apiPort}`}`;
export const hostUrl = `${hostProtocol}://${hostDomain}${hostPort === 80 ? '' : `:${hostPort}`}`;
export const apiHostUrlPrefix = '/api/trpc';

const getNetworkIdCacheKeyFragment = (networkId?: number) => {
  if (!networkId) {
    return '';
  }

  return `:ntwrkId:${networkId}`;
};

export namespace CacheKeys {
  export const NETWORK_DATA = 'dfi_ntwk_data';

  export const NEW_TOKEN = (networkId?: number) => {
    return `dfi_new_tkn` + getNetworkIdCacheKeyFragment(networkId);
  };

  export const TOP_TOKEN = (resoltuion: DefinedApiTimeResolution, networkId?: number) => {
    return `dfi_top_tkn:${resoltuion}` + getNetworkIdCacheKeyFragment(networkId);
  };

  export const TOP_TOKEN_BY_MARKETCAP = (
    resoltuion: DefinedApiTimeResolution,
    networkId?: number,
  ) => {
    return `dfi_top_tkn_mkt_cap:${resoltuion}` + getNetworkIdCacheKeyFragment(networkId);
  };
}

export const TimeResolution: Record<DefinedApiTimeResolution, number> = {
  '1': 60,
  '5': 300,
  '15': 900,
  '30': 1800,
  '60': 3600,
  '240': 14400,
  '720': 43200,
  '1D': 86400,
  '1W': 604800,
  '1M': 2628000,
  '1Q': 7884000,
};

export const readableResolution: Record<DefinedApiTimeResolution, string> = {
  '1': 'min1',
  '5': 'min5',
  '15': 'min15',
  '30': 'min30',
  '60': 'hour1',
  '240': 'hour4',
  '720': 'hour12',
  '1D': 'day1',
  '1W': 'day7',
  '1M': 'month1',
  '1Q': 'quarter1',
};

export const ApiTimeResolutionValue = {
  '1': '1', // 1 minute
  '5': '5', // 5 minute
  '15': '15', // 15 minute
  '30': '30', // 30 minute
  '60': '60', // 1 hour
  '240': '240', // 4 hour
  '720': '720', // 12 hour
  '1D': '1D', // 24 hour
  '1W': '1W', // 1 Week
  '1M': '1M', // 1 Month
  '1Q': '1Q', // 1 Quarter
} as const;

export const NetworkNames = {
  Ethereum: 'Ethereum',
  polygon: 'Polygon',
  'Blast Mainnet': 'Blast',
  Avalanche: 'Avalanche',
  Fantom: 'Fantom',
  Mantle: 'Mantle',
  Moonbeam: 'Moonbeam',
  Celo: 'Celo',
  'Binance Smart Chain': 'Binance',
  Arbitrum: 'Arbitrum',
  Base: 'Base',
  optimism: 'Optimism',
};

export const NetworkNamesById = {
  '1': 'Ethereum',
  '56': 'BSC',
  '137': 'Polygon',
  '42161': 'Arbitrum',
  '8453': 'Base',
  '10': 'Optimism',
  '168587773': 'Blast',
  '43114': 'Avalanche',
  '250': 'fantom',
  '5000': 'Mantle',
  '1284': 'Moonbeam',
  '42220': 'Celo',
};

export const NetworkShortNamesById: { [key: string]: string; } = {
  '1': 'eth',
  '56': 'bsc',
  '137': 'matic',
  '42161': 'arb',
  '8453': 'base',
  '10': 'opti',
  '168587773': 'blast',
  '43114': 'avax',
  '250': 'ftm',
  '5000': 'mantle',
  '1284': 'glmr',
  '42220': 'celo',
};

export const NetworkShortNamesByIdForBubble = {
  '1': 'eth',
  '56': 'bsc',
  '137': 'poly',
  '42161': 'arbi',
  '8453': 'base',
  '10': 'opti',
  '168587773': 'blast',
  '43114': 'avax',
  '250': 'ftm',
  '5000': 'mantle',
  '1284': 'glmr',
  '42220': 'celo',
};
