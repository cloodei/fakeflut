import { useEffect } from 'react';
import { Check, X, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = 'success', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check className="text-emerald-600" size={20} />;
      case 'error':
        return <X className="text-rose-600" size={20} />;
      case 'warning':
        return <AlertCircle className="text-amber-600" size={20} />;
      case 'info':
        return <Info className="text-blue-600" size={20} />;
    }
  };

  const getBackground = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 border-emerald-200';
      case 'error':
        return 'bg-rose-50 border-rose-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-100 animate-slide-down">
      <div className={`${getBackground()} border-2 rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-3 min-w-[280px] max-w-md`}>
        <div className="shrink-0">{getIcon()}</div>
        <p className="text-gray-800 flex-1">{message}</p>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0">
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
