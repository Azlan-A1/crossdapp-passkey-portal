import Link from 'next/link';

export default function Docs() {
  return (
    <main className="min-h-screen bg-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Technical Documentation
          </h1>
          <p className="text-gray-300">
            Learn how CrossDapp Passkey Portal works and how to integrate it into your dapp
          </p>
        </div>

        <div className="space-y-8">
          <section className="bg-gray-800/50 rounded-2xl border border-gray-700 p-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Overview</h2>
            <p className="text-gray-300 mb-4">
              CrossDapp Passkey Portal is a revolutionary authentication solution that combines
              device-native passkeys with Stellar's smart contract capabilities to create a
              seamless, secure, and interoperable authentication system.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Key Benefits</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Seamless user experience</li>
                  <li>Enhanced security</li>
                  <li>Cross-dapp interoperability</li>
                  <li>Reduced onboarding friction</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Use Cases</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Token swaps</li>
                  <li>Content tipping</li>
                  <li>NFT marketplaces</li>
                  <li>DeFi applications</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-gray-800/50 rounded-2xl border border-gray-700 p-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Integration Guide</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">1. Install SDK</h3>
                <pre className="bg-gray-900 p-4 rounded-lg text-gray-300 overflow-x-auto">
                  npm install @crossdapp/passkey-portal
                </pre>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">2. Initialize Client</h3>
                <pre className="bg-gray-900 p-4 rounded-lg text-gray-300 overflow-x-auto">
                  {`import { PasskeyPortal } from '@crossdapp/passkey-portal';

const portal = new PasskeyPortal({
  network: 'testnet',
  appId: 'your-app-id'
});`}
                </pre>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">3. Handle Authentication</h3>
                <pre className="bg-gray-900 p-4 rounded-lg text-gray-300 overflow-x-auto">
                  {`// Request authentication
const auth = await portal.authenticate();

// Handle transaction signing
const tx = await portal.signTransaction(transaction);`}
                </pre>
              </div>
            </div>
          </section>

          <section className="bg-gray-800/50 rounded-2xl border border-gray-700 p-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Smart Contract Integration</h2>
            <p className="text-gray-300 mb-4">
              Our smart contracts are built using Soroban and can be easily integrated into
              your Stellar dapp. The contracts handle permission management, transaction
              automation, and cross-dapp interoperability.
            </p>
            <div className="mt-6">
              <Link 
                href="https://github.com/yourusername/crossdapp-passkey-portal/tree/main/contracts"
                target="_blank"
                className="inline-block px-6 py-3 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-300"
              >
                View Contract Code
              </Link>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/"
            className="inline-block px-6 py-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
} 