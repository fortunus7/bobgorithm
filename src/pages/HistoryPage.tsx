import { useAppStore } from '@/store/useAppStore';
import { Star, Clock, Heart } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const HistoryPage = () => {
  const { history, rateRestaurant } = useAppStore();

  return (
    <div className="flex flex-col gap-4 pt-6 pb-4 px-6">
      <h1 className="text-2xl font-bold text-foreground">추천 이력</h1>
      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Clock size={48} className="mb-3 opacity-30" />
          <p className="text-sm">아직 추천 이력이 없어요</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div key={item.id} className="bg-card rounded-2xl p-4 category-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-foreground">{item.restaurant.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.restaurant.menu}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(new Date(item.date), 'M월 d일 (EEE) HH:mm', { locale: ko })}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => rateRestaurant(item.id, star)}
                    className="p-0.5"
                  >
                    <Star
                      size={20}
                      className={`transition-colors ${
                        (item.userRating || 0) >= star
                          ? 'fill-accent text-accent'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  </button>
                ))}
                {item.userRating && item.userRating <= 2 && (
                  <span className="ml-2 text-xs text-destructive font-medium self-center">추천 제외</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
