import { useState } from 'react';
import { TrendingUp, TrendingDown, Receipt, AlertCircle, Download, Plus } from 'lucide-react';

type TransactionType = 'income' | 'expense';

interface Transaction {
  id: number;
  type: TransactionType;
  description: string;
  amount: number;
  date: string;
  hasReceipt: boolean;
  category: string;
}

interface DebtEntry {
  id: number;
  studentName: string;
  studentId: string;
  amountDue: number;
  dueDate: string;
}

interface FundsProps {
  onCreateClick: () => void;
}

export default function Funds({ onCreateClick }: FundsProps) {
  const [showDebtList, setShowDebtList] = useState(true);
  const totalBalance = 5000000;

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      type: 'income',
      description: 'Monthly Class Fee - January',
      amount: 2000000,
      date: 'Jan 15, 2024',
      hasReceipt: false,
      category: 'Contribution'
    },
    {
      id: 2,
      type: 'expense',
      description: 'Class Party Supplies',
      amount: 800000,
      date: 'Jan 20, 2024',
      hasReceipt: true,
      category: 'Event'
    },
    {
      id: 3,
      type: 'income',
      description: 'Equipment Sale',
      amount: 500000,
      date: 'Jan 22, 2024',
      hasReceipt: false,
      category: 'Other'
    },
    {
      id: 4,
      type: 'expense',
      description: 'Whiteboard Markers & Erasers',
      amount: 150000,
      date: 'Jan 25, 2024',
      hasReceipt: true,
      category: 'Supplies'
    },
    {
      id: 5,
      type: 'expense',
      description: 'Teacher Appreciation Gift',
      amount: 300000,
      date: 'Jan 28, 2024',
      hasReceipt: true,
      category: 'Gift'
    },
    {
      id: 6,
      type: 'income',
      description: 'Late Payment - Sarah Lee',
      amount: 500000,
      date: 'Feb 1, 2024',
      hasReceipt: false,
      category: 'Contribution'
    }
  ]);

  const debtList: DebtEntry[] = [
    {
      id: 1,
      studentName: 'Mike Chen',
      studentId: '20123456',
      amountDue: 500000,
      dueDate: 'Overdue by 5 days'
    },
    {
      id: 2,
      studentName: 'Emma Wilson',
      studentId: '20123457',
      amountDue: 500000,
      dueDate: 'Due in 2 days'
    },
    {
      id: 3,
      studentName: 'Alex Johnson',
      studentId: '20123458',
      amountDue: 500000,
      dueDate: 'Overdue by 2 days'
    }
  ];

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const formatCurrency = (amount: number) => {
    return `₫${amount.toLocaleString('vi-VN')}`;
  };

  return (
    <div className="relative space-y-6">
      <section className="rounded-3xl border border-white/40 bg-linear-to-br from-[#1F2F78] to-[#3F73FF] px-5 py-5 text-white shadow-[0_20px_45px_rgba(36,61,136,0.35)]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/70">Total Fund</p>
            <p className="text-3xl font-semibold">{formatCurrency(totalBalance)}</p>
            <p className="text-xs text-white/70">Updated 3 mins ago</p>
          </div>
          <button className="flex items-center gap-1 rounded-2xl border border-white/30 px-3 py-2 text-xs font-semibold">
            <Download size={14} /> Export
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl border border-white/25 bg-white/10 px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/75">Income</p>
            <p className="text-lg font-semibold">{formatCurrency(totalIncome)}</p>
          </div>
          <div className="rounded-2xl border border-white/25 bg-white/10 px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/75">Expenses</p>
            <p className="text-lg font-semibold">{formatCurrency(totalExpense)}</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-[#EAD9E1] bg-white px-5 py-5 shadow-[0_12px_35px_rgba(203,149,166,0.15)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#C26A7A]">Unpaid members</p>
            <p className="text-base font-semibold text-[#0E1B3D]">{debtList.length} students owing</p>
          </div>
          <button
            onClick={() => setShowDebtList((prev) => !prev)}
            className="text-xs font-semibold text-[#E05264]"
          >
            {showDebtList ? 'Hide' : 'Reveal'} list
          </button>
        </div>
        {showDebtList && (
          <div className="mt-4 space-y-3">
            {debtList.map((debt) => (
              <div key={debt.id} className="rounded-2xl border border-[#F5CED6] bg-[#FFF6F8] px-4 py-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#0E1B3D]">{debt.studentName}</p>
                    <p className="text-xs text-[#8B95BF]">ID · {debt.studentId}</p>
                  </div>
                  <p className="text-sm font-semibold text-[#E05264]">{formatCurrency(debt.amountDue)}</p>
                </div>
                <p className={`text-xs ${debt.dueDate.includes('Overdue') ? 'text-[#E05264]' : 'text-[#C26A2B]'}`}>{debt.dueDate}</p>
              </div>
            ))}
            <p className="text-center text-[11px] uppercase tracking-[0.3em] text-[#C26A7A]">
              Transparency keeps everyone accountable
            </p>
          </div>
        )}
      </section>

      <section className="space-y-4 rounded-3xl border border-[#E3E9FF] bg-white px-5 py-5 shadow-[0_12px_35px_rgba(151,168,226,0.18)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#9AA3C7]">Ledger</p>
            <h3 className="text-lg font-semibold text-[#0E1B3D]">Transaction history</h3>
          </div>
          <span className="rounded-2xl border border-[#E0E7FF] px-3 py-1 text-[11px] text-[#6B7AA8]">Auto-synced</span>
        </div>

        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="rounded-3xl border border-[#EEF1FF] px-4 py-3">
              <div className="flex items-start gap-3">
                <div
                  className={`flex size-12 items-center justify-center rounded-2xl ${
                    transaction.type === 'income' ? 'bg-[#E8F7F1] text-[#1BA37A]' : 'bg-[#FFEFF1] text-[#E05264]'
                  }`}
                >
                  {transaction.type === 'income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                </div>
                <div className="flex-1 text-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-[#0E1B3D]">{transaction.description}</p>
                      <p className="text-xs text-[#8B95BF]">
                        {transaction.category} • {transaction.date}
                      </p>
                    </div>
                    <p
                      className={`text-base font-semibold ${
                        transaction.type === 'income' ? 'text-[#1BA37A]' : 'text-[#E05264]'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                  </div>
                  {transaction.hasReceipt && (
                    <div className="mt-3 flex items-center gap-2 rounded-2xl border border-[#E0E7FF] bg-[#F7F9FF] px-3 py-2 text-xs text-[#3F73FF]">
                      <Receipt size={14} /> Evidence attached
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-[#E3E9FF] bg-[#F9FAFF] px-4 py-4">
          <div className="flex items-center justify-between border-b border-[#EBEEFD] pb-3 text-sm text-[#5B678C]">
            <span>Total contributions</span>
            <span className="font-semibold text-[#1BA37A]">{formatCurrency(totalIncome)}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#EBEEFD] py-3 text-sm text-[#5B678C]">
            <span>Total expenses</span>
            <span className="font-semibold text-[#E05264]">{formatCurrency(totalExpense)}</span>
          </div>
          <div className="flex items-center justify-between pt-3 text-sm text-[#0E1B3D]">
            <span>Current balance</span>
            <span className="text-lg font-semibold text-[#1BA37A]">{formatCurrency(totalBalance)}</span>
          </div>
        </div>

        <div className="rounded-3xl border border-[#E0E7FF] bg-[#F5F7FF] px-4 py-4 text-sm text-[#5B678C]">
          <div className="flex items-center gap-3">
            <AlertCircle size={18} className="text-[#3F73FF]" />
            <p>Expenses are approved only with receipts—keep uploads within 24h.</p>
          </div>
        </div>
      </section>

      {/* FAB Button */}
      <button
        onClick={onCreateClick}
        className="fixed bottom-24 right-8 z-30 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1a1a2e] text-white shadow-lg shadow-[#1a1a2e]/30 transition-all hover:scale-105 hover:shadow-xl active:scale-95"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}
