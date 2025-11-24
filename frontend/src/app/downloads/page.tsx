import Link from 'next/link';
import { Download, Smartphone, Monitor, Apple, PlayCircle } from 'lucide-react';

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold mb-4 flex items-center gap-3">
            <Download className="w-12 h-12" />
            Download BookMeThat
          </h1>
          <p className="text-xl text-blue-100">
            Book your travel on any device - Mobile, Desktop, or Web
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Mobile Apps Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Smartphone className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Mobile Apps</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* iOS App */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 hover:border-blue-500 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Apple className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">iOS App</h3>
                  <p className="text-gray-600">iPhone & iPad</p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-600">✓</span>
                  Native iOS experience
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-600">✓</span>
                  Face ID / Touch ID support
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-600">✓</span>
                  Apple Pay integration
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-600">✓</span>
                  Push notifications
                </li>
              </ul>

              <div className="space-y-3">
                <a
                  href="https://apps.apple.com/app/bookmethat/id123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-black text-white rounded-xl hover:bg-gray-800 transition font-semibold text-center"
                >
                  <Apple className="w-6 h-6 inline mr-2" />
                  Download on App Store
                </a>
                <p className="text-sm text-gray-500 text-center">
                  Requires iOS 13.0 or later
                </p>
              </div>
            </div>

            {/* Android App */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 hover:border-blue-500 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Android App</h3>
                  <p className="text-gray-600">Android Phones & Tablets</p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-600">✓</span>
                  Native Android experience
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-600">✓</span>
                  Biometric authentication
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-600">✓</span>
                  Google Pay integration
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-600">✓</span>
                  Push notifications
                </li>
              </ul>

              <div className="space-y-3">
                <a
                  href="https://play.google.com/store/apps/details?id=com.bookmethat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-black text-white rounded-xl hover:bg-gray-800 transition font-semibold text-center"
                >
                  <PlayCircle className="w-6 h-6 inline mr-2" />
                  Get it on Google Play
                </a>
                <p className="text-sm text-gray-500 text-center">
                  Requires Android 8.0 or later
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Apps Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Monitor className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Desktop Apps</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Windows App */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 hover:border-blue-500 transition-all">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Windows</h3>
                <p className="text-gray-600 mb-6">Windows 10/11</p>
              </div>

              <a
                href="/downloads/BookMeThat-Setup.exe"
                download
                className="block w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-center mb-3"
              >
                <Download className="w-5 h-5 inline mr-2" />
                Download (64-bit)
              </a>
              <p className="text-sm text-gray-500 text-center">v1.0.0 • 85 MB</p>
            </div>

            {/* macOS App */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 hover:border-blue-500 transition-all">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Apple className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">macOS</h3>
                <p className="text-gray-600 mb-6">macOS 11+</p>
              </div>

              <a
                href="/downloads/BookMeThat.dmg"
                download
                className="block w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-center mb-3"
              >
                <Download className="w-5 h-5 inline mr-2" />
                Download (Intel & M1)
              </a>
              <p className="text-sm text-gray-500 text-center">v1.0.0 • 90 MB</p>
            </div>

            {/* Linux App */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 hover:border-blue-500 transition-all">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.84-.41 1.648-.348 2.4.145 1.725 1.037 3.197 2.545 4.046.278.156.575.295.89.416-.017-.012-.033-.024-.05-.037-.93-.68-1.432-1.785-1.432-3.043 0-.78.146-1.643.43-2.55.225-.712.54-1.443.944-2.168.405-.726.893-1.443 1.465-2.127.572-.686 1.228-1.326 1.963-1.892.735-.566 1.549-1.057 2.445-1.447.895-.39 1.87-.68 2.923-.848.196-.03.392-.056.588-.075.196-.02.392-.035.588-.05.196-.012.392-.02.588-.023.196-.003.392-.001.588.005 2.043.064 3.954.696 5.576 1.716 1.622 1.02 2.955 2.426 3.896 4.104.941 1.678 1.49 3.629 1.49 5.736 0 2.107-.55 4.058-1.49 5.736-.94 1.678-2.274 3.084-3.896 4.104-1.622 1.02-3.533 1.652-5.576 1.716-.196.006-.392.008-.588.005-.196-.003-.392-.011-.588-.023-.196-.015-.392-.032-.588-.05-.196-.019-.392-.045-.588-.075-1.053-.168-2.028-.458-2.923-.848-.896-.39-1.71-.881-2.445-1.447-.735-.566-1.391-1.206-1.963-1.892-.572-.684-1.06-1.401-1.465-2.127-.404-.725-.719-1.456-.944-2.168-.284-.907-.43-1.77-.43-2.55 0-1.258.502-2.363 1.432-3.043.017-.013.033-.025.05-.037-.315.121-.612.26-.89.416-1.508.849-2.4 2.321-2.545 4.046-.062.752.07 1.56.348 2.4.589 1.771 1.831 3.47 2.716 4.521.75 1.067.974 1.928 1.05 3.02.065 1.491-1.056 5.965 3.17 6.298.165.013.325.021.48.021 4.278 0 5.466-5.271 5.466-6.298 0-1.783-.506-2.915-1.506-4.046-.75-.848-1.5-1.848-2.1-3.02z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Linux</h3>
                <p className="text-gray-600 mb-6">Ubuntu, Debian, Fedora</p>
              </div>

              <a
                href="/downloads/BookMeThat.AppImage"
                download
                className="block w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-center mb-3"
              >
                <Download className="w-5 h-5 inline mr-2" />
                Download (AppImage)
              </a>
              <p className="text-sm text-gray-500 text-center">v1.0.0 • 80 MB</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">All Apps Include</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🏨</div>
              <h3 className="font-bold text-xl mb-2">Full Booking Features</h3>
              <p className="text-blue-100">Hotels, Flights, Trains, Cars, Activities</p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="font-bold text-xl mb-2">Secure Payments</h3>
              <p className="text-blue-100">JazzCash, EasyPaisa, Cards accepted</p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="font-bold text-xl mb-2">Travel eSIM</h3>
              <p className="text-blue-100">Stay connected in 190+ countries</p>
            </div>
          </div>
        </div>

        {/* Web App Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Prefer not to install? Use our web app instead
          </p>
          <Link 
            href="/"
            className="inline-block px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition font-semibold"
          >
            Open Web App →
          </Link>
        </div>
      </div>
    </div>
  );
}
