import { useState } from 'react';
import { Camera, Check, Clock, Trophy } from 'lucide-react';

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
  const [showLeaderboard, setShowLeaderboard] = useState(false);

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

  const leaderboard = [
    { rank: 1, name: 'Sarah Lee', points: 450, avatar: '👩', badge: '🥇' },
    { rank: 2, name: 'John Smith', points: 380, avatar: '👨', badge: '🥈' },
    { rank: 3, name: 'You', points: 320, avatar: '👤', badge: '🥉' },
    { rank: 4, name: 'Mike Chen', points: 280, avatar: '👨‍💼', badge: '' },
    { rank: 5, name: 'Emma Wilson', points: 250, avatar: '👩‍💼', badge: '' }
  ];

  const filteredTasks = viewMode === 'my' ? tasks.filter((task) => task.assignee === 'You') : tasks;

  const statusBadge = {
    pending: 'text-[#F39C12] border border-[#F39C12]/30 bg-[#FDF1E2]',
    waiting_approval: 'text-[#C97C00] border border-[#C97C00]/30 bg-[#FFF5DB]',
    done: 'text-[#1BA37A] border border-[#1BA37A]/30 bg-[#E4F8F1]'
  } satisfies Record<TaskStatus, string>;

  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-[#E3E9FF] bg-white px-5 py-5 shadow-[0_12px_30px_rgba(151,168,226,0.18)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#9AA3C7]">{className}</p>
            <h1 className="text-2xl font-semibold text-[#0E1B3D]">Duty roster</h1>
          </div>
          <button
            onClick={() => setShowLeaderboard(true)}
            className="flex items-center gap-2 rounded-2xl border border-[#E0E7FF] px-3 py-2 text-xs font-semibold text-[#3F73FF]"
          >
            <Trophy size={14} /> Leaderboard
          </button>
        </div>
        <div className="mt-4 flex gap-2 rounded-2xl border border-[#E0E7FF] bg-[#F8FAFF] p-1 text-sm">
          {['my', 'full'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as 'my' | 'full')}
              className={`flex-1 rounded-xl py-2 capitalize transition ${
                viewMode === mode ? 'bg-white text-[#3F73FF] shadow-[0_6px_15px_rgba(90,114,255,0.15)]' : 'text-[#8B95BF]'
              }`}
            >
              {mode === 'my' ? 'My duties' : 'Full schedule'}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        {filteredTasks.map((task) => (
          <div key={task.id} className="rounded-3xl border border-[#E0E7FF] bg-white px-5 py-4 shadow-[0_8px_20px_rgba(184,196,236,0.25)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-[#8B95BF]">{task.time}</p>
                <h3 className="text-lg font-semibold text-[#0E1B3D]">{task.title}</h3>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge[task.status]}`}>
                {task.status === 'pending' && 'Upload proof'}
                {task.status === 'waiting_approval' && 'Pending approval'}
                {task.status === 'done' && 'Verified'}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-3 border-t border-[#EEF1FF] pt-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#F3F5FF] text-2xl">{task.avatar}</div>
              <div>
                <p className="text-xs text-[#8B95BF]">Assignee</p>
                <p className="text-sm font-semibold text-[#0E1B3D]">{task.assignee}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xs text-[#8B95BF]">Points</p>
                <p className="text-base font-semibold text-[#1BA37A]">+{task.points}</p>
              </div>
            </div>
            {task.status === 'pending' && task.assignee === 'You' && (
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[#7DE2FF] to-[#598BFF] py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(108,139,255,0.3)]">
                <Camera size={16} /> Upload proof
              </button>
            )}
            {task.status === 'waiting_approval' && task.assignee === 'You' && (
              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-[#F4C15D] bg-[#FFF9E9] px-3 py-3 text-xs text-[#B67A00]">
                <Clock size={14} /> Pending admin review
              </div>
            )}
            {task.status === 'done' && (
              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-[#B1E5D4] bg-[#F0FBF7] px-3 py-3 text-xs text-[#1BA37A]">
                <Check size={14} /> Task completed · proof verified
              </div>
            )}
          </div>
        ))}
      </section>

      {showLeaderboard && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-t-3xl border border-[#E0E7FF] bg-white p-6 shadow-[0_-12px_35px_rgba(35,55,125,0.18)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#9AA3C7]">FR3.4 Leaderboard</p>
                <h2 className="text-xl font-semibold text-[#0E1B3D]">Contribution pulse</h2>
              </div>
              <button onClick={() => setShowLeaderboard(false)} className="text-[#8B95BF]">
                ✕
              </button>
            </div>
            <div className="mt-5 space-y-3">
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${
                    entry.rank <= 3
                      ? 'border-[#EFD7FF] bg-linear-to-r from-[#FDEFFB] to-[#F3F6FF]'
                      : 'border-[#E0E7FF] bg-[#F8FAFF]'
                  }`}
                >
                  <div className="text-2xl">{entry.badge || `#${entry.rank}`}</div>
                  <div className="text-3xl">{entry.avatar}</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#0E1B3D]">{entry.name}</p>
                    <p className="text-xs text-[#8B95BF]">{entry.points} pts</p>
                  </div>
                  {entry.name === 'You' && (
                    <span className="rounded-full border border-[#3F73FF] px-3 py-1 text-[11px] text-[#3F73FF]">You</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
