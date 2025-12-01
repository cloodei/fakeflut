import { useState } from 'react';
import { History, Circle } from 'lucide-react';
import Toast from './Toast';

type AssetStatus = 'available' | 'in_use';

interface Asset {
  id: number;
  name: string;
  icon: string;
  status: AssetStatus;
  borrowedBy?: string;
  borrowedSince?: string;
  lastBorrowed?: string;
}

interface AuditEntry {
  id: number;
  assetName: string;
  action: 'borrowed' | 'returned';
  userName: string;
  timestamp: string;
}

interface AssetsProps {
  className: string;
}

export default function Assets({ className }: AssetsProps) {
  const [showHistory, setShowHistory] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const assets: Asset[] = [
    {
      id: 1,
      name: 'Classroom Remote',
      icon: '📱',
      status: 'in_use',
      borrowedBy: 'Sarah Lee',
      borrowedSince: '2 hours ago'
    },
    {
      id: 2,
      name: 'Classroom Key',
      icon: '🔑',
      status: 'available',
      lastBorrowed: 'Yesterday · John'
    },
    {
      id: 3,
      name: 'Microphone',
      icon: '🎤',
      status: 'available',
      lastBorrowed: '2 days ago · Emma'
    },
    {
      id: 4,
      name: 'HDMI Cable',
      icon: '🔌',
      status: 'available'
    },
    {
      id: 5,
      name: 'Whiteboard Markers',
      icon: '✏️',
      status: 'in_use',
      borrowedBy: 'Mike Chen',
      borrowedSince: '1 hour ago'
    },
    {
      id: 6,
      name: 'Extension Cord',
      icon: '⚡',
      status: 'available'
    }
  ];

  const auditLog: AuditEntry[] = [
    { id: 1, assetName: 'Classroom Remote', action: 'borrowed', userName: 'Sarah Lee', timestamp: '2 hours ago' },
    { id: 2, assetName: 'Classroom Key', action: 'returned', userName: 'John Smith', timestamp: 'Yesterday · 17:30' },
    { id: 3, assetName: 'Whiteboard Markers', action: 'borrowed', userName: 'Mike Chen', timestamp: '1 hour ago' },
    { id: 4, assetName: 'Microphone', action: 'returned', userName: 'Emma Wilson', timestamp: '2 days ago' },
    { id: 5, assetName: 'HDMI Cable', action: 'returned', userName: 'You', timestamp: '3 days ago' }
  ];

  const handleBorrow = (assetName: string) => {
    setToastMessage(`Borrow request logged for ${assetName}`);
  };

  return (
    <div className="space-y-5">
      {toastMessage && (
        <Toast message={toastMessage} type="success" onClose={() => setToastMessage(null)} />
      )}

      <section className="rounded-3xl border border-[#E3E9FF] bg-white px-5 py-5 shadow-[0_12px_30px_rgba(151,168,226,0.18)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#9AA3C7]">{className}</p>
            <h1 className="text-2xl font-semibold text-[#0E1B3D]">Asset Management</h1>
          </div>
          <button
            onClick={() => setShowHistory(true)}
            className="flex items-center gap-2 rounded-2xl border border-[#E0E7FF] px-3 py-2 text-xs font-semibold text-[#3F73FF]"
          >
            <History size={16} /> History
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <StatCard label="Available" value={assets.filter((a) => a.status === 'available').length} accent="#1BA37A" />
          <StatCard label="In use" value={assets.filter((a) => a.status === 'in_use').length} accent="#FF6B6B" />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        {assets.map((asset) => (
          <div key={asset.id} className="rounded-3xl border border-[#E0E7FF] bg-white px-4 py-4 shadow-[0_8px_20px_rgba(151,168,226,0.12)]">
            <div className="text-4xl text-center">{asset.icon}</div>
            <h3 className="mt-3 text-center text-sm font-semibold text-[#0E1B3D]">{asset.name}</h3>
            <div className="mt-3 flex items-center justify-center gap-2">
              <Circle size={10} className={asset.status === 'available' ? 'text-[#1BA37A] fill-current' : 'text-[#FF6B6B] fill-current'} />
              <span className={`text-xs font-medium ${asset.status === 'available' ? 'text-[#1BA37A]' : 'text-[#FF6B6B]'}`}>
                {asset.status === 'available' ? 'Available' : 'In use'}
              </span>
            </div>
            {asset.status === 'in_use' && asset.borrowedBy && (
              <div className="mt-3 rounded-2xl border border-[#F8C5CD] bg-[#FFF1F3] px-3 py-2 text-xs text-[#E05264]">
                <p>Held by {asset.borrowedBy}</p>
                <p className="text-[11px] text-[#C97282]">Since {asset.borrowedSince}</p>
              </div>
            )}
            {asset.status === 'available' && asset.lastBorrowed && (
              <p className="mt-3 text-center text-xs text-[#8B95BF]">{asset.lastBorrowed}</p>
            )}
            {asset.status === 'available' ? (
              <button
                onClick={() => handleBorrow(asset.name)}
                className="mt-3 w-full rounded-2xl bg-linear-to-r from-[#7DE2FF] to-[#598BFF] py-2.5 text-xs font-semibold text-white"
              >
                Borrow
              </button>
            ) : (
              <button className="mt-3 w-full rounded-2xl border border-[#E0E7FF] py-2.5 text-xs font-semibold text-[#BAC3DE]" disabled>
                Unavailable
              </button>
            )}
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-[#E3E9FF] bg-white px-5 py-5 shadow-[0_8px_20px_rgba(151,168,226,0.12)]">
        <h3 className="text-sm font-semibold text-[#0E1B3D]">Legend</h3>
        <div className="mt-3 space-y-2 text-sm text-[#5B678C]">
          <LegendItem color="#1BA37A" label="Available for borrowing" />
          <LegendItem color="#FF6B6B" label="Currently in use" />
        </div>
      </section>

      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-t-3xl border border-[#E0E7FF] bg-white p-6 shadow-[0_-12px_35px_rgba(35,55,125,0.18)]">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#0E1B3D]">Audit trail</h2>
              <button onClick={() => setShowHistory(false)} className="text-[#8B95BF]">
                ✕
              </button>
            </div>
            <div className="mt-4 max-h-[60vh] space-y-3 overflow-y-auto">
              {auditLog.map((entry) => (
                <div key={entry.id} className="flex gap-3 rounded-2xl border border-[#E0E7FF] px-4 py-3">
                  <div className={`flex size-10 items-center justify-center rounded-full ${
                    entry.action === 'borrowed' ? 'bg-[#FFF5E6] text-[#C97C00]' : 'bg-[#E5F9F2] text-[#1BA37A]'
                  }`}>
                    {entry.action === 'borrowed' ? '📤' : '📥'}
                  </div>
                  <div className="flex-1 text-sm text-[#0E1B3D]">
                    <p>
                      <span className="font-semibold">{entry.userName}</span> {entry.action} {entry.assetName}
                    </p>
                    <p className="text-xs text-[#8B95BF]">{entry.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="rounded-2xl border border-[#E0E7FF] bg-[#F8FAFF] px-4 py-4 text-sm text-[#5B678C]">
      <p>{label}</p>
      <p className="text-2xl font-semibold" style={{ color: accent }}>
        {value}
      </p>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Circle size={10} style={{ color }} className="fill-current" />
      <span>{label}</span>
    </div>
  );
}
