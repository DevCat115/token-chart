'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useTabState from './useTabState';
import TabOverview from './tab-overview';
import TradingViewWidget from './tab-price-chart';
import TabBubbleChart from './tab-bubble-chart';
import { TabsContent } from '@radix-ui/react-tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const TAB_IDS = {
  overview: 'overview',
  priceChart: 'price-chart',
  security: 'security',
  bubbleChart: 'bubble-chart',
  about: 'about',
};

export default function TabHandler({
  defaultTab,
}: Readonly<{
  defaultTab?: string;
}>) {
  const { defaultValue, tabChangeHandler } = useTabState(defaultTab);

  return (
    <div className="flex grow w-full dark:bg-stone-950 z-50 gap-2">
      <Tabs defaultValue={defaultValue} value={defaultValue} className="w-full min-h-full">
        <Select defaultValue={defaultValue} onValueChange={(e) => tabChangeHandler(e)}>
          <SelectTrigger className="w-full mb-4 md:hidden">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TAB_IDS.overview}>Overview</SelectItem>
            <SelectItem value={TAB_IDS.priceChart}>Price Chart</SelectItem>
            <SelectItem value={TAB_IDS.bubbleChart}>Bubble Chart</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="mb-4 hidden md:inline-flex">
          <TabsTrigger value={TAB_IDS.overview} onClick={() => tabChangeHandler('overview')}>
            Overview
          </TabsTrigger>
          <TabsTrigger value={TAB_IDS.priceChart} onClick={() => tabChangeHandler('price-chart')}>
            Price Chart
          </TabsTrigger>
          <TabsTrigger value={TAB_IDS.bubbleChart} onClick={() => tabChangeHandler('bubble-chart')}>
            Bubble Chart
          </TabsTrigger>
        </TabsList>
        <TabsContent value={TAB_IDS.overview} className="m-0">
          <TabOverview />
        </TabsContent>
        <TabsContent value={TAB_IDS.priceChart} className="m-0  h-[calc(100%-55px)]">
          <TradingViewWidget />
        </TabsContent>
        <TabsContent value={TAB_IDS.bubbleChart} className="m-0">
          <TabBubbleChart />
        </TabsContent>
      </Tabs>
    </div>
  );
}
