import { useAppStore } from '@/store/useAppStore';
import { motion, useAnimation } from 'framer-motion';
import babiImg from '@/assets/babi-character.png';

const BabiButton = () => {
  const { isSpinning, setSpinning, recommend } = useAppStore();
  const controls = useAnimation();

  const handleClick = async () => {
    if (isSpinning) return;
    setSpinning(true);

    // Bounce and spin animation
    await controls.start({
      rotate: [0, 15, -15, 360, 720, 1080],
      y: [0, -30, 0, -20, 0, -10, 0],
      scale: [1, 1.1, 0.95, 1.05, 0.98, 1],
      transition: { duration: 1.8, ease: 'easeInOut' },
    });

    recommend();
    setSpinning(false);
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
            눌러서 추천받기!
          </motion.span>
        )}
      </motion.button>
      <div className="text-center">
        <p className="text-xl font-black text-foreground">오늘 뭐 먹지?</p>
        <p className="text-sm text-muted-foreground mt-1">손님들의 취향을 선택하고 '바비'를 눌러주세요</p>
      </div>
    </div>
  );
};

export default BabiButton;
