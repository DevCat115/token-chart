import Link from 'next/link';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

export type NavData = {
  name: string;
  href?: string;
  onClick?(): void;
  icon?: React.ReactNode;
};

function MainNav({
  collapsed,
  data,
  active,
  className: classNameProp,
}: {
  collapsed: boolean;
  data: NavData;
  active?: boolean;
  className?: string;
}) {
  const nodeRef = useRef(null);
  const className = cn(
    'flex w-full rounded-sm dark:hover:bg-stone-700 dark:text-white cursor-pointer flex-nowrap p-2 transition-colors duration-200 ease-in-out',
    collapsed ? 'justify-center' : 'items-center',
    active ? 'dark:bg-stone-700' : 'dark:hover:bg-stone-700',
    classNameProp,
  );

  const props = {
    className,
    onClick: data.onClick,
  };

  const content = (
    <>
      <div className="flex flex-shrink-0">{data.icon ?? null}</div>
      <div
        ref={nodeRef}
        className={cn(
          'whitespace-nowrap flex flex-shrink-0',
          collapsed ? 'hidden' : '',
          data.icon ? 'pl-3' : '',
        )}>
        <span className="capitalize">{data.name}</span>
      </div>
    </>
  );

  return data.href ? (
    <Link {...props} href={data.href}>
      {content}
    </Link>
  ) : (
    <div {...props}>{content}</div>
  );
}

export default MainNav;
