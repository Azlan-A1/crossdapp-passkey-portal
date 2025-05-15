'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PasskeyAuth } from '@/lib/passkey';

const LOCAL_STORAGE_KEY = 'orbitpass_demo_user';

export default function DemoPage() {
  const [step, setStep] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authorizedDapps, setAuthorizedDapps] = useState<string[]>([]);
  const [isPasskeySupported, setIsPasskeySupported] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registering, setRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [registered, setRegistered] = useState(false);
  const [credentialId, setCredentialId] = useState<string | null>(null);

  const demoDapps = [
    { id: 'stellar-swap', name: 'Stellar Swap', description: 'Token exchange platform' },
    { id: 'stellar-tip', name: 'Stellar Tip', description: 'Social tipping platform' },
    { id: 'stellar-nft', name: 'Stellar NFT', description: 'NFT marketplace' },
  ];

  useEffect(() => {
    setIsPasskeySupported(PasskeyAuth.isSupported());
    // Check for stored credential
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.username && parsed.credentialId) {
          setUsername(parsed.username);
          setCredentialId(parsed.credentialId);
          setRegistered(true);
          setStep(2); // Go to authentication step
        }
      } catch {}
    }
  }, []);

  const handleRegister = async () => {
    setRegisterError(null);
    setRegistering(true);
    try {
      if (!username) {
        setRegisterError('Please enter a username.');
        setRegistering(false);
        return;
      }
      const result = await PasskeyAuth.register(username);
      setRegistered(true);
      setCredentialId(result.credentialId);
      // Store in localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ username, credentialId: result.credentialId }));
      setStep(2);
    } catch (error) {
      setRegisterError(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setRegistering(false);
    }
  };

  const handleAuthenticate = async () => {
    try {
      setAuthError(null);
      const result = await PasskeyAuth.authenticate();
      setIsAuthenticated(true);
      setStep(3);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Authentication failed');
    }
  };

  const handleAuthorizeDapp = (dappId: string) => {
    setAuthorizedDapps(prev => [...prev, dappId]);
  };

  const handleRevokeDapp = (dappId: string) => {
    setAuthorizedDapps(prev => prev.filter(id => id !== dappId));
  };

  const handleClear = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setUsername('');
    setCredentialId(null);
    setRegistered(false);
    setIsAuthenticated(false);
    setStep(1);
    setAuthorizedDapps([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            href="/"
            className="inline-block mb-8 text-purple-400 hover:text-purple-300 transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
            OrbitPass Demo
          </h1>
          <p className="text-gray-400 text-lg">
            Experience seamless cross-dapp authentication with passkeys
          </p>
        </div>
        <div className="flex justify-end mb-4">
          {(registered || credentialId) && (
            <button
              onClick={handleClear}
              className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-red-500 hover:text-white transition-colors text-sm"
            >
              Clear Passkey
            </button>
          )}
        </div>
        <div className="bg-gray-800 rounded-xl p-8 shadow-xl">
          {/* Step 1: Register Passkey */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Step 1: Register a Passkey</h2>
              {!isPasskeySupported ? (
                <div className="text-red-400 mb-4">
                  Passkeys are not supported in your browser. Please use a modern browser that supports WebAuthn.
                </div>
              ) : (
                <>
                  <p className="text-gray-400 mb-6">
                    Enter a username and register a passkey using Touch ID, Face ID, or a security key.
                  </p>
                  <div className="flex flex-col items-center gap-4 mb-6">
                    <input
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="Enter username"
                      className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      disabled={registering}
                    />
                    <button
                      onClick={handleRegister}
                      disabled={registering}
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 disabled:opacity-60"
                    >
                      {registering ? 'Registering...' : 'Register Passkey'}
                    </button>
                  </div>
                  {registerError && (
                    <div className="text-red-400 mb-4">{registerError}</div>
                  )}
                  <div className="bg-gray-700/50 rounded-lg p-4 max-w-md mx-auto">
                    <h3 className="text-white font-medium mb-2">Available Authentication Methods:</h3>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        Touch ID (MacBook)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        Face ID (iPhone/iPad)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        Windows Hello
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        Security Keys (YubiKey, etc.)
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* Step 2: Authenticate */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Step 2: Authenticate with Passkey</h2>
              <div className="mb-8 space-y-4">
                <p className="text-gray-400">
                  Click the button below to authenticate with your passkey
                </p>
                <div className="bg-gray-700/50 rounded-lg p-4 max-w-md mx-auto">
                  <h3 className="text-white font-medium mb-2">Available Authentication Methods:</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Touch ID (MacBook)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Face ID (iPhone/iPad)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Windows Hello
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Security Keys (YubiKey, etc.)
                    </li>
                  </ul>
                </div>
              </div>
              {authError && (
                <div className="text-red-400 mb-4">
                  {authError}
                </div>
              )}
              <button
                onClick={handleAuthenticate}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                Authenticate with Touch ID
              </button>
            </motion.div>
          )}

          {/* Step 3: Dapp Authorization */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Step 3: Authorize Dapps</h2>
              <p className="text-gray-400 mb-8">
                Select which dapps you want to authorize with your passkey
              </p>
              <div className="grid gap-4">
                {demoDapps.map(dapp => (
                  <div
                    key={dapp.id}
                    className="bg-gray-700 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div>
                      <h3 className="text-white font-medium">{dapp.name}</h3>
                      <p className="text-gray-400 text-sm">{dapp.description}</p>
                    </div>
                    {authorizedDapps.includes(dapp.id) ? (
                      <button
                        onClick={() => handleRevokeDapp(dapp.id)}
                        className="px-4 py-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                      >
                        Revoke
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAuthorizeDapp(dapp.id)}
                        className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                      >
                        Authorize
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {/* Next Step Button */}
              {authorizedDapps.length > 0 && (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setStep(4)}
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                  >
                    Continue to Demo Apps
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 4: Demo Apps */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Step 4: Try Demo Apps</h2>
              <p className="text-gray-400 mb-8">
                You're now authenticated and authorized! Try out the demo apps:
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                <Link
                  href="/demo/token-swap"
                  className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">Token Swap Demo</h3>
                  <p className="text-gray-400">Try swapping tokens with passkey authentication</p>
                </Link>
                <Link
                  href="/demo/tipping"
                  className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">Tipping Demo</h3>
                  <p className="text-gray-400">Send tips with passkey authentication</p>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 