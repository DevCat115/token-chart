// import {
//   RisingLiquidityTokenParams,
//   TopBuyPressureTokenParams,
//   ExperiencedBuyerTokenParams,
//   SolidPerformanceTokenParams,
//   BlueChipTokenParams,
//   RiskyBetTokenParams,
//   DiscoveryTokenData,
// } from './types';
// import { BlockchainDataProvider } from '../providers/blockchain-data-provider';
// import { generateQueryString } from '../utils/utils';

// type MoralisClientApiSettings = {
//   moralis_api_url: string;
//   moralis_api_key: string;
//   httpOptions: RequestInit;
// };

// const doFetch = async <T>(
//   request_url: string,
//   httpOptions: RequestInit | undefined,
// ): Promise<T> => {
//   return fetch(request_url, httpOptions).then((res) => res.json());
// };

// export class MoralisClient {
//   private api_settings: MoralisClientApiSettings = {
//     moralis_api_url: process.env.MORALIS_API_ENDPOINT ?? '',
//     moralis_api_key: process.env.MORALIS_API_KEY ?? '',
//     httpOptions: {
//       headers: {
//         accept: 'application/json',
//         'X-API-Key': process.env.MORALIS_API_KEY ?? '',
//       },
//     },
//   };

//   Discovery: MoralisDiscoveryApi = new MoralisDiscoveryApi(this.api_settings);
// }

// class MoralisDiscoveryApi {
//   private discoveryApiUrlEndpoint = '/discovery/tokens';
//   private discoveryApiUrl!: string;
//   private settings!: MoralisClientApiSettings;

//   constructor(settings: MoralisClientApiSettings) {
//     this.settings = settings;
//     this.discoveryApiUrl = `${settings.moralis_api_url}${this.discoveryApiUrlEndpoint}`;
//   }

//   async getRisingLiquidityTokens(
//     params: RisingLiquidityTokenParams,
//   ): Promise<DiscoveryTokenData[]> {
//     const queryString = generateQueryString(params);
//     const requestUrl = `${this.discoveryApiUrl}/rising-liquidity?${queryString}`;

//     return doFetch<DiscoveryTokenData[]>(requestUrl, this.settings.httpOptions);
//   }
//   async getTopBuyPressureTokens(params: TopBuyPressureTokenParams): Promise<DiscoveryTokenData[]> {
//     const queryString = generateQueryString(params);
//     const requestUrl = `${this.discoveryApiUrl}/buying-pressure?${queryString}`;

//     return doFetch<DiscoveryTokenData[]>(requestUrl, this.settings.httpOptions);
//   }
//   async getExperiencedBuyerTokens(
//     params: ExperiencedBuyerTokenParams,
//   ): Promise<DiscoveryTokenData[]> {
//     const queryString = generateQueryString(params);
//     const requestUrl = `${this.discoveryApiUrl}/experienced-buyers?${queryString}`;

//     return doFetch<DiscoveryTokenData[]>(requestUrl, this.settings.httpOptions);
//   }
//   async getSolidPerformanceTokens(
//     params: SolidPerformanceTokenParams,
//   ): Promise<DiscoveryTokenData[]> {
//     const queryString = generateQueryString(params);
//     const requestUrl = `${this.discoveryApiUrl}/solid-performers?${queryString}`;

//     return doFetch<DiscoveryTokenData[]>(requestUrl, this.settings.httpOptions);
//   }
//   async getBlueChipTokens(params: BlueChipTokenParams): Promise<DiscoveryTokenData[]> {
//     const queryString = generateQueryString(params);
//     const requestUrl = `${this.discoveryApiUrl}/blue-chip?${queryString}`;

//     return doFetch<DiscoveryTokenData[]>(requestUrl, this.settings.httpOptions);
//   }
//   async getRiskyBetTokens(params: RiskyBetTokenParams): Promise<DiscoveryTokenData[]> {
//     const queryString = generateQueryString(params);
//     const requestUrl = `${this.discoveryApiUrl}/risky-bets?${queryString}`;

//     return doFetch<DiscoveryTokenData[]>(requestUrl, this.settings.httpOptions);
//   }

//   async getAllTokenData(): Promise<DiscoveryTokenData[]> {
//     const requests: Promise<DiscoveryTokenData[]>[] = [];
//     const dataProvider = new BlockchainDataProvider();

//     dataProvider.getData().forEach((chain) => {
//       requests.push(this.getRisingLiquidityTokens({ chain }));
//       requests.push(this.getTopBuyPressureTokens({ chain }));
//       requests.push(this.getExperiencedBuyerTokens({ chain }));
//       requests.push(this.getSolidPerformanceTokens({ chain }));
//       requests.push(this.getBlueChipTokens({ chain }));
//       requests.push(this.getRiskyBetTokens({ chain }));
//     });

//     return Promise.all(requests).then((d) => d[0]);
//   }
// }
