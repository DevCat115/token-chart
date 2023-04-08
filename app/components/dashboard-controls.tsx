'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DefinedApiTimeResolution } from '@/lib/defined/types';
import { cn } from '@/lib/utils';
import { BarChart, Filter, Flame, Leaf } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import nProgress from 'nprogress';
import { useEffect, useState } from 'react';

const pageTabs = ['trending', 'new', 'marketcap'];

function DashboadControl({ resolution }: { resolution: DefinedApiTimeResolution }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tab = searchParams.get('tab') ?? 'marketcap';
  const defaultTab = pageTabs.includes(tab) ? tab : 'marketcap';

  const [res, setRes] = useState(resolution);
  const [activeTab, setActiveTab] = useState(defaultTab);

  const resolutionHandler = (resolution: DefinedApiTimeResolution) => {
    setRes(resolution);
    const url = new URL(window.location.href);

    url.searchParams.set('resolution', resolution);
    router.push(url.toString());
  };

  const tabChangeHandler = (tab: string) => {
    setActiveTab(tab);
    const url = new URL(window.location.href);

    url.searchParams.set('tab', tab);
    router.push(url.toString());
  };

  useEffect(() => {
    nProgress.done();
  }, [pathname, searchParams]);

  return (
    <div className="sticky top-0 py-4 flex flex-wrap w-full dark:bg-stone-950 z-50 gap-2">
      <Tabs defaultValue={resolution} value={res} className="space-y-4">
        <TabsList>
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
      <nav className={cn('flex items-center space-x-2')}>
        <Button
          variant={activeTab === 'marketcap' ? 'default' : 'ghost'}
          onClick={() => tabChangeHandler('marketcap')}>
          <BarChart className="mr-2 h-4 w-4" />
          Market Cap
        </Button>
        <Button
          variant={activeTab === 'trending' ? 'default' : 'ghost'}
          onClick={() => tabChangeHandler('trending')}>
          <Flame className="mr-2 h-4 w-4" />
          Trending
        </Button>
        <Button
          variant={activeTab === 'new' ? 'default' : 'ghost'}
          onClick={() => tabChangeHandler('new')}>
          <Leaf className="mr-2 h-4 w-4" />
          New
        </Button>
        <Sheet>
          <Button variant="outline" asChild>
            <SheetTrigger>
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </SheetTrigger>
          </Button>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Filter goes here</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}

export default DashboadControl;
