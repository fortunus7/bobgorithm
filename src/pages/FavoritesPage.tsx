import { useAppStore } from '@/store/useAppStore';
import { Heart, Star, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const FavoritesPage = () => {
  const { history, removeFromFavorite } = useAppStore();
  const favorites = history.filter(h => h.isFavorite);

  return (
    <div className="flex flex-col gap-4 pt-6 pb-4 px-6">
      <h1 className="text-2xl font-bold text-foreground">즐겨찾기</h1>
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Heart size={48} className="mb-3 opacity-30" />
          <p className="text-sm">즐겨찾기한 맛집이 없어요</p>
        </div>
      ) : (
        <div className="space-y-3">
          {favorites.map((item) => (
            <motion.div
              key={item.id}
              layout
              className="bg-card rounded-2xl p-4 category-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-foreground">{item.restaurant.name}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{item.restaurant.menu}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star size={14} className="text-accent fill-accent" />
                    <span className="text-xs text-foreground font-medium">{item.restaurant.rating}</span>
                    <MapPin size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{item.restaurant.distance}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromFavorite(item.id)}
                  className="p-2 rounded-xl bg-secondary"
                >
                  <Heart size={18} className="fill-accent text-accent" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
