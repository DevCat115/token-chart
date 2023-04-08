import { NetworkShortNamesByIdForBubble } from '@/lib/constants';
import { useTheme } from 'next-themes';
import { redirect, useSearchParams } from 'next/navigation';
import React, { memo } from 'react';

type UrlConfig = {
  protocol: string;
  host: string;
  path: string;
  queryParams: {
    [key: string]: string;
  };
};

function BubbleChartWidget() {
  const searchParams = useSearchParams();
  const networkId = searchParams.get('id');
  const address = searchParams.get('address');

  const { theme } = useTheme();

  if (!networkId || !address) redirect(`/`);

  const network =
    NetworkShortNamesByIdForBubble[networkId as keyof typeof NetworkShortNamesByIdForBubble];

  const urlConfig = {
    protocol: 'https',
    host: 'app.bubblemaps.io',
    path: `/${network}/token/${address}`,
    queryParams: {
      theme: theme ?? 'dark',
      loading_color: 'ffffff',
    },
  };
  const constructUrl = (config: UrlConfig) => {
    const queryParams = Object.entries(config.queryParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return `${config.protocol}://${config.host}${config.path}?${queryParams}`;
  };

  const fullUrl = constructUrl(urlConfig);

  return (
    <div className="grow my-2" id="bubble-chart-widget">
      <h1 className="text-3xl font-medium mr-5 mb-5">Bubble Chart</h1>
      <iframe
        src={fullUrl}
        className="h-[700px] w-full dark:bg-[#191A17] bg-[#f1f1f1]"
        id="bubble-embed"
        title="Bubble Embed"
      />
    </div>
  );
}

export default memo(BubbleChartWidget);
