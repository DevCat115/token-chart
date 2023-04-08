import LiveNumber from '@/components/live-number';
import { useDataSummaryStore } from './useDataSummary';

function DashboardSummary() {
  const { marketCap, volume, transaction } = useDataSummaryStore((state) => state);

  return (
    <div className="flex flex-row gap-3">
      <div className="text-sm">
        Market Cap:{' '}
        <span className="dark:text-lime-700">
          $<LiveNumber num={marketCap} format="0,0.00a" />
        </span>
      </div>
      <div className="text-sm">
        24h Vol:{' '}
        <span className="dark:text-lime-700">
          $<LiveNumber num={volume} format="0,0.00a" />
        </span>
      </div>
      <div className="text-sm">
        24h Transactions:{' '}
        <LiveNumber num={transaction} format="0,0.00a" className="dark:text-lime-700" />
      </div>
    </div>
  );
}

export default DashboardSummary;
