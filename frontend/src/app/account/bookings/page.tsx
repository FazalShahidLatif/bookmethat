'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

interface Booking {
  id: string;
  type: 'TRAIN' | 'HOTEL' | 'FLIGHT' | 'CAR' | 'ACTIVITY' | 'ESIM';
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  totalAmount: number;
  currency: string;
  createdAt: string;
  trainBooking?: {
    trainNumber: string;
    trainName: string;
    departureStation: string;
    arrivalStation: string;
    departureTime: string;
    arrivalTime: string;
    class: string;
    pnr: string;
    passengers: Array<{
      name: string;
      age: number;
      gender: string;
    }>;
  };
}

export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'TRAIN' | 'HOTEL' | 'FLIGHT' | 'CAR' | 'ACTIVITY' | 'ESIM'>('ALL');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('http://localhost:4000/api/v1/bookings/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else if (response.status === 401) {
        localStorage.removeItem('token');
        router.push('/login');
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/api/v1/bookings/${bookingId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Booking cancelled successfully');
        fetchBookings();
      } else {
        const error = await response.json();
        alert(`Failed to cancel: ${error.message}`);
      }
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      alert('Failed to cancel booking');
    }
  };

  const downloadTicket = (bookingId: string) => {
    const token = localStorage.getItem('token');
    window.open(`http://localhost:4000/api/v1/bookings/${bookingId}/ticket?token=${token}`, '_blank');
  };

  const filteredBookings = filter === 'ALL' 
    ? bookings 
    : bookings.filter(b => b.type === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      case 'COMPLETED': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'TRAIN': return '🚂';
      case 'HOTEL': return '🏨';
      case 'FLIGHT': return '✈️';
      case 'CAR': return '🚗';
      case 'ACTIVITY': return '🎡';
      case 'ESIM': return '📱';
      default: return '📋';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="mt-2 text-gray-600">View and manage all your bookings</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {['ALL', 'TRAIN', 'HOTEL', 'FLIGHT', 'CAR', 'ACTIVITY', 'ESIM'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type === 'ALL' ? 'All' : type.charAt(0) + type.slice(1).toLowerCase()}
                {type !== 'ALL' && ` ${getTypeIcon(type)}`}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'ALL' 
                ? "You haven't made any bookings yet" 
                : `No ${filter.toLowerCase()} bookings found`}
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Booking
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  {/* Booking Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div className="flex items-start gap-3 mb-4 sm:mb-0">
                      <div className="text-4xl">{getTypeIcon(booking.type)}</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {booking.type.charAt(0) + booking.type.slice(1).toLowerCase()} Booking
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Booking ID: {booking.id}
                        </p>
                        <p className="text-xs text-gray-500">
                          Booked on {format(new Date(booking.createdAt), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {booking.currency} {booking.totalAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Train Booking Details */}
                  {booking.trainBooking && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {booking.trainBooking.trainName} ({booking.trainBooking.trainNumber})
                          </h4>
                          <div className="space-y-1 text-sm">
                            <p className="text-gray-600">
                              <span className="font-medium">From:</span> {booking.trainBooking.departureStation}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-medium">To:</span> {booking.trainBooking.arrivalStation}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-medium">Class:</span> {booking.trainBooking.class}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-medium">PNR:</span> {booking.trainBooking.pnr}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Journey Details</h4>
                          <div className="space-y-1 text-sm">
                            <p className="text-gray-600">
                              <span className="font-medium">Departure:</span>{' '}
                              {format(new Date(booking.trainBooking.departureTime), 'MMM dd, yyyy HH:mm')}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-medium">Arrival:</span>{' '}
                              {format(new Date(booking.trainBooking.arrivalTime), 'MMM dd, yyyy HH:mm')}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-medium">Passengers:</span> {booking.trainBooking.passengers.length}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Passenger List */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h5 className="text-sm font-semibold text-gray-900 mb-2">Passengers</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {booking.trainBooking.passengers.map((passenger, index) => (
                            <div key={index} className="bg-white rounded p-2 text-sm">
                              <p className="font-medium text-gray-900">{passenger.name}</p>
                              <p className="text-gray-600 text-xs">
                                {passenger.age} years • {passenger.gender}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => downloadTicket(booking.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      disabled={booking.status === 'CANCELLED'}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Ticket
                    </button>
                    
                    <button
                      onClick={() => router.push(`/account/bookings/${booking.id}`)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Details
                    </button>

                    {booking.status === 'CONFIRMED' && (
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
