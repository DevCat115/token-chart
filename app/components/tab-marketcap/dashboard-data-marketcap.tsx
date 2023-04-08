'use client';

import { DefinedApiTimeResolution } from '@/lib/defined/types';
import DashboardSummary from '../dashboard-summary';
import { Separator } from '@/components/ui/separator';
import DashboadControl from '../dashboard-controls';
import TableDataMarketCap from './table-data-marketcap';
import { trpc } from '@/lib/utils/trpc';
import { Skeleton } from '@/components/ui/skeleton';

function DashboardDataMarketCap({
  resolution,
  networkId,
}: Readonly<{
  resolution: DefinedApiTimeResolution;
  networkId: number;
}>) {
  const resMap: { [key: string]: any } = {
    '60': 'volume1',
    '240': 'volume4',
    '720': 'volume12',
    '1D': 'volume24',
  };
  const { data, fetchNextPage, isFetching } = trpc.tokens.getTokensByMarketCap.useInfiniteQuery(
    {
      networkId,
      volume: resMap[resolution],
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
      refetchInterval: 2 * 60 * 1000, // 2 mins
    },
  );

  const flatData = data?.pages.map((page) => page.items).flat() ?? [];

  return (
    <div className="flex w-full flex-col">
      <DashboardSummary />
      <Separator className="mt-2" />
      <DashboadControl resolution={resolution} />
      <TableDataMarketCap data={flatData} volume={resMap[resolution]} onPageEnd={fetchNextPage} />
      {isFetching && <Skeleton className="w-100px h-[24px] mt-2" />}
    </div>
  );
}

export default DashboardDataMarketCap;
