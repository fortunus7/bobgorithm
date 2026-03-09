import { TastePreference } from '@/types/app';
import { TASTE_EMOJIS } from '@/lib/constants';
import { useAppStore } from '@/store/useAppStore';
import { motion } from 'framer-motion';

const tastes: TastePreference[] = ['매콤하게', '느끼하지 않게', '가볍게', '든든하게'];

const TasteFilter = () => {
  const { tasteCounts, toggleTaste } = useAppStore();

  return (
    <div className="grid grid-cols-2 gap-3 px-6">
      {tastes.map((taste) => {
        const count = tasteCounts[taste];
        return (
          <motion.button
            key={taste}
            whileTap={{ scale: 0.94 }}
            onClick={() => toggleTaste(taste)}
            className="relative flex items-center gap-2 rounded-2xl bg-taste px-4 py-3 category-shadow transition-colors"
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
            <span className="text-xl">{TASTE_EMOJIS[taste]}</span>
            <span className="text-base font-bold text-foreground">{taste}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default TasteFilter;
