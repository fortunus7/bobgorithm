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
    <div className="flex justify-center py-4">
      <motion.button
        animate={controls}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        disabled={isSpinning}
        className="relative w-48 h-48 rounded-[2.5rem] bg-peach flex items-center justify-center babi-shadow cursor-pointer border-0 outline-none"
      >
        <img
          src={babiImg}
          alt="바비 캐릭터"
          className="w-[80%] h-[80%] object-contain drop-shadow-md"
        />
        {!isSpinning && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -bottom-2 text-xs font-medium text-muted-foreground"
          >
            눌러서 추천받기!
          </motion.span>
        )}
      </motion.button>
    </div>
  );
};

export default BabiButton;
