import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - How We Protect Your Data | bookmethat',
  description: 'Learn how bookmethat collects, uses, and protects your personal information. Our commitment to data privacy and security for all users.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'November 21, 2025';

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-sm text-blue-100 hover:text-white mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-blue-100">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 py-12 prose prose-lg">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to bookmethat.com ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By accessing or using bookmethat.com, you agree to the terms outlined in this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">2.1 Personal Information</h3>
          <p className="text-gray-700 mb-3">We collect personal information that you voluntarily provide to us, including:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li><strong>Account Information:</strong> Name, email address, phone number, password, date of birth</li>
            <li><strong>Booking Information:</strong> Travel preferences, guest details, special requests</li>
            <li><strong>Payment Information:</strong> Credit/debit card details, billing address (processed securely through Stripe)</li>
            <li><strong>Identity Verification:</strong> Passport or ID information (when required by accommodation providers)</li>
            <li><strong>Communication Data:</strong> Messages, reviews, customer support inquiries</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">2.2 Automatically Collected Information</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
            <li><strong>Usage Data:</strong> Pages viewed, search queries, booking history, time spent on site</li>
            <li><strong>Location Data:</strong> Geographic location (if you grant permission)</li>
            <li><strong>Cookies & Tracking:</strong> Session cookies, preference cookies, analytics cookies</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">2.3 Third-Party Information</h3>
          <p className="text-gray-700">
            We may receive information about you from third parties such as social media platforms (if you choose to log in via Facebook or Google), payment processors, fraud prevention services, and accommodation/flight providers.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-700 mb-3">We use your information for the following purposes:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Service Delivery:</strong> Process bookings, send confirmations, manage reservations</li>
            <li><strong>Customer Support:</strong> Respond to inquiries, resolve issues, provide assistance</li>
            <li><strong>Personalization:</strong> Recommend hotels, flights, and activities based on preferences</li>
            <li><strong>Communication:</strong> Send booking updates, promotional offers, newsletters (opt-in)</li>
            <li><strong>Payment Processing:</strong> Complete transactions securely through our payment partners</li>
            <li><strong>Security & Fraud Prevention:</strong> Detect and prevent fraudulent activities</li>
            <li><strong>Analytics & Improvement:</strong> Analyze usage patterns to improve our services</li>
            <li><strong>Legal Compliance:</strong> Comply with legal obligations, enforce terms, protect rights</li>
            <li><strong>Marketing:</strong> Display personalized ads (with your consent)</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">4. How We Share Your Information</h2>
          <p className="text-gray-700 mb-3">We may share your information with:</p>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">4.1 Service Providers</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li><strong>Accommodation Providers:</strong> Hotels, hostels, vacation rentals to fulfill bookings</li>
            <li><strong>Airlines & Car Rental Companies:</strong> To complete flight and car rental reservations</li>
            <li><strong>Payment Processors:</strong> Stripe and other payment gateways for secure transactions</li>
            <li><strong>eSIM Providers:</strong> Airalo and other partners for eSIM provisioning</li>
            <li><strong>Technology Partners:</strong> Cloud hosting (AWS, Netlify), analytics (Google Analytics), email services</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">4.2 Legal Requirements</h3>
          <p className="text-gray-700 mb-4">
            We may disclose your information to comply with legal obligations, respond to lawful requests from authorities, protect our rights, or prevent fraud.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">4.3 Business Transfers</h3>
          <p className="text-gray-700">
            In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Data Security</h2>
          <p className="text-gray-700 mb-3">We implement industry-standard security measures to protect your data:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Encryption:</strong> SSL/TLS encryption for data transmission</li>
            <li><strong>Secure Storage:</strong> Encrypted databases with access controls</li>
            <li><strong>Payment Security:</strong> PCI-DSS compliant payment processing (we never store full card details)</li>
            <li><strong>Access Controls:</strong> Limited employee access to personal data on a need-to-know basis</li>
            <li><strong>Regular Audits:</strong> Security assessments and vulnerability testing</li>
            <li><strong>Incident Response:</strong> Procedures to respond to data breaches promptly</li>
          </ul>
          <p className="text-gray-700 mt-4">
            <strong>Note:</strong> While we strive to protect your data, no method of transmission over the internet is 100% secure. You are responsible for maintaining the confidentiality of your account credentials.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Your Privacy Rights</h2>
          <p className="text-gray-700 mb-3">Depending on your location, you may have the following rights:</p>
          
          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">6.1 GDPR Rights (EU/EEA Users)</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li><strong>Access:</strong> Request a copy of your personal data</li>
            <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
            <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
            <li><strong>Restriction:</strong> Limit how we process your data</li>
            <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
            <li><strong>Objection:</strong> Object to processing based on legitimate interests or direct marketing</li>
            <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing at any time</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">6.2 CCPA Rights (California Users)</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li><strong>Know:</strong> Know what personal information is collected</li>
            <li><strong>Delete:</strong> Request deletion of your personal information</li>
            <li><strong>Opt-Out:</strong> Opt-out of the sale of personal information (we do not sell data)</li>
            <li><strong>Non-Discrimination:</strong> Not be discriminated against for exercising your rights</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">6.3 How to Exercise Your Rights</h3>
          <p className="text-gray-700">
            To exercise any of these rights, please contact us at <a href="mailto:privacy@bookmethat.com" className="text-blue-600 hover:underline">privacy@bookmethat.com</a>. We will respond within 30 days.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Cookies & Tracking Technologies</h2>
          <p className="text-gray-700 mb-3">We use cookies and similar technologies for:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li><strong>Essential Cookies:</strong> Required for site functionality (login, shopping cart)</li>
            <li><strong>Analytics Cookies:</strong> Google Analytics to understand site usage</li>
            <li><strong>Marketing Cookies:</strong> Personalized ads and retargeting (with consent)</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
          </ul>
          <p className="text-gray-700">
            You can manage cookie preferences through your browser settings or our cookie consent banner. Note that disabling certain cookies may limit site functionality.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
          <p className="text-gray-700">
            We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. Typically:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
            <li><strong>Account Data:</strong> Until you request deletion or account closure</li>
            <li><strong>Booking Data:</strong> 7 years for tax and accounting purposes</li>
            <li><strong>Marketing Data:</strong> Until you unsubscribe or object</li>
            <li><strong>Analytics Data:</strong> Aggregated and anonymized indefinitely</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
          <p className="text-gray-700">
            Your information may be transferred to and processed in countries outside your country of residence, including the United States. We ensure adequate safeguards through:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
            <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
            <li>Privacy Shield certification (where applicable)</li>
            <li>Adequacy decisions by relevant authorities</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
          <p className="text-gray-700">
            Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">11. Third-Party Links</h2>
          <p className="text-gray-700">
            Our website may contain links to third-party websites (hotels, airlines, payment processors). We are not responsible for the privacy practices of these external sites. Please review their privacy policies before providing any information.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. We will notify you of any material changes by:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3 mb-4">
            <li>Posting the updated policy on this page with a new "Last Updated" date</li>
            <li>Sending an email notification to registered users</li>
            <li>Displaying a prominent notice on our website</li>
          </ul>
          <p className="text-gray-700">
            Your continued use of our services after changes are posted constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-800 mb-2"><strong>bookmethat Privacy Team</strong></p>
            <p className="text-gray-700 mb-1">Email: <a href="mailto:privacy@bookmethat.com" className="text-blue-600 hover:underline">privacy@bookmethat.com</a></p>
            <p className="text-gray-700 mb-1">Data Protection Officer: <a href="mailto:dpo@bookmethat.com" className="text-blue-600 hover:underline">dpo@bookmethat.com</a></p>
            <p className="text-gray-700 mb-1">Phone: +1-555-BOOK-NOW (available 24/7)</p>
            <p className="text-gray-700">Address: 123 Travel Street, Suite 100, San Francisco, CA 94105, USA</p>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">EU Representative</h3>
          <p className="text-gray-700">
            For users in the European Economic Area, our designated GDPR representative is:
          </p>
          <p className="text-gray-700 mt-2">
            <strong>bookmethat EU Representative</strong><br />
            Email: <a href="mailto:gdpr@bookmethat.com" className="text-blue-600 hover:underline">gdpr@bookmethat.com</a>
          </p>
        </section>
      </article>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="/" className="text-gray-400 hover:text-white transition">Home</Link>
            <Link href="/blog" className="text-gray-400 hover:text-white transition">Blog</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition">Terms</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link>
          </div>
          <p className="text-sm text-gray-400">© 2025 bookmethat. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
