import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Travel Blog</Link></li>
              <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
              <li><Link href="/reviews" className="hover:text-white transition">Reviews</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/hotels" className="hover:text-white transition">Hotels</Link></li>
              <li><Link href="/flights" className="hover:text-white transition">Flights</Link></li>
              <li><Link href="/cars" className="hover:text-white transition">Car Rentals</Link></li>
              <li><Link href="/activities" className="hover:text-white transition">Activities</Link></li>
              <li><Link href="/esim" className="hover:text-white transition">Travel eSIM</Link></li>
              <li><Link href="/destinations" className="hover:text-white transition">Destinations</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/help" className="hover:text-white transition">Help Center</Link></li>
              <li><Link href="/account" className="hover:text-white transition">My Bookings</Link></li>
              <li><Link href="/cancellation" className="hover:text-white transition">Cancellation Policy</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="border-t border-gray-800 pt-8 pb-6">
          <div className="text-center mb-4">
            <span className="text-sm text-gray-400 block mb-4">Secure Payments • SSL Encrypted</span>
          </div>
          <div className="flex justify-center items-center">
            <div className="bg-white rounded-lg p-4 inline-flex items-center gap-6">
              {/* Security Lock Icon */}
              <div className="flex items-center gap-2">
                <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                </svg>
                <div className="text-left">
                  <div className="text-sm font-bold text-gray-900">Secure Checkout</div>
                  <div className="text-xs text-gray-600">256-bit SSL</div>
                </div>
              </div>
              
              {/* Credit Card Logos */}
              <div className="flex items-center gap-2 border-l-2 border-gray-200 pl-6">
                {/* Visa */}
                <div className="w-14 h-9 bg-white border border-gray-200 rounded flex items-center justify-center">
                  <svg className="w-10 h-4" viewBox="0 0 48 16" fill="none">
                    <path d="M18.5 1.5l-3.2 13h2.5l3.2-13h-2.5zM31 1.3c-.5-.2-1.3-.4-2.3-.4-2.5 0-4.3 1.3-4.3 3.2 0 1.4 1.3 2.1 2.2 2.6.9.5 1.3.8 1.3 1.2 0 .6-.8.9-1.5.9-1 0-1.5-.1-2.3-.5l-.3-.2-.4 2.1c.6.3 1.7.5 2.8.5 2.7 0 4.4-1.3 4.5-3.3 0-1.1-.7-1.9-2.1-2.6-.9-.4-1.4-.7-1.4-1.2 0-.4.5-.8 1.5-.8.9 0 1.5.2 2 .4l.2.1.4-2zM38.8 1.5h-1.9c-.6 0-1 .2-1.3.8L31 14.5h2.7l.5-1.5h3.3l.3 1.5h2.4l-2.1-13h-.3zm-3 8.3c.2-.6 1.1-3 1.1-3l.6 3h-1.7zM14.5 1.5l-2.5 8.9-.3-1.3c-.5-1.6-1.9-3.3-3.6-4.2l2.2 9.6h2.7l4-13h-2.5z" fill="#1434CB"/>
                    <path d="M6.7 1.5H1.1L1 1.7c3.2.8 5.3 2.7 6.2 5l-.9-4.4c-.2-.6-.6-.8-1.2-.8h2.6z" fill="#F7B600"/>
                  </svg>
                </div>
                
                {/* MasterCard */}
                <div className="w-14 h-9 bg-white border border-gray-200 rounded flex items-center justify-center">
                  <svg className="w-10 h-7" viewBox="0 0 48 32" fill="none">
                    <circle cx="15" cy="16" r="10" fill="#EB001B"/>
                    <circle cx="33" cy="16" r="10" fill="#F79E1B"/>
                    <path d="M24 8c-2.4 1.8-4 4.7-4 8s1.6 6.2 4 8c2.4-1.8 4-4.7 4-8s-1.6-6.2-4-8z" fill="#FF5F00"/>
                  </svg>
                </div>
                
                {/* American Express */}
                <div className="w-14 h-9 bg-white border border-gray-200 rounded flex items-center justify-center">
                  <svg className="w-10 h-7" viewBox="0 0 48 32" fill="none">
                    <rect width="48" height="32" rx="3" fill="#006FCF"/>
                    <text x="6" y="20" fontSize="8" fontWeight="bold" fill="white">AMEX</text>
                  </svg>
                </div>
                
                {/* Discover */}
                <div className="w-14 h-9 bg-white border border-gray-200 rounded flex items-center justify-center">
                  <svg className="w-10 h-4" viewBox="0 0 48 16" fill="none">
                    <path d="M0 8c0-4.4 3.6-8 8-8h32c4.4 0 8 3.6 8 8s-3.6 8-8 8H8c-4.4 0-8-3.6-8-8z" fill="#FF6000"/>
                    <path d="M42 2h-3v12h3c3.3 0 6-2.7 6-6s-2.7-6-6-6z" fill="#F48120"/>
                    <text x="4" y="11" fontSize="8" fontWeight="bold" fill="white">DISCOVER</text>
                  </svg>
                </div>
              </div>
              
              {/* Payment Processor Note */}
              <div className="text-left border-l-2 border-gray-200 pl-6">
                <div className="text-xs font-bold text-gray-900 mb-1">Secure Payment Processing</div>
                <div className="text-xs text-gray-600">PCI DSS Compliant</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400 text-center md:text-left">
            © 2025 BookMeThat. All rights reserved. • 🚧 MVP in Development
          </p>
          <div className="flex gap-4">
            <a 
              href="https://facebook.com/bookmethat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition" 
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href="https://twitter.com/bookmethat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition" 
              aria-label="Twitter"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a 
              href="https://instagram.com/bookmethat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition" 
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
              </svg>
            </a>
            <a 
              href="https://linkedin.com/company/bookmethat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition" 
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
