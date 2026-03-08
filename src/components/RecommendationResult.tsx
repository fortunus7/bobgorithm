import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Phone, MapPin, Navigation, Heart, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import babiCharacter from '@/assets/babi-character.png';
import MapDialog from './MapDialog';

const RecommendationResult = () => {
  const { currentRecommendation, clearRecommendation, history, addToFavorite, removeFromFavorite } = useAppStore();
  const [mapOpen, setMapOpen] = useState(false);
  
  if (!currentRecommendation) return null;

  const historyEntry = history.find(h => h.restaurant.id === currentRecommendation.id);
  const isFav = historyEntry?.isFavorite || false;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50 flex items-center justify-center px-4"
        onClick={clearRecommendation}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 22 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-card rounded-3xl p-6 relative pt-16"
        >
          {/* 바비 캐릭터 */}
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', damping: 12, delay: 0.1 }}
            className="absolute -top-36 left-1/2 -translate-x-1/2"
          >
            <div className="w-72 h-72 rounded-full bg-primary/20 flex items-center justify-center">
              <img src={babiCharacter} alt="바비" className="w-60 h-60 object-contain" />
            </div>
          </motion.div>
          <p className="text-center text-2xl font-bold text-primary -mt-6 mb-4">제가 골라 드렸어요 🍽️</p>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-foreground">{currentRecommendation.name}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{currentRecommendation.menu}</p>
            </div>
            <button onClick={clearRecommendation} className="p-1.5 rounded-full bg-muted">
              <X size={18} className="text-muted-foreground" />
            </button>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-accent fill-accent" />
              <span className="text-sm font-semibold text-foreground">{currentRecommendation.rating}</span>
            </div>
            <span className="text-muted-foreground text-sm">리뷰 {currentRecommendation.reviewCount}개</span>
            <span className="text-sm font-medium text-primary">{currentRecommendation.distance}</span>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={16} />
              <span>{currentRecommendation.address}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone size={16} />
              <span>{currentRecommendation.phone}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                if (historyEntry) {
                  isFav ? removeFromFavorite(historyEntry.id) : addToFavorite(historyEntry.id);
                }
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold transition-colors ${
                isFav ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'
              }`}
            >
              <Heart size={18} className={isFav ? 'fill-accent text-accent' : ''} />
              즐겨찾기
            </button>
            <button
              onClick={async () => {
                const shareText = `오늘 점심은 ${currentRecommendation.menu}! '밥고리즘' 앱에서 골라줍니다`;
                if (navigator.share) {
                  try {
                    await navigator.share({ text: shareText });
                  } catch (e) {
                    if ((e as Error).name !== 'AbortError') {
                      toast.error('공유에 실패했습니다');
                    }
                  }
                } else {
                  await navigator.clipboard.writeText(shareText);
                  toast.success('클립보드에 복사되었습니다');
                }
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-muted text-muted-foreground font-semibold"
            >
              <Share2 size={18} />
              공유
            </button>
            <button
              onClick={() => setMapOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold"
            >
              <Navigation size={18} />
              길찾기
            </button>
          </div>

          <MapDialog
            open={mapOpen}
            onOpenChange={setMapOpen}
            address={currentRecommendation.address}
            name={currentRecommendation.name}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RecommendationResult;
