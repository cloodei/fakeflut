import { useState } from 'react';
import { Calendar, MapPin, Users, QrCode, Check, X } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface EventItem {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  responses: {
    registered: number;
    declined: number;
    noResponse: number;
  };
  userResponse?: 'registered' | 'declined' | null;
}

interface EventsProps {
  className: string;
}

export default function Events({ className }: EventsProps) {
  const [showAdminView, setShowAdminView] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const [events, setEvents] = useState<EventItem[]>([
    {
      id: 1,
      title: 'Class Party',
      date: 'Dec 1, 2024',
      time: '18:00 - 22:00',
      location: 'University Cafeteria',
      description: 'End-of-semester celebration with food and games!',
      responses: { registered: 18, declined: 3, noResponse: 9 },
      userResponse: null
    },
    {
      id: 2,
      title: 'Study Group Session',
      date: 'Nov 30, 2024',
      time: '14:00 - 17:00',
      location: 'Library Room 302',
      description: 'Final exam preparation session',
      responses: { registered: 22, declined: 5, noResponse: 3 },
      userResponse: 'registered'
    },
    {
      id: 3,
      title: 'Guest Lecture: AI in Education',
      date: 'Dec 5, 2024',
      time: '15:00 - 17:00',
      location: 'Auditorium A',
      description: 'Special guest speaker from Google',
      responses: { registered: 15, declined: 2, noResponse: 13 },
      userResponse: null
    }
  ]);

  const handleResponse = (eventId: number, response: 'registered' | 'declined') => {
    setEvents((prev) =>
      prev.map((event) => {
        if (event.id !== eventId) return event;
        const updated = { ...event.responses };

        if (event.userResponse === null) {
          updated.noResponse -= 1;
        } else if (event.userResponse === 'registered') {
          updated.registered -= 1;
        } else {
          updated.declined -= 1;
        }

        if (response === 'registered') {
          updated.registered += 1;
        } else {
          updated.declined += 1;
        }

        return {
          ...event,
          userResponse: response,
          responses: updated
        };
      })
    );
  };

  const handlePingNonResponders = (event: EventItem) => {
    alert(`Sending reminder to ${event.responses.noResponse} students who have not responded to "${event.title}"`);
  };

  const handleShowQR = (event: EventItem) => {
    setSelectedEvent(event);
    setShowQRCode(true);
  };

  const getChartData = (event: EventItem) => [
    { name: 'Registered', value: event.responses.registered, color: '#1BA37A' },
    { name: 'Declined', value: event.responses.declined, color: '#FF6B6B' },
    { name: 'No Response', value: event.responses.noResponse, color: '#A0AEC0' }
  ];

  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-[#E3E9FF] bg-white px-5 py-5 shadow-[0_12px_30px_rgba(151,168,226,0.18)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#9AA3C7]">{className}</p>
            <h1 className="text-2xl font-semibold text-[#0E1B3D]">Events & Attendance</h1>
          </div>
          <button
            onClick={() => setShowAdminView(!showAdminView)}
            className="flex items-center gap-2 rounded-2xl border border-[#E0E7FF] px-3 py-2 text-xs font-semibold text-[#3F73FF]"
          >
            <Users size={16} /> {showAdminView ? 'User View' : 'Admin View'}
          </button>
        </div>
      </section>

      {showQRCode && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-6">
          <div className="w-full max-w-sm rounded-3xl border border-[#E0E7FF] bg-white p-6 shadow-[0_25px_65px_rgba(35,55,125,0.2)]">
            <h2 className="text-xl font-semibold text-[#0E1B3D]">Check-in QR Code</h2>
            <p className="text-sm text-[#8B95BF]">{selectedEvent.title}</p>
            <div className="mt-5 flex items-center justify-center rounded-2xl border border-[#E0E7FF] bg-[#F8FAFF] p-6">
              <div className="flex size-40 items-center justify-center rounded-2xl border border-dashed border-[#BAC3DE]">
                <QrCode size={120} className="text-[#BAC3DE]" />
              </div>
            </div>
            <button
              onClick={() => setShowQRCode(false)}
              className="mt-6 w-full rounded-2xl bg-linear-to-r from-[#7DE2FF] to-[#598BFF] py-3 text-sm font-semibold text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <section className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="rounded-3xl border border-[#E0E7FF] bg-white px-5 py-5 shadow-[0_8px_25px_rgba(151,168,226,0.15)]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-[#0E1B3D]">{event.title}</h3>
                  <p className="text-sm text-[#5B678C]">{event.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-[#5B678C]">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-[#3F73FF]" />
                    <span>{event.date} · {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#3F73FF]" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {event.userResponse && (
              <div
                className={`mt-4 flex items-center gap-2 rounded-2xl border px-3 py-3 text-sm ${
                  event.userResponse === 'registered'
                    ? 'border-[#B1E5D4] bg-[#F0FBF7] text-[#1BA37A]'
                    : 'border-[#F8C5CD] bg-[#FFF1F3] text-[#E05264]'
                }`}
              >
                {event.userResponse === 'registered' ? <Check size={16} /> : <X size={16} />}
                {event.userResponse === 'registered'
                  ? "You're registered for this event"
                  : 'You declined this event'}
              </div>
            )}

            {!showAdminView && (
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleResponse(event.id, 'registered')}
                  disabled={event.userResponse === 'registered'}
                  className={`flex-1 rounded-2xl py-3 text-sm font-semibold ${
                    event.userResponse === 'registered'
                      ? 'bg-[#F3F5FF] text-[#BAC3DE]'
                      : 'bg-linear-to-r from-[#7DE2FF] to-[#598BFF] text-white shadow-[0_10px_25px_rgba(108,139,255,0.25)]'
                  }`}
                >
                  Join now
                </button>
                <button
                  onClick={() => handleResponse(event.id, 'declined')}
                  disabled={event.userResponse === 'declined'}
                  className={`flex-1 rounded-2xl border py-3 text-sm font-semibold ${
                    event.userResponse === 'declined'
                      ? 'border-[#E0E7FF] text-[#C3CADF]'
                      : 'border-[#E0E7FF] text-[#5B678C]'
                  }`}
                >
                  Decline
                </button>
              </div>
            )}

            {showAdminView && (
              <div className="mt-4 space-y-4 rounded-2xl border border-[#E0E7FF] bg-[#F9FAFF] p-4">
                <h4 className="text-sm font-semibold text-[#0E1B3D]">Response statistics</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getChartData(event)}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {getChartData(event).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handlePingNonResponders(event)}
                    disabled={event.responses.noResponse === 0}
                    className={`flex-1 rounded-2xl py-3 text-sm font-semibold ${
                      event.responses.noResponse === 0
                        ? 'bg-[#F3F5FF] text-[#BAC3DE]'
                        : 'bg-[#FFCA7A] text-[#7B4100]'
                    }`}
                  >
                    Ping non-responders ({event.responses.noResponse})
                  </button>
                  <button
                    onClick={() => handleShowQR(event)}
                    className="rounded-2xl border border-[#E0E7FF] px-4 py-3 text-sm font-semibold text-[#3F73FF]"
                  >
                    Generate QR
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center justify-around rounded-2xl border border-[#E0E7FF] bg-[#F9FAFF] px-4 py-3 text-center text-sm">
              <div>
                <p className="text-xl font-semibold text-[#1BA37A]">{event.responses.registered}</p>
                <p className="text-xs text-[#8B95BF]">Registered</p>
              </div>
              <div className="h-10 w-px bg-[#E0E7FF]" />
              <div>
                <p className="text-xl font-semibold text-[#FF6B6B]">{event.responses.declined}</p>
                <p className="text-xs text-[#8B95BF]">Declined</p>
              </div>
              <div className="h-10 w-px bg-[#E0E7FF]" />
              <div>
                <p className="text-xl font-semibold text-[#A0AEC0]">{event.responses.noResponse}</p>
                <p className="text-xs text-[#8B95BF]">No response</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
