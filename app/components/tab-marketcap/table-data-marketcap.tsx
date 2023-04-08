import { useEffect } from 'react';
import { useDataSummaryStore } from '../useDataSummary';
import { DefinedByMarketcap } from '@/lib/defined/schema/defined-by-marketcap.schema';
import { BottomScrollListener } from 'react-bottom-scroll-listener';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import LiveNumber from '@/components/live-number';
import { useRouter } from 'next/navigation';

function TableDataMarketCap({
  data,
  volume,
  onPageEnd,
}: {
  data: DefinedByMarketcap[];
  volume: keyof DefinedByMarketcap;
  onPageEnd?: () => void;
}) {
  const router = useRouter();
  const hasData = data.length > 0;
  const setSummaryValue = useDataSummaryStore((state) => state.setSummaryValue);

  useEffect(() => {
    if (data?.length) {
      const { marketCap, volume, transaction } = (data ?? []).reduce(
        (acc, token) => {
          return {
            marketCap: acc.marketCap + parseFloat(token.marketCap),
            volume: acc.volume + parseFloat(token.volume24),
            transaction: acc.transaction + token.uniqueTransactions24,
          };
        },
        { marketCap: 0, volume: 0, transaction: 0 },
      );

      setSummaryValue({ marketCap, volume, transaction });
    }
  }, [data]);

  const changeMapper: { [key: string]: keyof DefinedByMarketcap } = {
    volume1: 'change1',
    volume4: 'change4',
    volume12: 'change12',
    volume24: 'change24',
  };

  const tokenAnalyticsRedirect = (networkId: number, address: string) => {
    console.log(networkId);
    const id = String(networkId);
    const queryParams = new URLSearchParams({ id, address }).toString();

    router.push(`/token-analytics?${queryParams}`);
  };

  return (
    <div>
      <div className="flex w-full rounded-md border overflow-x-auto">
        <TooltipProvider>
          <Table className="rounded-md border-border w-full table-auto">
            <TableHeader className="dark:bg-stone-950 z-50">
              <TableRow>
                <TableHead className="md:sticky md:left-0 dark:bg-stone-950">Token</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Market Cap</TableHead>
                <TableHead>Liquidity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hasData &&
                data.map((token) => (
                  <TableRow
                    key={token.token.id}
                    onClick={() =>
                      tokenAnalyticsRedirect(token.pair.networkId, token.token.address)
                    }>
                    <TableCell className="sticky left-0 dark:bg-stone-950">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-[32px] h-[32px]">
                          <AvatarImage
                            src={token.token.info.imageSmallUrl ?? ''}
                            srcSet={`${token.token.info.imageLargeUrl} 2x`}
                          />
                          <AvatarFallback>
                            {token.token.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="max-w-[260px] truncate whitespace-nowrap">
                          {token.token.name}
                        </span>
                        <Badge variant="secondary">{token.token.symbol}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger>
                          $<LiveNumber num={Number(token.priceUSD)} format="0,0.000a" />
                        </TooltipTrigger>
                        <TooltipContent>
                          $<LiveNumber num={Number(token.priceUSD)} format="0,0.0000000000" />
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>

                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger>
                          $
                          <LiveNumber num={Number(token[volume])} format="0,0.00a" />
                        </TooltipTrigger>
                        <TooltipContent>
                          $<LiveNumber num={Number(token[volume])} format="0,0.00" />
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger>
                          <LiveNumber
                            num={Number(token[changeMapper[volume]])}
                            format="0,0.00%"
                            live
                            sign
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          {Number(token[changeMapper[volume]])
                            .toFixed(12)
                            .replace(/(\.\d*?[1-9])0+$/, '$1')}
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger>
                          $<LiveNumber num={Number(token.marketCap)} format="0,0.00a" />
                        </TooltipTrigger>
                        <TooltipContent>
                          $<LiveNumber num={Number(token.marketCap)} format="0,0" />
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger>
                          $<LiveNumber num={Number(token.liquidity)} format="0,0.00a" />
                        </TooltipTrigger>
                        <TooltipContent>
                          $<LiveNumber num={Number(token.liquidity)} format="0,0" />
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              {!hasData && (
                <TableRow>
                  <TableCell colSpan={12} className="h-15">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TooltipProvider>
        {onPageEnd && data.length > 0 && <BottomScrollListener onBottom={onPageEnd} />}
      </div>
    </div>
  );
}

export default TableDataMarketCap;
