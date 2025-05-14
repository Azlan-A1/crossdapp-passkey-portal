'use client';

import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';

const components = [
  {
    title: 'Passkey Auth',
    description: 'Device-native authentication using WebAuthn standards',
    details: [
      'Biometric or PIN-based authentication',
      'Secure key storage in device vault',
      'Cross-platform compatibility'
    ]
  },
  {
    title: 'Smart Wallet Policies',
    description: 'Automated transaction rules and permissions',
    details: [
      'Granular permission controls',
      'Time-based restrictions',
      'Amount limits and whitelists'
    ]
  },
  {
    title: 'Cross-dapp Consent Ledger',
    description: 'Permission management across the ecosystem',
    details: [
      'Audit trail of all authorizations',
      'Revocable permissions',
      'Privacy-preserving design'
    ]
  },
  {
    title: 'Escrow Smart Contract',
    description: 'Secure payment handling and dispute resolution',
    details: [
      'Multi-signature support',
      'Time-locked transactions',
      'Automated dispute resolution'
    ]
  }
];

export default function TechDocs() {
  return (
    <section className="py-24 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
        >
          How It Works
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto"
        >
          Our system combines device-native passkeys with Stellar's smart contract capabilities
          to create a seamless, secure, and interoperable authentication solution.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {components.map((component, index) => (
            <motion.div
              key={component.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-3 text-white">{component.title}</h3>
              <p className="text-gray-400 mb-4">{component.description}</p>
              <ul className="space-y-2">
                {component.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
                    <span className="text-gray-300">{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Link 
            href="/docs"
            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
          >
            Read Full Documentation
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 