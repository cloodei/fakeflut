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
    alert(`Pinging ${event.responses.noResponse} classmates for ${event.title}`);
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
      <section className="rounded-[34px] border border-[#DDE2FB] bg-linear-to-br from-white to-[#F3F5FF] px-5 py-5 shadow-[0_16px_38px_rgba(30,45,102,0.15)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#7D89B7]">{className}</p>
            <h1 className="text-2xl font-semibold text-[#0E1B3D]">Events & Attendance</h1>
            <p className="text-sm text-[#7B86B0]">RSVP orchestration, check-ins, and nudges.</p>
          </div>
          <button
            onClick={() => setShowAdminView(!showAdminView)}
            className={`flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-semibold transition ${
              showAdminView
                ? 'border-[#FFD6E4] bg-[#FFF5F8] text-[#C53F6F]'
                : 'border-[#E0E6FF] bg-white/80 text-[#2E58FF]'
            }`}
          >
            <Users size={16} /> {showAdminView ? 'Admin view' : 'User view'}
          </button>
        </div>
      </section>

      {showQRCode && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-6 backdrop-blur">
          <div className="w-full max-w-sm rounded-[34px] border border-[#E1E6FA] bg-[#FBFCFF] p-6 text-center shadow-[0_30px_55px_rgba(8,12,28,0.45)]">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#7D89B7]">Smart check-in</p>
            <h2 className="text-2xl font-semibold text-[#0E1B3D]">{selectedEvent.title}</h2>
            <p className="text-sm text-[#7F8AB7]">Show this at the entrance to confirm attendance.</p>
            <div className="mt-5 rounded-[30px] border border-dashed border-[#C7D1F1] bg-white/80 p-6">
              <div className="flex items-center justify-center rounded-[24px] border border-[#E4E9FF] bg-[#F6F8FF] p-6">
                <QrCode size={120} className="text-[#B2BBDC]" />
              </div>
            </div>
            <button
              onClick={() => setShowQRCode(false)}
              className="mt-6 w-full rounded-[24px] bg-linear-to-r from-[#47A0FF] via-[#2F6BFF] to-[#2E36FF] py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <section className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="rounded-[32px] border border-[#DFE4FB] bg-white/95 px-5 py-5 shadow-[0_12px_28px_rgba(25,39,94,0.12)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-[#0E1B3D]">{event.title}</h3>
                  <p className="text-sm text-[#5B678C]">{event.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-[#5B678C]">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-[#2F3E9E]" />
                    <span>
                      {event.date} · {event.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#2F3E9E]" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {event.userResponse && !showAdminView && (
              <div
                className={`mt-4 flex items-center gap-2 rounded-[22px] border px-3 py-3 text-sm ${
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
              <div className="mt-4 flex flex-col gap-3">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleResponse(event.id, 'registered')}
                    disabled={event.userResponse === 'registered'}
                    className={`flex-1 rounded-[24px] py-3 text-sm font-semibold uppercase tracking-[0.25em] ${
                      event.userResponse === 'registered'
                        ? 'bg-[#F3F5FF] text-[#A7B2D7]'
                        : 'bg-[#2F3E9E] text-white shadow-[0_12px_28px_rgba(47,62,158,0.3)]'
                    }`}
                  >
                    Join
                  </button>
                  <button
                    onClick={() => handleResponse(event.id, 'declined')}
                    disabled={event.userResponse === 'declined'}
                    className={`flex-1 rounded-[24px] border py-3 text-sm font-semibold uppercase tracking-[0.25em] ${
                      event.userResponse === 'declined'
                        ? 'border-[#E0E7FF] text-[#C3CADF]'
                        : 'border-[#E0E7FF] text-[#5B678C]'
                    }`}
                  >
                    Decline
                  </button>
                </div>
                <button
                  onClick={() => handlePingNonResponders(event)}
                  disabled={event.responses.noResponse === 0}
                  className={`flex items-center justify-center gap-2 rounded-[24px] border border-dashed py-3 text-sm font-semibold ${
                    event.responses.noResponse === 0
                      ? 'border-[#E6E9FF] text-[#B7BEDC]'
                      : 'border-[#FFCA7A] text-[#7B4100]'
                  }`}
                >
                  Ping non-responders ({event.responses.noResponse})
                </button>
              </div>
            )}

            {showAdminView && (
              <div className="mt-4 space-y-4 rounded-[28px] border border-[#E0E7FF] bg-[#F9FAFF] p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-[#0E1B3D]">Response telemetry</h4>
                  <button
                    onClick={() => handleShowQR(event)}
                    className="rounded-full border border-[#D9DFF7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#2E58FF]"
                  >
                    QR
                  </button>
                </div>
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
                    className={`flex-1 rounded-[22px] py-3 text-sm font-semibold ${
                      event.responses.noResponse === 0
                        ? 'bg-[#F3F5FF] text-[#A7B2D7]'
                        : 'bg-[#FFCA7A] text-[#7B4100]'
                    }`}
                  >
                    Ping non-responders ({event.responses.noResponse})
                  </button>
                  <button
                    onClick={() => handleShowQR(event)}
                    className="rounded-[22px] border border-[#E0E7FF] px-4 py-3 text-sm font-semibold text-[#2E58FF]"
                  >
                    Generate QR
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center justify-around rounded-[26px] border border-[#E0E7FF] bg-[#F9FAFF] px-4 py-3 text-center text-sm">
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
