import { FoodCategory, CATEGORY_EMOJIS } from '@/types/app';
import { useAppStore } from '@/store/useAppStore';
import { motion } from 'framer-motion';

const categories: FoodCategory[] = ['한식', '중식', '일식/회', '양식/기타'];

const CategoryFilter = () => {
  const { categoryCounts, toggleCategory } = useAppStore();

  return (
    <div className="flex gap-3 justify-center px-4 relative z-10">
      {categories.map((cat) => {
        const count = categoryCounts[cat];
        return (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.92 }}
            onClick={() => toggleCategory(cat)}
            className="relative flex flex-col items-center gap-1.5 rounded-2xl bg-category px-4 py-3 min-w-[72px] category-shadow transition-colors"
          >
            {count > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-badge text-badge-foreground text-xs font-bold flex items-center justify-center ring-2 ring-background"
              >
                {count}
              </motion.span>
            )}
            <span className="text-3xl">{CATEGORY_EMOJIS[cat]}</span>
            <span className="text-sm font-bold text-foreground">{cat}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
