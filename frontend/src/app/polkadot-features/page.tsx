"use client";

import { usePolkadotWallet } from '@/lib/hooks/usePolkadotWallet';
import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function PolkadotFeaturesPage() {
  const {
    accounts,
    selectedAddress,
    isConnecting,
    error,
    connect,
    selectAccount,
  } = usePolkadotWallet();
  const [isLinking, setIsLinking] = useState(false);

  const handleLinkWallet = async () => {
    if (!selectedAddress) return;
    setIsLinking(true);
    try {
      localStorage.setItem('linkedPolkadotAddress', selectedAddress);
      toast.success('Polkadot wallet linked successfully!');
    } catch (error) {
      toast.error('Failed to link wallet');
    } finally {
      setIsLinking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Polkadot & Multichain Features
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          OrbitPass supports Polkadot wallet integration and multi-chain identity management. Connect your Polkadot wallet, link it to your OrbitPass profile, and experience seamless cross-chain authentication between Stellar and Polkadot dapps.
        </p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Polkadot Wallet Integration</h2>
          {error && (
            <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded">
              {error}
            </div>
          )}
          {!selectedAddress ? (
            <button
              onClick={connect}
              disabled={isConnecting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {isConnecting ? 'Connecting...' : 'Connect Polkadot Wallet'}
            </button>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                <p className="text-sm text-gray-600 dark:text-gray-300">Selected Address:</p>
                <p className="text-sm font-mono text-gray-900 dark:text-white break-all">
                  {selectedAddress}
                </p>
              </div>
              <button
                onClick={handleLinkWallet}
                disabled={isLinking}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                {isLinking ? 'Linking...' : 'Link to My Passkey'}
              </button>
            </div>
          )}
          {accounts.length > 0 && !selectedAddress && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Select an Account
              </h3>
              <div className="space-y-2">
                {accounts.map((account) => (
                  <button
                    key={account.address}
                    onClick={() => selectAccount(account.address)}
                    className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                  >
                    <p className="text-sm font-mono text-gray-900 dark:text-white break-all">
                      {account.address}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {account.meta.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Multi-Chain Integration</h2>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            OrbitPass enables you to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
            <li>Link your Polkadot wallet to your Stellar-based OrbitPass profile</li>
            <li>Authenticate across Stellar and Polkadot dapps with a single passkey</li>
            <li>Manage cross-chain permissions and smart wallet policies</li>
            <li>Experience seamless user journeys between chains</li>
          </ul>
          <div className="flex flex-wrap gap-4">
            <Link href="/docs/integration" className="underline text-blue-600 dark:text-blue-400">Integration Guide</Link>
            <Link href="/link-polkadot" className="underline text-blue-600 dark:text-blue-400">Link Polkadot Wallet</Link>
            <Link href="/profile" className="underline text-blue-600 dark:text-blue-400">Profile Page</Link>
            <Link href="/demo" className="underline text-blue-600 dark:text-blue-400">Stellar Demo</Link>
          </div>
        </div>
      </div>
    </div>
  );
} 