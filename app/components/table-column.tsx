'use client';

import LiveNumber from '@/components/live-number';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { DefinedTopToken } from '@/lib/defined/schema/defined-top-token.schema';
import { Column, ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowRightLeft, ArrowUp, ArrowUpDown, Tag } from 'lucide-react';

const SortArrow = ({ column }: { column: Column<DefinedTopToken> }) => {
  if (column.getIsSorted() === 'desc') {
    return <ArrowDown size={12} />;
  }

  if (column.getIsSorted() === 'asc') {
    return <ArrowUp size={12} />;
  }

  return <ArrowUpDown size={12} />;
};

export const columns: ColumnDef<DefinedTopToken>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Price
          <SortArrow column={column} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span>
        $<LiveNumber num={row.getValue('price')} format="0,0.00000a" />
      </span>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'txnCount1',
    header: () => (
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center gap-2">
            <ArrowRightLeft size={12} />
            1h
          </div>
        </TooltipTrigger>
        <TooltipContent>1 hour transaction count</TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: 'txnCount4',
    header: () => (
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center gap-2">
            <ArrowRightLeft size={12} />
            4h
          </div>
        </TooltipTrigger>
        <TooltipContent>4 hour transaction count</TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: 'txnCount12',
    header: () => (
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center gap-2">
            <ArrowRightLeft size={12} />
            12h
          </div>
        </TooltipTrigger>
        <TooltipContent>12 hour transaction count</TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: 'txnCount24',
    header: () => (
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center gap-2">
            <ArrowRightLeft size={12} />
            24h
          </div>
        </TooltipTrigger>
        <TooltipContent>24 hour transaction count</TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: 'volume',
    header: 'Volume',
  },
  {
    accessorKey: 'priceChange1',
    header: () => (
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center gap-2">
            <Tag size={12} />
            1h
          </div>
        </TooltipTrigger>
        <TooltipContent>1 hour price change</TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: 'priceChange4',
    header: () => (
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center gap-2">
            <Tag size={12} />
            4h
          </div>
        </TooltipTrigger>
        <TooltipContent>4 hour price change</TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: 'priceChange12',
    header: () => (
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center gap-2">
            <Tag size={12} />
            12h
          </div>
        </TooltipTrigger>
        <TooltipContent>12 hour price change</TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: 'priceChange24',
    header: () => (
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center gap-2">
            <Tag size={12} />
            24h
          </div>
        </TooltipTrigger>
        <TooltipContent>24 hour price change</TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: 'liquidity',
    header: 'Liquidity',
  },
];
