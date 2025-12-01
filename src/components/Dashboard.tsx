import { useState } from 'react';
import { Bell, Plus, CheckSquare, AlertCircle, Trophy, Eye, EyeOff, Calendar } from 'lucide-react';

interface DashboardProps {
  userName: string;
  onNavigateToEvents?: () => void;
}

export default function Dashboard({ userName, onNavigateToEvents }: DashboardProps) {
  const [notifications, setNotifications] = useState(3);
  const [balanceVisible, setBalanceVisible] = useState(false);

  const quickStats = [
    {
      title: 'My Next Task',
      value: 'Clean Board',
      time: '2:00 PM Today',
      icon: '🧹',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Fund Balance',
      value: balanceVisible ? '₫5,000,000' : '••••••••',
      subtitle: 'Class Fund',
      icon: '💰',
      color: 'from-emerald-500 to-emerald-600',
      action: () => setBalanceVisible(!balanceVisible),
      actionIcon: balanceVisible ? <EyeOff size={16} /> : <Eye size={16} />
    },
    {
      title: 'Upcoming Event',
      value: 'Class Party',
      time: 'In 3 days',
      icon: '🎉',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const menuItems = [
    { title: 'Create Task', icon: Plus, color: 'bg-[#FF4D6D]', onClick: undefined },
    { title: 'View Events', icon: Calendar, color: 'bg-purple-500', onClick: onNavigateToEvents },
    { title: 'Check-in', icon: CheckSquare, color: 'bg-emerald-500', onClick: undefined },
    { title: 'Report Issue', icon: AlertCircle, color: 'bg-amber-500', onClick: undefined }
  ];

  return (
    <div className="min-h-screen bg-[#303080]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#303080] to-[#3838a0] px-6 pt-12 pb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-white/70 text-sm">Welcome back,</p>
            <h1 className="text-white text-2xl">Hello, {userName}! 👋</h1>
          </div>
          <button 
            onClick={() => setNotifications(0)}
            className="relative bg-white/10 p-3 rounded-xl backdrop-blur-sm"
          >
            <Bell className="text-white" size={24} />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              onClick={stat.action}
              className={`min-w-[280px] bg-gradient-to-br ${stat.color} rounded-2xl p-5 text-white shadow-xl ${
                stat.action ? 'cursor-pointer active:scale-95 transition-transform' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{stat.icon}</span>
                {stat.actionIcon && (
                  <div className="bg-white/20 p-1.5 rounded-lg">
                    {stat.actionIcon}
                  </div>
                )}
              </div>
              <p className="text-white/80 text-sm mb-1">{stat.title}</p>
              <p className="text-xl mb-1">{stat.value}</p>
              {stat.time && <p className="text-white/70 text-sm">{stat.time}</p>}
              {stat.subtitle && <p className="text-white/70 text-sm">{stat.subtitle}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="px-6 py-6">
        <h2 className="text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-95 flex flex-col items-center gap-3"
            >
              <div className={`${item.color} w-14 h-14 rounded-xl flex items-center justify-center`}>
                <item.icon className="text-white" size={28} />
              </div>
              <span className="text-gray-800">{item.title}</span>
            </button>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-white mb-4">Recent Activity</h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {[
              { action: 'Completed task', detail: 'Clean Whiteboard', time: '2 hours ago', status: 'success' },
              { action: 'Borrowed asset', detail: 'Classroom Remote', time: '5 hours ago', status: 'warning' },
              { action: 'Paid contribution', detail: '₫500,000', time: 'Yesterday', status: 'success' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 border-b last:border-b-0 border-gray-100">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.status === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {activity.status === 'success' ? '✓' : '⏱'}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.detail}</p>
                </div>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
