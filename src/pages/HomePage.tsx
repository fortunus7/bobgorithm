import CategoryFilter from '@/components/CategoryFilter';
import TasteFilter from '@/components/TasteFilter';
import BabiButton from '@/components/BabiButton';
import RecommendationResult from '@/components/RecommendationResult';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-6 pt-6 pb-4">
      <div className="px-6">
        <h1 className="text-3xl font-black text-foreground tracking-tight">밥고리즘</h1>
      </div>

      <CategoryFilter />
      <BabiButton />
      <TasteFilter />
      <RecommendationResult />
    </div>
  );
};

export default HomePage;
