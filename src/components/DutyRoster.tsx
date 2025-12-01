import { useState } from 'react';
import { Camera, Check, Clock, Trophy, Users } from 'lucide-react';

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

export default function DutyRoster() {
  const [viewMode, setViewMode] = useState<'my' | 'full'>('my');
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const tasks: Task[] = [
    {
      id: 1,
      title: 'Clean Whiteboard',
      time: '2:00 PM - Today',
      assignee: 'You',
      avatar: '👤',
      status: 'pending',
      points: 10
    },
    {
      id: 2,
      title: 'Arrange Chairs',
      time: '10:00 AM - Tomorrow',
      assignee: 'You',
      avatar: '👤',
      status: 'waiting_approval',
      points: 15
    },
    {
      id: 3,
      title: 'Take Attendance',
      time: 'Yesterday',
      assignee: 'You',
      avatar: '👤',
      status: 'done',
      points: 20
    },
    {
      id: 4,
      title: 'Lock Classroom',
      time: '5:00 PM - Today',
      assignee: 'John Smith',
      avatar: '👨',
      status: 'pending',
      points: 10
    },
    {
      id: 5,
      title: 'Water Plants',
      time: 'Tomorrow',
      assignee: 'Sarah Lee',
      avatar: '👩',
      status: 'done',
      points: 15
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Lee', points: 450, avatar: '👩', badge: '🥇' },
    { rank: 2, name: 'John Smith', points: 380, avatar: '👨', badge: '🥈' },
    { rank: 3, name: 'You', points: 320, avatar: '👤', badge: '🥉' },
    { rank: 4, name: 'Mike Chen', points: 280, avatar: '👨‍💼', badge: '' },
    { rank: 5, name: 'Emma Wilson', points: 250, avatar: '👩‍💼', badge: '' }
  ];

  const filteredTasks = viewMode === 'my' 
    ? tasks.filter(task => task.assignee === 'You')
    : tasks;

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'pending':
        return <span className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-xs">Pending</span>;
      case 'waiting_approval':
        return <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs">Pending Review</span>;
      case 'done':
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-xs flex items-center gap-1">
          <Check size={14} /> Done
        </span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#303080]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#303080] to-[#3838a0] px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white text-2xl">Duty Roster</h1>
          <button
            onClick={() => setShowLeaderboard(!showLeaderboard)}
            className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl text-white flex items-center gap-2"
          >
            <Trophy size={18} />
            <span className="text-sm">Leaderboard</span>
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 bg-white/10 backdrop-blur-sm p-1.5 rounded-xl">
          <button
            onClick={() => setViewMode('my')}
            className={`flex-1 py-2.5 rounded-lg transition-all ${
              viewMode === 'my'
                ? 'bg-white text-[#303080]'
                : 'text-white'
            }`}
          >
            My Duties
          </button>
          <button
            onClick={() => setViewMode('full')}
            className={`flex-1 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 ${
              viewMode === 'full'
                ? 'bg-white text-[#303080]'
                : 'text-white'
            }`}
          >
            <Users size={18} />
            Full Schedule
          </button>
        </div>
      </div>

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-slide-up max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-gray-800">🏆 Contribution Leaderboard</h2>
              <button
                onClick={() => setShowLeaderboard(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-4 p-4 rounded-xl ${
                    entry.rank <= 3 ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="text-2xl">{entry.badge || `#${entry.rank}`}</div>
                  <div className="text-3xl">{entry.avatar}</div>
                  <div className="flex-1">
                    <p className="text-gray-800">{entry.name}</p>
                    <p className="text-sm text-gray-500">{entry.points} points</p>
                  </div>
                  {entry.name === 'You' && (
                    <span className="px-2 py-1 bg-[#FF4D6D] text-white text-xs rounded-full">You</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="px-6 py-6 space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-2xl p-5 shadow-lg">
            {/* Task Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-gray-800 mb-1">{task.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock size={14} />
                  <span>{task.time}</span>
                </div>
              </div>
              {getStatusBadge(task.status)}
            </div>

            {/* Assignee */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF4D6D] to-pink-400 rounded-full flex items-center justify-center text-xl">
                {task.avatar}
              </div>
              <div>
                <p className="text-sm text-gray-500">Assigned to</p>
                <p className="text-gray-800">{task.assignee}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-sm text-gray-500">Points</p>
                <p className="text-emerald-600">+{task.points}</p>
              </div>
            </div>

            {/* Action Buttons */}
            {task.status === 'pending' && task.assignee === 'You' && (
              <button className="w-full bg-[#FF4D6D] text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#ff3355] transition-colors">
                <Camera size={20} />
                Upload Proof
              </button>
            )}

            {task.status === 'waiting_approval' && task.assignee === 'You' && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2">
                <Clock className="text-amber-600" size={20} />
                <span className="text-amber-800 text-sm">Pending Admin Review</span>
              </div>
            )}

            {task.status === 'done' && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2">
                <Check className="text-emerald-600" size={20} />
                <span className="text-emerald-800 text-sm">Task Completed</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
