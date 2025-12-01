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

export default function Assets() {
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
      lastBorrowed: 'Yesterday by John'
    },
    {
      id: 3,
      name: 'Microphone',
      icon: '🎤',
      status: 'available',
      lastBorrowed: '2 days ago by Emma'
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
    {
      id: 1,
      assetName: 'Classroom Remote',
      action: 'borrowed',
      userName: 'Sarah Lee',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      assetName: 'Classroom Key',
      action: 'returned',
      userName: 'John Smith',
      timestamp: 'Yesterday at 5:30 PM'
    },
    {
      id: 3,
      assetName: 'Whiteboard Markers',
      action: 'borrowed',
      userName: 'Mike Chen',
      timestamp: '1 hour ago'
    },
    {
      id: 4,
      assetName: 'Microphone',
      action: 'returned',
      userName: 'Emma Wilson',
      timestamp: '2 days ago'
    },
    {
      id: 5,
      assetName: 'HDMI Cable',
      action: 'returned',
      userName: 'You',
      timestamp: '3 days ago'
    }
  ];

  const handleBorrow = (assetName: string) => {
    setToastMessage(`Successfully borrowed ${assetName}`);
  };

  return (
    <div className="min-h-screen bg-[#303080]">
      {/* Toast */}
      {toastMessage && (
        <Toast message={toastMessage} type="success" onClose={() => setToastMessage(null)} />
      )}
      
      {/* Header */}
      <div className="bg-linear-to-b from-[#303080] to-[#3838a0] px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white text-2xl">Asset Management</h1>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl text-white flex items-center gap-2"
          >
            <History size={18} />
            <span className="text-sm">History</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-white/70 text-sm mb-1">Available</p>
            <p className="text-white text-2xl">{assets.filter(a => a.status === 'available').length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-white/70 text-sm mb-1">In Use</p>
            <p className="text-white text-2xl">{assets.filter(a => a.status === 'in_use').length}</p>
          </div>
        </div>
      </div>

      {/* Audit Log Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-slide-up max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-gray-800">📋 Audit Log</h2>
              <button
                onClick={() => setShowHistory(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {auditLog.map((entry) => (
                <div key={entry.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-b-0">
                  <div className="shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      entry.action === 'borrowed' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                    }`}>
                      {entry.action === 'borrowed' ? '📤' : '📥'}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">
                      <span className="font-medium">{entry.userName}</span>
                      {' '}{entry.action === 'borrowed' ? 'borrowed' : 'returned'}{' '}
                      <span className="font-medium">{entry.assetName}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{entry.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Assets Grid */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-2 gap-4">
          {assets.map((asset) => (
            <div key={asset.id} className="bg-white rounded-2xl p-5 shadow-lg">
              {/* Asset Icon */}
              <div className="text-4xl mb-4 text-center">{asset.icon}</div>

              {/* Asset Name */}
              <h3 className="text-gray-800 text-center mb-3">{asset.name}</h3>

              {/* Status Indicator */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <Circle
                  size={10}
                  className={asset.status === 'available' ? 'text-emerald-500 fill-current' : 'text-rose-500 fill-current'}
                />
                <span className={`text-sm ${
                  asset.status === 'available' ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {asset.status === 'available' ? 'Available' : 'In Use'}
                </span>
              </div>

              {/* Info */}
              {asset.status === 'in_use' && asset.borrowedBy && (
                <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 mb-3">
                  <p className="text-xs text-rose-600 mb-1">Held by</p>
                  <p className="text-sm text-gray-800">{asset.borrowedBy}</p>
                  <p className="text-xs text-gray-500 mt-1">Since {asset.borrowedSince}</p>
                </div>
              )}

              {asset.status === 'available' && asset.lastBorrowed && (
                <p className="text-xs text-gray-500 text-center mb-3">{asset.lastBorrowed}</p>
              )}

              {/* Action Button */}
              {asset.status === 'available' ? (
                <button
                  onClick={() => handleBorrow(asset.name)}
                  className="w-full bg-[#FF4D6D] text-white py-2.5 rounded-xl hover:bg-[#ff3355] transition-colors"
                >
                  Borrow
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-100 text-gray-400 py-2.5 rounded-xl cursor-not-allowed"
                >
                  Unavailable
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 bg-white rounded-2xl p-5 shadow-lg">
          <h3 className="text-gray-800 mb-4">Legend</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Circle size={12} className="text-emerald-500 fill-current" />
              <span className="text-sm text-gray-600">Available for borrowing</span>
            </div>
            <div className="flex items-center gap-3">
              <Circle size={12} className="text-rose-500 fill-current" />
              <span className="text-sm text-gray-600">Currently in use by another student</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
