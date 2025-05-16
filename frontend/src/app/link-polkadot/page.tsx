'use client';

import { useState } from 'react';
import { usePolkadotWallet } from '@/lib/hooks/usePolkadotWallet';
import { toast } from 'react-hot-toast';

export default function LinkPolkadotPage() {
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
      // For demo: store in localStorage
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
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Link Polkadot Wallet
        </h1>

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
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Select an Account
            </h2>
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
    </div>
  );
} 