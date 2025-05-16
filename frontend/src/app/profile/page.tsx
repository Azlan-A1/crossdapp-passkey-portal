'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function ProfilePage() {
  const [stellarAddress, setStellarAddress] = useState<string | null>(null);
  const [polkadotAddress, setPolkadotAddress] = useState<string | null>(null);

  useEffect(() => {
    // Load stored addresses
    const storedPolkadot = localStorage.getItem('linkedPolkadotAddress');
    const storedStellar = localStorage.getItem('userWallet');
    
    if (storedPolkadot) {
      setPolkadotAddress(storedPolkadot);
    }
    if (storedStellar) {
      try {
        const parsed = JSON.parse(storedStellar);
        setStellarAddress(parsed.address || null);
      } catch (e) {
        console.error('Failed to parse stored Stellar address:', e);
      }
    }
  }, []);

  const handleUnlinkPolkadot = () => {
    localStorage.removeItem('linkedPolkadotAddress');
    setPolkadotAddress(null);
    toast.success('Polkadot wallet unlinked successfully');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Link 
            href="/"
            className="inline-block mb-8 text-purple-400 hover:text-purple-300 transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
            My Profile
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your connected wallets and identity
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 rounded-2xl border border-gray-700 p-8"
        >
          {/* Stellar Wallet Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Stellar Wallet</h2>
            {stellarAddress ? (
              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Address:</p>
                <p className="font-mono text-white break-all">{stellarAddress}</p>
              </div>
            ) : (
              <div className="text-gray-400">
                No Stellar wallet connected. Visit the demo to create one.
              </div>
            )}
          </div>

          {/* Polkadot Wallet Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-white">Polkadot Wallet</h2>
              {polkadotAddress && (
                <button
                  onClick={handleUnlinkPolkadot}
                  className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  Unlink Wallet
                </button>
              )}
            </div>
            
            {polkadotAddress ? (
              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Address:</p>
                <p className="font-mono text-white break-all">{polkadotAddress}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-400">
                  No Polkadot wallet linked yet.
                </p>
                <Link
                  href="/link-polkadot"
                  className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                >
                  Link Polkadot Wallet
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Multichain Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl border border-purple-500/20 p-6 text-center"
        >
          <h3 className="text-xl font-semibold text-white mb-2">
            Now Available on Polkadot & Stellar
          </h3>
          <p className="text-gray-400">
            Seamlessly manage your identity across multiple chains
          </p>
        </motion.div>
      </div>
    </div>
  );
} 