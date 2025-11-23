'use client';

import { useState, useEffect } from 'use';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { 
  Train, ArrowLeft, Users, CreditCard, CheckCircle, 
  AlertCircle, Clock, MapPin, User, Calendar 
} from 'lucide-react';

interface Passenger {
  name: string;
  age: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  cnic: string;
  seatPreference?: string;
}

export default function TrainBookingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const trainId = params.id as string;
  const trainClass = searchParams.get('class') || 'ECONOMY';
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Passenger form state
  const [passengers, setPassengers] = useState<Passenger[]>([
    { name: '', age: 18, gender: 'MALE', cnic: '', seatPreference: '' }
  ]);

  // Contact details
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'jazzcash' | 'easypaisa' | 'card'>('jazzcash');

  // Mock train data (would normally fetch from API)
  const trainData = {
    trainNumber: '1UP',
    trainName: 'Karachi Express',
    departure: { station: 'Karachi City', time: '20:00', date },
    arrival: { station: 'Lahore Junction', time: '08:30', date: getNextDay(date) },
    duration: '12h 30m',
    price: trainClass === 'AC_SLEEPER' ? 3500 : trainClass === 'AC_BUSINESS' ? 2500 : 1200,
  };

  function getNextDay(dateStr: string) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }

  const addPassenger = () => {
    if (passengers.length < 6) {
      setPassengers([...passengers, { name: '', age: 18, gender: 'MALE', cnic: '', seatPreference: '' }]);
    }
  };

  const removePassenger = (index: number) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((_, i) => i !== index));
    }
  };

  const updatePassenger = (index: number, field: keyof Passenger, value: any) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const validateForm = () => {
    if (!contactName || !contactPhone || !contactEmail) {
      setError('Please fill in all contact details');
      return false;
    }

    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      if (!p.name || !p.cnic || p.age < 1) {
        setError(`Please complete details for passenger ${i + 1}`);
        return false;
      }
      if (p.cnic.length !== 13 || !/^\d+$/.test(p.cnic)) {
        setError(`Invalid CNIC for passenger ${i + 1}. Must be 13 digits`);
        return false;
      }
    }

    return true;
  };

  const handleBooking = async () => {
    setError('');
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Get auth token (for now, mock it - in real app, use auth context)
      const token = localStorage.getItem('authToken') || '';
      
      if (!token) {
        throw new Error('Please log in to book tickets');
      }

      const bookingData = {
        trainId,
        trainNumber: trainData.trainNumber,
        date,
        class: trainClass,
        passengers,
        contactDetails: {
          name: contactName,
          phone: contactPhone,
          email: contactEmail,
        },
        paymentMethod,
      };

      const response = await fetch('http://localhost:4000/api/v1/trains/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Booking failed');
      }

      const result = await response.json();
      setSuccess(true);

      // Redirect to confirmation page after 2 seconds
      setTimeout(() => {
        router.push(`/account/bookings/${result.booking.pnr}`);
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'An error occurred during booking');
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = trainData.price * passengers.length;

  const getClassLabel = (type: string) => {
    const labels: Record<string, string> = {
      ECONOMY: 'Economy',
      AC_BUSINESS: 'AC Business',
      AC_SLEEPER: 'AC Sleeper',
    };
    return labels[type] || type;
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Your train tickets have been booked successfully. 
            You will receive a confirmation email shortly.
          </p>
          <div className="animate-pulse text-sm text-gray-500">
            Redirecting to booking details...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Search
          </button>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Train className="w-8 h-8" />
            Complete Your Booking
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Train Details Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Journey Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Train:</span>
                  <span className="font-semibold">{trainData.trainName} ({trainData.trainNumber})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Class:</span>
                  <span className="font-semibold">{getClassLabel(trainClass)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">From:</span>
                  <span className="font-semibold">{trainData.departure.station} - {trainData.departure.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">To:</span>
                  <span className="font-semibold">{trainData.arrival.station} - {trainData.arrival.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold">{trainData.duration}</span>
                </div>
              </div>
            </div>

            {/* Passenger Details */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Passenger Details</h2>
                {passengers.length < 6 && (
                  <button
                    onClick={addPassenger}
                    className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    + Add Passenger
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {passengers.map((passenger, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-gray-800">
                        <User className="w-4 h-4 inline mr-2" />
                        Passenger {index + 1}
                      </h3>
                      {passengers.length > 1 && (
                        <button
                          onClick={() => removePassenger(index)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={passenger.name}
                          onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                          placeholder="As per CNIC"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CNIC Number *
                        </label>
                        <input
                          type="text"
                          value={passenger.cnic}
                          onChange={(e) => updatePassenger(index, 'cnic', e.target.value)}
                          placeholder="13 digits (no dashes)"
                          maxLength={13}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Age *
                        </label>
                        <input
                          type="number"
                          value={passenger.age}
                          onChange={(e) => updatePassenger(index, 'age', parseInt(e.target.value) || 0)}
                          min="1"
                          max="120"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Gender *
                        </label>
                        <select
                          value={passenger.gender}
                          onChange={(e) => updatePassenger(index, 'gender', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Seat Preference (Optional)
                        </label>
                        <select
                          value={passenger.seatPreference || ''}
                          onChange={(e) => updatePassenger(index, 'seatPreference', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                          <option value="">No Preference</option>
                          <option value="WINDOW">Window</option>
                          <option value="AISLE">Aisle</option>
                          <option value="LOWER">Lower Berth</option>
                          <option value="UPPER">Upper Berth</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Details</h2>
              <p className="text-sm text-gray-600 mb-4">
                Ticket and booking details will be sent here
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+923001234567"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Summary
              </h2>

              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-gray-700">
                  <span>Ticket Price:</span>
                  <span>PKR {trainData.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Passengers:</span>
                  <span>× {passengers.length}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-gray-900 pt-3">
                  <span>Total Amount:</span>
                  <span>PKR {totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-500 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="jazzcash"
                      checked={paymentMethod === 'jazzcash'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="mr-3"
                    />
                    <span className="font-medium">JazzCash</span>
                  </label>

                  <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-500 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="easypaisa"
                      checked={paymentMethod === 'easypaisa'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="mr-3"
                    />
                    <span className="font-medium">EasyPaisa</span>
                  </label>

                  <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-500 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="mr-3"
                    />
                    <span className="font-medium">Credit/Debit Card</span>
                  </label>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {/* Book Button */}
              <button
                onClick={handleBooking}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                {loading ? 'Processing...' : `Pay PKR ${totalAmount.toLocaleString()}`}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By proceeding, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
