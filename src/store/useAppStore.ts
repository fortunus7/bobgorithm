import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FoodCategory, TastePreference, Restaurant, RecommendationHistory, MOCK_RESTAURANTS } from '@/types/app';

interface AppState {
  categoryCounts: Record<FoodCategory, number>;
  tasteCounts: Record<TastePreference, number>;
  history: RecommendationHistory[];
  currentRecommendation: Restaurant | null;
  isSpinning: boolean;

  toggleCategory: (cat: FoodCategory) => void;
  toggleTaste: (taste: TastePreference) => void;
  recommend: () => void;
  setSpinning: (v: boolean) => void;
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

      toggleCategory: (cat) => set((s) => ({
        categoryCounts: {
          ...s.categoryCounts,
          [cat]: s.categoryCounts[cat] + 1,
        },
      })),

      toggleTaste: (taste) => set((s) => ({
        tasteCounts: {
          ...s.tasteCounts,
          [taste]: s.tasteCounts[taste] + 1,
        },
      })),

      recommend: () => {
        const { categoryCounts, tasteCounts, history } = get();
        const totalCatClicks = Object.values(categoryCounts).reduce((a, b) => a + b, 0);
        const totalTasteClicks = Object.values(tasteCounts).reduce((a, b) => a + b, 0);

        // Filter out restaurants rated poorly (<=2)
        const excludedIds = history.filter(h => h.userRating !== undefined && h.userRating <= 2).map(h => h.restaurant.id);
        let candidates = MOCK_RESTAURANTS.filter(r => !excludedIds.includes(r.id));

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
        }));
      },

      setSpinning: (v) => set({ isSpinning: v }),
      clearRecommendation: () => set({ currentRecommendation: null }),

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
    { name: 'babgorithm-storage' }
  )
);
