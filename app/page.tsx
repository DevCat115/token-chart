import { DefinedApiTimeResolution } from '@/lib/defined/types';
import DashboardDataTrending from './components/tab-trending/dashboard-data-trending';
import DashboardDataNew from './components/tab-new/dashboard-data-new';
import DashboardDataMarketCap from './components/tab-marketcap/dashboard-data-marketcap';
import { Metadata } from 'next';

const pageTabs = ['trending', 'new', 'marketcap'];

export const metadata: Metadata = {
  title: 'Decode | Home',
};

export default function Home({
  searchParams,
}: Readonly<{
  searchParams: { [key: string]: string | undefined };
}>) {
  const { id, resolution, tab } = searchParams;
  const networkId = Number(id) || 1;
  const activeTab = pageTabs.includes(tab ?? '') ? tab : 'marketcap';
  const activeResolution = (resolution as DefinedApiTimeResolution) ?? '1D';

  return (
    <div className="flex w-full flex-col gap-4">
      {activeTab === 'trending' && (
        <DashboardDataTrending resolution={activeResolution} networkId={networkId} />
      )}

      {activeTab === 'new' && (
        <DashboardDataNew resolution={activeResolution} networkId={networkId} />
      )}

      {activeTab === 'marketcap' && (
        <DashboardDataMarketCap resolution={activeResolution} networkId={networkId} />
      )}
    </div>
  );
}
