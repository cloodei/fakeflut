import { useState } from 'react';
import {
  Home,
  ClipboardList,
  Package,
  Wallet,
  Calendar,
  HelpCircle,
  LogOut,
  PanelsTopLeft,
  QrCode,
  Plus,
  Signal,
  Wifi,
  BatteryFull,
  UserCircle
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import DutyRoster from './components/DutyRoster';
import Assets from './components/Assets';
import Funds from './components/Funds';
import Events from './components/Events';
import AuthScreen from './components/AuthScreen';
import Profile from './components/Profile';

type Stage = 'auth' | 'setup' | 'app';
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

export default function App() {
  const [stage, setStage] = useState<Stage>('auth');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedClass, setSelectedClass] = useState<ClassSummary | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [showClassSheet, setShowClassSheet] = useState(false);
  const [showNavPanel, setShowNavPanel] = useState(false);

  const handleLogout = () => {
    setStage('auth');
    setProfile(null);
    setSelectedClass(null);
    setActiveTab('dashboard');
    setShowClassSheet(false);
    setShowNavPanel(false);
  };

  const handleReturnToMainView = () => {
    setStage('setup');
    setShowNavPanel(false);
  };

  if (stage === 'auth') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F8FBFF] via-[#EDF1FF] to-[#E2ECFF]">
        <AuthScreen
          onAuth={(userProfile) => {
            setProfile(userProfile);
            setStage('setup');
          }}
        />
      </div>
    );
  }

  if (stage === 'setup' || !selectedClass || !profile) {
    return (
      <ClassSetup
        profile={profile!}
        classes={classCatalog}
        onSelect={(classInfo) => {
          setSelectedClass(classInfo);
          setStage('app');
        }}
        onLogout={handleLogout}
      />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            userName={profile.displayName}
            classTitle={selectedClass.name}
            onNavigateToEvents={() => setActiveTab('events')}
          />
        );
      case 'duties':
        return <DutyRoster className={selectedClass.name} />;
      case 'events':
        return <Events className={selectedClass.name} />;
      case 'assets':
        return <Assets className={selectedClass.name} />;
      case 'funds':
        return <Funds />;
      case 'profile':
        return <Profile userName={profile.displayName} onLogout={handleLogout} onBack={() => setActiveTab('dashboard')} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#01040E] via-[#050B17] to-[#0E1633] px-4 py-6 text-[#0E1B3D]">
      <div className="mx-auto w-full max-w-sm">
        <div className="relative overflow-hidden rounded-[44px] border border-white/5 bg-[#F5F7FF] pb-28 shadow-[0_35px_80px_rgba(4,8,18,0.65)]">
          <header className="rounded-t-[44px] bg-linear-to-b from-[#1B2C66] via-[#122456] to-[#070E26] px-6 pt-6 pb-5 text-white">
            <div className="flex items-center justify-between text-[13px] font-semibold tracking-wide">
              <span>12:45</span>
              <div className="flex items-center gap-2 text-white/75">
                <Signal size={16} />
                <Wifi size={16} />
                <BatteryFull size={18} />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/60">Ops Orbit</p>
                <h1 className="text-2xl font-semibold leading-tight">{selectedClass.name}</h1>
                <p className="text-sm text-white/70">{selectedClass.schedule}</p>
              </div>
              <div className="flex flex-col items-end text-xs text-white/70">
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/50">Monitor</span>
                <span className="text-sm font-semibold">{profile.displayName}</span>
                <span className="text-[11px] text-white/60">ID · {profile.studentId}</span>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3 text-xs">
              <button
                onClick={() => setShowNavPanel(true)}
                className="flex items-center gap-2 rounded-[22px] border border-white/25 bg-white/10 px-3 py-2 font-semibold"
              >
                <PanelsTopLeft size={16} /> Menu
              </button>
              <button
                onClick={() => setShowClassSheet((prev) => !prev)}
                className="flex flex-1 items-center justify-center gap-2 rounded-[22px] border border-white/25 bg-white/10 px-3 py-2 font-semibold tracking-[0.2em]"
              >
                <Calendar size={16} /> Classes
              </button>
              <div className="rounded-full border border-white/20 px-3 py-2 text-[10px] uppercase tracking-[0.35em]">CP</div>
            </div>
          </header>

          {showClassSheet && (
            <div className="px-5">
              <div className="-mt-4 space-y-3 rounded-3xl border border-[#E0E6FA] bg-white/95 px-4 py-4 shadow-[0_18px_35px_rgba(21,34,84,0.18)]">
                <div className="flex items-center justify-between text-xs text-[#6B7AA8]">
                  <span>Choose cockpit</span>
                  <button onClick={() => setShowClassSheet(false)} className="text-[#2E58FF] text-xs font-semibold">
                    Close
                  </button>
                </div>
                {classCatalog.map((classInfo) => (
                  <button
                    key={classInfo.id}
                    onClick={() => {
                      setSelectedClass(classInfo);
                      setShowClassSheet(false);
                    }}
                    className={`flex w-full flex-col rounded-2xl border px-4 py-3 text-left transition ${
                      classInfo.id === selectedClass.id
                        ? 'border-[#2E58FF] bg-[#EEF2FF] shadow-[0_10px_25px_rgba(46,88,255,0.15)]'
                        : 'border-[#E3E8F9] hover:border-[#2E58FF]'
                    }`}
                  >
                    <span className="text-sm font-semibold">{classInfo.name}</span>
                    <span className="text-xs text-[#8B95BF]">{classInfo.schedule}</span>
                  </button>
                ))}
                <div className="grid grid-cols-2 gap-3 border-t border-[#EEF1FF] pt-4 text-sm">
                  <button className="flex items-center justify-center gap-2 rounded-2xl border border-[#E0E7FF] px-3 py-2 text-[#6B7AA8]">
                    <HelpCircle size={16} /> Help
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-[#FFD8E1] bg-[#FFF4F6] px-3 py-2 text-[#DC4F68]"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            </div>
          )}

          <main className="space-y-5 px-5 py-6">
            <section className="rounded-3xl border border-[#E0E6FA] bg-white/95 px-5 py-4 shadow-[0_18px_40px_rgba(25,40,89,0.08)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-[#8B95BF]">Advisor</p>
                  <p className="text-sm font-semibold text-[#0E1B3D]">{selectedClass.advisor}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-[#8B95BF]">Next window</p>
                  <p className="text-sm font-semibold text-[#0E1B3D]">07:30 · Monday</p>
                </div>
              </div>
              <div className="mt-4 flex gap-3 text-xs text-[#7482AF]">
                <span className="rounded-full bg-[#EEF1FF] px-3 py-1">Galaxy Sync</span>
                <span className="rounded-full bg-[#EEF1FF] px-3 py-1">Attendance</span>
                <span className="rounded-full bg-[#EEF1FF] px-3 py-1">Funds</span>
              </div>
            </section>

            {renderContent()}
          </main>

          <nav className="absolute inset-x-6 bottom-6">
            <div className="flex items-center gap-2 rounded-[30px] bg-[#0B1330] px-2 py-2 text-white shadow-[0_12px_30px_rgba(5,9,20,0.45)]">
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
                    className={`flex flex-1 flex-col items-center gap-1 rounded-[24px] px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
                      isActive ? 'bg-white/10 text-white' : 'text-white/50'
                    }`}
                  >
                    <tab.icon size={18} className={isActive ? 'text-white' : 'text-white/60'} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

type ClassSetupProps = {
  profile: UserProfile;
  classes: ClassSummary[];
  onSelect: (classInfo: ClassSummary) => void;
  onLogout: () => void;
};

function ClassSetup({ profile, classes, onSelect, onLogout }: ClassSetupProps) {
  const [showClassModal, setShowClassModal] = useState(false);
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
    setShowClassModal(false);
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
    setShowClassModal(false);
    setJoinCode('');
  };

  return (
    <div className="min-h-screen bg-[#020714] px-4 py-6 text-[#0B1637]">
      <div className="mx-auto w-full max-w-sm">
        <div className="overflow-hidden rounded-[42px] border border-white/5 bg-[#F5F7FF] shadow-[0_35px_70px_rgba(3,7,18,0.65)]">
          <div className="rounded-t-[42px] border-b border-white/10 bg-[#050C24] px-6 pt-6 pb-8 text-white">
            <div className="flex items-center justify-between text-[13px] font-semibold tracking-wide">
              <span>12:45</span>
              <div className="flex items-center gap-2 text-white/75">
                <Signal size={16} />
                <Wifi size={16} />
                <BatteryFull size={18} />
              </div>
            </div>
            <div className="mt-8 space-y-1">
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/60">ClassPal Setup</p>
              <h1 className="text-3xl font-semibold leading-tight">Choose a class cockpit</h1>
              <p className="text-sm text-white/70">Signed in as {profile.displayName}</p>
            </div>
          </div>

          <div className="space-y-5 px-5 py-6">
            <section className="rounded-[28px] border border-[#E4E7FB] bg-white px-4 py-4 shadow-[0_12px_28px_rgba(13,23,66,0.08)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-[#8B95BF]">Student ID</p>
                  <p className="text-lg font-semibold text-[#0B1637]">{profile.studentId}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="rounded-[18px] border border-[#E0E3F5] px-3 py-2 text-xs font-semibold text-[#5B678C]"
                >
                  Logout
                </button>
              </div>
            </section>

            <section className="space-y-3">
              {classes.map((classInfo) => (
                <button
                  key={classInfo.id}
                  onClick={() => onSelect(classInfo)}
                  className="w-full rounded-[28px] border border-[#E4E7FB] bg-white px-4 py-4 text-left shadow-[0_12px_26px_rgba(15,25,64,0.08)] hover:border-[#2F3E9E]"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-[#8B95BF]">Joined class</p>
                  <p className="text-lg font-semibold text-[#0B1637]">{classInfo.name}</p>
                  <p className="text-sm text-[#6B769E]">Advisor · {classInfo.advisor}</p>
                  <p className="text-xs text-[#6B769E]">{classInfo.schedule}</p>
                </button>
              ))}
              <button
                onClick={() => setShowClassModal(true)}
                className="flex w-full items-center justify-center gap-2 rounded-[28px] border border-dashed border-[#BAC4EA] bg-[#F6F8FF] px-4 py-4 text-sm font-semibold text-[#2F3E9E]"
              >
                <Plus size={16} /> New / Join class
              </button>
            </section>
          </div>
        </div>
      </div>

      {showClassModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 px-4 pb-4">
          <div className="w-full max-w-sm rounded-t-[36px] border border-[#E4E7FB] bg-[#FDFEFF] p-6 shadow-[0_-24px_45px_rgba(3,7,18,0.45)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-[#8B95BF]">Class actions</p>
                <h2 className="text-xl font-semibold text-[#0B1637]">Create or join</h2>
              </div>
              <button onClick={() => setShowClassModal(false)} className="text-[#8B95BF]">✕</button>
            </div>

            <form onSubmit={handleCreateClass} className="mt-4 space-y-3 rounded-2xl border border-[#E4E7FB] bg-white px-4 py-4">
              <p className="text-xs uppercase tracking-[0.3em] text-[#8B95BF]">New class</p>
              <input
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                placeholder="Class name"
                className="w-full rounded-2xl border border-[#E4E7FB] px-3 py-2 text-sm focus:border-[#2F3E9E] focus:outline-none"
              />
              <input
                value={newClassAdvisor}
                onChange={(e) => setNewClassAdvisor(e.target.value)}
                placeholder="Advisor"
                className="w-full rounded-2xl border border-[#E4E7FB] px-3 py-2 text-sm focus:border-[#2F3E9E] focus:outline-none"
              />
              <input
                value={newClassSchedule}
                onChange={(e) => setNewClassSchedule(e.target.value)}
                placeholder="Schedule"
                className="w-full rounded-2xl border border-[#E4E7FB] px-3 py-2 text-sm focus:border-[#2F3E9E] focus:outline-none"
              />
              <button
                type="submit"
                className="w-full rounded-2xl bg-[#2F3E9E] py-2.5 text-sm font-semibold uppercase tracking-[0.3em] text-white"
              >
                Launch class
              </button>
            </form>

            <form onSubmit={handleJoinViaCode} className="mt-5 space-y-3 rounded-2xl border border-[#E4E7FB] bg-white px-4 py-4">
              <p className="text-xs uppercase tracking-[0.3em] text-[#8B95BF]">Join with code</p>
              <div className="flex gap-2">
                <input
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  placeholder="e.g. CS101"
                  className="flex-1 rounded-2xl border border-[#E4E7FB] px-3 py-2 text-sm focus:border-[#2F3E9E] focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-2xl bg-[#1BA37A] px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white"
                >
                  Join
                </button>
              </div>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[#BAC4EA] bg-[#F6F8FF] px-4 py-3 text-sm font-semibold text-[#2F3E9E]"
              >
                <QrCode size={18} /> Scan QR invite
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
