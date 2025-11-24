import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

const STATIONS = [
  { code: 'KHI', name: 'Karachi City' },
  { code: 'LHE', name: 'Lahore Junction' },
  { code: 'ISB', name: 'Islamabad' },
  { code: 'RWP', name: 'Rawalpindi' },
  { code: 'MLT', name: 'Multan Cantt' },
  { code: 'FSD', name: 'Faisalabad' },
  { code: 'QTA', name: 'Quetta' },
  { code: 'PSH', name: 'Peshawar Cantt' },
  { code: 'HYD', name: 'Hyderabad Junction' },
  { code: 'SKT', name: 'Sialkot Junction' },
];

export default function TrainsScreen() {
  const router = useRouter();
  const [from, setFrom] = useState('KHI');
  const [to, setTo] = useState('LHE');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [trains, setTrains] = useState<any[]>([]);

  const searchTrains = async () => {
    if (from === to) {
      alert('Origin and destination cannot be the same');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/v1/trains/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to, date }),
      });

      const data = await response.json();
      setTrains(data.trains || []);
    } catch (error) {
      alert('Failed to search trains. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const swapStations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Search Form */}
      <View className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <Text className="text-2xl font-bold text-gray-900 mb-6">
          Search Pakistan Railway
        </Text>

        {/* From Station */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-2">From</Text>
          <View className="bg-white rounded-xl border-2 border-gray-200 p-4">
            <Text className="text-gray-900 font-medium">
              {STATIONS.find(s => s.code === from)?.name}
            </Text>
          </View>
        </View>

        {/* Swap Button */}
        <TouchableOpacity
          onPress={swapStations}
          className="bg-white rounded-xl p-3 mb-4 items-center"
        >
          <Text className="text-2xl">⇅</Text>
        </TouchableOpacity>

        {/* To Station */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-2">To</Text>
          <View className="bg-white rounded-xl border-2 border-gray-200 p-4">
            <Text className="text-gray-900 font-medium">
              {STATIONS.find(s => s.code === to)?.name}
            </Text>
          </View>
        </View>

        {/* Date */}
        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-700 mb-2">Journey Date</Text>
          <TextInput
            value={date}
            onChangeText={setDate}
            className="bg-white rounded-xl border-2 border-gray-200 p-4 text-gray-900"
            placeholder="YYYY-MM-DD"
          />
        </View>

        {/* Search Button */}
        <TouchableOpacity
          onPress={searchTrains}
          disabled={loading}
          className="bg-blue-600 rounded-xl py-4 items-center"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-bold text-lg">Search Trains</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Results */}
      <View className="p-6">
        {trains.length > 0 && (
          <>
            <Text className="text-xl font-bold text-gray-900 mb-4">
              Available Trains ({trains.length})
            </Text>
            {trains.map((train) => (
              <TouchableOpacity
                key={train.trainId}
                onPress={() => router.push({
                  pathname: '/trains/booking',
                  params: { trainId: train.trainId, date }
                })}
                className="bg-white rounded-2xl shadow-lg p-6 mb-4 border border-gray-100"
              >
                <Text className="text-xl font-bold text-gray-900 mb-2">
                  {train.trainName}
                </Text>
                <Text className="text-gray-600 mb-4">Train #{train.trainNumber}</Text>

                <View className="flex-row justify-between items-center mb-4">
                  <View>
                    <Text className="text-sm text-gray-600">Departure</Text>
                    <Text className="text-2xl font-bold text-gray-900">
                      {train.departure.time}
                    </Text>
                    <Text className="text-gray-700">{train.departure.station}</Text>
                  </View>

                  <View className="items-center">
                    <Text className="text-gray-600">{train.duration}</Text>
                    <View className="w-16 h-0.5 bg-gray-300 my-2" />
                  </View>

                  <View>
                    <Text className="text-sm text-gray-600">Arrival</Text>
                    <Text className="text-2xl font-bold text-gray-900">
                      {train.arrival.time}
                    </Text>
                    <Text className="text-gray-700">{train.arrival.station}</Text>
                  </View>
                </View>

                {train.classes.map((cls: any) => (
                  <View
                    key={cls.type}
                    className="border border-gray-200 rounded-lg p-4 mb-2"
                  >
                    <View className="flex-row justify-between items-center">
                      <View>
                        <Text className="font-bold text-gray-900">{cls.type}</Text>
                        <Text className="text-sm text-gray-600">
                          {cls.availableSeats} seats available
                        </Text>
                      </View>
                      <Text className="text-lg font-bold text-blue-600">
                        PKR {cls.price.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                ))}
              </TouchableOpacity>
            ))}
          </>
        )}

        {!loading && trains.length === 0 && (
          <View className="items-center py-12">
            <Text className="text-6xl mb-4">🚂</Text>
            <Text className="text-gray-600 text-lg text-center">
              Search for trains to see available options
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
