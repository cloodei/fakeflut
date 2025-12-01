import { User, Mail, Hash, Calendar, Trophy, Clock, LogOut, ArrowLeft } from 'lucide-react';

interface ProfileProps {
  userName: string;
  onLogout: () => void;
  onBack?: () => void;
}

export default function Profile({ userName, onLogout, onBack }: ProfileProps) {
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
    <div className="min-h-screen bg-[#303080]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#303080] to-[#3838a0] px-6 pt-12 pb-8">
        <div className="flex items-center gap-4 mb-6">
          {onBack && (
            <button onClick={onBack} className="text-white hover:scale-110 transition-transform">
              <ArrowLeft size={24} />
            </button>
          )}
          <h1 className="text-white text-2xl">Profile</h1>
        </div>

        {/* Avatar & Basic Info */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-[#FF4D6D] to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl shadow-2xl">
            👤
          </div>
          <h2 className="text-white text-xl mb-1">{userInfo.displayName}</h2>
          <p className="text-white/70">Student ID: {userInfo.studentId}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <Trophy className="text-yellow-400 mx-auto mb-1" size={24} />
            <p className="text-white text-lg">{userInfo.totalPoints}</p>
            <p className="text-white/70 text-xs">Points</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <Clock className="text-emerald-400 mx-auto mb-1" size={24} />
            <p className="text-white text-lg">{userInfo.tasksCompleted}</p>
            <p className="text-white/70 text-xs">Tasks</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <Calendar className="text-purple-400 mx-auto mb-1" size={24} />
            <p className="text-white text-lg">{userInfo.eventsAttended}</p>
            <p className="text-white/70 text-xs">Events</p>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="px-6 py-6 space-y-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-5">
            <h3 className="text-gray-800 mb-4">Personal Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <User className="text-blue-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Display Name</p>
                  <p className="text-gray-800">{userInfo.displayName}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Hash className="text-purple-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Student ID</p>
                  <p className="text-gray-800">{userInfo.studentId}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Mail className="text-emerald-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-800">{userInfo.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Calendar className="text-amber-600" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-gray-800">{userInfo.joinDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Class Info */}
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <h3 className="text-gray-800 mb-4">Class Information</h3>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
            <p className="text-sm text-gray-600 mb-1">Current Class</p>
            <p className="text-xl text-gray-800">{userInfo.className}</p>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl p-5 shadow-lg">
          <h3 className="text-gray-800 mb-4">Achievements</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-4xl mb-2">🥉</div>
              <p className="text-xs text-gray-600">Top 3 Contributor</p>
            </div>
            <div className="text-center opacity-40">
              <div className="text-4xl mb-2">⭐</div>
              <p className="text-xs text-gray-600">Perfect Attendance</p>
            </div>
            <div className="text-center opacity-40">
              <div className="text-4xl mb-2">👑</div>
              <p className="text-xs text-gray-600">Class Leader</p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full bg-rose-500 text-white py-4 rounded-2xl hover:bg-rose-600 transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}
