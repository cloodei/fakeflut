import { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';

interface AuthScreenProps {
  onAuth: (profile: { displayName: string; studentId: string }) => void;
}

const cardClass = 'rounded-3xl border border-[#E3E9FF] bg-white shadow-[0_18px_45px_rgba(141,167,232,0.15)]';

export default function AuthScreen({ onAuth }: AuthScreenProps) {
  const [displayName, setDisplayName] = useState('');
  const [studentId, setStudentId] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FBFF] via-[#EDF1FF] to-[#E2ECFF] px-5 py-8 text-[#0E1B3D]">
      <div className="mx-auto flex max-w-md flex-col gap-5">
        <div className={`${cardClass} space-y-4 px-5 py-6 text-center`}>
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-[#7DE2FF] to-[#598BFF] text-3xl">
            📚
          </div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#8B95BF]">Digital Operation Center</p>
          <h1 className="text-3xl font-semibold">ClassPal</h1>
          <p className="text-sm text-[#5B678C]">Automate attendance, funds, and duties in one transparent mobile cockpit.</p>
        </div>

        <div className={`${cardClass} px-5 py-6 space-y-4`}>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#9AA3C7]">Sign in</p>
            <h2 className="text-xl font-semibold">Welcome back</h2>
          </div>
          <label className="text-xs text-[#8B95BF]">Display Name</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-3.5 size-4 text-[#C1C7DF]" />
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Avery Tran"
              className="w-full rounded-2xl border border-[#E0E7FF] bg-[#F8FAFF] px-10 py-3 text-sm text-[#0E1B3D] placeholder:text-[#B4BED5] focus:border-[#3F73FF] focus:outline-none"
            />
          </div>
          <label className="text-xs text-[#8B95BF]">University Email</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-3.5 size-4 text-[#C1C7DF]" />
            <input
              type="email"
              placeholder="student@uni.edu"
              className="w-full rounded-2xl border border-[#E0E7FF] bg-[#F8FAFF] px-10 py-3 text-sm text-[#0E1B3D] placeholder:text-[#B4BED5] focus:border-[#3F73FF] focus:outline-none"
            />
          </div>
          <label className="text-xs text-[#8B95BF]">Password</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-3.5 size-4 text-[#C1C7DF]" />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-2xl border border-[#E0E7FF] bg-[#F8FAFF] px-10 py-3 text-sm text-[#0E1B3D] placeholder:text-[#B4BED5] focus:border-[#3F73FF] focus:outline-none"
            />
          </div>
          <button
            onClick={() =>
              onAuth({ displayName: displayName.trim() || 'Student', studentId: studentId.trim() || '00000000' })
            }
            className="w-full rounded-2xl bg-linear-to-r from-[#7DE2FF] to-[#598BFF] py-3 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(108,139,255,0.35)]"
          >
            <span className="flex items-center justify-center gap-2">
              <LogIn size={18} /> Launch ClassPal
            </span>
          </button>
          <button className="w-full rounded-2xl border border-[#E0E7FF] py-3 text-sm text-[#5B678C]">
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
