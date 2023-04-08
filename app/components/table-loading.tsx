import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function TableLoading() {
  return (
    <div className="flex w-full rounded-md border overflow-x-auto animate-pulse cursor-none pointer-events-none">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">
              <Skeleton className="w-200px h-[24px]" />
            </TableHead>
            <TableHead>
              <Skeleton className="w-100px h-[24px]" />
            </TableHead>
            <TableHead>
              <Skeleton className="w-100px h-[24px]" />
            </TableHead>
            <TableHead>
              <Skeleton className="w-100px h-[24px]" />
            </TableHead>
            <TableHead className="text-right">
              <Skeleton className="w-100px h-[24px]" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="w-140px h-[24px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-100px h-[24px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-100px h-[24px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-100px h-[24px]" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="w-100px h-[24px]" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableLoading;
