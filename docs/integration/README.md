# OrbitPass Integration Guide

This guide will help you integrate OrbitPass into your dapp, enabling passkey authentication and cross-dapp functionality.

## Quick Start

1. Install the SDK:
```bash
npm install @orbitpass/sdk
```

2. Initialize OrbitPass:
```typescript
import { OrbitPass } from '@orbitpass/sdk';

const orbitPass = new OrbitPass({
  contractId: 'YOUR_CONTRACT_ID',
  network: 'testnet',
});
```

## Authentication Flow

### 1. Register Passkey

```typescript
const registerUser = async (username: string) => {
  try {
    const credential = await orbitPass.registerPasskey(username);
    console.log('Passkey registered:', credential);
  } catch (error) {
    console.error('Registration failed:', error);
  }
};
```

### 2. Authenticate User

```typescript
const authenticateUser = async () => {
  try {
    const result = await orbitPass.authenticate();
    console.log('Authentication successful:', result);
  } catch (error) {
    console.error('Authentication failed:', error);
  }
};
```

## Polkadot Integration

### 1. Connect Polkadot Wallet

```typescript
import { usePolkadotWallet } from '@orbitpass/sdk';

const { connect, accounts, selectedAddress } = usePolkadotWallet();

// Connect wallet
await connect();

// Select account
const handleSelectAccount = (address: string) => {
  selectAccount(address);
};
```

### 2. Link Polkadot Address

```typescript
const linkPolkadotAddress = async (address: string) => {
  try {
    await orbitPass.linkPolkadotAddress(address);
    console.log('Polkadot address linked successfully');
  } catch (error) {
    console.error('Failed to link address:', error);
  }
};
```

## Smart Wallet Features

### 1. Set Transaction Policy

```typescript
const setPolicy = async (policy: TransactionPolicy) => {
  try {
    await orbitPass.setTransactionPolicy(policy);
    console.log('Policy set successfully');
  } catch (error) {
    console.error('Failed to set policy:', error);
  }
};
```

### 2. Execute Transaction

```typescript
const executeTransaction = async (transaction: Transaction) => {
  try {
    const result = await orbitPass.executeTransaction(transaction);
    console.log('Transaction executed:', result);
  } catch (error) {
    console.error('Transaction failed:', error);
  }
};
```

## Cross-dapp Features

### 1. Request Permission

```typescript
const requestPermission = async (dappId: string, scope: string[]) => {
  try {
    const result = await orbitPass.requestPermission(dappId, scope);
    console.log('Permission granted:', result);
  } catch (error) {
    console.error('Permission denied:', error);
  }
};
```

### 2. Check Permission

```typescript
const checkPermission = async (dappId: string, scope: string) => {
  try {
    const hasPermission = await orbitPass.hasPermission(dappId, scope);
    console.log('Has permission:', hasPermission);
  } catch (error) {
    console.error('Failed to check permission:', error);
  }
};
```

## Error Handling

```typescript
try {
  await orbitPass.someOperation();
} catch (error) {
  if (error instanceof OrbitPassError) {
    switch (error.code) {
      case 'PASSKEY_NOT_FOUND':
        // Handle missing passkey
        break;
      case 'POLKADOT_NOT_CONNECTED':
        // Handle disconnected wallet
        break;
      case 'PERMISSION_DENIED':
        // Handle permission issues
        break;
      default:
        // Handle other errors
    }
  }
}
```

## Best Practices

1. **Error Handling**
   - Always wrap OrbitPass operations in try-catch blocks
   - Use specific error types for better error handling
   - Provide user-friendly error messages

2. **State Management**
   - Use the provided hooks for wallet and authentication state
   - Implement proper loading states
   - Handle disconnection gracefully

3. **Security**
   - Never store sensitive data in localStorage
   - Use HTTPS for all API calls
   - Implement proper session management

4. **UX Considerations**
   - Show loading states during operations
   - Provide clear feedback for success/failure
   - Guide users through the authentication flow

## Examples

Check out our example dapps:
- [Token Swap Demo](/demo/token-swap)
- [Tipping Demo](/demo/tipping)

## Support

- [Documentation](https://docs.orbitpass.io)
- [GitHub Issues](https://github.com/Azlan-A1/crossdapp-passkey-portal/issues)
- [Discord Community](https://discord.gg/orbitpass) 