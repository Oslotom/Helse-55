import { create } from 'zustand';

type TabState = {
  tab: 'today' | 'activity' | 'sleep' | 'body' | 'profile';
  setTab: (tab: 'today' | 'activity' | 'sleep' | 'body' | 'profile') => void;
};

export const useTabStore = create<TabState>((set) => ({
  tab: 'today',
  setTab: (tab) => set({ tab }),
}));