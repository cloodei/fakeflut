import { useState } from 'react';
import { Home, ClipboardList, Package, Wallet, Calendar, User } from 'lucide-react';
import Dashboard from './components/Dashboard';
import DutyRoster from './components/DutyRoster';
import Assets from './components/Assets';
import Funds from './components/Funds';
import Events from './components/Events';
import Profile from './components/Profile';
import AuthScreen from './components/AuthScreen';

type Tab = 'dashboard' | 'duties' | 'assets' | 'funds' | 'events' | 'profile';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [userName, setUserName] = useState('');

  if (!isAuthenticated) {
    return <AuthScreen onAuth={(name) => {
      setIsAuthenticated(true);
      setUserName(name);
    }} />;
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('dashboard');
    setUserName('');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard userName={userName} onNavigateToEvents={() => setActiveTab('events')} />;
      case 'duties':
        return <DutyRoster />;
      case 'assets':
        return <Assets />;
      case 'funds':
        return <Funds />;
      case 'events':
        return <Events />;
      case 'profile':
        return <Profile userName={userName} onLogout={handleLogout} onBack={() => setActiveTab('dashboard')} />;
      default:
        return <Dashboard userName={userName} onNavigateToEvents={() => setActiveTab('events')} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#303080] pb-20">
      {/* Main Content */}
      <div className="h-screen overflow-y-auto pb-24">
        {renderContent()}
      </div>

      {/* Floating Profile Button */}
      {activeTab !== 'profile' && (
        <button
          onClick={() => setActiveTab('profile')}
          className="fixed top-6 right-6 w-12 h-12 bg-gradient-to-br from-[#FF4D6D] to-pink-400 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform z-40"
        >
          <User size={24} />
        </button>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-50">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 transition-colors px-2 ${
              activeTab === 'dashboard' ? 'text-[#FF4D6D]' : 'text-gray-400'
            }`}
          >
            <Home size={22} />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('duties')}
            className={`flex flex-col items-center gap-1 transition-colors px-2 ${
              activeTab === 'duties' ? 'text-[#FF4D6D]' : 'text-gray-400'
            }`}
          >
            <ClipboardList size={22} />
            <span className="text-xs">Duties</span>
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`flex flex-col items-center gap-1 transition-colors px-2 ${
              activeTab === 'events' ? 'text-[#FF4D6D]' : 'text-gray-400'
            }`}
          >
            <Calendar size={22} />
            <span className="text-xs">Events</span>
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`flex flex-col items-center gap-1 transition-colors px-2 ${
              activeTab === 'assets' ? 'text-[#FF4D6D]' : 'text-gray-400'
            }`}
          >
            <Package size={22} />
            <span className="text-xs">Assets</span>
          </button>
          <button
            onClick={() => setActiveTab('funds')}
            className={`flex flex-col items-center gap-1 transition-colors px-2 ${
              activeTab === 'funds' ? 'text-[#FF4D6D]' : 'text-gray-400'
            }`}
          >
            <Wallet size={22} />
            <span className="text-xs">Funds</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
