# OrbitPass API Reference

This document provides detailed information about the OrbitPass API endpoints, hooks, and utilities.

## Hooks

### usePasskeyAuth

```typescript
const { 
  registerPasskey, 
  authenticate, 
  isAuthenticated, 
  error 
} = usePasskeyAuth();
```

#### Parameters
None

#### Returns
- `registerPasskey`: Function to register a new passkey
- `authenticate`: Function to authenticate with existing passkey
- `isAuthenticated`: Boolean indicating authentication status
- `error`: Error object if any operation fails

### usePolkadotWallet

```typescript
const {
  connect,
  disconnect,
  isConnected,
  selectedAccount,
  accounts,
  error
} = usePolkadotWallet();
```

#### Parameters
None

#### Returns
- `connect`: Function to connect Polkadot wallet
- `disconnect`: Function to disconnect wallet
- `isConnected`: Boolean indicating connection status
- `selectedAccount`: Currently selected account
- `accounts`: List of available accounts
- `error`: Error object if any operation fails

## Smart Contract Functions

### registerUser

```typescript
async function registerUser(
  publicKey: string,
  credentialId: string
): Promise<void>
```

Registers a new user with their passkey credentials.

#### Parameters
- `publicKey`: User's public key
- `credentialId`: Unique credential identifier

#### Returns
Promise that resolves when registration is complete

### authenticateUser

```typescript
async function authenticateUser(
  credentialId: string,
  signature: string
): Promise<boolean>
```

Authenticates a user using their passkey.

#### Parameters
- `credentialId`: User's credential identifier
- `signature`: Signature from passkey authentication

#### Returns
Promise that resolves to boolean indicating authentication success

### setTransactionPolicy

```typescript
async function setTransactionPolicy(
  policy: TransactionPolicy
): Promise<void>
```

Sets a transaction policy for the user's wallet.

#### Parameters
- `policy`: Transaction policy object
  ```typescript
  interface TransactionPolicy {
    maxAmount: number;
    allowedTokens: string[];
    requireApproval: boolean;
  }
  ```

#### Returns
Promise that resolves when policy is set

### requestDappPermission

```typescript
async function requestDappPermission(
  dappId: string,
  permissions: string[]
): Promise<boolean>
```

Requests permission to access another dapp.

#### Parameters
- `dappId`: Target dapp identifier
- `permissions`: Array of requested permissions

#### Returns
Promise that resolves to boolean indicating permission grant

## Error Handling

### Error Types

```typescript
enum OrbitPassError {
  PASSKEY_NOT_FOUND = 'PASSKEY_NOT_FOUND',
  WALLET_DISCONNECTED = 'WALLET_DISCONNECTED',
  INVALID_SIGNATURE = 'INVALID_SIGNATURE',
  POLICY_VIOLATION = 'POLICY_VIOLATION',
  PERMISSION_DENIED = 'PERMISSION_DENIED'
}
```

### Error Handling Example

```typescript
try {
  await authenticate();
} catch (error) {
  if (error.code === OrbitPassError.PASSKEY_NOT_FOUND) {
    // Handle missing passkey
  } else if (error.code === OrbitPassError.INVALID_SIGNATURE) {
    // Handle invalid signature
  }
}
```

## Events

### Authentication Events

```typescript
interface AuthEvent {
  type: 'register' | 'authenticate' | 'logout';
  userId: string;
  timestamp: number;
}
```

### Wallet Events

```typescript
interface WalletEvent {
  type: 'connect' | 'disconnect' | 'accountChange';
  account?: string;
  timestamp: number;
}
```

## Configuration

### Environment Variables

```env
NEXT_PUBLIC_CONTRACT_ID=your_contract_id
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_RPC_URL=your_rpc_url
```

### Network Configuration

```typescript
interface NetworkConfig {
  contractId: string;
  network: 'testnet' | 'mainnet';
  rpcUrl: string;
}
```

## Best Practices

1. Always handle errors appropriately
2. Implement proper loading states
3. Cache authentication state
4. Use TypeScript for type safety
5. Follow security best practices

## Examples

### Basic Authentication Flow

```typescript
const { registerPasskey, authenticate, isAuthenticated } = usePasskeyAuth();

// Register new user
await registerPasskey();

// Authenticate existing user
await authenticate();

// Check authentication status
if (isAuthenticated) {
  // User is authenticated
}
```

### Polkadot Wallet Integration

```typescript
const { connect, selectedAccount } = usePolkadotWallet();

// Connect wallet
await connect();

// Use selected account
if (selectedAccount) {
  // Account is connected
}
```

## Support

For additional support:
- Check the [documentation](/docs)
- Open an issue on GitHub
- Join our [Discord community](https://discord.gg/orbitpass) 