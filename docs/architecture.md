# OrbitPass Architecture

## Overview

OrbitPass is a cross-dapp authentication system built on Stellar that enables users to authorize access to multiple dapps using a single passkey. The system consists of three main components:

1. Soroban Smart Contract (OrbitPassAuth)
2. Node.js Middleware API
3. Frontend Integration

## Smart Contract (OrbitPassAuth)

### Purpose
The OrbitPassAuth contract manages authorization between users and dapps. It allows users to authorize specific dapps to access their account and provides a way to verify these authorizations.

### Storage Schema

The contract uses a simple key-value storage system:

- **Key**: `AuthorizedApp(Address)` - A combination of the dapp's address
- **Value**: `bool` - Whether the dapp is authorized (true/false)

### Methods

1. `authorize(user: Address, app: Address)`
   - Allows a user to authorize a dapp
   - Requires user authentication
   - Stores the authorization in contract storage

2. `is_authorized(user: Address, app: Address) -> bool`
   - Checks if a dapp is authorized by a user
   - Returns true if authorized, false otherwise

## Node.js Middleware API

### Endpoints

1. `GET /challenge`
   - Generates a unique challenge for passkey authentication
   - Returns a challenge string

2. `POST /verify`
   - Verifies a challenge response
   - Validates the signature and challenge

3. `GET /health`
   - Health check endpoint
   - Returns API status

## Interaction Flow

1. **Initial Authorization**:
   ```
   User -> Frontend: Request to authorize dapp
   Frontend -> Contract: authorize(user, app)
   Contract: Stores authorization
   ```

2. **Checking Authorization**:
   ```
   Dapp -> Frontend: Request access
   Frontend -> Contract: is_authorized(user, app)
   Contract: Returns authorization status
   ```

3. **Passkey Authentication**:
   ```
   User -> Frontend: Initiate login
   Frontend -> API: GET /challenge
   API: Generates challenge
   Frontend -> User: Request passkey
   User -> Frontend: Provide passkey
   Frontend -> API: POST /verify
   API: Verifies and returns result
   ```

## Security Considerations

1. **Contract Security**:
   - Only the user can authorize dapps
   - Authorizations are stored on-chain
   - No central authority can modify authorizations

2. **API Security**:
   - Challenges expire after 5 minutes
   - CORS enabled for frontend access
   - Challenge verification required

3. **Frontend Security**:
   - Passkey stored securely on device
   - No private keys transmitted
   - Secure communication with contract and API

## Deployment

### Smart Contract
- Deployed on Stellar Testnet
- Contract ID: [To be added after deployment]

### API
- Running on port 4000
- Environment variables for configuration
- Production deployment pending

## Future Improvements

1. **Contract**:
   - Add revocation functionality
   - Implement time-based authorizations
   - Add batch authorization support

2. **API**:
   - Add rate limiting
   - Implement proper database storage
   - Add more robust challenge verification

3. **Frontend**:
   - Add authorization management UI
   - Implement better error handling
   - Add transaction history 