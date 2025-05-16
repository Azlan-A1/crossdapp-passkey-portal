<img width="1708" alt="Screenshot 2025-05-16 at 11 09 01 AM" src="https://github.com/user-attachments/assets/50590d3f-4e5c-4343-a920-37a220b2b903" /># OrbitPass (LINK TO VIDEO https://youtu.be/Qlj-KMoz79w)

Screenshots of UI: 

https://gyazo.com/9dc88dc41d81a32617f0a3d3304f6164
https://gyazo.com/bb5167f946511abd88c3934fc44883ed
https://gyazo.com/102787f282e2c86454edf6a9993676bc
https://gyazo.com/89fe829bb6e548f1377f2470d4519ba4

OrbitPass is a revolutionary authentication solution that combines device-native passkeys with Stellar's smart contract capabilities to create a seamless, secure, and interoperable authentication system. It also supports Polkadot wallet integration for cross-chain identity management.

## Features

- 🔐 **Device-Native Passkeys**: Secure authentication using WebAuthn standards
- 🌟 **Stellar Smart Contracts**: Automated transaction execution and policy enforcement
- 🔄 **Cross-dapp Authentication**: Single passkey for all Stellar dapps
- 🔗 **Polkadot Integration**: Connect and manage Polkadot wallets
- 🎯 **Smart Wallet Policies**: Granular permission controls and automated rules
- 📱 **Responsive Design**: Beautiful UI with dark mode support

## Tech Stack

- **Frontend**: Next.js, TailwindCSS, Framer Motion
- **Authentication**: WebAuthn, Passkey Kit
- **Blockchain**: Stellar SDK, Soroban Smart Contracts
- **Cross-chain**: Polkadot.js Extension
- **Deployment**: Launchtube

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm or npm
- Polkadot.js Extension (for Polkadot features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Azlan-A1/crossdapp-passkey-portal.git
cd crossdapp-passkey-portal
```

2. Install dependencies:
```bash
cd frontend
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Visit `http://localhost:3000` in your browser

## Smart Contracts

### Stellar Testnet Deployment

- **Contract ID**: `CCXZ7NJUF2O5WVL57JJ5HJ46Q23XBYW6K6VMFI2Q2Z7Q4U4S6E2VXWX4`
- **Network**: Stellar Testnet
- **RPC Endpoint**: https://soroban-testnet.stellar.org
- **Explorer**: https://soroban-testnet.stellar.org/explorer/contract/CCXZ7NJUF2O5WVL57JJ5HJ46Q23XBYW6K6VMFI2Q2Z7Q4U4S6E2VXWX4

### Contract Features

- Passkey registration and verification
- Smart wallet policies
- Cross-dapp consent management
- Escrow functionality

## Documentation

- [Smart Contract Documentation](/docs/contracts/README.md)
- [Integration Guide](/docs/integration/README.md)
- [API Reference](/docs/api/README.md)

## Polkadot Integration

1. Install the [Polkadot.js Extension](https://polkadot.js.org/extension/)
2. Create or import a Polkadot account
3. Visit the profile page to link your Polkadot wallet

## Development

### Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── lib/             # Utilities and hooks
│   └── contracts/       # Soroban contracts
```

### Key Components

- `PasskeyAuth`: Handles WebAuthn authentication
- `usePolkadotWallet`: Manages Polkadot wallet connection
- `OrbitPass`: Smart contract for identity management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Stellar Development Foundation
- Polkadot Network
- WebAuthn Working Group

## Contact

- Project Link: [https://github.com/Azlan-A1/crossdapp-passkey-portal](https://github.com/Azlan-A1/crossdapp-passkey-portal)
- Hackathon Submission: [Stellar Consensus Hackathon 2025](https://stellar.org/developers/hackathon) 
