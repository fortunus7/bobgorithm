import { useState } from 'react';
import BottomNav from '@/components/BottomNav';
import HomePage from '@/pages/HomePage';
import FavoritesPage from '@/pages/FavoritesPage';
import HistoryPage from '@/pages/HistoryPage';
import SettingsPage from '@/pages/SettingsPage';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderPage = () => {
    switch (activeTab) {
      case 'home': return <HomePage />;
      case 'favorites': return <FavoritesPage />;
      case 'history': return <HistoryPage />;
      case 'settings': return <SettingsPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <div className="pb-20 overflow-y-auto min-h-screen">
        {renderPage()}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
