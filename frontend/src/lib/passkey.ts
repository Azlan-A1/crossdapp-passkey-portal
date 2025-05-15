// WebAuthn/Passkey Authentication Utilities

interface PublicKeyCredentialCreationOptions {
  challenge: BufferSource;
  rp: {
    name: string;
    id: string;
  };
  user: {
    id: BufferSource;
    name: string;
    displayName: string;
  };
  pubKeyCredParams: Array<{
    type: string;
    alg: number;
  }>;
  timeout: number;
  attestation: string;
  authenticatorSelection: {
    authenticatorAttachment: string;
    requireResidentKey: boolean;
    userVerification: string;
  };
}

interface PublicKeyCredentialRequestOptions {
  challenge: BufferSource;
  rpId: string;
  allowCredentials: Array<{
    type: string;
    id: BufferSource;
    transports: string[];
  }>;
  userVerification: string;
  timeout: number;
}

export class PasskeyAuth {
  private static generateChallenge(): Uint8Array {
    return crypto.getRandomValues(new Uint8Array(32));
  }

  private static base64UrlEncode(buffer: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  private static base64UrlDecode(base64Url: string): ArrayBuffer {
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padding = '='.repeat((4 - (base64.length % 4)) % 4);
    const base64Padded = base64 + padding;
    const binary = atob(base64Padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  static async register(username: string): Promise<{
    credentialId: string;
    publicKey: string;
  }> {
    const challenge = this.generateChallenge();
    
    const options: PublicKeyCredentialCreationOptions = {
      challenge,
      rp: {
        name: 'OrbitPass',
        id: window.location.hostname,
      },
      user: {
        id: crypto.getRandomValues(new Uint8Array(16)),
        name: username,
        displayName: username,
      },
      pubKeyCredParams: [
        { type: 'public-key', alg: -7 }, // ES256
        { type: 'public-key', alg: -257 }, // RS256
      ],
      timeout: 60000,
      attestation: 'none',
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        requireResidentKey: true,
        userVerification: 'preferred',
      },
    };

    try {
      const credential = await navigator.credentials.create({
        publicKey: options,
      }) as PublicKeyCredential;

      if (!credential) {
        throw new Error('Failed to create credential');
      }

      const response = credential.response as AuthenticatorAttestationResponse;
      
      return {
        credentialId: this.base64UrlEncode(credential.rawId),
        publicKey: this.base64UrlEncode(response.getPublicKey()!),
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  static async authenticate(): Promise<{
    credentialId: string;
    signature: string;
    userHandle: string;
  }> {
    const challenge = this.generateChallenge();

    const options: PublicKeyCredentialRequestOptions = {
      challenge,
      rpId: window.location.hostname,
      allowCredentials: [], // Allow any credential
      userVerification: 'preferred',
      timeout: 60000,
    };

    try {
      const credential = await navigator.credentials.get({
        publicKey: options,
      }) as PublicKeyCredential;

      if (!credential) {
        throw new Error('Failed to get credential');
      }

      const response = credential.response as AuthenticatorAssertionResponse;

      return {
        credentialId: this.base64UrlEncode(credential.rawId),
        signature: this.base64UrlEncode(response.signature),
        userHandle: this.base64UrlEncode(response.userHandle!),
      };
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }

  static isSupported(): boolean {
    return window.PublicKeyCredential !== undefined;
  }
} 