import { User, Mail, Hash, Calendar, Trophy, Clock, LogOut } from 'lucide-react';

interface ProfileProps {
  userName: string;
  onLogout: () => void;
  onBack?: () => void;
}

export default function Profile({ userName, onLogout }: ProfileProps) {
  const userInfo = {
    displayName: userName,
    studentId: '20123456',
    email: 'student@university.edu',
    className: 'CS101-2024',
    joinDate: 'September 2024',
    totalPoints: 320,
    tasksCompleted: 24,
    eventsAttended: 8
  };

  return (
    <div className="space-y-4">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center">
        <div className="h-20 w-20 rounded-full bg-[#1a1a2e] flex items-center justify-center text-3xl shadow-lg mb-3">
          👤
        </div>
        <h2 className="text-[18px] font-bold text-[#1a1a2e]">{userInfo.displayName}</h2>
        <p className="text-[12px] text-[#8b8b9e]">ID: {userInfo.studentId}</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-[#e8e8f0] bg-white p-3 text-center shadow-sm">
          <Trophy className="text-amber-500 mx-auto mb-1" size={20} />
          <p className="text-[16px] font-bold text-[#1a1a2e]">{userInfo.totalPoints}</p>
          <p className="text-[10px] text-[#8b8b9e]">Points</p>
        </div>
        <div className="rounded-xl border border-[#e8e8f0] bg-white p-3 text-center shadow-sm">
          <Clock className="text-emerald-500 mx-auto mb-1" size={20} />
          <p className="text-[16px] font-bold text-[#1a1a2e]">{userInfo.tasksCompleted}</p>
          <p className="text-[10px] text-[#8b8b9e]">Tasks</p>
        </div>
        <div className="rounded-xl border border-[#e8e8f0] bg-white p-3 text-center shadow-sm">
          <Calendar className="text-purple-500 mx-auto mb-1" size={20} />
          <p className="text-[16px] font-bold text-[#1a1a2e]">{userInfo.eventsAttended}</p>
          <p className="text-[10px] text-[#8b8b9e]">Events</p>
        </div>
      </div>

      {/* Personal Info Card */}
      <div className="rounded-2xl border border-[#e8e8f0] bg-white p-4 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8b8b9e] mb-3">Personal Information</p>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center">
              <User className="text-blue-600" size={16} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-[#a0a0b0]">Display Name</p>
              <p className="text-[13px] font-medium text-[#1a1a2e]">{userInfo.displayName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-purple-50 flex items-center justify-center">
              <Hash className="text-purple-600" size={16} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-[#a0a0b0]">Student ID</p>
              <p className="text-[13px] font-medium text-[#1a1a2e]">{userInfo.studentId}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Mail className="text-emerald-600" size={16} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-[#a0a0b0]">Email</p>
              <p className="text-[13px] font-medium text-[#1a1a2e]">{userInfo.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-amber-50 flex items-center justify-center">
              <Calendar className="text-amber-600" size={16} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-[#a0a0b0]">Member Since</p>
              <p className="text-[13px] font-medium text-[#1a1a2e]">{userInfo.joinDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Class Info */}
      <div className="rounded-2xl border border-[#e8e8f0] bg-white p-4 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8b8b9e] mb-3">Current Class</p>
        <div className="rounded-xl bg-[#f5f5f7] p-3 border border-[#e8e8f0]">
          <p className="text-[15px] font-semibold text-[#1a1a2e]">{userInfo.className}</p>
        </div>
      </div>

      {/* Achievements */}
      <div className="rounded-2xl border border-[#e8e8f0] bg-white p-4 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8b8b9e] mb-3">Achievements</p>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 rounded-xl bg-[#f5f5f7]">
            <div className="text-2xl mb-1">🥉</div>
            <p className="text-[9px] text-[#6b6b80]">Top 3</p>
          </div>
          <div className="text-center p-2 rounded-xl bg-[#f5f5f7] opacity-40">
            <div className="text-2xl mb-1">⭐</div>
            <p className="text-[9px] text-[#6b6b80]">Perfect</p>
          </div>
          <div className="text-center p-2 rounded-xl bg-[#f5f5f7] opacity-40">
            <div className="text-2xl mb-1">👑</div>
            <p className="text-[9px] text-[#6b6b80]">Leader</p>
          </div>
        </div>
      </div>
    </div>
  );
}
