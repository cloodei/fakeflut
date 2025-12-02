import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Info,
  ArrowUpRight,
  Camera,
  CalendarDays,
  Zap
} from 'lucide-react';

type NotificationTone = 'alert' | 'info' | 'success';

interface DashboardProps {
  userName: string;
  classTitle: string;
  onNavigateToEvents?: () => void;
}

export default function Dashboard({ userName, classTitle, onNavigateToEvents }: DashboardProps) {
  const notifications = [
    {
      id: 1,
      type: 'alert' as NotificationTone,
      title: 'Upload proof for Lab Clean-up',
      detail: 'Due in 45 mins · Camera ready',
      chip: 'Duties'
    },
    {
      id: 2,
      type: 'info' as NotificationTone,
      title: 'AI Forum join rate at 82%',
      detail: '18 have not responded yet',
      chip: 'Events'
    },
    {
      id: 3,
      type: 'success' as NotificationTone,
      title: '₫1.2M reimbursed to funds',
      detail: 'Receipt verified by advisor',
      chip: 'Funds'
    }
  ];

  const recentGrid = [
    { label: 'Duty proof approved', meta: 'Whiteboard sterilized', tag: '+10 pts' },
    { label: 'VR kit returned', meta: 'Asset board updated', tag: 'Assets' },
    { label: 'Attendance synced', meta: 'AI Forum 68 RSVPs', tag: 'Events' },
    { label: 'New duty drafted', meta: 'Floor sweep · Friday', tag: 'Duties' }
  ];

  const quickActions = [
    {
      title: 'Submit duty proof',
      subtitle: 'Camera + gallery',
      icon: <Camera size={16} />
    },
    {
      title: 'Ping non-responders',
      subtitle: '18 reminders pending',
      icon: <Zap size={16} />,
      onClick: onNavigateToEvents
    },
    {
      title: 'Schedule briefing',
      subtitle: 'Calendar sync',
      icon: <CalendarDays size={16} />
    }
  ];

  return (
    <div className="space-y-5">
      <section className="rounded-[32px] border border-[#CBD5FF] bg-linear-to-br from-white to-[#EEF2FF] px-5 py-5 shadow-[0_20px_40px_rgba(3,7,18,0.08)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#7A86B6]">Class view · {classTitle}</p>
            <h1 className="text-2xl font-semibold text-[#0B1532]">Hi {userName}, all ops synced.</h1>
            <p className="text-sm text-[#5C678C]">Keep duties, events, and funds within two taps.</p>
          </div>
          <button className="relative rounded-2xl border border-[#E1E6FF] bg-white/80 p-3 text-[#55608A]">
            <Bell size={18} />
            <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-[#FFB347] text-[10px] font-semibold text-[#0B1532]">
              3
            </span>
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {notifications.map((note) => (
            <div
              key={note.id}
              className={`flex items-start gap-3 rounded-3xl border px-4 py-3 text-sm ${toneStyles[note.type]}`}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.3em]">{note.chip}</span>
              <div className="flex-1">
                <p className="font-semibold">{note.title}</p>
                <p className="text-xs opacity-80">{note.detail}</p>
              </div>
              {note.type === 'alert' && <AlertTriangle size={16} />}
              {note.type === 'info' && <Info size={16} />}
              {note.type === 'success' && <CheckCircle2 size={16} />}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-[#CBD5FF] bg-white px-5 py-5 shadow-[0_18px_32px_rgba(3,7,18,0.08)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#7A86B6]">Recent activity</p>
            <h2 className="text-lg font-semibold text-[#0B1532]">Catch-up grid</h2>
          </div>
          <button
            onClick={onNavigateToEvents}
            className="flex items-center gap-1 rounded-2xl border border-[#E1E6FF] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#2F3E9E]"
          >
            Events <ArrowUpRight size={12} />
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {recentGrid.map((item) => (
            <div key={item.label} className="rounded-2xl border border-[#E4E7FB] bg-[#F8F9FF] px-3 py-3">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#96A1C8]">{item.tag}</p>
              <p className="text-sm font-semibold text-[#0B1532]">{item.label}</p>
              <p className="text-xs text-[#6A769E]">{item.meta}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-[#CBD5FF] bg-[#F8F9FF] px-5 py-5 shadow-[0_18px_32px_rgba(3,7,18,0.08)]">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#7A86B6]">Action hub</p>
        <div className="mt-4 space-y-3">
          {quickActions.map((action) => (
            <button
              key={action.title}
              onClick={action.onClick}
              className="flex items-center gap-3 rounded-3xl border border-[#E4E7FB] bg-white px-4 py-3 text-left text-sm font-semibold text-[#0B1532] hover:border-[#2F3E9E]"
            >
              <div className="flex size-10 items-center justify-center rounded-2xl bg-[#EEF1FF] text-[#2F3E9E]">{action.icon}</div>
              <div className="flex-1">
                <p>{action.title}</p>
                <p className="text-xs text-[#6A769E]">{action.subtitle}</p>
              </div>
              <ArrowUpRight size={16} className="text-[#A4AED4]" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
const toneStyles: Record<NotificationTone, string> = {
  alert: 'border-[#FFD1AF] bg-[#FFF7EF] text-[#7A3E11]',
  info: 'border-[#D8E1FF] bg-[#EEF2FF] text-[#1E2F6F]',
  success: 'border-[#C2EBDC] bg-[#F1FBF7] text-[#0F3A2B]'
};
