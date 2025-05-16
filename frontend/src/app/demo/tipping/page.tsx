'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PasskeyAuth } from '@/lib/passkey';
import { storeUserWallet, clearUserWallet } from '@/lib/utils';

const creators = [
  {
    id: 1,
    name: 'Alice',
    username: '@alice',
    avatar: '👩',
    bio: 'Web3 Developer & Content Creator',
  },
  {
    id: 2,
    name: 'Bob',
    username: '@bob',
    avatar: '👨',
    bio: 'DeFi Enthusiast & Educator',
  },
  {
    id: 3,
    name: 'Carol',
    username: '@carol',
    avatar: '👩',
    bio: 'Blockchain Artist & NFT Creator',
  },
];

export default function TippingDemo() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedCreator, setSelectedCreator] = useState(creators[0]);
  const [amount, setAmount] = useState('');
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

  const handleTip = async () => {
    try {
      setIsLoading(true);
      // In a real app, this would trigger the smart wallet contract
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`Successfully tipped ${selectedCreator.name} ${amount} XLM!`);
      setAmount('');
    } catch (error) {
      console.error('Tip failed:', error);
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
          <h1 className="text-2xl font-bold text-white mb-6">Welcome to Tipping</h1>
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
        <h1 className="text-2xl font-bold text-white mb-6">Support Creators</h1>
        
        <div className="space-y-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{selectedCreator.avatar}</span>
              <div>
                <h3 className="text-lg font-semibold text-white">{selectedCreator.name}</h3>
                <p className="text-gray-400">{selectedCreator.username}</p>
              </div>
            </div>
            <p className="text-gray-300">{selectedCreator.bio}</p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400"
              />
              <span className="px-4 py-2 rounded-lg bg-gray-700 text-white">XLM</span>
            </div>

            <button
              onClick={handleTip}
              disabled={isLoading || !amount}
              className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold disabled:opacity-50"
            >
              {isLoading ? 'Sending Tip...' : 'Send Tip'}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {creators.map((creator) => (
              <button
                key={creator.id}
                onClick={() => setSelectedCreator(creator)}
                className={`p-4 rounded-lg text-center transition-colors ${
                  selectedCreator.id === creator.id
                    ? 'bg-purple-500/20 border border-purple-500'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <span className="text-2xl block mb-2">{creator.avatar}</span>
                <span className="text-sm text-white">{creator.name}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
} 