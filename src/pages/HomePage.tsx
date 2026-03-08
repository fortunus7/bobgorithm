import CategoryFilter from '@/components/CategoryFilter';
import TasteFilter from '@/components/TasteFilter';
import BabiButton from '@/components/BabiButton';
import RecommendationResult from '@/components/RecommendationResult';
import { useAppStore } from '@/store/useAppStore';
import { RotateCcw } from 'lucide-react';

const HomePage = () => {
  const { categoryCounts, tasteCounts, resetCounts } = useAppStore();
  const totalClicks = (Object.values(categoryCounts) as number[]).reduce((a, b) => a + b, 0)
    + (Object.values(tasteCounts) as number[]).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col gap-6 pt-6 pb-4">
      <div className="px-6 flex items-center justify-between">
        <h1 className="text-3xl font-black text-foreground tracking-tight">밥고리즘</h1>
        {totalClicks > 0 && (
          <button
            onClick={resetCounts}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted text-muted-foreground text-xs font-medium transition-colors hover:bg-border"
          >
            <RotateCcw size={14} />
            초기화
          </button>
        )}
      </div>

      <CategoryFilter />
      <BabiButton />
      <TasteFilter />
      <RecommendationResult />
    </div>
  );
};

export default HomePage;
