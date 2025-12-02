import { useState, type ReactNode } from 'react';
import { Mail, Lock, LogIn, IdCard, Signal, Wifi, BatteryFull, User, Chrome } from 'lucide-react';

interface AuthScreenProps {
  onAuth: (profile: { displayName: string; studentId: string }) => void;
}

export default function AuthScreen({ onAuth }: AuthScreenProps) {
  const [displayName, setDisplayName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAuth({ displayName: displayName.trim() || 'Student', studentId: studentId.trim() || '00000000' });
  };

  return (
    <div className="min-h-screen bg-[#020714] px-4 py-6 text-[#0B1637]">
      <div className="mx-auto w-full max-w-sm">
        <div className="overflow-hidden rounded-[42px] border border-white/5 bg-[#F6F8FF] shadow-[0_35px_75px_rgba(2,6,19,0.7)]">
          <div className="rounded-t-[42px] border-b border-white/10 bg-[#050C24] px-6 pt-6 pb-8 text-white">
            <div className="flex items-center justify-between text-[13px] font-semibold tracking-wide">
              <span>12:45</span>
              <div className="flex items-center gap-2 text-white/75">
                <Signal size={16} />
                <Wifi size={16} />
                <BatteryFull size={18} />
              </div>
            </div>
            <div className="mt-8 space-y-1.5">
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/60">ClassPal</p>
              <h1 className="text-3xl font-semibold leading-tight">Class Control Login</h1>
              <p className="text-sm text-white/70">Authenticate to orchestrate duties, events, and funds.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 px-6 py-7">
            <div className="rounded-[28px] border border-[#E4E7FB] bg-white px-4 py-4 shadow-[0_12px_24px_rgba(11,19,52,0.08)]">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.3em] text-[#99A2C7]">
                <span>Access badge</span>
                <span>ID · {studentId || '--------'}</span>
              </div>
              <div className="mt-3 space-y-3">
                <Field
                  label="Full name"
                  icon={<User size={16} className="text-[#8E96B8]" />}
                  value={displayName}
                  placeholder="Avery Tran"
                  onChange={setDisplayName}
                />
                <Field
                  label="Student ID"
                  icon={<IdCard size={16} className="text-[#8E96B8]" />}
                  value={studentId}
                  placeholder="23014568"
                  onChange={setStudentId}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Field
                label="University email"
                icon={<Mail size={16} className="text-[#8E96B8]" />}
                type="email"
                value={email}
                placeholder="student@uni.edu"
                onChange={setEmail}
              />
              <Field
                label="Password"
                icon={<Lock size={16} className="text-[#8E96B8]" />}
                type="password"
                value={password}
                placeholder="••••••••"
                onChange={setPassword}
              />
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-[24px] border border-[#E0E3F5] bg-white py-3 text-sm font-semibold text-[#1E2A4D]"
            >
              <Chrome size={16} className="text-[#EA4335]" />
              Sign in with Google
            </button>

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-[24px] bg-[#2F3E9E] py-3.5 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_18px_38px_rgba(24,36,109,0.35)]"
            >
              <LogIn size={18} className="transition group-hover:translate-x-0.5" />
              Enter ClassPal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  icon: ReactNode;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  type?: string;
};

function Field({ label, icon, value, placeholder, onChange, type = 'text' }: FieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9097B5]">{label}</label>
      <div className="relative flex items-center rounded-[22px] border border-[#D5D9EE] bg-[#FDFDFF] px-4 py-3 text-sm text-[#0D1A3D] shadow-[0_8px_18px_rgba(20,33,76,0.06)]">
        <div className="flex items-center justify-center rounded-2xl bg-[#EEF1FF] px-2 py-1">{icon}</div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="ml-3 w-full bg-transparent text-sm placeholder:text-[#AEB4CF] focus:outline-none"
        />
      </div>
    </div>
  );
}
