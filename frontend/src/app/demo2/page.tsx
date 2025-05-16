'use client';
import React, { useState } from 'react';
import { registerPasskey, authenticatePasskey } from '../../lib/passkeyKitSimple';

export default function PasskeyKitDemo2Page() {
  const [username, setUsername] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleRegister = async () => {
    try {
      const cred = await registerPasskey(username);
      setResult('Registered! ' + JSON.stringify(cred));
    } catch (e: any) {
      setResult('Error: ' + e.message);
    }
  };

  const handleAuth = async () => {
    try {
      const cred = await authenticatePasskey(username);
      setResult('Authenticated! ' + JSON.stringify(cred));
    } catch (e: any) {
      setResult('Error: ' + e.message);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Passkey Kit Demo 2</h2>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username for Demo 2"
        style={{ marginRight: 8 }}
      />
      <button onClick={handleRegister}>Register Passkey</button>
      <button onClick={handleAuth} style={{ marginLeft: 8 }}>Authenticate Passkey</button>
      <pre style={{ marginTop: 16, background: '#f0f0f0', padding: 12 }}>
        {result}
      </pre>
    </div>
  );
} 