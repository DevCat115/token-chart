'use client';

import LiveNumber from '@/components/live-number';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
// import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { trpc } from '@/lib/utils/trpc';
import { tokenAge } from '@/lib/utils/token';
import {
  ArrowDownToLine,
  ArrowUpToLine,
  Bell,
  Copy,
  ExternalLink,
  Facebook,
  Github,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  Rss,
  Send,
  Twitter,
  Youtube,
} from 'lucide-react';
import { redirect, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { DiscordLogoIcon } from '@radix-ui/react-icons';
// import { useState } from 'react';
// import { DefinedApiTimeResolution } from '@/lib/defined/types';
// import { readableResolution } from '@/lib/constants';

function TabOverview() {
  const searchParams = useSearchParams();
  const networkId = searchParams.get('id');
  const address = searchParams.get('address');

  if (!networkId || !address) redirect(`/`);

  // const [res, setRes] = useState('5');

  // const resolutionHandler = (resolution: DefinedApiTimeResolution) => {
  //   setRes(resolution);
  // };

  // const { data } = trpc.tokens.getTokenPairDetails.useQuery({
  //   networkId: Number(networkId),
  //   pairAddress: address,
  // });

  const { data: priceData } = trpc.tokens.getTokenPrice.useQuery([
    {
      address,
      networkId: Number(networkId),
    },
  ]);

  const { data: tokenData } = trpc.tokens.getTokenInfo.useQuery({
    address,
    networkId: Number(networkId),
  });

  const { data: pairData } = trpc.tokens.getTokenPair.useQuery({
    tokenAddress: address,
    networkId: Number(networkId),
  });

  const { data: pairDetailData } = trpc.tokens.getTokenPairDetails.useQuery({
    networkId: Number(networkId),
    pairAddress: pairData?.address ?? '0x',
  });

  const { data: tokenResult } = trpc.tokens.filterTokens.useQuery({
    tokens: [`${address}:${networkId}`],
  });

  const networks = trpc.networks.getNetworks.useQuery().data ?? [];

  const network = networks.find((network) => network.id === Number(networkId));

  return (
    <div className="flex flex-col gap-4 mt-5">
      <div className="grid md:grid-cols-2 w-full gap-4 xl:gap-60" id="overview-widget">
        <div>
          <div className="flex gap-4">
            <Avatar className="w-[48px] h-[48px]">
              <AvatarImage src={tokenResult?.[0].token?.info?.imageSmallUrl ?? undefined} />
              <AvatarFallback>{tokenData?.name.slice(0, 2).toUpperCase() ?? ''}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{tokenData?.name}</h2>
              <span className="text-sm">{tokenData?.symbol}</span>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 mt-4">
            <h1 className="text-4xl font-bold">
              <LiveNumber
                num={priceData && priceData.length > 0 ? priceData[0]?.priceUsd : 0}
                format="$0,0.000000a"
              />
            </h1>
            <LiveNumber
              num={Number(pairDetailData?.stats_day1?.statsUsd?.close?.change) ?? 0}
              live
              sign
              format="0,0.00%"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
          <Button>
            <ArrowDownToLine className="w-[14px] h-[14px] mr-2" />
            Button
          </Button>
          <Button variant="destructive">
            <ArrowUpToLine className="w-[14px] h-[14px] mr-2" />
            Sell
          </Button>
          <Button variant="secondary">
            <Heart className="w-[14px] h-[14px] mr-2" />
            Save
          </Button>
          <Button variant="secondary">
            <Bell className="w-[14px] h-[14px] mr-2" />
            Create
          </Button>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 w-full lg:gap-60">
        <div className="mb-8">
          <Table>
            <TableBody>
              <TableRow>
                <TableHead className="pl-0">Token Age</TableHead>
                <TableCell>{tokenAge(tokenData?.createdAt)}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="pl-0">Chain</TableHead>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-[16px] h-[16px]">
                      <AvatarImage src={network?.logo} />
                      <AvatarFallback>{network?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="max-w-[260px] truncate whitespace-nowrap">
                      {network?.name}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="pl-0">Market Cap</TableHead>
                <TableCell>
                  <LiveNumber
                    num={
                      Number(tokenData?.info?.circulatingSupply) * Number(tokenResult?.[0].priceUSD)
                    }
                    format="$0,0.0a"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="pl-0">Fully Diluted Valuation</TableHead>
                <TableCell>
                  <LiveNumber num={Number(tokenResult?.[0].marketCap)} format="$0,0.0a" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="pl-0">24 Hour Trading Vol:</TableHead>
                <TableCell>
                  <LiveNumber num={Number(tokenResult?.[0].volume24)} format="$0,0" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="pl-0">Circulating Supply:</TableHead>
                <TableCell>
                  <LiveNumber num={Number(tokenData?.info?.circulatingSupply)} format="0,0a" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="pl-0">Total Supply:</TableHead>
                <TableCell>
                  <LiveNumber num={Number(tokenData?.totalSupply)} format="0,0a" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="pl-0">Coin Address:</TableHead>
                <TableCell>
                  <div className="flex flex-row items-center gap-1">
                    {tokenData?.address &&
                      tokenData?.address.slice(0, 6) + '...' + tokenData?.address.slice(-6)}
                    <Button
                      variant="link"
                      size="icon"
                      className="h-0"
                      onClick={() => navigator.clipboard.writeText(tokenData?.address ?? '')}>
                      <Copy className="w-[14px] h-[14px]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="pl-0">Pair Address:</TableHead>
                <TableCell>
                  <div className="flex flex-row items-center gap-1">
                    {pairDetailData?.pair?.address &&
                      pairDetailData?.pair?.address.slice(0, 6) +
                        '...' +
                        pairDetailData?.pair?.address.slice(-6)}
                    <Button
                      variant="link"
                      size="icon"
                      className="h-0"
                      onClick={() => navigator.clipboard.writeText(tokenData?.address ?? '')}>
                      <Copy className="w-[14px] h-[14px]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="mb-8">
          <div className="flex flex-col gap-2">
            <p className="text-sm">Social Profiles:</p>
            <div className="flex gap-2 flex-wrap">
              {tokenData?.socialLinks?.website && (
                <Link href={tokenData?.socialLinks?.website} target="_blank">
                  <Badge>
                    <ExternalLink size="14" className="mr-2" />
                    Website
                  </Badge>
                </Link>
              )}
              {tokenData?.socialLinks?.blog && (
                <Link href={tokenData?.socialLinks?.blog} target="_blank">
                  <Badge>
                    <Rss size="14" className="mr-2" />
                    Blog
                  </Badge>
                </Link>
              )}
              {tokenData?.socialLinks?.email && (
                <Link href={'mailto:' + tokenData?.socialLinks?.email} target="_blank">
                  <Badge>
                    <Mail size="14" className="mr-2" />
                    Email
                  </Badge>
                </Link>
              )}
              {tokenData?.socialLinks?.facebook && (
                <Link href={tokenData?.socialLinks?.facebook} target="_blank">
                  <Badge>
                    <Facebook size="14" className="mr-2" />
                    Facebook
                  </Badge>
                </Link>
              )}
              {tokenData?.socialLinks?.twitter && (
                <Link href={tokenData?.socialLinks?.twitter} target="_blank">
                  <Badge>
                    <Twitter size="14" className="mr-2" />X
                  </Badge>
                </Link>
              )}
              {tokenData?.socialLinks?.instagram && (
                <Link href={tokenData?.socialLinks?.instagram} target="_blank">
                  <Badge>
                    <Instagram size="14" className="mr-2" />
                    Instagram
                  </Badge>
                </Link>
              )}
              {tokenData?.socialLinks?.youtube && (
                <Link href={tokenData?.socialLinks?.youtube} target="_blank">
                  <Badge>
                    <Youtube size="14" className="mr-2" />
                    Youtube
                  </Badge>
                </Link>
              )}
              {tokenData?.socialLinks?.linkedin && (
                <Link href={tokenData?.socialLinks?.linkedin} target="_blank">
                  <Badge>
                    <Linkedin size="14" className="mr-2" />
                    Linkedin
                  </Badge>
                </Link>
              )}
              {tokenData?.socialLinks?.telegram && (
                <Link href={tokenData?.socialLinks?.telegram} target="_blank">
                  <Badge>
                    <Send size="14" className="mr-2" />
                    Telegram
                  </Badge>
                </Link>
              )}
              {tokenData?.socialLinks?.discord && (
                <Link href={tokenData?.socialLinks?.discord} target="_blank">
                  <Badge>
                    <DiscordLogoIcon width="14" className="mr-2" />
                    Discord
                  </Badge>
                </Link>
              )}
              {tokenData?.socialLinks?.github && (
                <Link href={tokenData?.socialLinks?.github} target="_blank">
                  <Badge>
                    <Github width="14" height={14} className="mr-2 mt-[-4]" />
                    Github
                  </Badge>
                </Link>
              )}
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              <p className="text-sm">Categories:</p>
              <div className="flex gap-2 flex-wrap">
                {tokenResult?.[0].exchanges?.[0].tradeUrl && (
                  <Link href={tokenResult?.[0].exchanges?.[0].tradeUrl ?? ''} target="_blank">
                    <Badge>{tokenResult?.[0].exchanges?.[0].name}</Badge>
                  </Link>
                )}
                {tokenData?.explorerData?.tokenType && (
                  <Link href="#">
                    <Badge>{tokenData?.explorerData?.tokenType}</Badge>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col">
        <div className="flex">
          <h1 className="text-3xl font-medium mr-5">Token Metrics</h1>
          <Tabs defaultValue="5" value={res} className="mt-1">
            <TabsList>
              <TabsTrigger value="5" onClick={() => resolutionHandler('5')}>
                5M
              </TabsTrigger>
              <TabsTrigger value="60" onClick={() => resolutionHandler('60')}>
                1H
              </TabsTrigger>
              <TabsTrigger value="240" onClick={() => resolutionHandler('240')}>
                4H
              </TabsTrigger>
              <TabsTrigger value="720" onClick={() => resolutionHandler('720')}>
                12H
              </TabsTrigger>
              <TabsTrigger value="1D" onClick={() => resolutionHandler('1D')}>
                24H
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="mt-5 grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col dark:bg-[#191a17] border-[#393d2f] border-2 rounded-md p-4">
            <span className="text-lg mb-4">Price Change</span>
            <h1 className="text-xl font-bold">
              <LiveNumber
                num={
                  Number(
                    pairDetailData?.[
                      ('stats_' +
                        readableResolution[
                          res as keyof typeof readableResolution
                        ]) as keyof typeof pairDetailData
                    ]?.['statsUsd' as keyof typeof pairDetailData.stats_min5]?.['close']?.[
                      'change'
                    ],
                  ) ?? 0
                }
                live
                sign
                format="0,0.00%"
              />
            </h1>
          </div>
          <div className="flex flex-col dark:bg-[#191a17] border-[#393d2f] border-2 rounded-md p-4">
            <span className="text-lg mb-4">Transactions</span>
            <h1 className="text-xl font-bold">
              <LiveNumber
                num={
                  Number(
                    pairDetailData?.[
                      ('stats_' +
                        readableResolution[
                          res as keyof typeof readableResolution
                        ]) as keyof typeof pairDetailData
                    ]?.['statsNonCurrency' as keyof typeof pairDetailData.stats_min5]?.[
                      'transactions'
                    ]?.['currentValue'],
                  ) ?? 0
                }
                format="0"
              />
            </h1>
          </div>
          <div className="flex flex-col dark:bg-[#191a17] border-[#393d2f] border-2 rounded-md p-4">
            <span className="text-lg mb-4">Volume</span>
            <h1 className="text-xl font-bold">
              <LiveNumber
                num={
                  Number(
                    pairDetailData?.[
                      ('stats_' +
                        readableResolution[
                          res as keyof typeof readableResolution
                        ]) as keyof typeof pairDetailData
                    ]?.['statsUsd' as keyof typeof pairDetailData.stats_min5]?.['volume']?.[
                      'currentValue'
                    ],
                  ) ?? 0
                }
                format="$0,0.00a"
              />
            </h1>
          </div>
          <div className="flex flex-col dark:bg-[#191a17] border-[#393d2f] border-2 rounded-md p-4">
            <span className="text-lg mb-4">Traders</span>
            <h1 className="text-xl font-bold">
              <LiveNumber
                num={
                  Number(
                    pairDetailData?.[
                      ('stats_' +
                        readableResolution[
                          res as keyof typeof readableResolution
                        ]) as keyof typeof pairDetailData
                    ]?.['statsNonCurrency' as keyof typeof pairDetailData.stats_min5]?.[
                      'traders'
                    ]?.['currentValue'],
                  ) ?? 0
                }
                format="0"
              />
            </h1>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div>
            <span className="text-green-600 text-lg">
              {Number(
                pairDetailData?.[
                  ('stats_' +
                    readableResolution[
                      res as keyof typeof readableResolution
                    ]) as keyof typeof pairDetailData
                ]?.['statsNonCurrency' as keyof typeof pairDetailData.stats_min5]?.['buys']?.[
                  'currentValue'
                ],
              ) ?? 0}
            </span>
            <span> Buy Transactions</span>
          </div>
          <div className="mb-1">
            <span className="text-red-600 text-lg">
              {Number(
                pairDetailData?.[
                  ('stats_' +
                    readableResolution[
                      res as keyof typeof readableResolution
                    ]) as keyof typeof pairDetailData
                ]?.['statsNonCurrency' as keyof typeof pairDetailData.stats_min5]?.['sells']?.[
                  'currentValue'
                ],
              ) ?? 0}
            </span>
            <span> Sell Transactions</span>
          </div>
          <div>
            <span className="text-green-600 text-lg">
              <LiveNumber
                num={
                  Number(
                    pairDetailData?.[
                      ('stats_' +
                        readableResolution[
                          res as keyof typeof readableResolution
                        ]) as keyof typeof pairDetailData
                    ]?.['statsUsd' as keyof typeof pairDetailData.stats_min5]?.['buyVolume']?.[
                      'currentValue'
                    ],
                  ) ?? 0
                }
                format="$0,0.00a"
              />
            </span>
            <span> Buy Volume</span>
          </div>
          <div className="mb-1">
            <span className="text-red-600 text-lg">
              <LiveNumber
                num={
                  Number(
                    pairDetailData?.[
                      ('stats_' +
                        readableResolution[
                          res as keyof typeof readableResolution
                        ]) as keyof typeof pairDetailData
                    ]?.['statsUsd' as keyof typeof pairDetailData.stats_min5]?.['sellVolume']?.[
                      'currentValue'
                    ],
                  ) ?? 0
                }
                format="$0,0.00a"
              />
            </span>
            <span> Sell Volume</span>
          </div>
          <div>
            <span className="text-green-600 text-lg">
              <LiveNumber
                num={
                  Number(
                    pairDetailData?.[
                      ('stats_' +
                        readableResolution[
                          res as keyof typeof readableResolution
                        ]) as keyof typeof pairDetailData
                    ]?.['statsNonCurrency' as keyof typeof pairDetailData.stats_min5]?.['buyers']?.[
                      'currentValue'
                    ],
                  ) ?? 0
                }
                format="0"
              />
            </span>
            <span> Buyers</span>
          </div>
          <div>
            <span className="text-red-600 text-lg">
              <LiveNumber
                num={
                  Number(
                    pairDetailData?.[
                      ('stats_' +
                        readableResolution[
                          res as keyof typeof readableResolution
                        ]) as keyof typeof pairDetailData
                    ]?.['statsNonCurrency' as keyof typeof pairDetailData.stats_min5]?.[
                      'sellers'
                    ]?.['currentValue'],
                  ) ?? 0
                }
                format="0"
              />
            </span>
            <span> Sellers</span>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default TabOverview;
