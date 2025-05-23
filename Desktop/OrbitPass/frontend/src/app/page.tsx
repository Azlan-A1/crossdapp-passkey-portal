'use client';

import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import ProblemSolution from '@/components/ProblemSolution';
import Features from '@/components/Features';
import Demos from '@/components/Demos';
import Architecture from '@/components/Architecture';
import TechDocs from '@/components/TechDocs';
import TechStack from '@/components/TechStack';
import Team from '@/components/Team';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-blue-900/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
          >
            CrossDapp Passkey Portal
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-12"
          >
            One Passkey. Every Stellar Dapp.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              href="/demo"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              Try Demo
            </Link>
            <Link 
              href="https://github.com/yourusername/crossdapp-passkey-portal"
              target="_blank"
              className="px-8 py-3 rounded-full bg-gray-800 text-white font-semibold hover:bg-gray-700 transition-all duration-300 border border-gray-700"
            >
              View GitHub
            </Link>
          </motion.div>
        </div>

        {/* Animated blob */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl animate-blob"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl animate-blob animation-delay-2000"
        />
      </section>

      <ProblemSolution />
      <Features />
      <Demos />
      <Architecture />
      <TechDocs />
      <TechStack />
      <Team />
      <Footer />
    </main>
  );
}
