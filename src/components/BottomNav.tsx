import { Home, Heart, Clock, Settings } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const tabs = [
  { id: 'home', path: '/', label: '홈', icon: Home },
  { id: 'favorites', path: '/favorites', label: '즐겨찾기', icon: Heart },
  { id: 'history', path: '/history', label: '추천이력', icon: Clock },
  { id: 'settings', path: '/settings', label: '설정', icon: Settings },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-nav nav-shadow z-50">
      <div className="max-w-md mx-auto flex justify-around items-center py-2 pb-[env(safe-area-inset-bottom,8px)]">
        {tabs.map(({ id, path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={id}
              to={path}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-colors ${isActive ? 'text-nav-active' : 'text-nav-inactive'
                }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className={`text-[11px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
