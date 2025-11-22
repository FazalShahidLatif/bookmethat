import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'My Account | bookmethat',
  description: 'Manage your bookings, profile, and travel preferences',
};

export default function AccountPage() {
  // In production, this would fetch user data from API
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    memberSince: '2023',
    bookings: 12,
    favorites: 8,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Account</h1>
            <p className="text-gray-600">Manage your bookings and preferences</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500 mt-2">Member since {user.memberSince}</p>
                </div>
                
                <div className="border-t pt-6">
                  <nav className="space-y-2">
                    <Link href="/account" className="block px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold">
                      Dashboard
                    </Link>
                    <Link href="/account/bookings" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                      My Bookings
                    </Link>
                    <Link href="/account/favorites" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                      Favorites
                    </Link>
                    <Link href="/account/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                      Profile Settings
                    </Link>
                    <Link href="/account/payment" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                      Payment Methods
                    </Link>
                    <Link href="/account/security" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                      Security
                    </Link>
                  </nav>
                </div>
              </div>

              <div className="bg-blue-600 text-white rounded-lg shadow p-6">
                <h3 className="font-bold mb-2">Travel Points</h3>
                <div className="text-3xl font-bold mb-2">2,450</div>
                <p className="text-sm text-blue-100 mb-4">Use points for discounts on your next booking</p>
                <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
                  View Rewards
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{user.bookings}</div>
                  <div className="text-gray-600">Total Bookings</div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{user.favorites}</div>
                  <div className="text-gray-600">Favorites</div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
                  <div className="text-gray-600">Countries</div>
                </div>
              </div>

              {/* Upcoming Bookings */}
              <div className="bg-white rounded-lg shadow mb-8">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Upcoming Bookings</h2>
                    <Link href="/account/bookings" className="text-blue-600 hover:underline">
                      View All
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <div className="border rounded-lg p-4 hover:shadow-md transition mb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-sm text-gray-500">Hotel</div>
                        <h3 className="font-bold text-lg">Grand Palace Hotel Dubai</h3>
                        <p className="text-gray-600">Dubai, UAE</p>
                      </div>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Confirmed
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <span className="mr-4">📅 Dec 20-27, 2024</span>
                      <span>🛏️ Deluxe Room</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="font-bold text-blue-600">$840</div>
                      <Link href="/account/bookings/1" className="text-blue-600 hover:underline">
                        View Details →
                      </Link>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-sm text-gray-500">Flight</div>
                        <h3 className="font-bold text-lg">New York to London</h3>
                        <p className="text-gray-600">British Airways • BA178</p>
                      </div>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Confirmed
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <span className="mr-4">📅 Jan 15, 2025</span>
                      <span>✈️ Economy</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="font-bold text-blue-600">$645</div>
                      <Link href="/account/bookings/2" className="text-blue-600 hover:underline">
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-bold">Quick Actions</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Link href="/hotels" className="border-2 border-blue-600 rounded-lg p-6 text-center hover:bg-blue-50 transition">
                      <div className="text-4xl mb-2">🏨</div>
                      <div className="font-semibold text-blue-600">Book Hotel</div>
                    </Link>
                    <Link href="/flights" className="border-2 border-blue-600 rounded-lg p-6 text-center hover:bg-blue-50 transition">
                      <div className="text-4xl mb-2">✈️</div>
                      <div className="font-semibold text-blue-600">Book Flight</div>
                    </Link>
                    <Link href="/cars" className="border-2 border-blue-600 rounded-lg p-6 text-center hover:bg-blue-50 transition">
                      <div className="text-4xl mb-2">🚗</div>
                      <div className="font-semibold text-blue-600">Rent Car</div>
                    </Link>
                    <Link href="/esim" className="border-2 border-blue-600 rounded-lg p-6 text-center hover:bg-blue-50 transition">
                      <div className="text-4xl mb-2">📱</div>
                      <div className="font-semibold text-blue-600">Buy eSIM</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
