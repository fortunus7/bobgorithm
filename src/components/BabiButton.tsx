import { useAppStore } from '@/store/useAppStore';
import { motion, useAnimation } from 'framer-motion';
import { toast } from 'sonner';
import babiImg from '@/assets/babi-character.png';

const BabiButton = () => {
  const { isSpinning, setSpinning, recommend, allRecommendedToday, canRecommend } = useAppStore();
  const controls = useAnimation();

  const handleClick = async () => {
    if (isSpinning) return;

    if (allRecommendedToday || !canRecommend()) {
      toast('🎉 오늘의 추천 완료!', {
        description: '모든 메뉴를 다 추천해 드렸어요. 카테고리를 변경하거나 내일 다시 이용해 주세요!',
      });
      return;
    }

    setSpinning(true);

    await controls.start({
      rotate: [0, 15, -15, 360, 720, 1080],
      y: [0, -30, 0, -20, 0, -10, 0],
      scale: [1, 1.1, 0.95, 1.05, 0.98, 1],
      transition: { duration: 1.8, ease: 'easeInOut' },
    });

    const success = recommend();
    setSpinning(false);

    if (!success) {
      toast('🎉 오늘의 추천 완료!', {
        description: '모든 메뉴를 다 추천해 드렸어요.',
      });
    }
  };

  return (
    <div className="flex flex-col items-center py-4 gap-4">
      <motion.button
        animate={controls}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        disabled={isSpinning}
        className="relative w-[230px] h-[230px] rounded-full bg-peach flex items-center justify-center babi-shadow cursor-pointer border-0 outline-none overflow-visible"
      >
        <img
          src={babiImg}
          alt="바비 캐릭터"
          className="w-[304%] h-[304%] object-contain drop-shadow-md"
        />
        {!isSpinning && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-2 text-xs font-medium text-muted-foreground"
          >
            {allRecommendedToday ? '오늘의 추천 완료!' : '눌러서 추천받기!'}
          </motion.span>
        )}
      </motion.button>
      <div className="text-center">
        <p className="text-xl font-black text-foreground">
          {allRecommendedToday ? '🎉 모든 메뉴를 추천했어요!' : '오늘 뭐 먹지?'}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {allRecommendedToday
            ? '카테고리를 변경하면 다시 추천받을 수 있어요'
            : "손님들의 취향을 투표하고 '바비'를 눌러주세요"}
        </p>
      </div>
    </div>
  );
};

export default BabiButton;
