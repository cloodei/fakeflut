import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';

type NotificationTone = 'alert' | 'info' | 'success';

interface DashboardProps {
  userName: string;
  classTitle: string;
}

export default function Dashboard({ userName: _, classTitle }: DashboardProps) {
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

  const leaderboard = [
    { name: 'Sarah L.', points: 450, chip: 'Lead', detail: '8 duties cleared' },
    { name: 'John S.', points: 380, chip: 'Focus', detail: '5 audits logged' },
    { name: 'You', points: 320, chip: 'Assist', detail: '3 quick assists' }
  ];

  const recentActivities = [
    { label: 'Duty', detail: 'Proof approved · Whiteboard sterilized', tone: 'info' as NotificationTone },
    { label: 'Funds', detail: '₫1.2M reimbursed · Advisor verified', tone: 'success' as NotificationTone },
    { label: 'Assets', detail: 'VR kit returned · Assets board updated', tone: 'alert' as NotificationTone }
  ];

  const leaderboardStyles = ['border-[#B7C5FF] bg-[#F4F6FF]', 'border-[#F8D6A4] bg-[#FFF8EF]', 'border-[#C7EBDC] bg-[#F3FBF7]'];

  return (
    <div className="space-y-6 px-2">
      <p className="text-[11px] uppercase tracking-[0.3em] text-[#7A86B6]">Notifications</p>

      <div className="space-y-2">
        {notifications.map((note) => (
          <div key={note.id} className={`flex items-start gap-3 border-l-2 px-3 py-3 text-sm ${toneStyles[note.type]}`}>
            <div className="text-xs uppercase tracking-[0.3em] text-[#6A769E]">{note.chip}</div>
            <div className="flex-1">
              <p className="font-semibold text-[#0B1532]">{note.title}</p>
              <p className="text-xs text-[#5C678C]">{note.detail}</p>
            </div>
            {note.type === 'alert' && <AlertTriangle size={16} className="text-[#B45321]" />}
            {note.type === 'info' && <Info size={16} className="text-[#3346B0]" />}
            {note.type === 'success' && <CheckCircle2 size={16} className="text-[#1A7F5A]" />}
          </div>
        ))}
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between text-sm text-[#69729B]">
          <span className="text-[11px] uppercase tracking-[0.3em]">Leaderboard</span>
          <span>{classTitle}</span>
        </div>
        <div className="space-y-2">
          {leaderboard.map((entry, index) => (
            <div
              key={entry.name}
              className={`flex items-center gap-3 border-l-2 px-3 py-3 text-sm ${leaderboardStyles[index] ?? leaderboardStyles[0]}`}
            >
              <div className="text-xs uppercase tracking-[0.3em] text-[#6A769E]">{entry.chip}</div>
              <div className="flex-1">
                <p className="font-semibold text-[#0B1532]">{entry.name}</p>
                <p className="text-xs text-[#5C678C]">{entry.detail}</p>
              </div>
              <div className="text-right text-xs text-[#7A86B6]">
                <p className="text-base font-semibold text-[#0B1532]">{entry.points} pts</p>
                <p>#{index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#7A86B6]">Recent activity</p>
        <div className="mt-3 space-y-2">
          {recentActivities.map((item) => (
            <div key={item.detail} className={`flex gap-3 border-l-2 px-3 py-3 text-xs ${toneStyles[item.tone]}`}>
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#6A769E]">{item.label}</div>
              <p className="flex-1 text-[#5C678C]">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
const toneStyles: Record<NotificationTone, string> = {
  alert: 'border-[#F6A878] bg-[#FFF7F0]',
  info: 'border-[#9FB6FF] bg-[#F3F5FF]',
  success: 'border-[#9CD8C3] bg-[#F4FBF7]'
};
