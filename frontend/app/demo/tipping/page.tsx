'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TippingDemo() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendTip = async () => {
    setIsSending(true);
    // Simulate tip transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSending(false);
    // Show success message
    alert('Tip sent successfully! This is a demo transaction.');
    // Reset form
    setAmount('');
    setRecipient('');
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
            Tipping Demo
          </h1>
          <p className="text-gray-400 text-lg">
            Send tips with passkey authentication
          </p>
        </div>

        {/* Tipping Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-8 shadow-xl"
        >
          <div className="space-y-6">
            {/* Recipient */}
            <div className="bg-gray-700 rounded-lg p-4">
              <label className="block text-gray-400 text-sm mb-2">Recipient</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter recipient's address"
                className="w-full bg-transparent text-white outline-none"
              />
            </div>

            {/* Amount */}
            <div className="bg-gray-700 rounded-lg p-4">
              <label className="block text-gray-400 text-sm mb-2">Amount</label>
              <div className="flex items-center gap-4">
                <select className="bg-gray-600 text-white rounded-lg px-4 py-2">
                  <option>XLM</option>
                  <option>USDC</option>
                </select>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="bg-transparent text-white text-right flex-1 outline-none"
                />
              </div>
            </div>

            {/* Message */}
            <div className="bg-gray-700 rounded-lg p-4">
              <label className="block text-gray-400 text-sm mb-2">Message (Optional)</label>
              <textarea
                placeholder="Add a message with your tip"
                className="w-full bg-transparent text-white outline-none resize-none"
                rows={3}
              />
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendTip}
              disabled={isSending || !amount || !recipient}
              className={`w-full px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                isSending || !amount || !recipient
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-purple-500/25'
              }`}
            >
              {isSending ? 'Sending...' : 'Send Tip'}
            </button>

            {/* Info */}
            <div className="text-center text-gray-400 text-sm">
              <p>This is a demo transaction. No real tokens will be sent.</p>
              <p className="mt-2">Powered by OrbitPass authentication</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 