# Smart Contracts

This directory contains the Rust smart contracts for the CrossDapp Passkey Portal, built using Soroban.

## Contract Structure

```
contracts/
├── passkey_vault/     # Passkey storage and management
├── smart_wallet/      # Smart wallet policies and automation
├── consent_ledger/    # Cross-dapp permission management
└── escrow/           # Payment handling and dispute resolution
```

## Development

### Prerequisites

- Rust 1.70.0 or later
- Soroban CLI
- Stellar Testnet account

### Building Contracts

1. Install Soroban CLI:
   ```bash
   cargo install soroban-cli
   ```

2. Build all contracts:
   ```bash
   soroban contract build
   ```

3. Run tests:
   ```bash
   cargo test
   ```

## Contract Details

### Passkey Vault

Manages secure storage and retrieval of passkeys:
- Key generation and storage
- Biometric authentication
- Cross-device synchronization

### Smart Wallet

Handles automated transaction execution:
- Policy enforcement
- Transaction automation
- Fee management

### Consent Ledger

Manages cross-dapp permissions:
- Permission tracking
- Audit trail
- Revocation system

### Escrow

Handles secure payments:
- Multi-signature support
- Time-locked transactions
- Dispute resolution

## Testing

Each contract includes comprehensive tests:
- Unit tests
- Integration tests
- Security tests

## Deployment

Contracts can be deployed to Stellar testnet or mainnet using the Soroban CLI:

```bash
soroban contract deploy --wasm target/wasm32-unknown-unknown/release/contract.wasm
```

## Security

- All contracts are audited
- Follows best practices for secure smart contract development
- Regular security updates and patches

## Documentation

For detailed documentation on each contract, see the respective README files in each contract directory. 