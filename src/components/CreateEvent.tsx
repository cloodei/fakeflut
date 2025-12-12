import { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, Users, AlignLeft } from 'lucide-react';

interface CreateEventProps {
  onBack: () => void;
  onSubmit: (event: {
    name: string;
    location: string;
    eventTime: string;
    signupEndTime: string;
    maxAssignees: number;
    description: string;
  }) => void;
}

export default function CreateEvent({ onBack, onSubmit }: CreateEventProps) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [signupEndTime, setSignupEndTime] = useState('');
  const [maxAssignees, setMaxAssignees] = useState<number | ''>('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({
      name: name.trim(),
      location: location.trim() || 'TBD',
      eventTime: eventTime || 'TBD',
      signupEndTime: signupEndTime || '',
      maxAssignees: typeof maxAssignees === 'number' ? maxAssignees : 0,
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
          <p className="text-[14px] font-semibold text-[#1a1a2e]">Create an event</p>
          <p className="text-[11px] text-[#8b8b9e]">Plan something exciting for your class</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-1 flex-col space-y-4 overflow-y-auto">
        {/* Name Field */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#6b6b80]">
            <Calendar size={13} />
            Event Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Study Group Session"
            className="w-full rounded-xl border border-[#e5e5ec] bg-white px-4 py-3 text-[14px] placeholder:text-[#a0a0b0] focus:border-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/5"
          />
        </div>

        {/* Location Field */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#6b6b80]">
            <MapPin size={13} />
            Location
          </label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Library Room 302"
            className="w-full rounded-xl border border-[#e5e5ec] bg-white px-4 py-3 text-[14px] placeholder:text-[#a0a0b0] focus:border-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/5"
          />
          <p className="text-[10px] text-[#a0a0b0]">Where will this take place?</p>
        </div>

        {/* Time Fields - Side by Side */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#6b6b80]">
              <Clock size={12} />
              Event Start
            </label>
            <input
              type="datetime-local"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              className="w-full rounded-xl border border-[#e5e5ec] bg-white px-3 py-2.5 text-[13px] focus:border-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/5"
            />
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#6b6b80]">
              <Clock size={12} />
              Signup Ends
            </label>
            <input
              type="datetime-local"
              value={signupEndTime}
              onChange={(e) => setSignupEndTime(e.target.value)}
              className="w-full rounded-xl border border-[#e5e5ec] bg-white px-3 py-2.5 text-[13px] focus:border-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/5"
            />
          </div>
        </div>

        {/* Max Assignees Field */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#6b6b80]">
            <Users size={13} />
            Max Attendees Needed
          </label>
          <input
            type="number"
            min={1}
            value={maxAssignees}
            onChange={(e) => setMaxAssignees(e.target.value ? parseInt(e.target.value) : '')}
            placeholder="e.g. 30"
            className="w-full rounded-xl border border-[#e5e5ec] bg-white px-4 py-3 text-[14px] placeholder:text-[#a0a0b0] focus:border-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/5"
          />
          <p className="text-[10px] text-[#a0a0b0]">Leave empty for unlimited capacity</p>
        </div>

        {/* Description Field */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#6b6b80]">
            <AlignLeft size={13} />
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's this event about? Add details, agenda, or what to bring..."
            rows={3}
            className="w-full resize-none rounded-xl border border-[#e5e5ec] bg-white px-4 py-3 text-[14px] placeholder:text-[#a0a0b0] focus:border-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/5"
          />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full rounded-xl bg-[#1a1a2e] py-3.5 text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-[#2a2a3e] disabled:opacity-50"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
