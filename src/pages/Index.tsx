import { Outlet } from 'react-router-dom';
import BottomNav from '@/components/BottomNav';

const Index = () => {
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <div className="pb-20 overflow-y-auto min-h-screen">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};

export default Index;
