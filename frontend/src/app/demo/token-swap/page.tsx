'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TokenSwapDemo() {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwap = async () => {
    setIsSwapping(true);
    // Simulate swap transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSwapping(false);
    // Show success message
    alert('Swap successful! This is a demo transaction.');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            href="/demo"
            className="inline-block mb-8 text-purple-400 hover:text-purple-300 transition-colors"
          >
            ← Back to Demo
          </Link>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
            Token Swap Demo
          </h1>
          <p className="text-gray-400 text-lg">
            Experience seamless token swaps with passkey authentication
          </p>
        </div>

        {/* Swap Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-8 shadow-xl"
        >
          <div className="space-y-6">
            {/* From Token */}
            <div className="bg-gray-700 rounded-lg p-4">
              <label className="block text-gray-400 text-sm mb-2">From</label>
              <div className="flex items-center gap-4">
                <select className="bg-gray-600 text-white rounded-lg px-4 py-2">
                  <option>XLM</option>
                  <option>USDC</option>
                  <option>BTC</option>
                </select>
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.00"
                  className="bg-transparent text-white text-right flex-1 outline-none"
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
                ↓
              </button>
            </div>

            {/* To Token */}
            <div className="bg-gray-700 rounded-lg p-4">
              <label className="block text-gray-400 text-sm mb-2">To</label>
              <div className="flex items-center gap-4">
                <select className="bg-gray-600 text-white rounded-lg px-4 py-2">
                  <option>USDC</option>
                  <option>XLM</option>
                  <option>BTC</option>
                </select>
                <input
                  type="number"
                  value={toAmount}
                  onChange={(e) => setToAmount(e.target.value)}
                  placeholder="0.00"
                  className="bg-transparent text-white text-right flex-1 outline-none"
                />
              </div>
            </div>

            {/* Swap Button */}
            <button
              onClick={handleSwap}
              disabled={isSwapping || !fromAmount || !toAmount}
              className={`w-full px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                isSwapping || !fromAmount || !toAmount
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-purple-500/25'
              }`}
            >
              {isSwapping ? 'Swapping...' : 'Swap Tokens'}
            </button>

            {/* Info */}
            <div className="text-center text-gray-400 text-sm">
              <p>This is a demo transaction. No real tokens will be swapped.</p>
              <p className="mt-2">Powered by OrbitPass authentication</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 