'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PasskeyAuth } from '@/lib/passkey';

const LOCAL_STORAGE_KEY = 'orbitpass_demo_user';

export default function DemoPage() {
  const [step, setStep] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      {isAuthenticated && (
        <div className="mt-4 text-center">
          <Link
            href="/profile"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            View My Profile →
          </Link>
        </div>
      )}
    </div>
  );
} 