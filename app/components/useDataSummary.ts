import { create } from 'zustand';

type DataSummaryState = {
  marketCap: number;
  volume: number;
  transaction: number;
  setSummaryValue: (some: { marketCap: number; volume: number; transaction: number }) => void;
};

export const useDataSummaryStore = create<DataSummaryState>((set) => ({
  marketCap: 0,
  volume: 0,
  transaction: 0,
  setSummaryValue: ({ marketCap, volume, transaction }) =>
    set(() => {
      return {
        marketCap,
        volume,
        transaction,
      };
    }),
}));
