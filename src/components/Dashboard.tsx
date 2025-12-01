import { Bell, ArrowUpRight, MessageCircle, Activity } from 'lucide-react';

type AccentTone = 'primary' | 'aqua' | 'blush';

interface DashboardProps {
  userName: string;
  classTitle: string;
  onNavigateToEvents?: () => void;
}

export default function Dashboard({ userName, classTitle, onNavigateToEvents }: DashboardProps) {
  const quickStats: {
    title: string;
    badge: string;
    detail: string;
    accent: AccentTone;
  }[] = [
    {
      title: 'Approvals',
      badge: '3 pending',
      detail: 'Funds · Duty board',
      accent: 'primary'
    },
    {
      title: 'Duty window',
      badge: 'Next · 14:00',
      detail: 'Clean studio boards',
      accent: 'aqua'
    },
    {
      title: 'Attendance pulse',
      badge: '68 RSVPs',
      detail: 'AI in Edu Forum',
      accent: 'blush'
    }
  ];

  const notifications = [
    { label: 'Proof needed', meta: 'Duty · 08:40' },
    { label: 'Budget approval', meta: 'Funds · 09:15' },
    { label: 'Event reminder', meta: 'Events · 11:00' }
  ];

  const recentActivities = [
    { title: 'Sarah uploaded proof', meta: 'Board cleaned · +10 pts' },
    { title: '₫1,200,000 collected', meta: 'Fund top-up · Batch B' },
    { title: 'Assets synced', meta: 'Remote returned · 09:55' },
    { title: 'Event RSVPs', meta: 'Workshop seats at 80%' }
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-[#E3E9FF] bg-white px-5 py-5 shadow-[0_15px_35px_rgba(151,168,226,0.2)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#8B95BF]">Today · {classTitle}</p>
            <h1 className="text-2xl font-semibold text-[#0E1B3D]">Welcome back, {userName}</h1>
          </div>
          <button className="relative rounded-2xl border border-[#E0E7FF] p-3 text-[#5B678C]">
            <Bell size={18} />
            <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-[#FF8DA1] text-[10px] text-white">
              3
            </span>
          </button>
        </div>
        <div className="mt-4 flex snap-x gap-3 overflow-x-auto pb-2">
          {quickStats.map((stat) => (
            <div
              key={stat.title}
              className={`min-w-[220px] snap-start rounded-2xl px-4 py-4 text-white shadow-[0_10px_25px_rgba(63,115,255,0.25)] ${getAccent(stat.accent)}`}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">{stat.title}</p>
              <p className="mt-3 text-xl font-semibold">{stat.badge}</p>
              <p className="text-sm text-white/80">{stat.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-[#E3E9FF] bg-white px-5 py-5 shadow-[0_12px_30px_rgba(151,168,226,0.18)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#9AA3C7]">Mission controls</p>
            <h2 className="text-lg font-semibold text-[#0E1B3D]">Act within 2 taps</h2>
          </div>
          <button
            onClick={onNavigateToEvents}
            className="flex items-center gap-1 rounded-2xl border border-[#E0E7FF] px-3 py-2 text-xs font-semibold text-[#3F73FF]"
          >
            Go to events <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-[#0E1B3D]">
          <CardAction title="Submit duty" subtitle="Capture + proof" icon={<MessageCircle size={18} />} accent="primary" />
          <CardAction title="Ping members" subtitle="3 reminders" icon={<Activity size={18} />} accent="aqua" />
          <CardAction title="Fund ledger" subtitle="₫5M balance" icon={<MessageCircle size={18} />} accent="blush" />
          <CardAction title="Assets board" subtitle="2 items in use" icon={<Activity size={18} />} accent="primary" />
        </div>
      </section>

      <section className="rounded-3xl border border-[#E3E9FF] bg-white px-5 py-5 shadow-[0_10px_25px_rgba(151,168,226,0.15)]">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#9AA3C7]">Realtime feed</p>
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
          {notifications.map((note) => (
            <div key={note.label} className="min-w-[180px] rounded-2xl border border-[#E0E7FF] bg-[#F9FAFF] px-4 py-3">
              <p className="text-sm font-semibold text-[#0E1B3D]">{note.label}</p>
              <p className="text-xs text-[#8B95BF]">{note.meta}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {recentActivities.map((activity) => (
            <div key={activity.title} className="rounded-2xl border border-[#E0E7FF] px-4 py-3 text-left">
              <p className="text-sm font-semibold text-[#0E1B3D]">{activity.title}</p>
              <p className="text-xs text-[#8B95BF]">{activity.meta}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CardAction({
  title,
  subtitle,
  icon,
  accent
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accent: AccentTone;
}) {
  return (
    <button className="flex flex-col gap-2 rounded-2xl border border-[#E0E7FF] px-4 py-4 text-left transition hover:shadow-[0_12px_30px_rgba(63,115,255,0.15)]">
      <div className={`flex size-9 items-center justify-center rounded-2xl text-white ${getAccent(accent)}`}>{icon}</div>
      <p className="font-semibold text-[#0E1B3D]">{title}</p>
      <p className="text-xs text-[#8B95BF]">{subtitle}</p>
    </button>
  );
}

function getAccent(tone: AccentTone) {
  const map = {
    primary: 'bg-linear-to-r from-[#2B3FD6] to-[#3F73FF]',
    aqua: 'bg-linear-to-r from-[#2DA1FF] to-[#7DE2FF]',
    blush: 'bg-linear-to-r from-[#FF6A88] to-[#FF8DA1]'
  } as const;
  return map[tone];
}
