'use client';

import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const demos = [
  {
    title: 'Token Swap Dapp',
    description: 'Experience seamless token swaps with our passkey-powered demo. No wallet setup required.',
    image: '/demo-swap.png',
    link: '/demo/token-swap',
  },
  {
    title: 'Tipping Dapp',
    description: 'Send tips across the Stellar network with a single click. Powered by smart wallet contracts.',
    image: '/demo-tip.png',
    link: '/demo/tipping',
  },
];

export default function Demos() {
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
          MVP Demos
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden"
            >
              <div className="aspect-video relative bg-gray-700">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Screenshot Placeholder
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-4 text-white">{demo.title}</h3>
                <p className="text-gray-400 mb-6">{demo.description}</p>
                <Link 
                  href={demo.link}
                  className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                >
                  Try it Live
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 