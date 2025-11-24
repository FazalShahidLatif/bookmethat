import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const services = [
    { name: 'Hotels', icon: '🏨', path: '/hotels' },
    { name: 'Flights', icon: '✈️', path: '/flights' },
    { name: 'Trains', icon: '🚂', path: '/trains' },
    { name: 'Cars', icon: '🚗', path: '/cars' },
    { name: 'Activities', icon: '🎯', path: '/activities' },
    { name: 'eSIM', icon: '📱', path: '/esim' },
  ];

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Hero Section */}
      <LinearGradient
        colors={['#2563eb', '#7c3aed']}
        className="px-6 pt-16 pb-12"
      >
        <Text className="text-white text-4xl font-bold mb-2">
          BookMeThat
        </Text>
        <Text className="text-blue-100 text-lg">
          Your Journey Starts Here
        </Text>
      </LinearGradient>

      {/* Services Grid */}
      <View className="px-6 py-8">
        <Text className="text-2xl font-bold text-gray-900 mb-6">
          Our Services
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {services.map((service) => (
            <Link key={service.name} href={service.path} asChild>
              <TouchableOpacity className="w-[48%] bg-white rounded-2xl shadow-lg p-6 mb-4 border border-gray-100">
                <Text className="text-5xl mb-3">{service.icon}</Text>
                <Text className="text-lg font-bold text-gray-900">
                  {service.name}
                </Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </View>

      {/* Featured Section */}
      <View className="px-6 pb-8">
        <Text className="text-2xl font-bold text-gray-900 mb-6">
          🇵🇰 Travel Pakistan
        </Text>
        <View className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Pakistan Railway Bookings
          </Text>
          <Text className="text-gray-600 mb-4">
            Book train tickets across Pakistan with ease
          </Text>
          <Link href="/trains" asChild>
            <TouchableOpacity className="bg-blue-600 rounded-xl py-4">
              <Text className="text-white text-center font-bold text-lg">
                Search Trains →
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      {/* Trust Indicators */}
      <View className="px-6 pb-12">
        <View className="flex-row justify-between">
          <View className="items-center">
            <Text className="text-3xl font-bold text-blue-600">2M+</Text>
            <Text className="text-gray-600">Hotels</Text>
          </View>
          <View className="items-center">
            <Text className="text-3xl font-bold text-blue-600">500+</Text>
            <Text className="text-gray-600">Airlines</Text>
          </View>
          <View className="items-center">
            <Text className="text-3xl font-bold text-blue-600">24/7</Text>
            <Text className="text-gray-600">Support</Text>
          </View>
          <View className="items-center">
            <Text className="text-3xl font-bold text-blue-600">190+</Text>
            <Text className="text-gray-600">Countries</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
