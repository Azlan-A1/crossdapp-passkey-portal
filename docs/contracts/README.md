# OrbitPass Smart Contracts

This directory contains the Soroban smart contracts that power OrbitPass's authentication and identity management features.

## Contract Overview

### OrbitPass Contract (`orbitpass/src/lib.rs`)

The main contract that handles:
- Passkey registration and verification
- Smart wallet policies
- Cross-dapp consent management
- Identity linking across chains

#### Key Functions

```rust
// Initialize the contract with an admin
pub fn initialize(env: &Env, admin: Address)

// Register a new passkey credential
pub fn register_passkey(env: &Env, user: Address, credential: PasskeyCredential)

// Verify a passkey credential
pub fn verify_passkey(env: &Env, user: Address, credential: PasskeyCredential) -> bool

// Get user profile with all linked credentials
pub fn get_user_profile(env: &Env, user: Address) -> UserProfile
```

## Deployment

### Prerequisites

1. Install Soroban CLI:
```bash
curl -sSfL https://soroban.stellar.org/install | sh
```

2. Configure Stellar testnet:
```bash
soroban config network add --global testnet https://soroban-testnet.stellar.org
```

### Deploy to Testnet

1. Build the contract:
```bash
cd contracts/orbitpass
soroban contract build
```

2. Deploy to testnet:
```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/orbitpass.wasm \
  --source <YOUR_TESTNET_ACCOUNT> \
  --network testnet
```

3. Initialize the contract:
```bash
soroban contract invoke \
  --id <DEPLOYED_CONTRACT_ID> \
  --source <YOUR_TESTNET_ACCOUNT> \
  --network testnet \
  -- initialize \
  --admin <ADMIN_ADDRESS>
```

## Contract State

### UserProfile

```rust
pub struct UserProfile {
    pub passkey_credentials: Vec<PasskeyCredential>,
    pub tokens: Map<Address, TokenInfo>,
}
```

### PasskeyCredential

```rust
pub struct PasskeyCredential {
    pub public_key: Bytes,
    pub credential_id: Bytes,
    pub user_handle: Bytes,
}
```

## Integration Guide

### 1. Initialize Contract Client

```typescript
import { SorobanRpc, Contract } from 'soroban-client';

const server = new SorobanRpc.Server('https://soroban-testnet.stellar.org');
const contract = new Contract(CONTRACT_ID);
```

### 2. Register Passkey

```typescript
const registerPasskey = async (user: string, credential: PasskeyCredential) => {
  const tx = await contract.call(
    'register_passkey',
    user,
    credential
  );
  return await server.submitTransaction(tx);
};
```

### 3. Verify Passkey

```typescript
const verifyPasskey = async (user: string, credential: PasskeyCredential) => {
  const tx = await contract.call(
    'verify_passkey',
    user,
    credential
  );
  return await server.submitTransaction(tx);
};
```

## Security Considerations

1. **Admin Controls**
   - Only the admin can initialize the contract
   - Admin can be updated through governance

2. **Credential Verification**
   - All passkey credentials are verified on-chain
   - Public keys are stored securely

3. **Access Control**
   - Users can only modify their own profiles
   - Cross-dapp permissions are granular

## Testing

Run the test suite:
```bash
cargo test
```

## Contract Addresses

### Testnet
- **Contract ID**: [Your deployed contract ID]
- **Network**: Stellar Testnet
- **RPC**: https://soroban-testnet.stellar.org
- **Explorer**: https://soroban-testnet.stellar.org/explorer/contract/[CONTRACT_ID] 