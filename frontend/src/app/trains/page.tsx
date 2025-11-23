'use client';

import { useState } from 'react';
import { Calendar, MapPin, Users, Clock, ArrowRight, Train, Filter } from 'lucide-react';

interface TrainClass {
  type: 'ECONOMY' | 'AC_BUSINESS' | 'AC_SLEEPER';
  availableSeats: number;
  price: number;
  amenities: string[];
}

interface Train {
  trainId: string;
  trainNumber: string;
  trainName: string;
  departure: {
    station: string;
    stationCode: string;
    time: string;
    date: string;
  };
  arrival: {
    station: string;
    stationCode: string;
    time: string;
    date: string;
  };
  duration: string;
  classes: TrainClass[];
  status: 'ON_TIME' | 'DELAYED' | 'CANCELLED';
}

// Major Pakistan Railway stations
const STATIONS = [
  { code: 'KHI', name: 'Karachi City', city: 'Karachi' },
  { code: 'LHE', name: 'Lahore Junction', city: 'Lahore' },
  { code: 'ISB', name: 'Islamabad', city: 'Islamabad' },
  { code: 'RWP', name: 'Rawalpindi', city: 'Rawalpindi' },
  { code: 'MLT', name: 'Multan Cantt', city: 'Multan' },
  { code: 'FSD', name: 'Faisalabad', city: 'Faisalabad' },
  { code: 'QTA', name: 'Quetta', city: 'Quetta' },
  { code: 'PSH', name: 'Peshawar Cantt', city: 'Peshawar' },
  { code: 'HYD', name: 'Hyderabad Junction', city: 'Hyderabad' },
  { code: 'SKT', name: 'Sialkot Junction', city: 'Sialkot' },
];

export default function TrainsPage() {
  const [from, setFrom] = useState('KHI');
  const [to, setTo] = useState('LHE');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [trainClass, setTrainClass] = useState<string>('');
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchTrains = async () => {
    if (from === to) {
      setError('Origin and destination cannot be the same');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const body: any = { from, to, date };
      if (trainClass) body.class = trainClass;

      const response = await fetch('http://localhost:4000/api/v1/trains/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to search trains');
      }

      const data = await response.json();
      setTrains(data.trains || []);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setTrains([]);
    } finally {
      setLoading(false);
    }
  };

  const getClassLabel = (type: string) => {
    const labels: Record<string, string> = {
      ECONOMY: 'Economy',
      AC_BUSINESS: 'AC Business',
      AC_SLEEPER: 'AC Sleeper',
    };
    return labels[type] || type;
  };

  const swapStations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Train className="w-10 h-10" />
            Pakistan Railway Bookings
          </h1>
          <p className="text-blue-100 text-lg">
            Search and book train tickets across Pakistan
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 -mt-16 mb-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* From Station */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                From
              </label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                {STATIONS.map((station) => (
                  <option key={station.code} value={station.code}>
                    {station.name} ({station.city})
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex items-end justify-center">
              <button
                onClick={swapStations}
                className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
                title="Swap stations"
              >
                <ArrowRight className="w-6 h-6 text-gray-600 transform rotate-90 md:rotate-0" />
              </button>
            </div>

            {/* To Station */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                To
              </label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                {STATIONS.map((station) => (
                  <option key={station.code} value={station.code}>
                    {station.name} ({station.city})
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Journey Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Class Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-1" />
                Class (Optional)
              </label>
              <select
                value={trainClass}
                onChange={(e) => setTrainClass(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="">All Classes</option>
                <option value="economy">Economy</option>
                <option value="ac_business">AC Business</option>
                <option value="ac_sleeper">AC Sleeper</option>
              </select>
            </div>
          </div>

          <button
            onClick={searchTrains}
            disabled={loading}
            className="mt-6 w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
          >
            {loading ? 'Searching...' : 'Search Trains'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Results */}
        {trains.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Available Trains ({trains.length})
            </h2>

            <div className="space-y-4">
              {trains.map((train) => (
                <div
                  key={train.trainId}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6"
                >
                  {/* Train Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Train className="w-5 h-5 text-blue-600" />
                        {train.trainName}
                      </h3>
                      <p className="text-gray-600">Train #{train.trainNumber}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          train.status === 'ON_TIME'
                            ? 'bg-green-100 text-green-800'
                            : train.status === 'DELAYED'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {train.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Journey Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Departure */}
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Departure</p>
                      <p className="text-2xl font-bold text-gray-900">{train.departure.time}</p>
                      <p className="text-gray-700">{train.departure.station}</p>
                      <p className="text-sm text-gray-500">{train.departure.date}</p>
                    </div>

                    {/* Duration */}
                    <div className="flex flex-col items-center justify-center">
                      <Clock className="w-5 h-5 text-gray-400 mb-1" />
                      <p className="text-lg font-semibold text-gray-700">{train.duration}</p>
                      <div className="w-full h-0.5 bg-gray-300 my-2"></div>
                    </div>

                    {/* Arrival */}
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Arrival</p>
                      <p className="text-2xl font-bold text-gray-900">{train.arrival.time}</p>
                      <p className="text-gray-700">{train.arrival.station}</p>
                      <p className="text-sm text-gray-500">{train.arrival.date}</p>
                    </div>
                  </div>

                  {/* Available Classes */}
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-gray-700 mb-3">Available Classes:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {train.classes.map((cls) => (
                        <div
                          key={cls.type}
                          className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{getClassLabel(cls.type)}</h4>
                            <span className="text-lg font-bold text-blue-600">
                              PKR {cls.price.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            <Users className="w-4 h-4 inline mr-1" />
                            {cls.availableSeats} seats available
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {cls.amenities.slice(0, 3).map((amenity, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                          <button
                            className="mt-3 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            onClick={() =>
                              (window.location.href = `/trains/${train.trainId}?class=${cls.type}&date=${date}`)
                            }
                          >
                            Book Now
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && trains.length === 0 && !error && (
          <div className="text-center py-12">
            <Train className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              Search for trains to see available options
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
