import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface AuthScreenProps {
  onAuth: (profile: { displayName: string; studentId: string }) => void;
  onBack?: () => void;
}

export default function AuthScreen({ onAuth, onBack }: AuthScreenProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const derivedName = mode === 'signup' && name.trim() 
      ? name.trim() 
      : email.includes('@') 
        ? email.split('@')[0] 
        : 'Student';
    onAuth({ displayName: derivedName || 'Student', studentId: '00000000' });
  };

  const handleGoogleSignIn = () => {
    onAuth({ displayName: 'Google User', studentId: '00000001' });
  };

  return (
    <div className="relative flex min-h-[620px] flex-col text-[#1a1a2e]">
      {/* Dot pattern background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.35]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #d0d0d8 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(250,250,250,0.9)_80%)]" />
      </div>
      
      {/* Back button */}
      {onBack && (
        <button
          onClick={onBack}
          className="relative z-10 mb-6 flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e5ec] bg-white text-[#6b6b80] transition-all hover:bg-[#f5f5f7]"
        >
          <ArrowLeft size={18} />
        </button>
      )}

      {/* Header */}
      <div className="relative z-10 mb-8">
        <h1 className="text-[28px] font-bold leading-tight tracking-tight text-[#1a1a2e]">
          {mode === 'login' ? 'Welcome back' : 'Create account'}
        </h1>
        <p className="mt-2 text-[14px] text-[#6b6b80]">
          {mode === 'login'
            ? 'Sign in to continue to ClassPal'
            : 'Join ClassPal to manage your class'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="relative z-10 flex flex-1 flex-col">
        <div className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-[#6b6b80]">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-[#e5e5ec] bg-white px-4 py-3 text-[14px] text-[#1a1a2e] placeholder:text-[#a0a0b0] focus:border-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/5"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-[#6b6b80]">Email</label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg bg-[#f5f5f7]">
                <Mail size={14} className="text-[#6b6b80]" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
                className="w-full rounded-xl border border-[#e5e5ec] bg-white py-3 pl-13 pr-4 text-[14px] text-[#1a1a2e] placeholder:text-[#a0a0b0] focus:border-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/5"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-[#6b6b80]">Password</label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg bg-[#f5f5f7]">
                <Lock size={14} className="text-[#6b6b80]" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#e5e5ec] bg-white py-3 pl-13 pr-11 text-[14px] text-[#1a1a2e] placeholder:text-[#a0a0b0] focus:border-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/5"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#a0a0b0] transition-colors hover:bg-[#f5f5f7] hover:text-[#6b6b80]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {mode === 'login' && (
            <div className="flex justify-end">
              <button type="button" className="text-[12px] font-medium text-[#1a1a2e] hover:text-[#4a4a5a]">
                Forgot password?
              </button>
            </div>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-[#1a1a2e] py-3.5 text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-[#2a2a3e] active:scale-[0.98]"
        >
          {mode === 'login' ? 'Sign in' : 'Create account'}
        </button>

        {/* Divider */}
        <div className="my-5 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#e5e5ec]" />
          <span className="text-[12px] text-[#a0a0b0]">or continue with</span>
          <div className="h-px flex-1 bg-[#e5e5ec]" />
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#e5e5ec] bg-white py-3 text-[14px] font-medium text-[#1a1a2e] transition-all hover:bg-[#fafafc] active:scale-[0.98]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </button>

        {/* Toggle mode */}
        <div className="mt-auto pt-6 text-center">
          <span className="text-[13px] text-[#6b6b80]">
            {mode === 'login' ? "New here? " : 'Have an account? '}
          </span>
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-[13px] font-semibold text-[#1a1a2e]"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  );
}
