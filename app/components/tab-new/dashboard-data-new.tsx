'use client';

import DashboardSummary from '../dashboard-summary';
import DashboadControl from '../dashboard-controls';
import { DefinedApiTimeResolution } from '@/lib/defined/types';
import { Separator } from '@/components/ui/separator';
import { trpc } from '@/lib/utils/trpc';
import TableDataNew from './table-data-new';
import { DefinedNewToken } from '@/lib/defined/schema/defined-new-token.schema';
import { Skeleton } from '@/components/ui/skeleton';

function DashboardDataNew({
  resolution,
  networkId,
}: Readonly<{
  resolution: DefinedApiTimeResolution;
  networkId: number;
}>) {
  const { data, fetchNextPage, isFetching } = trpc.tokens.getNewTokes.useInfiniteQuery(
    {
      networkId,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
      refetchInterval: 2 * 60 * 1000, // 2 mins
    },
  );

  const resMap: { [key: string]: keyof DefinedNewToken } = {
    '60': 'uniqueTransactions1',
    '240': 'uniqueTransactions4',
    '720': 'uniqueTransactions12',
    '1D': 'uniqueTransactions24',
  };

  const sortedItems =
    data?.pages
      .map((page) => {
        return page.items.sort((a, b) => {
          const key = resMap[resolution as keyof typeof resMap];

          const aValue = a[key];
          const bValue = b[key];

          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return aValue - bValue;
          }

          return 0;
        });
      })
      .flat() ?? [];

  return (
    <div className="flex w-full flex-col">
      <DashboardSummary />
      <Separator className="mt-2" />
      <DashboadControl resolution={resolution} />
      <TableDataNew data={sortedItems} onPageEnd={fetchNextPage} />
      {isFetching && <Skeleton className="w-100px h-[24px] mt-2" />}
    </div>
  );
}

export default DashboardDataNew;
