import Link from 'next/link';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Help Center - Customer Support & FAQs | bookmethat',
  description: 'Get help with bookings, cancellations, payments, and more. 24/7 customer support available via chat, email, or phone.',
  keywords: ['help center', 'customer support', 'booking help', 'contact support', 'FAQs'],
};

export default function HelpPage() {
  const categories = [
    {
      title: 'Bookings',
      icon: '📅',
      topics: [
        'How to make a booking',
        'Modifying your reservation',
        'Booking confirmation',
        'Payment methods accepted',
        'Group bookings'
      ]
    },
    {
      title: 'Cancellations & Refunds',
      icon: '🔄',
      topics: [
        'Cancellation policy',
        'How to cancel a booking',
        'Refund timeline',
        'Non-refundable bookings',
        'Travel insurance'
      ]
    },
    {
      title: 'Account & Profile',
      icon: '👤',
      topics: [
        'Creating an account',
        'Password reset',
        'Update personal information',
        'Delete my account',
        'Account security'
      ]
    },
    {
      title: 'Payments',
      icon: '💳',
      topics: [
        'Payment methods',
        'Currency conversion',
        'Payment declined',
        'Invoice & receipts',
        'Refund status'
      ]
    },
    {
      title: 'Hotels',
      icon: '🏨',
      topics: [
        'Check-in process',
        'Hotel amenities',
        'Room upgrades',
        'Early check-in / late check-out',
        'Hotel reviews'
      ]
    },
    {
      title: 'Flights',
      icon: '✈️',
      topics: [
        'Flight booking process',
        'Baggage allowance',
        'Seat selection',
        'Flight changes',
        'Travel documents required'
      ]
    }
  ];

  const popularQuestions = [
    {
      question: 'How do I cancel my booking?',
      answer: 'Log in to your account, go to "My Bookings", select the booking you want to cancel, and click "Cancel Booking". Refund eligibility depends on the property\'s cancellation policy.'
    },
    {
      question: 'When will I receive my refund?',
      answer: 'Refunds are processed within 5-7 business days to your original payment method. Some banks may take additional time to credit your account.'
    },
    {
      question: 'Can I modify my booking dates?',
      answer: 'Yes, modifications depend on availability and the property\'s policy. Go to "My Bookings" and click "Modify Booking" to check options.'
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Yes, we use industry-standard SSL encryption and are PCI-DSS compliant. We never store your full credit card details.'
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">bookmethat</Link>
          <div className="flex gap-6">
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition">About</Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition">Blog</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition">Contact</Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">How Can We Help You?</h1>
          <p className="text-xl mb-8 text-blue-100">Search our help center or browse topics below</p>
          <input 
            type="text" 
            placeholder="Search for help articles..."
            className="w-full max-w-2xl px-6 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* Popular Questions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Questions</h2>
          <div className="space-y-4">
            {popularQuestions.map((item, index) => (
              <details key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <summary className="font-bold text-lg cursor-pointer hover:text-blue-600 transition">
                  {item.question}
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Browse Help Topics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.topics.map((topic, idx) => (
                    <li key={idx}>
                      <a href="#" className="text-blue-600 hover:underline text-sm">
                        {topic}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-gray-600 mb-8">Our customer support team is available 24/7</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="font-bold mb-2">Live Chat</h3>
              <p className="text-gray-600 text-sm mb-4">Average response: 2 minutes</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Start Chat
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl mb-3">📧</div>
              <h3 className="font-bold mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm mb-4">Average response: 24 hours</p>
              <a href="mailto:support@bookmethat.com" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Send Email
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl mb-3">📞</div>
              <h3 className="font-bold mb-2">Phone Support</h3>
              <p className="text-gray-600 text-sm mb-4">24/7 availability</p>
              <a href="tel:+18001234567" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 bookmethat. All rights reserved.</p>
          <div className="mt-4 flex gap-6 justify-center text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition">Terms</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
      <Footer />
    </>
  );
}
