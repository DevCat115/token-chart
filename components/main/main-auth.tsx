'use client';
import './style.css';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

import { LogIn, Settings, Sun, SunMoon, CircleUser } from 'lucide-react';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import MainNav from './main-nav';

import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

function MainAuth({ isCollapsed }: Readonly<{ isCollapsed: boolean }>) {
  const DynamicConnectButton = dynamic(
    () => import('@dynamic-labs/sdk-react-core').then((module) => module.DynamicConnectButton),
    {
      ssr: false,
    },
  );

  const { theme, setTheme } = useTheme();

  const { user, handleLogOut } = useDynamicContext();

  return (
    <div className="flex flex-col items-center p-3 pt-4 gap-2">
      <div className="w-full my-2">
        {user ? (
          <div>
            <Button
              size="lg"
              variant="secondary"
              className={cn(
                'w-full font-medium text-md text-center mb-3',
                isCollapsed ? 'p-2' : 'p-0',
              )}>
              <CircleUser
                className={cn('w-[16px] h-[16px] font-medium', !isCollapsed && 'mr-2')}
                strokeWidth={3}
              />
              {!isCollapsed && <span>{user.email || user.wallet}</span>}
            </Button>
            <Button
              size="lg"
              variant="default"
              className={cn(
                'w-full font-medium dark:text-black text-md text-center',
                isCollapsed && 'p-2',
              )}>
              Claim 100 Tokens
            </Button>
          </div>
        ) : (
          <DynamicConnectButton
            buttonClassName={cn(
              'w-full font-medium dark:text-black text-md text-center',
              isCollapsed && 'p-2',
            )}>
            <Button
              size="lg"
              variant="default"
              className={cn(
                'w-full font-medium dark:text-black text-md text-center',
                isCollapsed && 'p-2',
              )}>
              <LogIn
                className={cn('w-[16px] h-[16px] font-medium', !isCollapsed && 'mr-2')}
                strokeWidth={3}
              />
              {!isCollapsed && <span>Connect & Log In</span>}
            </Button>
          </DynamicConnectButton>
        )}
      </div>
      <div className={cn('w-full grid gap-2', isCollapsed ? 'grid-cols-1' : 'grid-cols-2')}>
        <Button
          variant="secondary"
          className={cn('w-full font-medium text-md text-center', isCollapsed && 'p-2')}>
          <Settings className="w-[16px] h-[16px] font-medium" strokeWidth={3} />
        </Button>
        <Button
          variant="secondary"
          className={cn('w-full font-medium text-md text-center', isCollapsed && 'p-2')}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? (
            <Sun className="w-[16px] h-[16px] font-medium" strokeWidth={3} />
          ) : (
            <SunMoon className="w-[16px] h-[16px] font-medium" strokeWidth={3} />
          )}
        </Button>
      </div>
      <div className={cn('w-full', isCollapsed ? 'hidden' : 'flex flex-col')}>
        <MainNav
          className="mb-1"
          key="alpha_group"
          active={false}
          data={{
            name: 'Alpha Group',
            onClick: () => null,
          }}
          collapsed={isCollapsed}
        />
        <MainNav
          className="mb-1"
          key="advertise"
          active={false}
          data={{
            name: 'Advertise',
            onClick: () => null,
          }}
          collapsed={isCollapsed}
        />
        {user && (
          <MainNav
            className="mb-1"
            key="signout"
            active={false}
            data={{
              name: 'Log Out',
              onClick: () => handleLogOut(),
            }}
            collapsed={isCollapsed}
          />
        )}
      </div>
    </div>
  );
}

export default MainAuth;
