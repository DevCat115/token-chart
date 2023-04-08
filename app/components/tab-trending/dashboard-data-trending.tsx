'use client';

import TableDataTrending from './table-data-trending';
import DashboardSummary from '../dashboard-summary';
import DashboadControl from '../dashboard-controls';
import { useState } from 'react';
import { DefinedApiTimeResolution } from '@/lib/defined/types';
import { Separator } from '@/components/ui/separator';
import { DefinedTopToken } from '@/lib/defined/schema/defined-top-token.schema';
import { trpc } from '@/lib/utils/trpc';

function DashboardDataTrending({
  resolution,
  networkId,
}: Readonly<{
  resolution: DefinedApiTimeResolution;
  networkId: number;
}>) {
  const [trendingData, setTrendingData] = useState<DefinedTopToken[]>([]);

  trpc.tokens.getTopTokens.useSubscription(
    {
      resolution,
      networkId,
    },
    {
      onData(data) {
        setTrendingData(data);
      },
    },
  );

  return (
    <div className="flex w-full flex-col">
      <DashboardSummary />
      <Separator className="mt-2" />
      <DashboadControl resolution={resolution} />
      <TableDataTrending data={trendingData} />
    </div>
  );
}

export default DashboardDataTrending;
