import { useState } from 'react';
import { ArrowLeft, ClipboardList, Calendar, AlignLeft } from 'lucide-react';

interface CreateDutyProps {
  onBack: () => void;
  onSubmit: (duty: { name: string; deadline: string; description: string }) => void;
}

export default function CreateDuty({ onBack, onSubmit }: CreateDutyProps) {
  const [name, setName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({
      name: name.trim(),
      deadline: deadline || 'No deadline set',
      description: description.trim()
    });
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
          <p className="text-[14px] font-semibold text-[#1a1a2e]">Create a duty</p>
          <p className="text-[11px] text-[#8b8b9e]">Assign a new task to your class</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-1 flex-col space-y-5">
        {/* Name Field */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#6b6b80]">
            <ClipboardList size={13} />
            Task Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Clean whiteboard after class"
            className="w-full rounded-xl border border-[#e5e5ec] bg-white px-4 py-3 text-[14px] placeholder:text-[#a0a0b0] focus:border-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/5"
          />
          <p className="text-[10px] text-[#a0a0b0]">Be specific so everyone knows what to do</p>
        </div>

        {/* Deadline Field */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#6b6b80]">
            <Calendar size={13} />
            Deadline
          </label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full rounded-xl border border-[#e5e5ec] bg-white px-4 py-3 text-[14px] focus:border-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/5"
          />
          <p className="text-[10px] text-[#a0a0b0]">When should this task be completed?</p>
        </div>

        {/* Description Field */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#6b6b80]">
            <AlignLeft size={13} />
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add any additional details, instructions, or notes..."
            rows={4}
            className="w-full resize-none rounded-xl border border-[#e5e5ec] bg-white px-4 py-3 text-[14px] placeholder:text-[#a0a0b0] focus:border-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/5"
          />
          <p className="text-[10px] text-[#a0a0b0]">Optional: Provide context or special instructions</p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full rounded-xl bg-[#1a1a2e] py-3.5 text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-[#2a2a3e] disabled:opacity-50"
        >
          Create Duty
        </button>
      </form>
    </div>
  );
}
