'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

import MainDecode from './main-decode';
import MainNav, { NavData } from './main-nav';
import { Separator } from '../ui/separator';

type MainLayoutProps = {
  collapsed: boolean;
  mainNavigation: NavData[];
};

export default function MainLayout({ collapsed, mainNavigation }: Readonly<MainLayoutProps>) {
  const [isCollapsed, setIsCollapsed] = React.useState(collapsed);

  const collapseHandler = () => {
    setIsCollapsed((p) => {
      document.cookie = `react-layout:collapsed=${JSON.stringify(!p)}`;

      return !p;
    });
  };

  return (
    <main className="flex flex-row min-h-screen">
      <div
        className={cn(
          'bg-[#191A17]',
          isCollapsed && 'w-[60px] transition-all duration-300 ease-in-out',
          !isCollapsed && 'w-[300px] transition-all duration-300 ease-in-out',
        )}>
        <MainDecode isCollapsed={isCollapsed} onClick={collapseHandler} />
        <Separator />
        <div className="p-2">
          {mainNavigation.map((nav) => (
            <MainNav key={nav.name} data={nav} collapsed={isCollapsed} />
          ))}
        </div>
      </div>
      <div className="bg-stone-950 grow">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
          <button onClick={() => setIsCollapsed((p) => !p)}>Collapse</button>
        </div>
      </div>
    </main>
  );
}
