'use client';

import { motion, type Variants } from 'framer-motion';
import { 
  KeyIcon, 
  WalletIcon, 
  DocumentTextIcon, 
  CodeBracketIcon, 
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';

const components = [
  {
    title: 'Passkey Generator & Vault',
    description: 'Secure device-native key generation and storage',
    icon: KeyIcon,
    tech: 'Passkey Kit',
  },
  {
    title: 'Smart Wallet Contract',
    description: 'Automated transaction execution and policy enforcement',
    icon: WalletIcon,
    tech: 'Soroban (Rust)',
  },
  {
    title: 'Consent Ledger',
    description: 'Cross-dapp permission management and audit trail',
    icon: DocumentTextIcon,
    tech: 'Stellar Protocol',
  },
  {
    title: 'JS SDK Bridge',
    description: 'Easy integration for dapp developers',
    icon: CodeBracketIcon,
    tech: 'TypeScript',
  },
  {
    title: 'Escrow Logic',
    description: 'Secure payment handling and dispute resolution',
    icon: CurrencyDollarIcon,
    tech: 'Launchtube',
  },
];

export default function Architecture() {
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
          Technical Architecture
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {components.map((component, index) => (
            <motion.div
              key={component.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <component.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{component.title}</h3>
                  <p className="text-gray-400 mb-3">{component.description}</p>
                  <span className="inline-block px-3 py-1 rounded-full text-sm bg-purple-500/10 text-purple-400">
                    {component.tech}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 max-w-2xl mx-auto">
            Built on Stellar's robust infrastructure with Soroban smart contracts, 
            our architecture ensures security, scalability, and seamless cross-dapp 
            interoperability while maintaining a frictionless user experience.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 