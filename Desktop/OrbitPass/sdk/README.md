# CrossDapp Passkey Portal SDK

A JavaScript/TypeScript SDK for integrating CrossDapp Passkey Portal into your Stellar dapp.

## Installation

```bash
npm install @crossdapp/passkey-portal
```

## Quick Start

```typescript
import { PasskeyPortal } from '@crossdapp/passkey-portal';

// Initialize the SDK
const portal = new PasskeyPortal({
  network: 'testnet',
  appId: 'your-app-id'
});

// Authenticate user
const auth = await portal.authenticate();

// Sign a transaction
const tx = await portal.signTransaction(transaction);
```

## Features

- **Passkey Authentication**: Device-native authentication using WebAuthn
- **Smart Wallet Integration**: Automated transaction handling
- **Cross-dapp Communication**: Seamless interaction between dapps
- **Transaction Signing**: Secure transaction signing with passkeys

## API Reference

### PasskeyPortal

The main class for interacting with the CrossDapp Passkey Portal.

#### Constructor

```typescript
new PasskeyPortal(config: {
  network: 'testnet' | 'mainnet';
  appId: string;
  options?: {
    timeout?: number;
    debug?: boolean;
  };
})
```

#### Methods

##### authenticate()

Authenticates the user using their passkey.

```typescript
const auth = await portal.authenticate();
```

##### signTransaction(transaction: Transaction)

Signs a Stellar transaction using the user's passkey.

```typescript
const signedTx = await portal.signTransaction(transaction);
```

##### getPermissions()

Retrieves the user's current permissions.

```typescript
const permissions = await portal.getPermissions();
```

##### revokePermission(permissionId: string)

Revokes a specific permission.

```typescript
await portal.revokePermission('permission-id');
```

## Error Handling

The SDK uses a custom error class for better error handling:

```typescript
try {
  await portal.authenticate();
} catch (error) {
  if (error instanceof PasskeyPortalError) {
    console.error(error.code, error.message);
  }
}
```

## Events

The SDK emits events for important state changes:

```typescript
portal.on('auth', (auth) => {
  console.log('User authenticated:', auth);
});

portal.on('permissionChange', (permissions) => {
  console.log('Permissions updated:', permissions);
});
```

## Browser Support

- Chrome 67+
- Firefox 60+
- Safari 13+
- Edge 79+

## Security

- All cryptographic operations are performed in the browser
- No private keys are ever transmitted
- Secure communication with smart contracts
- Regular security audits

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - see LICENSE file for details 