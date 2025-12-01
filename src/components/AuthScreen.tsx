import { useState } from 'react';
import { Mail, Lock, QrCode, LogIn } from 'lucide-react';

interface AuthScreenProps {
  onAuth: (userName: string) => void;
}

export default function AuthScreen({ onAuth }: AuthScreenProps) {
  const [mode, setMode] = useState<'login' | 'join'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [classCode, setClassCode] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [studentId, setStudentId] = useState('');

  const handleLogin = () => {
    if (email && password) {
      onAuth(displayName || 'Student');
    }
  };

  const handleJoinClass = () => {
    if (classCode && displayName && studentId) {
      onAuth(displayName);
    }
  };

  return (
    <div className="min-h-screen bg-[#303080] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FF4D6D] to-pink-400 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-2xl">
            <span className="text-white text-3xl">📚</span>
          </div>
          <h1 className="text-white text-3xl mb-2">ClassPal</h1>
          <p className="text-white/70">Digital Operation Center for University Classes</p>
        </div>

        {/* Toggle Mode */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-white text-[#303080]'
                : 'bg-white/10 text-white'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode('join')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              mode === 'join'
                ? 'bg-white text-[#303080]'
                : 'bg-white/10 text-white'
            }`}
          >
            Join Class
          </button>
        </div>

        {/* Login Form */}
        {mode === 'login' && (
          <div className="bg-white rounded-2xl p-6 shadow-2xl space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Display Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4D6D]"
                />
                <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4D6D]"
                />
                <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4D6D]"
                />
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-[#FF4D6D] text-white py-3 rounded-xl hover:bg-[#ff3355] transition-colors flex items-center justify-center gap-2"
            >
              <LogIn size={20} />
              Sign In
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>

            <button className="w-full border-2 border-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
        )}

        {/* Join Class Form */}
        {mode === 'join' && (
          <div className="bg-white rounded-2xl p-6 shadow-2xl space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4D6D]"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Student ID</label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="20123456"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4D6D]"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Class Code</label>
              <input
                type="text"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                placeholder="CS101-2024"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4D6D]"
              />
            </div>

            <button
              onClick={handleJoinClass}
              className="w-full bg-[#FF4D6D] text-white py-3 rounded-xl hover:bg-[#ff3355] transition-colors"
            >
              Join Class
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>

            <button className="w-full border-2 border-[#FF4D6D] text-[#FF4D6D] py-3 rounded-xl hover:bg-pink-50 transition-colors flex items-center justify-center gap-2">
              <QrCode size={20} />
              Scan QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
