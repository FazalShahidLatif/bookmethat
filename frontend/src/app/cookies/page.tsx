import Link from 'next/link';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Cookie Policy - How We Use Cookies | bookmethat',
  description: 'Learn about how bookmethat uses cookies to improve your experience. Manage your cookie preferences and understand what data we collect.',
  keywords: ['cookie policy', 'cookies', 'privacy', 'tracking', 'data collection'],
};

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
        <p className="text-gray-600 mb-8 text-lg">Last updated: November 21, 2025</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">What Are Cookies?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit websites. They help websites remember your actions and preferences over time, making your browsing experience more efficient and personalized.
            </p>
            <p className="text-gray-700 leading-relaxed">
              At bookmethat, we use cookies and similar tracking technologies to improve your experience, analyze site performance, and provide personalized content and advertisements.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Essential Cookies (Required)</h3>
            <p className="text-gray-700 mb-4">
              These cookies are necessary for the website to function properly. Without them, core features like booking, account access, and payment processing won't work.
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Session cookies:</strong> Keep you logged in as you browse</li>
              <li><strong>Security cookies:</strong> Detect authentication issues and protect against fraud</li>
              <li><strong>Cart cookies:</strong> Remember items in your booking cart</li>
              <li><strong>Payment cookies:</strong> Enable secure payment processing</li>
            </ul>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
              <p className="text-sm text-gray-800">
                <strong>Note:</strong> Essential cookies cannot be disabled as they are required for the website to function.
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">Performance & Analytics Cookies (Optional)</h3>
            <p className="text-gray-700 mb-4">
              These cookies help us understand how visitors interact with our website by collecting anonymous information.
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Google Analytics:</strong> Tracks page views, user behavior, and traffic sources</li>
              <li><strong>Hotjar:</strong> Records anonymized user sessions to improve UX</li>
              <li><strong>Performance metrics:</strong> Measures page load times and errors</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">Functionality Cookies (Optional)</h3>
            <p className="text-gray-700 mb-4">
              These cookies remember your preferences and choices to provide a more personalized experience.
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Language preferences:</strong> Remember your selected language</li>
              <li><strong>Currency selection:</strong> Display prices in your preferred currency</li>
              <li><strong>Search filters:</strong> Save your search preferences</li>
              <li><strong>Accessibility settings:</strong> Remember accessibility choices</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">Targeting & Advertising Cookies (Optional)</h3>
            <p className="text-gray-700 mb-4">
              These cookies track your browsing habits to show you relevant advertisements across the web.
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Retargeting pixels:</strong> Show ads for properties you viewed</li>
              <li><strong>Social media cookies:</strong> Enable sharing and social media advertising</li>
              <li><strong>Ad network cookies:</strong> Serve personalized ads on partner websites</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Third-Party Cookies</h2>
            <p className="text-gray-700 mb-4">
              We work with trusted third-party services that may also place cookies on your device:
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">Service Providers</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Google Analytics:</strong> Website analytics and insights</li>
              <li><strong>Stripe:</strong> Secure payment processing</li>
              <li><strong>Cloudflare:</strong> Content delivery and security</li>
              <li><strong>Intercom:</strong> Customer support chat</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">Social Media Platforms</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Facebook Pixel:</strong> Track conversions and show relevant ads</li>
              <li><strong>Twitter:</strong> Social sharing and analytics</li>
              <li><strong>Instagram:</strong> Social media integration</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">Advertising Partners</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Google Ads:</strong> Display advertising</li>
              <li><strong>Meta Ads:</strong> Facebook and Instagram advertising</li>
              <li><strong>TripAdvisor:</strong> Review integration and advertising</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">How Long Do Cookies Last?</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Session Cookies</h3>
            <p className="text-gray-700 mb-4">
              Temporary cookies deleted when you close your browser. Used for essential functions like maintaining your login session.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">Persistent Cookies</h3>
            <p className="text-gray-700 mb-4">
              Remain on your device for a set period (from days to years). Used for remembering preferences and tracking behavior over time.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-4">
              <p className="text-sm text-gray-800">
                Most of our cookies expire after 1-2 years. Essential cookies may last up to 2 years, while some advertising cookies expire after 30-90 days.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Managing Your Cookie Preferences</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Cookie Consent Banner</h3>
            <p className="text-gray-700 mb-4">
              When you first visit bookmethat, you'll see a cookie consent banner. You can:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Accept All:</strong> Allow all cookies for the best experience</li>
              <li><strong>Reject Optional:</strong> Only use essential cookies (some features may not work)</li>
              <li><strong>Customize:</strong> Choose which cookie categories to enable</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">Browser Settings</h3>
            <p className="text-gray-700 mb-4">
              You can control cookies through your browser settings:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and site data</li>
              <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">Opt-Out Tools</h3>
            <p className="text-gray-700 mb-4">
              You can opt out of targeted advertising:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Google Ads:</strong> <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Ad Settings</a></li>
              <li><strong>Facebook:</strong> <a href="https://www.facebook.com/settings?tab=ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Ad Preferences</a></li>
              <li><strong>NAI Opt-Out:</strong> <a href="http://optout.networkadvertising.org/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Network Advertising Initiative</a></li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
              <p className="text-sm text-gray-800">
                <strong>Warning:</strong> Blocking all cookies may prevent certain features from working properly, including booking functionality and saved preferences.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Do Not Track (DNT)</h2>
            <p className="text-gray-700 mb-4">
              Some browsers have a "Do Not Track" feature that signals websites not to track you. Currently, there is no industry standard for DNT, and we do not alter our behavior based on DNT signals.
            </p>
            <p className="text-gray-700">
              However, you can control tracking through our cookie consent banner and browser settings as described above.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Mobile Apps</h2>
            <p className="text-gray-700 mb-4">
              Our mobile apps use similar tracking technologies:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Device identifiers:</strong> Used instead of cookies on mobile</li>
              <li><strong>Mobile analytics:</strong> Track app usage and performance</li>
              <li><strong>Push notifications:</strong> Require your explicit permission</li>
            </ul>
            <p className="text-gray-700">
              You can control mobile tracking through your device settings (iOS: Settings → Privacy; Android: Settings → Google → Ads).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our practices. We'll notify you of significant changes by:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Posting a notice on our website</li>
              <li>Updating the "Last updated" date at the top of this page</li>
              <li>Sending an email to registered users (for major changes)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Your Rights</h2>
            <p className="text-gray-700 mb-4">
              Depending on your location, you may have rights regarding cookies and tracking:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Right to withdraw consent:</strong> Change your cookie preferences anytime</li>
              <li><strong>Right to object:</strong> Opt out of profiling and targeted advertising</li>
              <li><strong>Right to access:</strong> Request information about data collected via cookies</li>
              <li><strong>Right to deletion:</strong> Request deletion of data collected through cookies</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about our use of cookies or this policy:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li><strong>Email:</strong> privacy@bookmethat.com</li>
              <li><strong>Mail:</strong> bookmethat Privacy Team, 123 Travel Lane, San Francisco, CA 94105</li>
              <li><strong>Online Form:</strong> <Link href="/contact" className="text-blue-600 hover:underline">Contact Us</Link></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Related Policies</h2>
            <p className="text-gray-700 mb-4">
              For more information about how we handle your data:
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
                Terms of Service
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
