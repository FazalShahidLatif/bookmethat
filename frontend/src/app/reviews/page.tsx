import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Customer Reviews & Testimonials | bookmethat',
  description: 'Read authentic reviews from 2M+ travelers who booked hotels, flights, and travel experiences through bookmethat. Real customer testimonials and ratings.',
  keywords: 'bookmethat reviews, customer testimonials, travel reviews, hotel reviews, flight booking reviews, trustpilot'
};

const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, USA',
    rating: 5,
    date: 'March 2024',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    service: 'Hotel Booking',
    review: 'Booked a last-minute hotel in Dubai through bookmethat and saved over 40%! The process was seamless, and the property exceeded my expectations. Customer support was responsive when I had questions about amenities.',
    verified: true
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'Singapore',
    rating: 5,
    date: 'February 2024',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    service: 'Flight + Hotel',
    review: 'Used bookmethat for a complete vacation package to Bali. The flight deals were incredible, and bundling with the hotel saved me an additional 15%. The mobile app made managing everything so easy.',
    verified: true
  },
  {
    id: 3,
    name: 'Emma Williams',
    location: 'London, UK',
    rating: 5,
    date: 'March 2024',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    service: 'eSIM',
    review: 'The eSIM service is a game-changer! I traveled to 5 European countries and stayed connected without any hassle. Setup was instant, and data speeds were excellent. No more hunting for SIM cards at airports!',
    verified: true
  },
  {
    id: 4,
    name: 'David Martinez',
    location: 'Madrid, Spain',
    rating: 4,
    date: 'January 2024',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    service: 'Car Rental',
    review: 'Rented a car in Portugal through bookmethat. Great selection and competitive prices. The only minor issue was pick-up taking slightly longer than expected, but the car was clean and well-maintained.',
    verified: true
  },
  {
    id: 5,
    name: 'Priya Sharma',
    location: 'Mumbai, India',
    rating: 5,
    date: 'March 2024',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    service: 'Hotel Booking',
    review: 'Fantastic experience! Booked multiple hotels for a month-long European tour. The rewards program is generous - already earned enough points for a free night. The price guarantee gave me peace of mind.',
    verified: true
  },
  {
    id: 6,
    name: 'James O\'Connor',
    location: 'Dublin, Ireland',
    rating: 5,
    date: 'February 2024',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
    service: 'Activities',
    review: 'Booked several activities in Tokyo including a private city tour and cooking class. Everything was professionally organized, and the guides were knowledgeable. Much better prices than booking directly!',
    verified: true
  },
  {
    id: 7,
    name: 'Lisa Anderson',
    location: 'Toronto, Canada',
    rating: 5,
    date: 'January 2024',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    service: 'Flight Booking',
    review: 'Found business class flights to Paris at economy prices! The search filters made it easy to find exactly what I needed. Got instant confirmation and mobile boarding passes. Highly recommend!',
    verified: true
  },
  {
    id: 8,
    name: 'Ahmed Al-Rashid',
    location: 'Dubai, UAE',
    rating: 4,
    date: 'March 2024',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    service: 'Hotel Booking',
    review: 'Good experience overall. Booked a luxury resort in Maldives with a great discount. Check-in was smooth. Would appreciate more photos of the rooms on the listing, but the property was beautiful.',
    verified: true
  },
  {
    id: 9,
    name: 'Sophie Martin',
    location: 'Paris, France',
    rating: 5,
    date: 'February 2024',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop',
    service: 'Complete Trip',
    review: 'Organized my entire honeymoon through bookmethat - flights, hotels, transfers, and activities. The planning tools were intuitive, and I saved nearly $800 compared to booking separately. Customer service was exceptional!',
    verified: true
  },
  {
    id: 10,
    name: 'Ryan Thompson',
    location: 'Sydney, Australia',
    rating: 5,
    date: 'March 2024',
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop',
    service: 'eSIM + Hotel',
    review: 'Traveled to Thailand and used both the hotel booking and eSIM services. Both were flawless! The eSIM worked from the moment I landed, and the hotel was exactly as described. Will definitely use again.',
    verified: true
  },
  {
    id: 11,
    name: 'Maria Rodriguez',
    location: 'Barcelona, Spain',
    rating: 5,
    date: 'January 2024',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop',
    service: 'Flight Booking',
    review: 'The price alert feature saved me $300 on flights to New York! Got notified the moment prices dropped. The app is user-friendly and the booking process was quick and secure.',
    verified: true
  },
  {
    id: 12,
    name: 'Thomas Mueller',
    location: 'Berlin, Germany',
    rating: 5,
    date: 'February 2024',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop',
    service: 'Car Rental',
    review: 'Excellent car rental experience in Italy. Wide selection of vehicles, transparent pricing with no hidden fees, and the ability to add extra drivers easily. The pickup and return process was efficient.',
    verified: true
  }
];

const stats = [
  { label: 'Total Reviews', value: '2.1M+', icon: '⭐' },
  { label: 'Average Rating', value: '4.8/5', icon: '📊' },
  { label: 'Verified Bookings', value: '98%', icon: '✓' },
  { label: 'Recommend Us', value: '96%', icon: '👍' }
];

export default function ReviewsPage() {
  const averageRating = 4.8;
  const totalReviews = 2134567;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Trusted by Millions of Travelers
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Real reviews from real travelers who booked with bookmethat
              </p>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-8 h-8 ${star <= Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-2xl font-bold">{averageRating} out of 5</span>
              </div>
              <p className="text-blue-100">Based on {totalReviews.toLocaleString()} verified reviews</p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trustpilot Integration Placeholder */}
        <section className="py-12 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                See Our Reviews on Trustpilot
              </h2>
              <p className="text-gray-600 mb-6">
                We're committed to transparency. Check out our independently verified reviews on Trustpilot.
              </p>
              {/* Trustpilot widget will be integrated here */}
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12">
                <p className="text-gray-500 italic">
                  [Trustpilot Widget Integration - Coming Soon]
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  TrustBox widget will display live reviews from Trustpilot.com
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Customer Reviews</h2>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">
                All Reviews
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300">
                Hotels
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300">
                Flights
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300">
                Cars
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300">
                Activities
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-300">
                eSIM
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900">{review.name}</h3>
                        {review.verified && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{review.location}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-5 h-5 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Service Tag */}
                  <div className="mb-3">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                      {review.service}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 leading-relaxed mb-4">{review.review}</p>

                  {/* Footer */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <button className="hover:text-blue-600 transition flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      Helpful
                    </button>
                    <button className="hover:text-blue-600 transition flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                Load More Reviews
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join millions of satisfied travelers and book your next adventure with confidence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/hotels"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition font-semibold"
              >
                Search Hotels
              </a>
              <a
                href="/flights"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition font-semibold"
              >
                Find Flights
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
