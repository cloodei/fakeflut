import { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, FileText, Coins, Tag, Camera, Receipt } from 'lucide-react';

type TransactionType = 'income' | 'expense';

interface CreateFundLogProps {
  onBack: () => void;
  onSubmit: (log: {
    type: TransactionType;
    description: string;
    amount: number;
    category: string;
    hasReceipt: boolean;
  }) => void;
}

const INCOME_CATEGORIES = ['Contribution', 'Late Payment', 'Donation', 'Fundraiser', 'Other'];
const EXPENSE_CATEGORIES = ['Event', 'Supplies', 'Gift', 'Equipment', 'Food', 'Other'];

export default function CreateFundLog({ onBack, onSubmit }: CreateFundLogProps) {
  const [type, setType] = useState<TransactionType>('income');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [hasReceipt, setHasReceipt] = useState(false);

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const isIncome = type === 'income';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount.replace(/,/g, ''));
    if (!description.trim() || isNaN(parsedAmount) || parsedAmount <= 0) return;
    onSubmit({
      type,
      description: description.trim(),
      amount: parsedAmount,
      category: category || 'Other',
      hasReceipt
    });
  };

  const formatAmountInput = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (!numbers) return '';
    return parseInt(numbers).toLocaleString('vi-VN');
  };

  return (
    <div className="flex min-h-[620px] flex-col text-[#1a1a2e]">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <button
          onClick={onBack}
          className="rounded-xl border border-[#e5e5ec] bg-white p-2 text-[#1a1a2e]"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <p className="text-[14px] font-semibold text-[#1a1a2e]">Log a transaction</p>
          <p className="text-[11px] text-[#8b8b9e]">Keep your class funds transparent</p>
        </div>
      </div>

      {/* Type Toggle */}
      <div className="mb-5 rounded-xl border border-[#e5e5ec] bg-[#f5f6f8] p-1">
        <div className="grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-[13px] font-semibold transition-all ${
              type === 'income'
                ? 'bg-white text-[#1BA37A] shadow-sm'
                : 'text-[#8b8b9e] hover:text-[#6b6b80]'
            }`}
          >
            <TrendingUp size={16} />
            Income
          </button>
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-[13px] font-semibold transition-all ${
              type === 'expense'
                ? 'bg-white text-[#E05264] shadow-sm'
                : 'text-[#8b8b9e] hover:text-[#6b6b80]'
            }`}
          >
            <TrendingDown size={16} />
            Expense
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-1 flex-col space-y-4">
        {/* Description Field */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#6b6b80]">
            <FileText size={13} />
            Description
          </label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={isIncome ? 'e.g. Monthly class fee collection' : 'e.g. Class party supplies'}
            className="w-full rounded-xl border border-[#e5e5ec] bg-white px-4 py-3 text-[14px] placeholder:text-[#a0a0b0] focus:border-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/5"
          />
          <p className="text-[10px] text-[#a0a0b0]">What is this transaction for?</p>
        </div>

        {/* Amount Field */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#6b6b80]">
            <Coins size={13} />
            Amount (VND)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] font-medium text-[#6b6b80]">₫</span>
            <input
              type="text"
              inputMode="numeric"
              value={amount}
              onChange={(e) => setAmount(formatAmountInput(e.target.value))}
              placeholder="0"
              className="w-full rounded-xl border border-[#e5e5ec] bg-white py-3 pl-8 pr-4 text-[14px] placeholder:text-[#a0a0b0] focus:border-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/5"
            />
          </div>
        </div>

        {/* Category Field */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#6b6b80]">
            <Tag size={13} />
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-lg border px-3 py-2 text-[12px] font-medium transition-all ${
                  category === cat
                    ? 'border-[#1a1a2e] bg-[#1a1a2e] text-white'
                    : 'border-[#e5e5ec] bg-white text-[#6b6b80] hover:border-[#c5c5d0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Receipt Upload (Expense only) */}
        {type === 'expense' && (
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#6b6b80]">
              <Receipt size={13} />
              Receipt / Evidence
            </label>
            <button
              type="button"
              onClick={() => setHasReceipt(!hasReceipt)}
              className={`flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed py-3.5 text-[13px] font-medium transition-all ${
                hasReceipt
                  ? 'border-[#1BA37A] bg-[#E8F7F1] text-[#1BA37A]'
                  : 'border-[#e5e5ec] text-[#8b8b9e] hover:border-[#c5c5d0] hover:text-[#6b6b80]'
              }`}
            >
              <Camera size={18} />
              {hasReceipt ? 'Receipt attached ✓' : 'Tap to attach receipt'}
            </button>
            <p className="text-[10px] text-[#a0a0b0]">Expenses require proof for transparency</p>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!description.trim() || !amount}
          className={`w-full rounded-xl py-3.5 text-[14px] font-semibold text-white shadow-sm transition-all disabled:opacity-50 ${
            isIncome 
              ? 'bg-[#1BA37A] hover:bg-[#159968]' 
              : 'bg-[#E05264] hover:bg-[#d0435a]'
          }`}
        >
          Log {isIncome ? 'Income' : 'Expense'}
        </button>
      </form>
    </div>
  );
}
