import { useState, type ReactNode } from 'react';
import {
  Home,
  ClipboardList,
  Package,
  Wallet,
  Calendar,
  LogOut,
  PanelsTopLeft,
  QrCode,
  Plus,
  HelpCircle,
  UserCircle,
  ArrowRight,
  Trophy,
  Bell,
  Wifi,
  BatteryFull
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import DutyRoster from './components/DutyRoster';
import Assets from './components/Assets';
import Funds from './components/Funds';
import Events from './components/Events';
import AuthScreen from './components/AuthScreen';
import Profile from './components/Profile';
import CreateDuty from './components/CreateDuty';
import CreateEvent from './components/CreateEvent';
import CreateFundLog from './components/CreateFundLog';

type Stage = 'hero' | 'auth' | 'setup' | 'app';
type Tab = 'dashboard' | 'duties' | 'events' | 'assets' | 'funds' | 'profile';

type UserProfile = {
  displayName: string;
  studentId: string;
};

type ClassSummary = {
  id: string;
  name: string;
  advisor: string;
  schedule: string;
};

const classCatalog: ClassSummary[] = [
  { id: 'cs101', name: 'CS101 · Product Ops', advisor: 'Ms. Nguyen', schedule: 'Mon · 07:30 - 09:00' },
  { id: 'eng204', name: 'ENG204 · Debate Lab', advisor: 'Mr. Long', schedule: 'Wed · 13:00 - 15:00' },
  { id: 'phy150', name: 'PHY150 · Robotics', advisor: 'Dr. Tran', schedule: 'Fri · 15:00 - 17:00' }
];

type QuickNotification = {
  id: number;
  label: string;
  detail: string;
  tone: 'alert' | 'info' | 'success';
};

export default function App() {
  const [stage, setStage] = useState<Stage>('hero');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedClass, setSelectedClass] = useState<ClassSummary | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [showNavPanel, setShowNavPanel] = useState(false);
  const [showLeaderboardSheet, setShowLeaderboardSheet] = useState(false);
  const [showNotificationsSheet, setShowNotificationsSheet] = useState(false);
  const [createScreen, setCreateScreen] = useState<'duty' | 'event' | 'fund' | null>(null);

  const navNames: Record<Exclude<Tab, 'dashboard'>, string> = {
    duties: 'Duty roster',
    events: 'Events & attendance',
    assets: 'Assets',
    funds: 'Class funds',
    profile: 'Profile'
  };

  const handleLogout = () => {
    setStage('auth');
    setProfile(null);
    setSelectedClass(null);
    setActiveTab('dashboard');
    setShowNavPanel(false);
  };

  const handleReturnToMainView = () => {
    setStage('setup');
    setShowNavPanel(false);
  };

  if (stage === 'hero') {
    return (
      <StageScreen
        backgroundClass="bg-[#fff]"
        frameClass="bg-[#fafafa] text-[#1a1a2e]"
        contentClass="px-6 py-4"
      >
        <HeroScreen onEnter={() => setStage('auth')} />
      </StageScreen>
    );
  }

  if (stage === 'auth') {
    return (
      <StageScreen
        backgroundClass="bg-[#fff]"
        frameClass="bg-[#fafafa] text-[#1a1a2e]"
        contentClass="px-6 py-4"
      >
        <AuthScreen
          onAuth={(userProfile) => {
            setProfile(userProfile);
            setStage('setup');
          }}
          onBack={() => setStage('hero')}
        />
      </StageScreen>
    );
  }

  if (stage === 'setup' || !selectedClass || !profile) {
    return (
      <StageScreen
        backgroundClass="bg-[#fff]"
        frameClass="bg-[#f5f6f8] text-[#1a1a2e]"
        contentClass="px-5 py-4"
      >
        <ClassSetup
          profile={profile!}
          classes={classCatalog}
          onSelect={(classInfo) => {
            setSelectedClass(classInfo);
            setStage('app');
          }}
          onLogout={handleLogout}
        />
      </StageScreen>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            userName={profile.displayName}
            classTitle={selectedClass.name}
            // onNavigateToEvents={() => setActiveTab('events')}
          />
        );
      case 'duties':
        return <DutyRoster className={selectedClass.name} onCreateClick={() => setCreateScreen('duty')} />;
      case 'events':
        return <Events className={selectedClass.name} onCreateClick={() => setCreateScreen('event')} />;
      case 'assets':
        return <Assets className={selectedClass.name} />;
      case 'funds':
        return <Funds onCreateClick={() => setCreateScreen('fund')} />;
      case 'profile':
        return <Profile userName={profile.displayName} onLogout={handleLogout} onBack={() => setActiveTab('dashboard')} />;
      default:
        return null;
    }
  };

  const isDashboard = activeTab === 'dashboard';
  const headerTitle = isDashboard ? `${selectedClass.name}` : navNames[activeTab as Exclude<Tab, 'dashboard'>];
  const leaderboardSpotlight = [
    { name: 'Sarah Lee', points: 450, detail: '8 clears this week', trend: '+32 pts' },
    { name: 'John Smith', points: 380, detail: '5 audits logged', trend: '+18 pts' },
    { name: 'You', points: 320, detail: '3 quick assists', trend: '+10 pts' }
  ];
  const quickNotifications: QuickNotification[] = [
    { id: 1, label: 'Duty', detail: 'Whiteboard sterilized · proof pending', tone: 'alert' },
    { id: 2, label: 'Funds', detail: '₫1.2M reimbursed · advisor verified', tone: 'success' },
    { id: 3, label: 'Events', detail: 'Art fair RSVP hits 24/32', tone: 'info' }
  ];
  const notificationToneStyles: Record<QuickNotification['tone'], string> = {
    alert: 'border-[#F6A878] bg-[#FFF7F0]',
    info: 'border-[#9FB6FF] bg-[#F3F5FF]',
    success: 'border-[#9CD8C3] bg-[#F4FBF7]'
  };

  // Wrap class view in phone frame
  return (
    <StageScreen
      backgroundClass="bg-[#fff]"
      frameClass="bg-[#F9FAFD] text-[#0E1B3D]"
      contentClass=""
      fullScreen
    >
      {/* Create Screens - rendered without AppBar */}
      {createScreen && (
        <div className="relative flex min-h-full flex-col">
          {/* Status bar */}
          <div className="relative z-10 flex items-center justify-between bg-white px-8 pt-4 pb-2 text-[13px] font-medium text-[#1a1a2e]">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <Wifi size={15} strokeWidth={2} />
              <BatteryFull size={22} strokeWidth={1.5} />
            </div>
          </div>
          {/* Create Screen Content */}
          <main className="flex-1 overflow-y-auto bg-[#f5f6f8] px-5 py-4">
            {createScreen === 'duty' && (
              <CreateDuty
                onBack={() => setCreateScreen(null)}
                onSubmit={(duty) => {
                  console.log('New duty:', duty);
                  setCreateScreen(null);
                }}
              />
            )}
            {createScreen === 'event' && (
              <CreateEvent
                onBack={() => setCreateScreen(null)}
                onSubmit={(event) => {
                  console.log('New event:', event);
                  setCreateScreen(null);
                }}
              />
            )}
            {createScreen === 'fund' && (
              <CreateFundLog
                onBack={() => setCreateScreen(null)}
                onSubmit={(log) => {
                  console.log('New fund log:', log);
                  setCreateScreen(null);
                }}
              />
            )}
          </main>
          {/* Bottom Navigation */}
          <nav className="z-10">
            <div className="flex h-14 items-center justify-around border-t border-[#e8e8f0] bg-white px-2 text-[#4A4F6B]">
              {(
                [
                  { key: 'dashboard', label: 'Home', icon: Home },
                  { key: 'duties', label: 'Duties', icon: ClipboardList },
                  { key: 'events', label: 'Events', icon: Calendar },
                  { key: 'assets', label: 'Assets', icon: Package },
                  { key: 'funds', label: 'Funds', icon: Wallet },
                  { key: 'profile', label: 'Profile', icon: UserCircle }
                ] as { key: Tab; label: string; icon: typeof Home }[]
              ).map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setCreateScreen(null);
                      setActiveTab(tab.key);
                    }}
                    className={`flex flex-1 flex-col items-center gap-0.5 py-1.5 text-[11px] font-medium transition ${
                      isActive ? 'text-[#1a1a2e]' : 'text-[#8F95B2]'
                    }`}
                  >
                    <tab.icon
                      size={20}
                      strokeWidth={isActive ? 2 : 1.5}
                      className={`${isActive ? 'text-[#1a1a2e]' : 'text-[#a0a0b0]'} transition`}
                    />
                    <span className="text-[9px] tracking-wide">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      )}
      {/* Normal Class View */}
      {!createScreen && (
      <div className="relative flex min-h-full flex-col">
          {isDashboard ? (
            <header className="relative overflow-hidden bg-[#1a1a2e] px-5 pt-12 pb-5 text-white">
              {/* Status bar overlay */}
              <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-8 pt-3 pb-2 text-[13px] font-medium text-white/90">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <Wifi size={15} strokeWidth={2} />
                  <BatteryFull size={22} strokeWidth={1.5} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowNavPanel(true)}
                  className="rounded-xl border border-white/20 bg-white/10 p-2"
                  aria-label="Open navigation menu"
                >
                  <PanelsTopLeft size={18} />
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowNotificationsSheet(true)}
                    className="rounded-xl border border-white/20 bg-white/10 p-2"
                    aria-label="View notifications"
                  >
                    <Bell size={18} />
                  </button>
                  <button
                    onClick={() => setShowLeaderboardSheet(true)}
                    className="rounded-xl border border-white/20 bg-white/10 p-2"
                    aria-label="Open leaderboard"
                  >
                    <Trophy size={18} />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">{selectedClass.schedule}</p>
                <h1 className="mt-1 text-[22px] font-bold tracking-tight">{selectedClass.name}</h1>
                <p className="mt-0.5 text-[13px] text-white/70">{selectedClass.advisor}</p>
              </div>
            </header>
          ) : (
            <header className="relative border-b border-[#e8e8f0] bg-white px-5 pt-12 pb-3 text-[#131A36]">
              {/* Status bar overlay */}
              <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-8 pt-3 pb-2 text-[13px] font-medium text-[#1a1a2e]">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <Wifi size={15} strokeWidth={2} />
                  <BatteryFull size={22} strokeWidth={1.5} />
                </div>
              </div>
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => setShowNavPanel(true)}
                  className="rounded-xl border border-[#e5e5ec] bg-white p-2 text-[#1a1a2e]"
                  aria-label="Open navigation menu"
                >
                  <PanelsTopLeft size={18} />
                </button>
                <div className="flex-1 text-center">
                  <p className="text-[14px] font-semibold text-[#1a1a2e]">{headerTitle}</p>
                  <p className="text-[11px] text-[#8b8b9e]">{selectedClass.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowNotificationsSheet(true)}
                    className="rounded-xl border border-[#e5e5ec] bg-white p-2 text-[#1a1a2e]"
                    aria-label="View notifications"
                  >
                    <Bell size={18} />
                  </button>
                  <button
                    onClick={() => setShowLeaderboardSheet(true)}
                    className="rounded-xl border border-[#e5e5ec] bg-white p-2 text-[#1a1a2e]"
                    aria-label="Open leaderboard"
                  >
                    <Trophy size={18} />
                  </button>
                </div>
              </div>
            </header>
          )}

          <main className="flex-1 overflow-y-auto px-5 py-5">{renderContent()}</main>

          {showLeaderboardSheet && (
            <div className="absolute inset-0 z-40 flex items-end justify-center rounded-[42px] overflow-hidden bg-black/45">
              <div className="w-full rounded-t-[28px] border border-[#E4E7FB] bg-[#FDFEFF] p-5 shadow-[0_-20px_40px_rgba(5,8,22,0.45)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-[#8B95BF]">Class leaderboard</p>
                    <h2 className="text-lg font-semibold text-[#0B1637]">Momentum</h2>
                  </div>
                  <button onClick={() => setShowLeaderboardSheet(false)} className="text-[#8B95BF]">✕</button>
                </div>
                <div className="mt-3 space-y-2">
                  {leaderboardSpotlight.map((entry, index) => (
                    <div
                      key={entry.name}
                      className="flex items-center gap-3 rounded-2xl border border-[#E4E7FB] bg-[#F8F9FF] px-3 py-2.5"
                    >
                      <div className="rounded-xl bg-[#222B55] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white">
                        #{index + 1}
                      </div>
                      <div className="flex-1 text-sm text-[#0B1637]">
                        <p className="font-semibold text-[13px]">{entry.name}</p>
                        <p className="text-[11px] text-[#7D89B7]">{entry.detail}</p>
                      </div>
                      <span className="text-[11px] font-semibold text-[#1BA37A]">{entry.trend}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {showNotificationsSheet && (
            <div className="absolute inset-0 z-40 flex items-end justify-center rounded-[42px] overflow-hidden bg-black/45">
              <div className="w-full rounded-t-[28px] border border-[#E4E7FB] bg-[#FDFEFF] p-5 shadow-[0_-20px_40px_rgba(5,8,22,0.45)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-[#8B95BF]">Notifications</p>
                    <h2 className="text-lg font-semibold text-[#0B1637]">Latest signals</h2>
                  </div>
                  <button onClick={() => setShowNotificationsSheet(false)} className="text-[#8B95BF]">✕</button>
                </div>
                <div className="mt-3 space-y-2">
                  {quickNotifications.map((note) => (
                    <div
                      key={note.id}
                      className={`flex gap-3 rounded-lg border-l-2 px-3 py-2.5 text-[13px] ${notificationToneStyles[note.tone]}`}
                    >
                      <div className="text-[9px] uppercase tracking-[0.3em] text-[#6A769E]">{note.label}</div>
                      <p className="flex-1 text-[#0B1738]">{note.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {showNavPanel && (
            <div className="absolute inset-0 z-40 flex rounded-[42px] overflow-hidden">
              <div className="w-3/4 max-w-[200px] bg-[#050915] text-white shadow-[20px_0_40px_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
                  <div className="flex items-center gap-2">
                    <PanelsTopLeft size={16} />
                    <span className="text-[12px] tracking-[0.3em] text-white/60">Menu</span>
                  </div>
                  <button onClick={() => setShowNavPanel(false)} className="text-white/60">
                    ✕
                  </button>
                </div>
                <div className="space-y-2 px-3 py-4 text-[13px]">
                  <button
                    onClick={handleReturnToMainView}
                    className="flex w-full items-center justify-between rounded-xl border border-white/10 px-3 py-2.5 text-left"
                  >
                    <span>Return to main view</span>
                    <ArrowRight size={12} />
                  </button>
                  <button className="flex w-full items-center justify-between rounded-xl border border-white/10 px-3 py-2.5 text-left">
                    <span className="flex items-center gap-2"><HelpCircle size={12} /> Help center</span>
                    <ArrowRight size={12} />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-between rounded-xl border border-red-300/30 px-3 py-2.5 text-left text-red-200"
                  >
                    <span>Logout</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
              <button className="flex-1 bg-black/40" onClick={() => setShowNavPanel(false)} aria-label="Close menu" />
            </div>
          )}

        {/* Bottom Navigation */}
        <nav className="z-10">
          <div className="flex h-14 items-center justify-around border-t border-[#e8e8f0] bg-white px-2 text-[#4A4F6B]">
            {(
              [
                { key: 'dashboard', label: 'Home', icon: Home },
                { key: 'duties', label: 'Duties', icon: ClipboardList },
                { key: 'events', label: 'Events', icon: Calendar },
                { key: 'assets', label: 'Assets', icon: Package },
                { key: 'funds', label: 'Funds', icon: Wallet },
                { key: 'profile', label: 'Profile', icon: UserCircle }
              ] as { key: Tab; label: string; icon: typeof Home }[]
            ).map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex flex-1 flex-col items-center gap-0.5 py-1.5 text-[11px] font-medium transition ${
                    isActive ? 'text-[#1a1a2e]' : 'text-[#8F95B2]'
                  }`}
                >
                  <tab.icon
                    size={20}
                    strokeWidth={isActive ? 2 : 1.5}
                    className={`${isActive ? 'text-[#1a1a2e]' : 'text-[#a0a0b0]'} transition`}
                  />
                  <span className="text-[9px] tracking-wide">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
      )}
    </StageScreen>
  );
}

type ClassSetupProps = {
  profile: UserProfile;
  classes: ClassSummary[];
  onSelect: (classInfo: ClassSummary) => void;
  onLogout: () => void;
};

type HeroScreenProps = {
  onEnter: () => void;
};

function HeroScreen({ onEnter }: HeroScreenProps) {
  return (
    <div className="relative flex min-h-[620px] flex-col items-center justify-between py-6 text-[#1a1a2e]">
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.4]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #d0d0d8 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }} />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(250,250,250,0.8)_70%,rgba(250,250,250,1)_100%)]" />
      </div>

      {/* Top spacer */}
      <div className="flex-1" />

      {/* Center content - Logo & Branding */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* App Icon */}
        <div className="relative mb-8">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[#1a1a2e] shadow-xl shadow-black/20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-11 w-11 text-white"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
              />
            </svg>
          </div>
        </div>

        {/* App name */}
        <h1 className="text-[34px] font-bold tracking-tight text-[#1a1a2e]">
          ClassPal
        </h1>
        <p className="mt-3 max-w-[260px] text-[15px] leading-relaxed text-[#6b6b80]">
          Your digital command center for seamless class operations
        </p>

        {/* Feature cards */}
        <div className="mt-10 grid grid-cols-2 gap-3 w-full">
          {[
            { label: 'Duties', desc: 'Track tasks', icon: '✓' },
            { label: 'Events', desc: 'RSVP & attend', icon: '📅' },
            { label: 'Funds', desc: 'Manage money', icon: '💰' },
            { label: 'Assets', desc: 'Borrow items', icon: '📦' }
          ].map((feature) => (
            <div
              key={feature.label}
              className="flex flex-col items-center rounded-2xl border border-[#e8e8f0] bg-white p-4 shadow-sm"
            >
              <span className="text-xl mb-1">{feature.icon}</span>
              <span className="text-[13px] font-semibold text-[#1a1a2e]">{feature.label}</span>
              <span className="text-[11px] text-[#8b8b9e]">{feature.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom content - CTA */}
      <div className="relative z-10 mt-auto w-full pt-10">
        <button
          onClick={onEnter}
          className="w-full rounded-2xl bg-[#1a1a2e] py-4 text-[15px] font-semibold text-white shadow-lg shadow-black/15 transition-all hover:bg-[#2a2a3e] active:scale-[0.98]"
        >
          Get Started
        </button>
        <p className="mt-4 text-center text-[12px] text-[#a0a0b0]">
          By continuing, you agree to our <span className="text-[#6b6b80]">Terms</span> & <span className="text-[#6b6b80]">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}

type StageScreenProps = {
  children: ReactNode;
  backgroundClass?: string;
  frameClass?: string;
  contentClass?: string;
  fullScreen?: boolean;
};

function StageScreen({
  children,
  backgroundClass = 'bg-[#fff]',
  frameClass = 'bg-white text-[#1a1a2e]',
  contentClass = '',
  fullScreen = false
}: StageScreenProps & { fullScreen?: boolean }) {
  return (
    <div className={`min-h-screen ${backgroundClass} flex items-start justify-center px-4 py-6`}>
      <div className="relative w-full max-w-sm rounded-[52px] border border-[#3a3a4a] bg-[#1a1a2e] p-3 shadow-2xl shadow-black/50">
        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-4 z-30 h-7 w-[100px] -translate-x-1/2 rounded-full bg-black" aria-hidden>
          <div className="absolute left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#2a2a3a]" />
        </div>
        <div className={`relative rounded-[42px] overflow-hidden ${frameClass}`}>
          <div className="flex min-h-[700px] flex-col">
            {/* Status bar - floating on top */}
            {!fullScreen && (
              <div className="relative z-10 flex items-center justify-between px-8 pt-4 pb-2 text-[13px] font-semibold text-current">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <Wifi size={15} strokeWidth={2} />
                  <BatteryFull size={22} strokeWidth={1.5} />
                </div>
              </div>
            )}
            <div className={`flex-1 ${fullScreen ? '' : 'overflow-y-auto'} ${contentClass}`}>{children}</div>
            {/* Android Navigation Bar - inside screen */}
            <div className="flex items-center justify-center gap-14 border-t border-[#e8e8f0] bg-[#fafafa] py-2" aria-hidden>
              <button className="flex h-5 w-5 items-center justify-center text-[#a0a0b0] hover:text-[#6b6b80]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
              </button>
              <button className="flex h-5 w-5 items-center justify-center text-[#a0a0b0] hover:text-[#6b6b80]">
                <div className="h-3.5 w-3.5 rounded-full border-[1.5px] border-current" />
              </button>
              <button className="flex h-5 w-5 items-center justify-center text-[#a0a0b0] hover:text-[#6b6b80]">
                <div className="h-3 w-3 rounded-[3px] border-[1.5px] border-current" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClassSetup({ profile, classes, onSelect, onLogout }: ClassSetupProps) {
  const [showFabMenu, setShowFabMenu] = useState(false);
  const [activeScreen, setActiveScreen] = useState<'main' | 'create' | 'join'>('main');
  const [newClassName, setNewClassName] = useState('');
  const [newClassAdvisor, setNewClassAdvisor] = useState('');
  const [newClassSchedule, setNewClassSchedule] = useState('');
  const [joinCode, setJoinCode] = useState('');

  const handleCreateClass = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newClassName.trim()) return;
    onSelect({
      id: newClassName.trim().toLowerCase().replace(/\s+/g, '-'),
      name: newClassName.trim(),
      advisor: newClassAdvisor.trim() || 'Advisor TBD',
      schedule: newClassSchedule.trim() || 'Schedule TBA'
    });
    setActiveScreen('main');
    setNewClassName('');
    setNewClassAdvisor('');
    setNewClassSchedule('');
  };

  const handleJoinViaCode = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!joinCode.trim()) return;
    const trimmed = joinCode.trim();
    const match = classes.find((classInfo) => classInfo.id.toLowerCase() === trimmed.toLowerCase());
    onSelect(
      match || {
        id: trimmed.toLowerCase(),
        name: `Class ${trimmed.toUpperCase()}`,
        advisor: 'Advisor TBD',
        schedule: 'Schedule TBA'
      }
    );
    setActiveScreen('main');
    setJoinCode('');
  };

  // Create Class Screen
  if (activeScreen === 'create') {
    return (
      <div className="flex min-h-[620px] flex-col text-[#1a1a2e]">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => setActiveScreen('main')}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e5ec] bg-white text-[#6b6b80]"
          >
            <ArrowRight size={18} className="rotate-180" />
          </button>
          <div>
            <h1 className="text-[20px] font-bold text-[#1a1a2e]">Create a class</h1>
            <p className="text-[12px] text-[#8b8b9e]">Set up your new classroom</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleCreateClass} className="flex flex-1 flex-col space-y-4">
          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-[#6b6b80]">Class name</label>
            <input
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              placeholder="e.g. CS101 · Intro to Programming"
              className="w-full rounded-xl border border-[#e5e5ec] bg-white px-4 py-3 text-[14px] placeholder:text-[#a0a0b0] focus:border-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/5"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-[#6b6b80]">Advisor / Teacher</label>
            <input
              value={newClassAdvisor}
              onChange={(e) => setNewClassAdvisor(e.target.value)}
              placeholder="Teacher name"
              className="w-full rounded-xl border border-[#e5e5ec] bg-white px-4 py-3 text-[14px] placeholder:text-[#a0a0b0] focus:border-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/5"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-[#6b6b80]">Schedule</label>
            <input
              value={newClassSchedule}
              onChange={(e) => setNewClassSchedule(e.target.value)}
              placeholder="e.g. Mon · 09:00 - 11:00"
              className="w-full rounded-xl border border-[#e5e5ec] bg-white px-4 py-3 text-[14px] placeholder:text-[#a0a0b0] focus:border-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/5"
            />
          </div>
          <div className="flex-1" />
          <button
            type="submit"
            className="w-full rounded-xl bg-[#1a1a2e] py-3.5 text-[14px] font-semibold text-white shadow-sm"
          >
            Create Class
          </button>
        </form>
      </div>
    );
  }

  // Join Class Screen
  if (activeScreen === 'join') {
    return (
      <div className="flex min-h-[620px] flex-col text-[#1a1a2e]">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => setActiveScreen('main')}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e5ec] bg-white text-[#6b6b80]"
          >
            <ArrowRight size={18} className="rotate-180" />
          </button>
          <div>
            <h1 className="text-[20px] font-bold text-[#1a1a2e]">Join a class</h1>
            <p className="text-[12px] text-[#8b8b9e]">Enter code or scan QR</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleJoinViaCode} className="flex flex-1 flex-col space-y-4">
          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-[#6b6b80]">Class code</label>
            <input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              placeholder="Enter class code (e.g. CS101)"
              className="w-full rounded-xl border border-[#e5e5ec] bg-white px-4 py-3 text-[14px] placeholder:text-[#a0a0b0] focus:border-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/5"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#1a1a2e] py-3.5 text-[14px] font-semibold text-white shadow-sm"
          >
            Join Class
          </button>

          <div className="flex items-center gap-4 py-2">
            <div className="h-px flex-1 bg-[#e5e5ec]" />
            <span className="text-[12px] text-[#a0a0b0]">or</span>
            <div className="h-px flex-1 bg-[#e5e5ec]" />
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#e5e5ec] bg-white py-3.5 text-[14px] font-medium text-[#1a1a2e]"
          >
            <QrCode size={18} />
            Scan QR Code
          </button>
        </form>
      </div>
    );
  }

  // Main View
  return (
    <div className="relative flex min-h-[620px] flex-col text-[#1a1a2e]">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#8b8b9e]">Welcome back,</p>
            <h1 className="text-[24px] font-bold tracking-tight">{profile.displayName.split(' ')[0]}</h1>
          </div>
          <button
            onClick={onLogout}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e5ec] bg-white text-[#e53e3e]"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Classes section */}
      <div className="flex-1">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#8b8b9e]">Your classes</p>
        <div className="space-y-3">
          {classes.map((classInfo, index) => {
            const accentColors = ['bg-[#1a1a2e]', 'bg-[#10b981]', 'bg-[#f59e0b]'];
            return (
              <button
                key={classInfo.id}
                onClick={() => onSelect(classInfo)}
                className="group relative w-full overflow-hidden rounded-2xl border border-[#e8e8f0] bg-white p-4 text-left shadow-sm transition-all hover:shadow-md active:scale-[0.99]"
              >
                {/* Card accent */}
                <div className={`absolute left-0 top-0 h-full w-1 ${accentColors[index % 3]}`} />
                <div className="flex items-start justify-between gap-3 pl-3">
                  <div className="flex-1">
                    <p className="text-[15px] font-semibold text-[#1a1a2e]">{classInfo.name}</p>
                    <p className="mt-0.5 text-[12px] text-[#6b6b80]">{classInfo.advisor}</p>
                  </div>
                  <div className="rounded-lg bg-[#f5f5f7] px-2.5 py-1 text-[11px] font-medium text-[#4a4a5a]">
                    {classInfo.schedule.split(' ')[0]}
                  </div>
                </div>
                <div className="mt-2.5 flex items-center gap-2 pl-3 text-[11px] text-[#a0a0b0]">
                  <Calendar size={12} />
                  <span>{classInfo.schedule}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="absolute bottom-4 right-0 z-20">
        {/* FAB Menu */}
        {showFabMenu && (
          <div className="absolute bottom-14 right-0 mb-2 space-y-2">
            <button
              onClick={() => {
                setShowFabMenu(false);
                setActiveScreen('create');
              }}
              className="flex items-center gap-3 rounded-xl border border-[#e5e5ec] bg-white py-2.5 pl-3 pr-4 text-[13px] font-medium text-[#1a1a2e] shadow-lg"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1a1a2e]">
                <Plus size={14} className="text-white" />
              </div>
              New Class
            </button>
            <button
              onClick={() => {
                setShowFabMenu(false);
                setActiveScreen('join');
              }}
              className="flex items-center gap-3 rounded-xl border border-[#e5e5ec] bg-white py-2.5 pl-3 pr-4 text-[13px] font-medium text-[#1a1a2e] shadow-lg"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1a1a2e]">
                <QrCode size={14} className="text-white" />
              </div>
              Join Class
            </button>
          </div>
        )}

        {/* FAB Button */}
        <button
          onClick={() => setShowFabMenu(!showFabMenu)}
          className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-lg transition-all ${
            showFabMenu
              ? 'bg-[#6b6b80] rotate-45'
              : 'bg-[#1a1a2e]'
          }`}
        >
          <Plus size={22} className="text-white" />
        </button>
      </div>

      {/* Overlay when FAB menu is open */}
      {showFabMenu && (
        <div
          className="fixed inset-0 z-10 bg-black/10"
          onClick={() => setShowFabMenu(false)}
        />
      )}
    </div>
  );
}
