import {
  ErrorCallback,
  HistoryCallback,
  LibrarySymbolInfo,
  OnReadyCallback,
  PeriodParams,
  ResolutionString,
  ResolveCallback,
  SearchSymbolsCallback,
  SubscribeBarsCallback,
  SymbolResolveExtension,
} from '@/public/static/charting_library/charting_library';
import { DataFeedOptions } from '../binance/datafeed';
import { trpcVanilla } from '@/app/api/trpc/vanilla/client';
import { priceScale } from '../binance/helpers';
import { subscribeOnStream, unsubscribeFromStream } from "./streaming";

const configurationData: TradingView.DatafeedConfiguration = {
  // Represents the resolutions for bars supported by your datafeed
  supported_resolutions: [
    '5',
    '15',
    '1H',
    '4H',
    '1D',
    '3D',
    '1W',
    '1M',
  ] as TradingView.ResolutionString[],
  // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
  exchanges: [{ value: 'Binance', name: 'Binance', desc: 'Binance' }],
  // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
  symbols_types: [{ name: 'crypto', value: 'crypto' }],
};

export default class DefinedDataFeed
  implements TradingView.IExternalDatafeed, TradingView.IDatafeedChartApi
{
  private options: DataFeedOptions;
  private lastBarsCache: Map<string, TradingView.Bar>;

  constructor(options: DataFeedOptions) {
    this.options = options;
    this.lastBarsCache = new Map();
    if (!options) {
      this.options.DatafeedConfiguration = configurationData;
    }
  }
  public async onReady(callback: OnReadyCallback): Promise<void> {
    setTimeout(() => callback(configurationData));
  }
  public async searchSymbols(
    userInput: string,
    exchange: string,
    symbolType: string,
    onResult: SearchSymbolsCallback,
  ): Promise<void> {
    console.log('searching symbol', userInput);
  }

  public async resolveSymbol(
    symbolName: string,
    onResolve: ResolveCallback,
    onError: ErrorCallback,
    extension?: SymbolResolveExtension | undefined,
  ): Promise<void> {
    console.log('resolve', symbolName);
    const tokenAddress = symbolName.split(':')[0];
    const networkId = Number(symbolName.split(':')[1]);
    const pairs = await trpcVanilla.tokens.getTokenPair.query({
      networkId,
      tokenAddress,
    });

    const symbolConfig = await trpcVanilla.tokens.getSymbol.query({
      symbol: symbolName,
      currencyCode: 'TOKEN',
    });

    console.log('symbolConfig', symbolConfig);

    let pair = pairs.find(
      (item) =>
        item.backingToken.symbol.includes('WETH')
    );

    if (pair == null) {
      pair = pairs.find(
        (item) =>
          item.backingToken.symbol.includes('USD') ||
          item.backingToken.symbol.includes('USDC')  ||
          item.backingToken.symbol.includes('USDT'),
      );
    }

    if (pair == null) {
      pair = pairs.length > 0 ? pairs[0] : null;
    }

    if (!pair) return;

    const symbolInfo: Partial<TradingView.LibrarySymbolInfo> = {
      ticker: `${pair.token.symbol}/${pair.backingToken.symbol}`,
      name: `${pair.pair.address}:${networkId}`,
      description: `${pair.token.symbol}/${pair.backingToken.symbol}`,
      type: 'crypto',
      session: '24x7',
      timezone: 'Etc/UTC',
      exchange: 'defined',
      minmov: 1,
      // pricescale: priceScale('0.00100000'),
      pricescale: priceScale('0.00000100'),
      has_intraday: true,
      has_daily: true,
      has_weekly_and_monthly: false,
      visible_plots_set: 'ohlcv',
      supported_resolutions: configurationData.supported_resolutions!,
      volume_precision: 8,
      data_status: 'streaming',
    };

    onResolve(symbolInfo as TradingView.LibrarySymbolInfo);
  }

  public async getBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: PeriodParams,
    onResult: HistoryCallback,
    onError: ErrorCallback,
  ): Promise<void> {
    const { from, to, firstDataRequest } = periodParams;
    const chartData = await trpcVanilla.tokens.getChartData.query({
      from,
      to,
      resolution,
      symbol: symbolInfo.name,
    });
    // console.log(chartData)
    const bars = [];

    for (let i = 0; i < chartData.c.length; i++) {
      if (
        !!chartData.c[i] &&
        !!chartData.t[i] &&
        !!chartData.l[i] &&
        chartData.volume[i] &&
        chartData.h[i] &&
        chartData.o[i]
      ) {
        bars.push({
          time: chartData.t[i] * 1000,
          open: chartData.o[i],
          high: chartData.h[i],
          low: chartData.l[i],
          close: chartData.c[i],
          volume: Number(chartData.volume[i]),
        });
      }
    }
    if (firstDataRequest) {
      this.lastBarsCache.set(symbolInfo.name, {
        ...bars[bars.length - 1],
      });
    }
    onResult(bars, { noData: false });
  }

  public subscribeBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onTick: SubscribeBarsCallback,
    listenerGuid: string,
    onResetCacheNeededCallback: () => void,
  ): void {
    /*
        this.socket.subscribeOnStream(
          symbolInfo,
          resolution,
          onTick,
          listenerGuid,
          onResetCacheNeededCallback,
          this.lastBarsCache.get(symbolInfo.name),
        );
    */

    console.log('symbolInfo', symbolInfo,this.lastBarsCache);

    subscribeOnStream(
      symbolInfo,
      resolution,
      onTick,
      listenerGuid,
      onResetCacheNeededCallback,
      this.lastBarsCache.get(symbolInfo.name),
    );
  }

  public unsubscribeBars(listenerGuid: string): void {
    unsubscribeFromStream(listenerGuid);
  }
}
