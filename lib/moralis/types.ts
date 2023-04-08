// type BaseDiscoveryApiParams = {
//   chain: string;
//   one_month_volume_change_usd?: number;
//   security_score?: number;
//   one_month_price_percent_change_usd?: number;
// };

// export type RisingLiquidityTokenParams = BaseDiscoveryApiParams & {
//   one_month_liquidity_change_usd?: number;
//   min_market_cap?: number;
//   twitter_followers?: number;
// };

// export type TopBuyPressureTokenParams = BaseDiscoveryApiParams & {
//   one_month_net_volume_change_usd?: number;
//   min_market_cap?: number;
//   twitter_followers?: number;
// };

// export type ExperiencedBuyerTokenParams = BaseDiscoveryApiParams & {
//   one_week_experienced_net_buyers_changenumber?: number;
//   min_market_cap?: number;
//   twitter_followers?: number;
// };

// export type SolidPerformanceTokenParams = BaseDiscoveryApiParams & {
//   one_month_net_volume_change_usd?: number;
//   one_week_net_volume_change_usd?: number;
//   one_day_net_volume_change_usd?: number;
// };

// export type BlueChipTokenParams = BaseDiscoveryApiParams & {
//   min_market_cap?: number;
//   one_week_price_percent_change_usd?: number;
//   one_day_price_percent_change_usd?: number;
// };

// export type RiskyBetTokenParams = BaseDiscoveryApiParams & {
//   max_market_cap?: number;
//   one_week_holders_change?: number;
//   one_week_net_volume_change_usd?: number;
// };

// type DiscoveryTokenTrend = {
//   '1h': number;
//   '1d': number;
//   '1w': number;
//   '1M': number;
// };

// export type DiscoveryTokenData = {
//   chain_id: string;
//   token_address: string;
//   token_name: string;
//   token_symbol: string;
//   token_logo: string;
//   price_usd: number;
//   security_score: number;
//   market_cap: number;
//   fully_diluted_valuation: number;
//   twitter_followers: number;
//   holders_change: DiscoveryTokenTrend;
//   liquidity_change_usd: DiscoveryTokenTrend;
//   experienced_net_buyers_change: DiscoveryTokenTrend;
//   volume_change_usd: DiscoveryTokenTrend;
//   net_volume_change_usd: DiscoveryTokenTrend;
//   price_percent_change_usd: DiscoveryTokenTrend;
// };
