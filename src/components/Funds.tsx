import { useState } from 'react';
import { TrendingUp, TrendingDown, Receipt, AlertCircle, Download } from 'lucide-react';

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

export default function Funds() {
  const [showDebtList, setShowDebtList] = useState(false);
  const totalBalance = 5000000;

  const transactions: Transaction[] = [
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
  ];

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
    <div className="min-h-screen bg-[#303080]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#303080] to-[#3838a0] px-6 pt-12 pb-6">
        <h1 className="text-white text-2xl mb-6">Class Fund</h1>

        {/* Balance Display */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 shadow-2xl mb-4">
          <p className="text-white/80 text-sm mb-2">Total Fund Balance</p>
          <p className="text-white text-4xl mb-4">{formatCurrency(totalBalance)}</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <p className="text-white/80 text-xs mb-1">Total Income</p>
              <p className="text-white text-lg">{formatCurrency(totalIncome)}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <p className="text-white/80 text-xs mb-1">Total Expense</p>
              <p className="text-white text-lg">{formatCurrency(totalExpense)}</p>
            </div>
          </div>
        </div>

        {/* Debt Alert */}
        {debtList.length > 0 && (
          <button
            onClick={() => setShowDebtList(!showDebtList)}
            className="w-full bg-rose-500 text-white rounded-xl p-4 flex items-center justify-between hover:bg-rose-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              <AlertCircle size={24} />
              <div className="text-left">
                <p className="text-sm">Unpaid Members</p>
                <p className="text-xs text-white/80">{debtList.length} students have pending payments</p>
              </div>
            </div>
            <span className="text-2xl">{showDebtList ? '▼' : '▶'}</span>
          </button>
        )}
      </div>

      {/* Debt List */}
      {showDebtList && (
        <div className="px-6 py-4 bg-rose-50 border-t-4 border-rose-500">
          <h3 className="text-gray-800 mb-4">💸 Debt List</h3>
          <div className="space-y-3">
            {debtList.map((debt) => (
              <div key={debt.id} className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-rose-500">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-gray-800">{debt.studentName}</p>
                    <p className="text-sm text-gray-500">ID: {debt.studentId}</p>
                  </div>
                  <p className="text-rose-600">{formatCurrency(debt.amountDue)}</p>
                </div>
                <p className={`text-xs ${
                  debt.dueDate.includes('Overdue') ? 'text-rose-600' : 'text-amber-600'
                }`}>
                  {debt.dueDate}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center italic">
            Transparency creates positive peer pressure for timely payments
          </p>
        </div>
      )}

      {/* Transactions */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white">Transaction History</h2>
          <button className="text-white/70 text-sm flex items-center gap-1 hover:text-white">
            <Download size={16} />
            Export
          </button>
        </div>

        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  transaction.type === 'income' 
                    ? 'bg-emerald-100 text-emerald-600' 
                    : 'bg-rose-100 text-rose-600'
                }`}>
                  {transaction.type === 'income' ? (
                    <TrendingUp size={24} />
                  ) : (
                    <TrendingDown size={24} />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="text-gray-800">{transaction.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{transaction.category} • {transaction.date}</p>
                    </div>
                    <p className={`text-lg ${
                      transaction.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                  </div>

                  {/* Receipt Indicator */}
                  {transaction.hasReceipt && (
                    <div className="mt-3 flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                      <Receipt size={16} className="text-blue-600" />
                      <span className="text-xs text-blue-600">Receipt Attached</span>
                      <button className="ml-auto text-xs text-blue-600 hover:underline">
                        View
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="mt-6 bg-white rounded-2xl p-5 shadow-lg">
          <h3 className="text-gray-800 mb-4">Financial Summary</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Total Contributions</span>
              <span className="text-emerald-600">{formatCurrency(totalIncome)}</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Total Expenses</span>
              <span className="text-rose-600">{formatCurrency(totalExpense)}</span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-gray-800">Current Balance</span>
              <span className="text-xl text-emerald-600">{formatCurrency(totalBalance)}</span>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <div className="text-blue-600 text-xl">💡</div>
            <div>
              <p className="text-sm text-blue-800">
                All expenses must have receipts attached for transparency and accountability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
