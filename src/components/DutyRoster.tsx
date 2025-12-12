import { useState } from 'react';
import { Camera, Check, Clock, Plus, Search } from 'lucide-react';

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
  onCreateClick: () => void;
}

export default function DutyRoster({ className: _, onCreateClick }: DutyRosterProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const statusBadge = {
    pending: 'text-[#F39C12] border border-[#F39C12]/30 bg-[#FDF1E2]',
    waiting_approval: 'text-[#C97C00] border border-[#C97C00]/30 bg-[#FFF5DB]',
    done: 'text-[#1BA37A] border border-[#1BA37A]/30 bg-[#E4F8F1]'
  } satisfies Record<TaskStatus, string>;


  const [tasks, setTasks] = useState<Task[]>([
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
  ]);

  const searchedTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.assignee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9BA5C9]">
          <Search size={16} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search duties..."
          className="w-full rounded-xl border border-[#e5e5ec] bg-white py-2.5 pl-10 pr-4 text-[13px] text-[#1a1a2e] placeholder:text-[#a0a0b0] focus:border-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/5"
        />
      </div>

      <section className="space-y-4">
        {searchedTasks.map((task) => (
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

      {/* FAB Button */}
      <button
        onClick={onCreateClick}
        className="fixed bottom-24 right-8 z-30 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1a1a2e] text-white shadow-lg shadow-[#1a1a2e]/30 transition-all hover:scale-105 hover:shadow-xl active:scale-95"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}

