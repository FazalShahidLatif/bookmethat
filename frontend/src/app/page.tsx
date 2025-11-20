export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          bookmethat.com
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your marketplace for travel bookings & eSIMs
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/search"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Search Properties
          </a>
          <a
            href="/esim"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Buy eSIM
          </a>
        </div>
        <div className="mt-12 text-sm text-gray-500">
          <p>🚧 MVP in Development</p>
          <p className="mt-2">
            Repository:{' '}
            <a
              href="https://github.com/FazalShahidLatif/bookmethat"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
