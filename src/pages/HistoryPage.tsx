import { useAppStore } from '@/store/useAppStore';
import { Star, Clock, Heart, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const HistoryPage = () => {
  const { history, rateRestaurant, addToFavorite, removeFromFavorite, clearHistory } = useAppStore();
  const displayedHistory = history.slice(0, 30);

  return (
    <div className="flex flex-col gap-4 pt-6 pb-4 px-6">
      <div className="flex justify-between items-center mb-1">
        <h1 className="text-2xl font-bold text-foreground">추천 이력</h1>
        {history.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex items-center gap-1 text-sm text-destructive hover:opacity-70 transition-opacity">
                <Trash2 size={16} />
                초기화
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>기록 초기화</AlertDialogTitle>
                <AlertDialogDescription>모든 추천 이력이 삭제됩니다. 계속하시겠습니까?</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction onClick={clearHistory}>초기화</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-2">
        자체 평가를 해주세요. 평가에 따라서 추천 확률에 반영 됩니다. 별 1개: 추천 제외
      </p>
      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Clock size={48} className="mb-3 opacity-30" />
          <p className="text-sm">아직 추천 이력이 없어요</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayedHistory.map((item) => (
            <div key={item.id} className="bg-card rounded-2xl p-4 category-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">{item.restaurant.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.restaurant.menu}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(new Date(item.date), 'M월 d일 (EEE) HH:mm', { locale: ko })}
                  </p>
                </div>
                <button
                  onClick={() => item.isFavorite ? removeFromFavorite(item.id) : addToFavorite(item.id)}
                  className="p-1.5 rounded-full transition-colors"
                >
                  <Heart
                    size={22}
                    className={`transition-colors ${item.isFavorite
                        ? 'fill-destructive text-destructive'
                        : 'text-muted-foreground/40'
                      }`}
                  />
                </button>
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
                      className={`transition-colors ${(item.userRating || 0) >= star
                          ? 'fill-accent text-accent'
                          : 'text-muted-foreground/30'
                        }`}
                    />
                  </button>
                ))}
                {item.userRating === 1 && (
                  <span className="ml-2 text-xs text-destructive font-medium self-center">추천 제외</span>
                )}
                {item.userRating === 5 && (
                  <span className="ml-2 text-xs text-primary font-medium self-center">추천 확률 UP!</span>
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
