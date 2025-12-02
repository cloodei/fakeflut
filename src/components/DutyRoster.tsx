import { useState } from 'react';
import { Camera, Check, Clock } from 'lucide-react';

type TaskStatus = 'pending' | 'waiting_approval' | 'done';

interface Task {
  id: number;
  title: string;
  time: string;
  assignee: string;
  avatar: string;
  status: TaskStatus;
  points: number;
}

interface DutyRosterProps {
  className: string;
}

export default function DutyRoster({ className }: DutyRosterProps) {
  const [viewMode, setViewMode] = useState<'my' | 'full'>('my');

  const leaderboard = [
    { rank: 1, name: 'Sarah Lee', points: 450, avatar: '👩', badge: '🥇' },
    { rank: 2, name: 'John Smith', points: 380, avatar: '👨', badge: '🥈' },
    { rank: 3, name: 'You', points: 320, avatar: '👤', badge: '🥉' },
    { rank: 4, name: 'Mike Chen', points: 280, avatar: '👨‍💼', badge: '' },
    { rank: 5, name: 'Emma Wilson', points: 250, avatar: '👩‍💼', badge: '' }
  ];
  const topThree = leaderboard.slice(0, 3);

  const tasks: Task[] = [
    {
      id: 1,
      title: 'Clean Whiteboard',
      time: 'Today · 14:00',
      assignee: 'You',
      avatar: '👤',
      status: 'pending',
      points: 12
    },
    {
      id: 2,
      title: 'Arrange seating grid',
      time: 'Tomorrow · 10:00',
      assignee: 'You',
      avatar: '👤',
      status: 'waiting_approval',
      points: 15
    },
    {
      id: 3,
      title: 'Attendance scan',
      time: 'Yesterday',
      assignee: 'You',
      avatar: '👤',
      status: 'done',
      points: 20
    },
    {
      id: 4,
      title: 'Lock classroom',
      time: 'Today · 17:00',
      assignee: 'John Smith',
      avatar: '👨',
      status: 'pending',
      points: 10
    }
  ];

  const filteredTasks = viewMode === 'my' ? tasks.filter((task) => task.assignee === 'You') : tasks;

  const statusBadge = {
    pending: 'text-[#F39C12] border border-[#F39C12]/30 bg-[#FDF1E2]',
    waiting_approval: 'text-[#C97C00] border border-[#C97C00]/30 bg-[#FFF5DB]',
    done: 'text-[#1BA37A] border border-[#1BA37A]/30 bg-[#E4F8F1]'
  } satisfies Record<TaskStatus, string>;

  return (
    <div className="space-y-5">
      <section className="rounded-[34px] border border-[#E0E6FA] bg-linear-to-br from-[#FDFEFF] to-[#F2F5FF] px-5 py-5 shadow-[0_14px_38px_rgba(27,40,88,0.18)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#7B86B0]">{className}</p>
            <h1 className="text-2xl font-semibold text-[#0B1637]">Duty cockpit</h1>
            <p className="text-sm text-[#7D89B7]">Monitor, capture, and clear operations.</p>
          </div>
          <div className="rounded-3xl border border-[#E1E5FF] bg-white/90 px-4 py-2 text-center text-xs">
            <p className="font-semibold text-[#0B1637] uppercase tracking-[0.3em]">Top contributors</p>
            <div className="mt-2 flex items-center justify-center gap-3 text-sm font-semibold text-[#2E58FF]">
              {topThree.map((entry) => (
                <span key={entry.rank} className="flex items-center gap-1">
                  {entry.badge}
                  {entry.name.split(' ')[0]}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-2 rounded-[26px] border border-[#E0E6FA] bg-[#F7F8FF] p-1 text-sm">
          {['my', 'full'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as 'my' | 'full')}
              className={`flex-1 rounded-2xl py-2.5 capitalize transition ${
                viewMode === mode ? 'bg-white text-[#2E58FF] shadow-[0_8px_18px_rgba(62,92,211,0.2)]' : 'text-[#8A92BB]'
              }`}
            >
              {mode === 'my' ? 'My duties' : 'Full schedule'}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="rounded-[32px] border border-[#E1E6FB] bg-white/95 px-5 py-5 shadow-[0_14px_26px_rgba(28,40,89,0.12)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#9BA5C9]">{task.time}</p>
                <h3 className="text-lg font-semibold text-[#0B1738]">{task.title}</h3>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge[task.status]}`}>
                {task.status === 'pending' && 'Upload proof'}
                {task.status === 'waiting_approval' && 'Pending approval'}
                {task.status === 'done' && 'Verified'}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-3 border-t border-[#EEF1FF] pt-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#EEF1FF] text-2xl">{task.avatar}</div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#9AA3C7]">Assignee</p>
                <p className="text-sm font-semibold text-[#0B1738]">{task.assignee}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#9AA3C7]">Points</p>
                <p className="text-base font-semibold text-[#1BA37A]">+{task.points}</p>
              </div>
            </div>
            {task.status === 'pending' && task.assignee === 'You' && (
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-[22px] bg-linear-to-r from-[#45C8FF] via-[#487BFF] to-[#2E36FF] py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_12px_28px_rgba(63,95,230,0.3)]">
                <Camera size={16} /> Upload proof
              </button>
            )}
            {task.status === 'waiting_approval' && task.assignee === 'You' && (
              <div className="mt-4 flex items-center gap-2 rounded-[22px] border border-[#F4C15D] bg-[#FFF9E7] px-4 py-3 text-xs font-semibold text-[#AF6C00]">
                <Clock size={14} /> Pending admin review
              </div>
            )}
            {task.status === 'done' && (
              <div className="mt-4 flex items-center gap-2 rounded-[22px] border border-[#B1E5D4] bg-[#F0FBF7] px-4 py-3 text-xs font-semibold text-[#1BA37A]">
                <Check size={14} /> Task completed · proof verified
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="rounded-[28px] border border-[#E1E6FB] bg-white px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#9BA5C9]">Contribution pulse</p>
            <h2 className="text-lg font-semibold text-[#0B1738]">Leaderboard</h2>
          </div>
          <span className="text-xs text-[#7D89B7]">Top 3 students</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          {topThree.map((entry) => (
            <div key={entry.rank} className="rounded-2xl border border-[#E1E6FB] bg-[#F8F9FF] px-3 py-3">
              <div className="text-3xl">{entry.avatar}</div>
              <p className="mt-1 text-xs font-semibold text-[#0B1738]">{entry.name}</p>
              <p className="text-[11px] text-[#7D89B7]">{entry.points} pts</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
