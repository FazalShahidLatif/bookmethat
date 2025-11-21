import Link from 'next/link';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Cancellation Policy - Free Cancellation & Refunds | bookmethat',
  description: 'Understand our cancellation policy. Most bookings offer free cancellation up to 24 hours before check-in. Learn about refunds and modification options.',
  keywords: ['cancellation policy', 'refund policy', 'free cancellation', 'booking cancellation', 'travel refunds'],
};

export default function CancellationPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Cancellation Policy</h1>
        <p className="text-gray-600 mb-8 text-lg">Last updated: November 21, 2025</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At bookmethat, we understand that travel plans can change. Our cancellation policy is designed to be fair and flexible, giving you peace of mind when booking with us.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
              <p className="font-semibold text-blue-900">
                💡 Most bookings can be cancelled free of charge up to 24 hours before check-in. Some properties offer more flexible policies.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Hotel Cancellations</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Free Cancellation Policy</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Most hotels offer free cancellation up to 24 hours before check-in</li>
              <li>Some properties offer free cancellation up to 48-72 hours before arrival</li>
              <li>Cancellations made within the free cancellation window receive a full refund</li>
              <li>Non-refundable bookings are clearly marked at the time of booking</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">Late Cancellations</h3>
            <p className="text-gray-700 mb-4">
              Cancellations made after the free cancellation period may incur charges:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>24-48 hours before check-in:</strong> First night charge (typically 50-100%)</li>
              <li><strong>Less than 24 hours:</strong> Full booking amount charged</li>
              <li><strong>No-show:</strong> Full booking amount charged with no refund</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">Non-Refundable Bookings</h3>
            <p className="text-gray-700 mb-4">
              Non-refundable rates typically offer 10-30% savings but cannot be cancelled or modified:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Payment is charged immediately at booking</li>
              <li>No refunds available for cancellations or no-shows</li>
              <li>Modifications not permitted</li>
              <li>Travel insurance recommended for these bookings</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Flight Cancellations</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Cancellation Timeline</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Within 24 hours of booking:</strong> Free cancellation on most tickets (US departures)</li>
              <li><strong>More than 7 days before departure:</strong> Airline cancellation fees apply</li>
              <li><strong>Less than 7 days before departure:</strong> Higher cancellation fees or no refund</li>
              <li><strong>After departure time:</strong> No refund available</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">Refundable vs Non-Refundable Tickets</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Refundable tickets:</strong> Can be cancelled with minimal fees, receive credit or refund</li>
              <li><strong>Non-refundable tickets:</strong> May receive airline credit minus fees, or no refund</li>
              <li><strong>Basic Economy:</strong> Typically no changes or cancellations allowed</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Car Rental Cancellations</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Free cancellation up to 24-48 hours before pick-up time</li>
              <li>Late cancellations may incur one day rental charge</li>
              <li>No-show results in full reservation charge</li>
              <li>Pre-paid bookings may have different cancellation terms</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Activities & Tours Cancellations</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Most activities offer free cancellation 24-72 hours in advance</li>
              <li>Some experiences require 7+ days notice for full refund</li>
              <li>Weather-dependent activities may offer alternative dates or full refunds</li>
              <li>Private tours and special experiences may have stricter policies</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">How to Cancel Your Booking</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Online Cancellation (Recommended)</h3>
            <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700">
              <li>Log in to your bookmethat account</li>
              <li>Go to "My Bookings" section</li>
              <li>Select the booking you want to cancel</li>
              <li>Click "Cancel Booking" button</li>
              <li>Review cancellation terms and confirm</li>
              <li>Receive cancellation confirmation via email</li>
            </ol>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">Customer Service</h3>
            <p className="text-gray-700 mb-4">
              If you're unable to cancel online or need assistance:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Phone:</strong> +1-800-BOOKME (24/7)</li>
              <li><strong>Email:</strong> support@bookmethat.com</li>
              <li><strong>Live Chat:</strong> Available on our website</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Refund Processing</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Timeline</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Refunds are processed within 5-7 business days of cancellation</li>
              <li>Credit card refunds may take 7-14 days to appear depending on your bank</li>
              <li>PayPal refunds typically appear within 3-5 business days</li>
              <li>You'll receive email confirmation once refund is processed</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">Refund Method</h3>
            <p className="text-gray-700 mb-4">
              Refunds are issued to the original payment method used for booking. If this is not possible, we'll contact you to arrange an alternative.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Exceptions & Special Circumstances</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Force Majeure</h3>
            <p className="text-gray-700 mb-4">
              In cases of natural disasters, pandemics, political unrest, or other extraordinary events:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>We work with suppliers to offer flexible rebooking or refunds</li>
              <li>Government travel advisories may trigger special cancellation policies</li>
              <li>Contact customer service for case-by-case evaluation</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">Medical Emergencies</h3>
            <p className="text-gray-700 mb-4">
              If you need to cancel due to medical reasons:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Medical documentation may be required</li>
              <li>Travel insurance often covers medical cancellations</li>
              <li>Contact our support team to discuss options</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Travel Insurance</h2>
            <p className="text-gray-700 mb-4">
              We strongly recommend purchasing travel insurance for added protection:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Trip Cancellation:</strong> Covers non-refundable costs if you need to cancel</li>
              <li><strong>Trip Interruption:</strong> Reimburses unused portions if you must cut trip short</li>
              <li><strong>Medical Coverage:</strong> Emergency medical expenses while traveling</li>
              <li><strong>Travel Delays:</strong> Accommodation and meals if delayed</li>
            </ul>
            <p className="text-gray-700">
              Travel insurance can be purchased during the booking process or separately from third-party providers.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Modifications vs Cancellations</h2>
            <p className="text-gray-700 mb-4">
              Sometimes modifying your booking is better than canceling:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Date Changes:</strong> Often incur smaller fees than full cancellation</li>
              <li><strong>Name Changes:</strong> May be possible for small fee (hotel-dependent)</li>
              <li><strong>Room Type Changes:</strong> Subject to availability and price differences</li>
            </ul>
            <p className="text-gray-700">
              Check "Modify Booking" in your account to see available options before canceling.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Important Reminders</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-6">
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>Always review the specific cancellation policy during booking</li>
                <li>Policies vary by property, airline, and booking type</li>
                <li>Set calendar reminders for free cancellation deadlines</li>
                <li>Keep your booking confirmation for reference</li>
                <li>Consider travel insurance for expensive or non-refundable bookings</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Questions?</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about our cancellation policy or need help with a specific booking:
            </p>
            <div className="flex gap-4 mt-6">
              <Link href="/help" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                Visit Help Center
              </Link>
              <Link href="/contact" className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
                Contact Support
              </Link>
            </div>
          </section>
        </div>
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
