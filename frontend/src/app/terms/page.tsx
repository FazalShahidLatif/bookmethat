import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms and Conditions - User Agreement | bookmethat',
  description: 'Read the terms and conditions for using bookmethat services. Understanding your rights and responsibilities when booking travel accommodations.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsAndConditionsPage() {
  const lastUpdated = 'November 21, 2025';

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-sm text-blue-100 hover:text-white mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-xl text-blue-100">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to bookmethat.com ("Website", "Service", "we", "us", or "our"). These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User", "you", or "your") and bookmethat regarding your access to and use of our website and services.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By accessing or using bookmethat.com, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not use our services.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Eligibility</h2>
          <p className="text-gray-700 mb-3">To use our services, you must:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Be at least 18 years of age or the age of legal majority in your jurisdiction</li>
            <li>Have the legal capacity to enter into binding contracts</li>
            <li>Provide accurate, current, and complete information during registration</li>
            <li>Not be prohibited from using our services under applicable laws</li>
            <li>Not have been previously suspended or banned from our platform</li>
          </ul>
          <p className="text-gray-700 mt-4">
            If you are using our services on behalf of a business or organization, you represent that you have the authority to bind that entity to these Terms.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Services Provided</h2>
          <p className="text-gray-700 mb-3">bookmethat provides the following services:</p>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">3.1 Travel Booking Platform</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li><strong>Hotel Bookings:</strong> Search, compare, and book accommodations worldwide</li>
            <li><strong>Flight Bookings:</strong> Search and book domestic and international flights</li>
            <li><strong>Car Rentals:</strong> Reserve vehicles from rental companies globally</li>
            <li><strong>Activities & Tours:</strong> Book attractions, experiences, and guided tours</li>
            <li><strong>Airport Transfers:</strong> Arrange transportation to/from airports</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">3.2 Value-Added Services</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li><strong>eSIM Services:</strong> Purchase and activate travel eSIMs for international connectivity</li>
            <li><strong>Travel Insurance:</strong> Optional coverage for trip cancellation, medical emergencies, etc.</li>
            <li><strong>Travel Guides:</strong> Destination information, tips, and recommendations</li>
          </ul>

          <p className="text-gray-700 mt-4">
            <strong>Important:</strong> bookmethat acts as an intermediary between you and third-party service providers (hotels, airlines, car rental companies, etc.). We facilitate bookings but do not own, operate, or control the underlying services.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">4. User Accounts</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">4.1 Account Registration</h3>
          <p className="text-gray-700 mb-3">To make bookings, you must create an account by providing:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Full name</li>
            <li>Valid email address</li>
            <li>Secure password</li>
            <li>Phone number (for booking confirmations)</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">4.2 Account Security</h3>
          <p className="text-gray-700 mb-3">You are responsible for:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized access</li>
            <li>Not sharing your account with others</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">4.3 Account Termination</h3>
          <p className="text-gray-700">
            We reserve the right to suspend or terminate your account at our discretion if you violate these Terms, engage in fraudulent activity, or misuse our services. You may also close your account at any time by contacting customer support.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Booking Process</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">5.1 Search and Selection</h3>
          <p className="text-gray-700 mb-4">
            You can search for travel services using our platform. Prices, availability, and descriptions are provided by third-party suppliers and are subject to change without notice until your booking is confirmed.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">5.2 Booking Confirmation</h3>
          <p className="text-gray-700 mb-3">A binding contract is formed when:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>You submit a booking request with payment information</li>
            <li>Payment is successfully processed</li>
            <li>You receive a confirmation email with booking details</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">5.3 Booking Accuracy</h3>
          <p className="text-gray-700">
            You are responsible for ensuring all booking details are correct (names, dates, destinations, number of guests, etc.). Errors may result in additional fees, cancellation charges, or inability to use services.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Pricing and Payment</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">6.1 Prices</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>All prices are displayed in USD (or your selected currency) and include applicable taxes unless stated otherwise</li>
            <li>Prices may vary based on dates, availability, and demand</li>
            <li>We reserve the right to correct pricing errors and may cancel bookings made at incorrect prices</li>
            <li>Additional fees (resort fees, local taxes, cleaning fees) may be charged by providers at the property</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">6.2 Payment Methods</h3>
          <p className="text-gray-700 mb-3">We accept:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Credit cards (Visa, Mastercard, American Express)</li>
            <li>Debit cards</li>
            <li>PayPal (where available)</li>
            <li>Digital wallets (Apple Pay, Google Pay)</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">6.3 Payment Processing</h3>
          <p className="text-gray-700 mb-4">
            Payments are processed securely through our payment partner, Stripe. We do not store your full payment card details. By providing payment information, you authorize us to charge the total booking amount.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">6.4 Service Fees</h3>
          <p className="text-gray-700">
            We may charge a service fee for bookings, which will be clearly displayed before payment. This fee is non-refundable even if you cancel your booking.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Cancellations and Refunds</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">7.1 Cancellation Policies</h3>
          <p className="text-gray-700 mb-3">
            Cancellation policies vary by service provider and are displayed during booking. Common policies include:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li><strong>Free Cancellation:</strong> Full refund if canceled before specified deadline</li>
            <li><strong>Partial Refund:</strong> Percentage of payment refunded based on cancellation timing</li>
            <li><strong>Non-Refundable:</strong> No refund available (typically offers lower prices)</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">7.2 How to Cancel</h3>
          <p className="text-gray-700 mb-3">To cancel a booking:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Log in to your account and go to "My Bookings"</li>
            <li>Select the booking you wish to cancel</li>
            <li>Follow the cancellation instructions</li>
            <li>You will receive a cancellation confirmation email</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">7.3 Refund Processing</h3>
          <p className="text-gray-700">
            Refunds (if applicable) are processed to your original payment method within 7-14 business days. Refund timelines may vary depending on your bank or card issuer.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">7.4 Provider Cancellations</h3>
          <p className="text-gray-700">
            If a service provider cancels your booking, we will assist in finding alternative arrangements or provide a full refund.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">8. User Conduct</h2>
          <p className="text-gray-700 mb-3">You agree NOT to:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Provide false, inaccurate, or misleading information</li>
            <li>Use our services for illegal purposes or to violate any laws</li>
            <li>Engage in fraudulent activities or payment disputes without cause</li>
            <li>Post offensive, defamatory, or inappropriate content in reviews</li>
            <li>Attempt to hack, disrupt, or gain unauthorized access to our systems</li>
            <li>Use automated tools (bots, scrapers) to access our website</li>
            <li>Resell or commercially exploit our services without authorization</li>
            <li>Impersonate another person or entity</li>
            <li>Upload viruses, malware, or harmful code</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Reviews and User Content</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">9.1 Posting Reviews</h3>
          <p className="text-gray-700 mb-4">
            You may post reviews and ratings for accommodations and services after completing a booking. Reviews must be honest, accurate, and based on your personal experience.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">9.2 Content Guidelines</h3>
          <p className="text-gray-700 mb-3">Reviews must NOT contain:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Profanity, hate speech, or discriminatory language</li>
            <li>Personal information (phone numbers, email addresses)</li>
            <li>Spam, promotional content, or advertisements</li>
            <li>False or defamatory statements</li>
            <li>Copyright-protected material without permission</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">9.3 Content Ownership</h3>
          <p className="text-gray-700">
            By posting content on our platform, you grant bookmethat a worldwide, non-exclusive, royalty-free license to use, reproduce, display, and distribute your content for promotional and operational purposes.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Intellectual Property</h2>
          <p className="text-gray-700 mb-3">
            All content on bookmethat.com, including but not limited to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Text, graphics, logos, images, videos</li>
            <li>Software, code, and functionality</li>
            <li>Trademarks, service marks, and trade names</li>
            <li>Design, layout, and user interface</li>
          </ul>
          <p className="text-gray-700">
            ...is owned by bookmethat or our licensors and protected by copyright, trademark, and intellectual property laws. You may not copy, reproduce, distribute, or create derivative works without our written permission.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">11. Third-Party Services</h2>
          <p className="text-gray-700 mb-4">
            Our platform integrates with third-party providers (hotels, airlines, car rental companies, payment processors, eSIM providers). We are not responsible for:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>The quality, safety, or legality of services provided by third parties</li>
            <li>Accuracy of third-party information (descriptions, photos, amenities)</li>
            <li>Actions or omissions of third-party providers</li>
            <li>Disputes between you and service providers</li>
          </ul>
          <p className="text-gray-700 mt-4">
            You agree to resolve disputes directly with the service provider, though we will assist where possible.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">12. Disclaimers and Limitations of Liability</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">12.1 Service "As Is"</h3>
          <p className="text-gray-700 mb-4">
            Our services are provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">12.2 Limitation of Liability</h3>
          <p className="text-gray-700 mb-4">
            To the maximum extent permitted by law, bookmethat shall not be liable for:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Indirect, incidental, special, consequential, or punitive damages</li>
            <li>Loss of profits, revenue, data, or business opportunities</li>
            <li>Personal injury or property damage arising from your use of services</li>
            <li>Acts or omissions of third-party service providers</li>
            <li>Force majeure events (natural disasters, pandemics, terrorism, war)</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Our total liability shall not exceed the amount you paid for the specific booking giving rise to the claim.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">13. Indemnification</h2>
          <p className="text-gray-700">
            You agree to indemnify, defend, and hold harmless bookmethat, its affiliates, officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
            <li>Your violation of these Terms</li>
            <li>Your use or misuse of our services</li>
            <li>Your violation of any rights of a third party</li>
            <li>Any content you post on our platform</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">14. Dispute Resolution</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">14.1 Governing Law</h3>
          <p className="text-gray-700 mb-4">
            These Terms are governed by the laws of the State of California, USA, without regard to conflict of law principles.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">14.2 Arbitration</h3>
          <p className="text-gray-700 mb-4">
            Any disputes arising from these Terms or your use of our services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association (AAA), rather than in court.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">14.3 Class Action Waiver</h3>
          <p className="text-gray-700">
            You agree to resolve disputes on an individual basis only and waive your right to participate in class actions or collective proceedings.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">15. Modifications to Terms</h2>
          <p className="text-gray-700">
            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on this page. We will notify you of material changes via email or prominent website notice. Your continued use of our services after changes constitutes acceptance of the modified Terms.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">16. Severability</h2>
          <p className="text-gray-700">
            If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">17. Contact Information</h2>
          <p className="text-gray-700 mb-4">
            For questions or concerns regarding these Terms, please contact us:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-800 mb-2"><strong>bookmethat Legal Department</strong></p>
            <p className="text-gray-700 mb-1">Email: <a href="mailto:legal@bookmethat.com" className="text-blue-600 hover:underline">legal@bookmethat.com</a></p>
            <p className="text-gray-700 mb-1">Customer Support: <a href="mailto:support@bookmethat.com" className="text-blue-600 hover:underline">support@bookmethat.com</a></p>
            <p className="text-gray-700 mb-1">Phone: +1-555-BOOK-NOW (24/7 Support)</p>
            <p className="text-gray-700">Address: 123 Travel Street, Suite 100, San Francisco, CA 94105, USA</p>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Acknowledgment</h3>
          <p className="text-gray-700">
            By using bookmethat.com, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions and our Privacy Policy.
          </p>
        </section>
      </article>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/" className="text-gray-400 hover:text-white transition">Home</Link>
            <Link href="/blog" className="text-gray-400 hover:text-white transition">Blog</Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link>
          </div>
          <p className="text-sm text-gray-400">© 2025 bookmethat. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
