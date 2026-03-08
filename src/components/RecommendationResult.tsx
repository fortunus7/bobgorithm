import { useAppStore } from '@/store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Phone, MapPin, Navigation, Heart, Share2 } from 'lucide-react';
import { toast } from 'sonner';

const RecommendationResult = () => {
  const { currentRecommendation, clearRecommendation, history, addToFavorite, removeFromFavorite } = useAppStore();
  
  if (!currentRecommendation) return null;

  const historyEntry = history.find(h => h.restaurant.id === currentRecommendation.id);
  const isFav = historyEntry?.isFavorite || false;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50 flex items-end justify-center"
        onClick={clearRecommendation}
      >
        <motion.div
          initial={{ y: 400 }}
          animate={{ y: 0 }}
          exit={{ y: 400 }}
          transition={{ type: 'spring', damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-card rounded-t-3xl p-6 pb-10"
        >
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
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold">
              <Navigation size={18} />
              길찾기
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RecommendationResult;
