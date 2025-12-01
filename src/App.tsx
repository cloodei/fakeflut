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
  Plus
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import DutyRoster from './components/DutyRoster';
import Assets from './components/Assets';
import Funds from './components/Funds';
import Events from './components/Events';
import AuthScreen from './components/AuthScreen';

type Stage = 'auth' | 'setup' | 'app';
type Tab = 'dashboard' | 'duties' | 'events' | 'assets' | 'funds';

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

  const handleLogout = () => {
    setStage('auth');
    setProfile(null);
    setSelectedClass(null);
    setActiveTab('dashboard');
    setShowClassSheet(false);
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
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FBFF] via-[#F2F6FF] to-[#ECF2FF] text-[#0E1B3D]">
      <div className="mx-auto max-w-md space-y-6 px-5 pb-32 pt-6">
        <header className="sticky top-0 z-40">
          <div
            className="relative overflow-hidden rounded-3xl border border-white/40 px-4 py-4 text-white shadow-[0_18px_45px_rgba(28,49,112,0.35)]"
            style={{ background: 'linear-gradient(135deg, #1A2450 0%, #25356A 55%, #3F73FF 100%)' }}
          >
            <div className="absolute inset-0 opacity-50" style={{ background: 'radial-gradient(circle at 20% 0%, rgba(255,255,255,0.45), transparent 55%)' }} />
            <div className="relative flex items-center justify-between">
              <button
                onClick={() => setShowClassSheet((prev) => !prev)}
                className="flex items-center gap-2 rounded-2xl bg-white/15 px-3 py-2 text-[11px] uppercase tracking-[0.3em]"
              >
                <PanelsTopLeft size={16} />
                View
              </button>
              <div className="text-center">
                <p className="text-[11px] uppercase tracking-[0.5em] text-white/70">ClassPal</p>
                <p className="text-lg font-semibold">Ops Center</p>
              </div>
              <div className="rounded-full border border-white/30 px-3 py-2 text-[11px] uppercase tracking-[0.4em]">
                CP
              </div>
            </div>
          </div>

          {showClassSheet && (
            <div className="mt-3 space-y-2 rounded-3xl border border-[#E3E9FF] bg-white/95 px-4 py-4 shadow-[0_18px_35px_rgba(119,138,194,0.15)]">
              <div className="flex items-center justify-between text-xs text-[#6B7AA8]">
                <span>Switch class</span>
                <button onClick={() => setShowClassSheet(false)} className="text-[#3F73FF] text-xs font-semibold">
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
                  className={`flex w-full flex-col rounded-2xl border px-4 py-3 text-left ${
                    classInfo.id === selectedClass.id
                      ? 'border-[#3F73FF] bg-white shadow-[0_12px_25px_rgba(63,115,255,0.12)]'
                      : 'border-[#E0E7FF] hover:border-[#3F73FF]'
                  }`}
                >
                  <span className="text-sm font-semibold">{classInfo.name}</span>
                  <span className="text-xs text-[#8B95BF]">{classInfo.schedule}</span>
                </button>
              ))}
              <div className="grid grid-cols-2 gap-3 border-t border-[#EEF2FF] pt-4 text-sm">
                <button className="flex items-center justify-center gap-2 rounded-2xl border border-[#E0E7FF] px-3 py-2 text-[#6B7AA8]">
                  <HelpCircle size={16} /> Help Center
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-[#FFE1E8] bg-[#FFF5F8] px-3 py-2 text-[#E05264]"
                >
                  <LogOut size={16} /> Sign out
                </button>
              </div>
            </div>
          )}
        </header>

        <main className="space-y-6">
          <section className="rounded-3xl border border-[#E3E9FF] bg-white px-5 py-5 shadow-[0_14px_40px_rgba(150,165,212,0.2)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#9AA3C7]">Current class</p>
                <p className="text-base font-semibold">{selectedClass.name}</p>
                <p className="text-xs text-[#8B95BF]">{selectedClass.schedule}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#9AA3C7]">Monitor</p>
                <p className="text-base font-semibold">{profile.displayName}</p>
                <p className="text-xs text-[#8B95BF]">ID · {profile.studentId}</p>
              </div>
            </div>
          </section>

          {renderContent()}
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[#E0E7FF] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-md items-center justify-between px-6 py-3">
          {(
            [
              { key: 'dashboard', label: 'Dashboard', icon: Home },
              { key: 'duties', label: 'Duties', icon: ClipboardList },
              { key: 'events', label: 'Events', icon: Calendar },
              { key: 'assets', label: 'Assets', icon: Package },
              { key: 'funds', label: 'Funds', icon: Wallet }
            ] as { key: Tab; label: string; icon: typeof Home }[]
          ).map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex flex-1 flex-col items-center gap-1 rounded-2xl px-3 py-1.5 text-[11px] font-semibold transition-all ${
                  isActive ? 'text-[#2954C5]' : 'text-[#96A2C2]'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-x-3 top-0 h-7 rounded-2xl bg-[#E9F0FF]" aria-hidden />
                )}
                <span className="relative flex flex-col items-center">
                  <tab.icon size={20} className={`${isActive ? 'text-[#2954C5]' : 'text-[#BAC3DE]'}`} />
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </nav>
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
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FBFF] via-[#EDF1FF] to-[#E2ECFF] px-5 py-8 text-[#0E1B3D]">
      <div className="mx-auto flex max-w-md flex-col gap-5">
        <section className="rounded-3xl border border-[#E3E9FF] bg-white px-5 py-6 shadow-[0_18px_45px_rgba(141,167,232,0.15)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#9AA3C7]">Signed in as</p>
              <h2 className="text-xl font-semibold">{profile.displayName}</h2>
              <p className="text-sm text-[#8B95BF]">Student ID · {profile.studentId}</p>
            </div>
            <button
              onClick={onLogout}
              className="rounded-2xl border border-[#E0E7FF] px-4 py-2 text-sm text-[#6B7AA8]"
            >
              Sign out
            </button>
          </div>
        </section>

        <section className="rounded-3xl border border-[#E3E9FF] bg-white px-5 py-6 shadow-[0_18px_45px_rgba(141,167,232,0.15)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#9AA3C7]">My classes</p>
              <h3 className="text-lg font-semibold">Choose a cockpit</h3>
            </div>
            <button className="rounded-2xl border border-[#E0E7FF] px-3 py-2 text-xs font-semibold text-[#3F73FF]">
              <Plus size={16} /> New
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {classes.map((classInfo) => (
              <button
                key={classInfo.id}
                onClick={() => onSelect(classInfo)}
                className="w-full rounded-2xl border border-[#E0E7FF] px-4 py-3 text-left hover:border-[#3F73FF]"
              >
                <p className="text-sm font-semibold">{classInfo.name}</p>
                <p className="text-xs text-[#8B95BF]">Advisor · {classInfo.advisor}</p>
                <p className="text-xs text-[#8B95BF]">{classInfo.schedule}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-dashed border-[#C7D4FF] bg-[#F5F7FF] px-5 py-6 shadow-[0_12px_35px_rgba(146,168,227,0.2)]">
          <p className="text-sm font-semibold">Join with class code</p>
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              placeholder="e.g. CS101-2025"
              className="flex-1 rounded-2xl border border-[#E0E7FF] bg-white px-4 py-3 text-sm placeholder:text-[#B4BED5] focus:border-[#3F73FF] focus:outline-none"
            />
            <button className="rounded-2xl bg-[#3F73FF] px-4 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(63,115,255,0.25)]">
              Join
            </button>
          </div>
          <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#E0E7FF] bg-white py-3 text-sm text-[#3F73FF]">
            <QrCode size={18} /> Scan QR invite
          </button>
        </section>
      </div>
    </div>
  );
}
