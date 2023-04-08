'use client';

import { NetworkShortNamesById } from '@/lib/constants';
import { trpc } from '@/lib/utils/trpc';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { redirect, useSearchParams } from 'next/navigation';
import React, { memo, useEffect, useState } from 'react';

import {
  ChartingLibraryWidgetOptions,
  ResolutionString,
  ThemeName,
} from "@/public/static/charting_library/charting_library";
import { save_load_adapter } from "@/services/binance/saveLoadAdapter";

import { DefinedOnBarsUpdated } from '@/lib/defined/schema/websocket/defined-on-bars-updated.schema';

const defaultWidgetProps: Partial<ChartingLibraryWidgetOptions> = {
  // symbol: "Binance:BTC/USDT",
  timezone: "America/Chicago",
  interval: "1D" as ResolutionString,
  library_path: "/static/charting_library/",
  locale: "en",
  charts_storage_url: "https://saveload.tradingview.com",
  charts_storage_api_version: "1.1",
  save_load_adapter: save_load_adapter,
  client_id: "tradingview.com",
  user_id: "public_user_id",
  fullscreen: false,
  autosize: true
};

const TVChartContainer = dynamic(
  () =>
    import("@/components/TVChartContainer").then((mod) => mod.TVChartContainer),
  { ssr: false }
);


function TradingViewWidget() {
  const [isScriptReady, setIsScriptReady] = useState(false);
  const searchParams = useSearchParams();
  const networkId = searchParams.get('id');
  const address = searchParams.get('address');

  const { theme } = useTheme();

  return (
    <div className="grow my-2" id="price-chart-widget">
      <h1 className="text-3xl font-medium mr-5 mb-5">Price Chart</h1>
      <div className="flex w-full">
        <div className="flex-1">
          <div className="h-[540px] w-full">
            {address && <TVChartContainer theme={theme as ThemeName} symbol={`${address}:${networkId}`} {...defaultWidgetProps} />}
          </div>
        </div>
        <div className="w-[333px] h-full">

        </div>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
