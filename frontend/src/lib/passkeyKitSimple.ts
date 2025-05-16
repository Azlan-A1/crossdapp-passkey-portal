import { PasskeyKit } from 'passkey-kit';

// Required options for PasskeyKit instantiation
const passkeyKit = new PasskeyKit({
  rpcUrl: 'https://soroban-testnet.stellar.org',
  networkPassphrase: 'Test SDF Network ; September 2015',
  walletWasmHash: '0000000000000000000000000000000000000000000000000000000000000000', // placeholder, replace with actual if needed
});

export async function registerPasskey(username: string) {
  if (typeof (passkeyKit as any).register === 'function') {
    const { credential, error } = await (passkeyKit as any).register({ username });
    if (error) throw new Error(error.message);
    return credential;
  }
  throw new Error('No registration method found on PasskeyKit');
}

export async function authenticatePasskey(username: string) {
  if (typeof (passkeyKit as any).authenticate === 'function') {
    const { credential, error } = await (passkeyKit as any).authenticate({ username });
    if (error) throw new Error(error.message);
    return credential;
  }
  throw new Error('No authentication method found on PasskeyKit');
} 