import { Metadata } from 'next';
import TabHandler from './components/tab-handler';

export const metadata: Metadata = {
  title: 'Token Analytics',
};

export default function TokenAnalytics({
  searchParams,
}: Readonly<{
  searchParams: { [key: string]: string | undefined };
}>) {
  const { tatab } = searchParams;

  return (
    <div className="flex w-full">
      <TabHandler defaultTab={tatab} />
    </div>
  );
}
