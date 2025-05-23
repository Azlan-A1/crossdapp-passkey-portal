import Link from 'next/link';

export default function TokenSwapDemo() {
  return (
    <main className="min-h-screen bg-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Token Swap Demo
          </h1>
          <p className="text-gray-300">
            Experience seamless token swaps with our passkey-powered demo
          </p>
        </div>

        <div className="bg-gray-800/50 rounded-2xl border border-gray-700 p-8">
          <div className="aspect-video bg-gray-700 rounded-xl mb-8 flex items-center justify-center">
            <p className="text-gray-400">Demo Interface Coming Soon</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-700/50 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">How it works</h3>
              <p className="text-gray-300">
                This demo will showcase how users can swap tokens across the Stellar network
                using just their passkey, without needing to manage multiple wallets or
                handle complex transaction signing.
              </p>
            </div>

            <div className="p-4 bg-gray-700/50 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Features</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>One-click token swaps</li>
                <li>Passkey authentication</li>
                <li>Smart wallet integration</li>
                <li>Real-time price feeds</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link 
              href="/"
              className="inline-block px-6 py-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 