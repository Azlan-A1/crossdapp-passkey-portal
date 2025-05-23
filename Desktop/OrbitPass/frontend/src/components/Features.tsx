'use client';

import { motion, type Variants } from 'framer-motion';
import { KeyIcon, ShieldCheckIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

const features = [
  {
    title: 'Reusable Passkeys',
    description: 'Login once and access all Stellar dapps with your device-native passkey. No more wallet management.',
    icon: KeyIcon,
  },
  {
    title: 'Smart Wallet Authorization',
    description: 'Secure, automated transactions through smart wallet contracts. Set permissions once, use everywhere.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Seamless Interoperability',
    description: 'Move between dapps without re-authentication. Your passkey works across the entire Stellar ecosystem.',
    icon: ArrowsRightLeftIcon,
  },
];

export default function Features() {
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
          Key Features
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-colors duration-300"
            >
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 