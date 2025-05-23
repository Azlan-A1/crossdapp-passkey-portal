'use client';

import { motion, type Variants } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function ProblemSolution() {
  return (
    <section className="py-24 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
        >
          Web3 UX sucks. Let's fix it.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Problems */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700"
          >
            <h3 className="text-2xl font-semibold mb-6 text-red-400">Current Problems</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">•</span>
                <p className="text-gray-300">Complex onboarding process with multiple steps and wallet setup</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">•</span>
                <p className="text-gray-300">Keys bound to specific domains, requiring multiple wallets</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">•</span>
                <p className="text-gray-300">Excessive wallet overhead for simple transactions</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">•</span>
                <p className="text-gray-300">Poor user experience with constant wallet popups</p>
              </li>
            </ul>
          </motion.div>

          {/* Solution */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700"
          >
            <h3 className="text-2xl font-semibold mb-6 text-green-400">Our Solution</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <p className="text-gray-300">Seamless onboarding with device-native passkeys</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <p className="text-gray-300">Cross-dapp authentication with a single passkey</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <p className="text-gray-300">Smart wallet contracts for automated transactions</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <p className="text-gray-300">Web2-like experience with Web3 security</p>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 