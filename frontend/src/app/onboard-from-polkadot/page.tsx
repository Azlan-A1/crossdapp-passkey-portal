"use client";

import { useEffect, useState } from 'react';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
// @ts-ignore
import { PasskeyKit } from '@stellar/passkey-kit';

export default function OnboardFromPolkadot() {
  const [polkadotAccounts, setPolkadotAccounts] = useState<any[]>([]);
  const [selectedPolkadot, setSelectedPolkadot] = useState<string | null>(null);
  const [stellarWallet, setStellarWallet] = useState<string | null>(null);
  const [linkSuccess, setLinkSuccess] = useState(false);
  const [loadingPolkadot, setLoadingPolkadot] = useState(false);
  const [loadingStellar, setLoadingStellar] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Detect Polkadot extension and fetch accounts
  useEffect(() => {
    const fetchAccounts = async () => {
      setLoadingPolkadot(true);
      setError(null);
      try {
        await web3Enable('OrbitPass');
        const accounts = await web3Accounts();
        setPolkadotAccounts(accounts);
      } catch (e) {
        setError('Polkadot extension not found or failed to load accounts.');
      } finally {
        setLoadingPolkadot(false);
      }
    };
    fetchAccounts();
  }, []);

  // Generate Stellar Passkey Wallet
  const handleCreateStellarWallet = async () => {
    setLoadingStellar(true);
    setError(null);
    try {
      // Demo: Use PasskeyKit to create a wallet (mocked for now)
      const kit = new PasskeyKit();
      const wallet = await kit.createWallet();
      setStellarWallet(wallet.address);
    } catch (e) {
      setError('Failed to create Stellar wallet.');
    } finally {
      setLoadingStellar(false);
    }
  };

  // Link the two addresses
  useEffect(() => {
    if (selectedPolkadot && stellarWallet) {
      localStorage.setItem(
        'orbitpass-link',
        JSON.stringify({ polkadot: selectedPolkadot, stellar: stellarWallet })
      );
      setLinkSuccess(true);
    }
  }, [selectedPolkadot, stellarWallet]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-gray-800 rounded-xl shadow-xl p-8"
      >
        <div className="flex items-center justify-center mb-6 gap-4">
          <Image src="/stellar-logo.svg" alt="Stellar" width={40} height={40} />
          <span className="text-2xl font-bold text-white">+</span>
          <Image src="/polkadot-logo.svg" alt="Polkadot" width={40} height={40} />
        </div>
        <h1 className="text-3xl font-bold text-white text-center mb-2">Join OrbitPass via Polkadot</h1>
        <p className="text-gray-300 text-center mb-8">Create a Stellar Passkey wallet and link your Polkadot account for multichain access.</p>

        {/* Polkadot Wallet Connect */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-2">1. Connect Polkadot Wallet</h2>
          {loadingPolkadot && <p className="text-gray-400">Loading accounts...</p>}
          {error && <p className="text-red-400 mb-2">{error}</p>}
          {polkadotAccounts.length > 0 ? (
            <div className="space-y-2">
              {polkadotAccounts.map((acc) => (
                <button
                  key={acc.address}
                  onClick={() => setSelectedPolkadot(acc.address)}
                  className={`w-full text-left px-4 py-2 rounded bg-gray-700 hover:bg-pink-600 text-white font-mono ${selectedPolkadot === acc.address ? 'ring-2 ring-pink-400' : ''}`}
                >
                  {acc.address}
                  {acc.meta?.name && <span className="ml-2 text-xs text-gray-400">({acc.meta.name})</span>}
                </button>
              ))}
            </div>
          ) : !loadingPolkadot && (
            <p className="text-gray-400">No Polkadot accounts found.</p>
          )}
          {selectedPolkadot && (
            <div className="mt-2 text-green-400 text-sm">Selected: {selectedPolkadot}</div>
          )}
        </div>

        {/* Stellar Wallet Creation */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-2">2. Create Stellar Passkey Wallet</h2>
          <button
            onClick={handleCreateStellarWallet}
            disabled={loadingStellar || !selectedPolkadot}
            className="w-full py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold disabled:opacity-50"
          >
            {loadingStellar ? 'Creating...' : 'Create Stellar Wallet'}
          </button>
          {stellarWallet && (
            <div className="mt-2 text-green-400 text-sm">Stellar Wallet: {stellarWallet}</div>
          )}
        </div>

        {/* Link Success */}
        {linkSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-green-900 text-green-200 rounded text-center"
          >
            <b>Your Polkadot identity is now linked to OrbitPass!</b>
          </motion.div>
        )}

        {/* Explore Dapps */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-white mb-2">You're now ready to use OrbitPass across Stellar apps</h2>
          <div className="flex flex-col gap-2">
            <Link href="/demo/token-swap" className="underline text-blue-400 hover:text-blue-200">Token Swap Demo</Link>
            <Link href="/demo/tipping" className="underline text-blue-400 hover:text-blue-200">Tipping Demo</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 