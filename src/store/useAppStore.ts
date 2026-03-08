import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FoodCategory, TastePreference, Restaurant, RecommendationHistory, MOCK_RESTAURANTS } from '@/types/app';

interface AppState {
  categoryCounts: Record<FoodCategory, number>;
  tasteCounts: Record<TastePreference, number>;
  history: RecommendationHistory[];
  currentRecommendation: Restaurant | null;
  isSpinning: boolean;
  todayRecommendedIds: string[];
  allRecommendedToday: boolean;
  lastRecommendedDate: string | null;

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
        
        const excludedIds = history.filter(h => h.userRating !== undefined && h.userRating <= 2).map(h => h.restaurant.id);
        const candidates = MOCK_RESTAURANTS.filter(r => !excludedIds.includes(r.id) && !effectiveIds.includes(r.id));
        return candidates.length > 0;
      },

      recommend: (): boolean => {
        const today = new Date().toDateString();
        const { categoryCounts, tasteCounts, history, todayRecommendedIds, currentRecommendation, lastRecommendedDate } = get();
        
        // Reset daily tracking if it's a new day
        const effectiveIds = lastRecommendedDate === today ? todayRecommendedIds : [];
        if (lastRecommendedDate !== today) {
          set({ todayRecommendedIds: [], allRecommendedToday: false, lastRecommendedDate: today });
        }
        
        const totalCatClicks = (Object.values(categoryCounts) as number[]).reduce((a, b) => a + b, 0);
        const totalTasteClicks = (Object.values(tasteCounts) as number[]).reduce((a, b) => a + b, 0);

        const excludedIds = history.filter(h => h.userRating !== undefined && h.userRating <= 2).map(h => h.restaurant.id);
        let candidates = MOCK_RESTAURANTS.filter(r => !excludedIds.includes(r.id));

        candidates = candidates.filter(r => !effectiveIds.includes(r.id));

        if (candidates.length === 0) {
          set({ allRecommendedToday: true });
          return false;
        }

        // Exclude the last recommended to prevent consecutive duplicates
        if (currentRecommendation && candidates.length > 1) {
          candidates = candidates.filter(r => r.id !== currentRecommendation.id);
        }

        // Weight by category and taste preferences
        const weighted = candidates.map(r => {
          let weight = 1;
          if (totalCatClicks > 0) {
            weight += (categoryCounts[r.category] || 0) * 2;
          }
          if (totalTasteClicks > 0) {
            r.taste.forEach(t => {
              weight += (tasteCounts[t] || 0);
            });
          }
          return { restaurant: r, weight };
        });

        const totalWeight = weighted.reduce((a, b) => a + b.weight, 0);
        let random = Math.random() * totalWeight;
        let selected = weighted[0].restaurant;
        for (const w of weighted) {
          random -= w.weight;
          if (random <= 0) {
            selected = w.restaurant;
            break;
          }
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
        };
      },
    }
  )
);
