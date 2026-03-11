import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FoodCategory, TastePreference, Restaurant, RecommendationHistory } from '@/types/app';
import { getRecommendation, hasAvailableRecommendations } from '@/lib/recommendation';

interface AppState {
  categoryCounts: Record<FoodCategory, number>;
  tasteCounts: Record<TastePreference, number>;
  history: RecommendationHistory[];
  currentRecommendation: Restaurant | null;
  isSpinning: boolean;
  todayRecommendedIds: string[];
  allRecommendedToday: boolean;
  lastRecommendedDate: string | null;
  theme: 'light' | 'dark' | 'system';

  toggleCategory: (cat: FoodCategory) => void;
  toggleTaste: (taste: TastePreference) => void;
  recommend: () => boolean;
  canRecommend: () => boolean;
  setSpinning: (v: boolean) => void;
  resetCounts: () => void;
  clearHistory: () => void;
  clearRecommendation: () => void;
  addToFavorite: (id: string) => void;
  removeFromFavorite: (id: string) => void;
  rateRestaurant: (id: string, rating: number) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      categoryCounts: { '한식': 0, '중식': 0, '일식/회': 0, '양식/기타': 0 },
      tasteCounts: { '매콤하게': 0, '느끼하지 않게': 0, '가볍게': 0, '든든하게': 0 },
      history: [],
      currentRecommendation: null,
      isSpinning: false,
      todayRecommendedIds: [],
      allRecommendedToday: false,
      lastRecommendedDate: null,
      theme: 'system',

      toggleCategory: (cat) => set((s) => ({
        categoryCounts: {
          ...s.categoryCounts,
          [cat]: s.categoryCounts[cat] + 1,
        },
        // Reset today's recommendations when category changes
        todayRecommendedIds: [],
        allRecommendedToday: false,
      })),

      toggleTaste: (taste) => set((s) => ({
        tasteCounts: {
          ...s.tasteCounts,
          [taste]: s.tasteCounts[taste] + 1,
        },
      })),

      resetCounts: () => set({
        categoryCounts: { '한식': 0, '중식': 0, '일식/회': 0, '양식/기타': 0 },
        tasteCounts: { '매콤하게': 0, '느끼하지 않게': 0, '가볍게': 0, '든든하게': 0 },
        todayRecommendedIds: [],
        allRecommendedToday: false,
      }),

      canRecommend: () => {
        const today = new Date().toDateString();
        const { history, todayRecommendedIds, lastRecommendedDate } = get();

        // Reset if it's a new day
        const effectiveIds = lastRecommendedDate === today ? todayRecommendedIds : [];
        return hasAvailableRecommendations(history, effectiveIds);
      },

      recommend: (): boolean => {
        const today = new Date().toDateString();
        const { categoryCounts, tasteCounts, history, todayRecommendedIds, currentRecommendation, lastRecommendedDate } = get();

        // Reset daily tracking if it's a new day
        const effectiveIds = lastRecommendedDate === today ? todayRecommendedIds : [];
        if (lastRecommendedDate !== today) {
          set({ todayRecommendedIds: [], allRecommendedToday: false, lastRecommendedDate: today });
        }

        const selected = getRecommendation({
          categoryCounts,
          tasteCounts,
          history,
          todayRecommendedIds: effectiveIds,
          currentRecommendation
        });

        if (!selected) {
          set({ allRecommendedToday: true });
          return false;
        }

        const historyEntry: RecommendationHistory = {
          id: Date.now().toString(),
          restaurant: selected,
          date: new Date().toISOString(),
          isFavorite: false,
        };

        set((s) => ({
          currentRecommendation: selected,
          history: [historyEntry, ...s.history],
          todayRecommendedIds: [...effectiveIds, selected.id],
          lastRecommendedDate: today,
          allRecommendedToday: false,
        }));

        return true;
      },

      setSpinning: (v) => set({ isSpinning: v }),
      clearRecommendation: () => set({ currentRecommendation: null }),
      clearHistory: () => set({ history: [] }),

      addToFavorite: (id) => set((s) => ({
        history: s.history.map(h => h.id === id ? { ...h, isFavorite: true } : h),
      })),

      removeFromFavorite: (id) => set((s) => ({
        history: s.history.map(h => h.id === id ? { ...h, isFavorite: false } : h),
      })),

      rateRestaurant: (id, rating) => set((s) => ({
        history: s.history.map(h => h.id === id ? { ...h, userRating: rating } : h),
      })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'babgorithm-storage',
      merge: (persisted, current) => {
        const p = persisted as Partial<AppState> | undefined;
        const today = new Date().toDateString();
        const isNewDay = p?.lastRecommendedDate !== today;
        return {
          ...current,
          ...p,
          todayRecommendedIds: isNewDay ? [] : (p?.todayRecommendedIds ?? []),
          allRecommendedToday: isNewDay ? false : (p?.allRecommendedToday ?? false),
          lastRecommendedDate: p?.lastRecommendedDate ?? null,
          theme: p?.theme ?? 'system',
        };
      },
    }
  )
);
