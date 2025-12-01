import { useState } from 'react';
import { Calendar, MapPin, Users, Bell, QrCode, Check, X } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface Event {
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

export default function Events() {
  const [showAdminView, setShowAdminView] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Class Party',
      date: 'Dec 1, 2024',
      time: '6:00 PM - 10:00 PM',
      location: 'University Cafeteria',
      description: 'End of semester celebration with food and games!',
      responses: {
        registered: 18,
        declined: 3,
        noResponse: 9
      },
      userResponse: null
    },
    {
      id: 2,
      title: 'Study Group Session',
      date: 'Nov 30, 2024',
      time: '2:00 PM - 5:00 PM',
      location: 'Library Room 302',
      description: 'Final exam preparation session',
      responses: {
        registered: 22,
        declined: 5,
        noResponse: 3
      },
      userResponse: 'registered'
    },
    {
      id: 3,
      title: 'Guest Lecture: AI in Education',
      date: 'Dec 5, 2024',
      time: '3:00 PM - 5:00 PM',
      location: 'Auditorium A',
      description: 'Special guest speaker from Google',
      responses: {
        registered: 15,
        declined: 2,
        noResponse: 13
      },
      userResponse: null
    }
  ]);

  const handleResponse = (eventId: number, response: 'registered' | 'declined') => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        const updatedResponses = { ...event.responses };
        
        if (event.userResponse === null) {
          updatedResponses.noResponse--;
        } else if (event.userResponse === 'registered') {
          updatedResponses.registered--;
        } else {
          updatedResponses.declined--;
        }

        if (response === 'registered') {
          updatedResponses.registered++;
        } else {
          updatedResponses.declined++;
        }

        return {
          ...event,
          userResponse: response,
          responses: updatedResponses
        };
      }
      return event;
    }));
  };

  const handlePingNonResponders = (event: Event) => {
    alert(`Sending reminder to ${event.responses.noResponse} students who haven't responded to "${event.title}"`);
  };

  const handleShowQR = (event: Event) => {
    setSelectedEvent(event);
    setShowQRCode(true);
  };

  const getChartData = (event: Event) => [
    { name: 'Registered', value: event.responses.registered, color: '#10b981' },
    { name: 'Declined', value: event.responses.declined, color: '#f43f5e' },
    { name: 'No Response', value: event.responses.noResponse, color: '#94a3b8' }
  ];

  return (
    <div className="min-h-screen bg-[#303080]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#303080] to-[#3838a0] px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white text-2xl">Events & Attendance</h1>
          <button
            onClick={() => setShowAdminView(!showAdminView)}
            className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl text-white flex items-center gap-2"
          >
            <Users size={18} />
            <span className="text-sm">{showAdminView ? 'User View' : 'Admin View'}</span>
          </button>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRCode && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full animate-scale-up">
            <div className="text-center mb-6">
              <h2 className="text-xl text-gray-800 mb-2">Check-in QR Code</h2>
              <p className="text-sm text-gray-500">{selectedEvent.title}</p>
            </div>

            {/* QR Code Placeholder */}
            <div className="bg-gray-100 rounded-2xl p-8 mb-6 flex items-center justify-center">
              <div className="w-48 h-48 bg-white rounded-xl shadow-inner flex items-center justify-center border-4 border-gray-200">
                <QrCode size={120} className="text-gray-400" />
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 mb-6">
              Scan this code to check-in to the event
            </p>

            <button
              onClick={() => setShowQRCode(false)}
              className="w-full bg-[#FF4D6D] text-white py-3 rounded-xl hover:bg-[#ff3355] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Events List */}
      <div className="px-6 py-6 space-y-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Event Header */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-gray-800 text-lg mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={16} />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Response Status */}
              {event.userResponse && (
                <div className={`mb-4 p-3 rounded-xl flex items-center gap-2 ${
                  event.userResponse === 'registered' 
                    ? 'bg-emerald-50 border border-emerald-200' 
                    : 'bg-rose-50 border border-rose-200'
                }`}>
                  {event.userResponse === 'registered' ? (
                    <>
                      <Check className="text-emerald-600" size={18} />
                      <span className="text-sm text-emerald-800">You're registered for this event</span>
                    </>
                  ) : (
                    <>
                      <X className="text-rose-600" size={18} />
                      <span className="text-sm text-rose-800">You declined this event</span>
                    </>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {!showAdminView && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleResponse(event.id, 'registered')}
                    disabled={event.userResponse === 'registered'}
                    className={`flex-1 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 ${
                      event.userResponse === 'registered'
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-[#FF4D6D] text-white hover:bg-[#ff3355]'
                    }`}
                  >
                    <Check size={20} />
                    Join
                  </button>
                  <button
                    onClick={() => handleResponse(event.id, 'declined')}
                    disabled={event.userResponse === 'declined'}
                    className={`flex-1 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 ${
                      event.userResponse === 'declined'
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <X size={20} />
                    Decline
                  </button>
                </div>
              )}

              {/* Admin View */}
              {showAdminView && (
                <div className="mt-4">
                  {/* Response Chart */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="text-sm text-gray-600 mb-3">Response Statistics</h4>
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
                          <Legend 
                            verticalAlign="bottom" 
                            height={36}
                            formatter={(value, entry: any) => `${value}: ${entry.payload.value}`}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Admin Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handlePingNonResponders(event)}
                      disabled={event.responses.noResponse === 0}
                      className={`flex-1 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 ${
                        event.responses.noResponse === 0
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-amber-500 text-white hover:bg-amber-600'
                      }`}
                    >
                      <Bell size={20} />
                      Ping Non-Responders ({event.responses.noResponse})
                    </button>
                    <button
                      onClick={() => handleShowQR(event)}
                      className="bg-[#FF4D6D] text-white px-5 py-3 rounded-xl hover:bg-[#ff3355] transition-colors flex items-center justify-center gap-2"
                    >
                      <QrCode size={20} />
                      QR
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Stats Bar */}
            <div className="bg-gray-50 px-5 py-3 flex items-center justify-around border-t border-gray-100">
              <div className="text-center">
                <p className="text-emerald-600 text-xl">{event.responses.registered}</p>
                <p className="text-xs text-gray-500">Registered</p>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="text-center">
                <p className="text-rose-600 text-xl">{event.responses.declined}</p>
                <p className="text-xs text-gray-500">Declined</p>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="text-center">
                <p className="text-gray-400 text-xl">{event.responses.noResponse}</p>
                <p className="text-xs text-gray-500">No Response</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
