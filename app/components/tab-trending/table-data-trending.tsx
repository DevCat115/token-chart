import LiveNumber from '@/components/live-number';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowRightLeft, Tag } from 'lucide-react';
import { useEffect } from 'react';
import { DefinedTopToken } from '@/lib/defined/schema/defined-top-token.schema';
import { useDataSummaryStore } from '../useDataSummary';
import { useRouter } from 'next/navigation';

function TableDataTrending({
  data,
}: Readonly<{
  data: DefinedTopToken[];
}>) {
  const router = useRouter();
  const hasData = data.length > 0;
  const setSummaryValue = useDataSummaryStore((state) => state.setSummaryValue);

  useEffect(() => {
    if (data?.length) {
      const { marketCap, volume, transaction } = (data ?? []).reduce(
        (acc, token) => {
          return {
            marketCap: acc.marketCap + parseFloat(token.marketCap),
            volume: acc.volume + parseFloat(token.volume),
            transaction: acc.transaction + token.txnCount24,
          };
        },
        { marketCap: 0, volume: 0, transaction: 0 },
      );

      setSummaryValue({ marketCap, volume, transaction });
    }
  }, [data]);

  const tokenAnalyticsRedirect = (networkId: number, address: string) => {
    const id = String(networkId);
    const queryParams = new URLSearchParams({ id, address }).toString();

    router.push(`/token-analytics?${queryParams}`);
  };

  return (
    <div className="flex w-full rounded-md border overflow-x-auto">
      <TooltipProvider>
        <Table className="rounded-md border-border w-full table-auto">
          <TableHeader className="dark:bg-stone-950 z-50">
            <TableRow>
              <TableHead className="md:sticky md:left-0 dark:bg-stone-950">Token</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-center">
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-2">
                      <ArrowRightLeft size={12} />
                      1h
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>1 hour transaction count</TooltipContent>
                </Tooltip>
              </TableHead>
              <TableHead className="text-center">
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-2">
                      <ArrowRightLeft size={12} />
                      4h
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>4 hour transaction count</TooltipContent>
                </Tooltip>
              </TableHead>
              <TableHead className="text-center">
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-2">
                      <ArrowRightLeft size={12} />
                      12h
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>12 hour transaction count</TooltipContent>
                </Tooltip>
              </TableHead>
              <TableHead className="text-center">
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-2">
                      <ArrowRightLeft size={12} />
                      24h
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>24 hour transaction count</TooltipContent>
                </Tooltip>
              </TableHead>
              <TableHead>Volume</TableHead>
              <TableHead className="text-center">
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-2">
                      <Tag size={12} />
                      1h
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>1 hour price change</TooltipContent>
                </Tooltip>
              </TableHead>
              <TableHead className="text-center">
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-2">
                      <Tag size={12} />
                      4h
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>4 hour price change</TooltipContent>
                </Tooltip>
              </TableHead>
              <TableHead className="text-center">
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-2">
                      <Tag size={12} />
                      12h
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>12 hour price change</TooltipContent>
                </Tooltip>
              </TableHead>
              <TableHead className="text-center">
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-2">
                      <Tag size={12} />
                      24h
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>24 hour price change</TooltipContent>
                </Tooltip>
              </TableHead>
              <TableHead>Liquidity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hasData &&
              data.map((token) => (
                <TableRow
                  key={token.address + token.name}
                  onClick={() => {
                    console.log(token);
                    tokenAnalyticsRedirect(token.networkId, token.address);
                  }}>
                  <TableCell className="sticky left-0 dark:bg-stone-950">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-[32px] h-[32px]">
                        <AvatarImage
                          src={token.imageSmallUrl}
                          srcSet={`${token.imageLargeUrl} 2x`}
                        />
                        <AvatarFallback>{token.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="max-w-[260px] truncate whitespace-nowrap">{token.name}</span>
                      <Badge variant="secondary">{token.symbol}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger>
                        $<LiveNumber num={token.price} format="0,0.000a" />
                      </TooltipTrigger>
                      <TooltipContent>
                        ${token.price.toFixed(12).replace(/(\.\d*?[1-9])0+$/, '$1')}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>

                  <TableCell className="text-center">
                    <LiveNumber num={token.txnCount1} format="0,0" />
                  </TableCell>
                  <TableCell className="text-center">
                    <LiveNumber num={token.txnCount4} format="0,0" />
                  </TableCell>
                  <TableCell className="text-center">
                    <LiveNumber num={token.txnCount12} format="0,0" />
                  </TableCell>
                  <TableCell className="text-center">
                    <LiveNumber num={token.txnCount24} format="0,0" />
                  </TableCell>

                  <TableCell>
                    <LiveNumber num={Number(token.volume)} format="0,0.00a" />
                  </TableCell>

                  <TableCell className="text-center">
                    <LiveNumber num={token.priceChange1} format="0,0.00%" live sign />
                  </TableCell>
                  <TableCell className="text-center">
                    <LiveNumber num={token.priceChange4} format="0,0.00%" live sign />
                  </TableCell>
                  <TableCell className="text-center">
                    <LiveNumber num={token.priceChange12} format="0,0.00%" live sign />
                  </TableCell>
                  <TableCell className="text-center">
                    <LiveNumber num={token.priceChange24} format="0,0.00%" live sign />
                  </TableCell>
                  <TableCell>
                    <LiveNumber num={Number(token.liquidity)} format="0,0.00a" />
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
    </div>
  );
}

export default TableDataTrending;
