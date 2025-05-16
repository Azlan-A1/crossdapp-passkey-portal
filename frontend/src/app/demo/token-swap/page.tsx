'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PasskeyAuth } from '@/lib/passkey';
import { storeUserWallet, clearUserWallet } from '@/lib/utils';

export default function TokenSwapDemo() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [fromToken, setFromToken] = useState('XLM');
  const [toToken, setToToken] = useState('USDC');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const userWallet = localStorage.getItem('userWallet');
    if (userWallet) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      const { credentialId } = await PasskeyAuth.register(username);
      // In a real app, you would send this to your backend to create a wallet
      storeUserWallet(credentialId, 'demo-contract-id');
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthenticate = async () => {
    try {
      setIsLoading(true);
      await PasskeyAuth.authenticate();
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Authentication failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwap = async () => {
    try {
      setIsLoading(true);
      // In a real app, this would trigger the smart wallet contract
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Swap successful!');
    } catch (error) {
      console.error('Swap failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 p-8 rounded-2xl w-full max-w-md"
        >
          <h1 className="text-2xl font-bold text-white mb-6">Welcome to Token Swap</h1>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400"
            />
            <button
              onClick={handleRegister}
              disabled={isLoading || !username}
              className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Create Account with Passkey'}
            </button>
            <button
              onClick={handleAuthenticate}
              disabled={isLoading}
              className="w-full px-4 py-2 rounded-lg border border-purple-500 text-purple-500 font-semibold disabled:opacity-50"
            >
              {isLoading ? 'Authenticating...' : 'Login with Passkey'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 p-8 rounded-2xl w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-white mb-6">Token Swap</h1>
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <label className="block text-sm text-gray-400 mb-2">From</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-600 text-white placeholder-gray-400"
              />
              <select
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
                className="px-4 py-2 rounded-lg bg-gray-600 text-white"
              >
                <option value="XLM">XLM</option>
                <option value="USDC">USDC</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <button className="p-2 rounded-full bg-gray-700 text-gray-400">
              ↓
            </button>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <label className="block text-sm text-gray-400 mb-2">To</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={amount}
                readOnly
                className="flex-1 px-4 py-2 rounded-lg bg-gray-600 text-white"
              />
              <select
                value={toToken}
                onChange={(e) => setToToken(e.target.value)}
                className="px-4 py-2 rounded-lg bg-gray-600 text-white"
              >
                <option value="USDC">USDC</option>
                <option value="XLM">XLM</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSwap}
            disabled={isLoading || !amount}
            className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold disabled:opacity-50"
          >
            {isLoading ? 'Swapping...' : 'Swap Tokens'}
          </button>
        </div>
      </motion.div>
    </div>
  );
} 