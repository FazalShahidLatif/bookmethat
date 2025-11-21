import Link from 'next/link';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | bookmethat',
  description: 'Find answers to common questions about booking hotels, flights, car rentals, and activities. Learn about payments, cancellations, and account management.',
  keywords: ['FAQ', 'frequently asked questions', 'booking questions', 'help', 'customer service'],
};

export default function FAQPage() {
  const faqCategories = [
    {
      category: 'Booking & Reservations',
      questions: [
        {
          q: 'How do I make a booking on bookmethat?',
          a: 'Simply search for your destination and dates, compare options, select your preferred hotel/flight/car, enter your details, and complete payment. You\'ll receive instant confirmation via email.'
        },
        {
          q: 'Can I book for someone else?',
          a: 'Yes! During checkout, you can enter the guest\'s name and contact information. You\'ll still receive the booking confirmation, but the reservation will be under their name.'
        },
        {
          q: 'Do I need to create an account to book?',
          a: 'No, you can book as a guest. However, creating an account lets you track bookings, save favorite properties, and earn rewards faster.'
        },
        {
          q: 'How do I know my booking is confirmed?',
          a: 'You\'ll receive a booking confirmation email within minutes. You can also log in to your account and check "My Bookings" for all reservation details.'
        },
        {
          q: 'Can I make group bookings?',
          a: 'For groups of 10+ people, please contact our group bookings team at groups@bookmethat.com for special rates and dedicated support.'
        }
      ]
    },
    {
      category: 'Payments & Pricing',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards (Visa, Mastercard, Amex, Discover), debit cards, PayPal, Apple Pay, and Google Pay. Some properties also accept bank transfers.'
        },
        {
          q: 'When will I be charged?',
          a: 'For most bookings, your card is charged immediately. Some hotels charge at check-in. Non-refundable rates are always charged immediately.'
        },
        {
          q: 'Are there any hidden fees?',
          a: 'No hidden fees! The price you see includes all bookmethat service fees. Some hotels charge resort fees or tourist taxes at check-in, which will be clearly displayed.'
        },
        {
          q: 'Do you offer a price match guarantee?',
          a: 'Yes! If you find a lower price within 24 hours of booking, we\'ll match it and give you an additional 10% off. Contact customer service with proof of the lower price.'
        },
        {
          q: 'Can I pay in a different currency?',
          a: 'Prices are displayed in your local currency. We automatically convert using current exchange rates. You can change currency using the selector at the top of the page.'
        },
        {
          q: 'Do I get a receipt?',
          a: 'Yes, your booking confirmation email includes a receipt. You can also download receipts from "My Bookings" at any time.'
        }
      ]
    },
    {
      category: 'Cancellations & Changes',
      questions: [
        {
          q: 'How do I cancel my booking?',
          a: 'Log in to your account, go to "My Bookings", select the reservation, and click "Cancel Booking". Review the cancellation terms and confirm. You\'ll receive email confirmation.'
        },
        {
          q: 'What is your cancellation policy?',
          a: 'Most bookings offer free cancellation up to 24 hours before check-in. See our complete Cancellation Policy page for details on refunds and timing.'
        },
        {
          q: 'Can I modify my booking dates?',
          a: 'Yes, modifications are subject to availability. Go to "My Bookings" and click "Modify Booking". Note that price differences may apply for date changes.'
        },
        {
          q: 'When will I get my refund?',
          a: 'Refunds are processed within 5-7 business days. It may take 7-14 additional days for your bank to credit your account.'
        },
        {
          q: 'What if I need to cancel due to an emergency?',
          a: 'Contact our customer service immediately. While standard cancellation policies apply, we\'ll work with the property to find the best solution. Travel insurance is recommended.'
        }
      ]
    },
    {
      category: 'Hotels',
      questions: [
        {
          q: 'What time is check-in and check-out?',
          a: 'Standard check-in is 3:00 PM and check-out is 11:00 AM. Specific times vary by property and are shown on your booking confirmation.'
        },
        {
          q: 'Can I request early check-in or late check-out?',
          a: 'Yes, you can request this at booking or contact the hotel directly. Availability isn\'t guaranteed and extra fees may apply.'
        },
        {
          q: 'Are hotel reviews verified?',
          a: 'Yes, all reviews come from verified guests who actually stayed at the property. You can only review a hotel after your stay.'
        },
        {
          q: 'What if the hotel doesn\'t match the photos?',
          a: 'Contact us immediately with photos. We take misrepresentation seriously and will work to resolve the issue, including rebooking or refunds if necessary.'
        },
        {
          q: 'Can I bring pets?',
          a: 'Pet policies vary by property. Use our "Pet-Friendly" filter when searching, and check specific pet fees and restrictions on the hotel page.'
        }
      ]
    },
    {
      category: 'Flights',
      questions: [
        {
          q: 'Are flight prices per person?',
          a: 'Yes, all flight prices shown are per person unless otherwise stated. Taxes and fees are included in the displayed price.'
        },
        {
          q: 'Can I select my seat?',
          a: 'Seat selection depends on the airline and fare type. After booking, you can usually select seats on the airline\'s website using your confirmation code.'
        },
        {
          q: 'What is included in my baggage allowance?',
          a: 'Baggage allowance varies by airline and fare class. Check your booking confirmation for specific details. Basic economy fares may only include a personal item.'
        },
        {
          q: 'Can I change or cancel my flight?',
          a: 'Change and cancellation policies depend on the airline and ticket type. Refundable tickets offer more flexibility but cost more. Check your fare rules carefully.'
        },
        {
          q: 'What do I need to travel internationally?',
          a: 'You\'ll need a valid passport (with 6+ months validity), and possibly a visa depending on your destination and nationality. Check entry requirements well in advance.'
        }
      ]
    },
    {
      category: 'Account & Profile',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click "Sign Up" at the top of the page. You can register with email, Google, or Facebook. It takes less than a minute!'
        },
        {
          q: 'I forgot my password. How do I reset it?',
          a: 'Click "Forgot Password" on the login page. Enter your email and we\'ll send you a password reset link.'
        },
        {
          q: 'How do I change my email or phone number?',
          a: 'Log in to your account, go to "Profile Settings", and update your contact information. You\'ll need to verify your new email/phone.'
        },
        {
          q: 'Can I delete my account?',
          a: 'Yes, go to "Profile Settings" and click "Delete Account". Note that active bookings must be completed or cancelled first.'
        },
        {
          q: 'Is my personal information secure?',
          a: 'Absolutely. We use bank-level SSL encryption, are PCI-DSS compliant, and never sell your data. Read our Privacy Policy for details.'
        }
      ]
    },
    {
      category: 'Travel eSIM',
      questions: [
        {
          q: 'What is a travel eSIM?',
          a: 'An eSIM is a digital SIM card that gives you mobile data in 190+ countries without changing physical SIM cards or paying roaming fees.'
        },
        {
          q: 'Is my phone eSIM compatible?',
          a: 'Most iPhones (XS and newer), Samsung Galaxy (S20+), Google Pixel (3+), and recent devices support eSIM. Check your phone settings to confirm.'
        },
        {
          q: 'How do I activate my eSIM?',
          a: 'After purchase, you\'ll receive a QR code via email. Scan it in your phone\'s cellular settings, and the eSIM will be activated instantly.'
        },
        {
          q: 'Can I keep my regular phone number?',
          a: 'Yes! The eSIM is data-only. Keep your primary SIM for calls/texts, and use the eSIM for affordable data abroad.'
        }
      ]
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-blue-100">Quick answers to common questions about bookmethat</p>
        </div>
      </section>

      {/* FAQ Content */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="mb-12">
          <input 
            type="text" 
            placeholder="Search FAQs..."
            className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-12">
          {faqCategories.map((cat, catIndex) => (
            <section key={catIndex}>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-blue-600 pb-3">
                {cat.category}
              </h2>
              <div className="space-y-4">
                {cat.questions.map((item, qIndex) => (
                  <details 
                    key={qIndex}
                    className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition"
                  >
                    <summary className="font-semibold text-lg cursor-pointer hover:text-blue-600 transition flex items-start gap-3">
                      <span className="text-blue-600 flex-shrink-0">Q:</span>
                      <span>{item.q}</span>
                    </summary>
                    <div className="mt-4 pl-8 text-gray-700 leading-relaxed">
                      <span className="text-green-600 font-semibold">A:</span> {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Still Have Questions */}
        <section className="mt-16 bg-blue-50 border-2 border-blue-200 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-gray-700 mb-6">
            Can't find what you're looking for? Our customer support team is here to help 24/7.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/help"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Visit Help Center
            </Link>
            <Link 
              href="/contact"
              className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Contact Support
            </Link>
          </div>
        </section>
      </div>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 bookmethat. All rights reserved.</p>
          <div className="mt-4 flex gap-6 justify-center text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
      <Footer />
    </>
  );
}
