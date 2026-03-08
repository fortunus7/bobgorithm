import { useAppStore } from '@/store/useAppStore';
import { Settings, RotateCcw, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

const SettingsPage = () => {
  const [locationStatus, setLocationStatus] = useState<string>('확인 중...');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocationStatus(`위도 ${pos.coords.latitude.toFixed(4)}, 경도 ${pos.coords.longitude.toFixed(4)}`),
        () => setLocationStatus('위치 권한이 필요합니다'),
      );
    } else {
      setLocationStatus('위치 서비스를 지원하지 않습니다');
    }
  }, []);

  const handleReset = () => {
    localStorage.removeItem('babgorithm-storage');
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-4 pt-6 pb-4 px-6">
      <h1 className="text-2xl font-bold text-foreground">설정</h1>

      <div className="space-y-3">
        <div className="bg-card rounded-2xl p-4 category-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-mint flex items-center justify-center">
              <MapPin size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">내 위치</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{locationStatus}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="w-full bg-card rounded-2xl p-4 category-shadow flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
            <RotateCcw size={20} className="text-accent" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground text-sm">데이터 초기화</h3>
            <p className="text-xs text-muted-foreground mt-0.5">모든 이력과 설정을 초기화합니다</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
