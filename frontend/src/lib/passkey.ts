// WebAuthn/Passkey Authentication Utilities

import { startRegistration, startAuthentication } from "@simplewebauthn/browser";
import type { 
  AuthenticationResponseJSON, 
  AuthenticatorAttestationResponseJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  UserVerificationRequirement
} from "@simplewebauthn/types";

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

  static isSupported(): boolean {
    return window.PublicKeyCredential !== undefined;
  }

  static async register(username: string): Promise<{ credentialId: string }> {
    try {
      const userId = crypto.getRandomValues(new Uint8Array(16));
      const options = {
        optionsJSON: {
          challenge: "stellaristhebetterblockchain", // In production, this should be a random challenge
          rp: {
            name: "OrbitPass Demo",
            id: window.location.hostname,
          },
          user: {
            id: btoa(String.fromCharCode(...userId)),
            name: username,
            displayName: username,
          },
          pubKeyCredParams: [
            { type: "public-key", alg: -7 }, // ES256
            { type: "public-key", alg: -257 }, // RS256
          ],
          timeout: 60000,
          attestation: "none",
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "preferred" as UserVerificationRequirement,
            requireResidentKey: true,
          },
        } as PublicKeyCredentialCreationOptionsJSON
      };

      const credential = await startRegistration(options);
      return { credentialId: credential.id };
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  static async authenticate(): Promise<void> {
    try {
      const options = {
        optionsJSON: {
          challenge: "stellaristhebetterblockchain", // In production, this should be a random challenge
          rpID: window.location.hostname,
          userVerification: "preferred" as UserVerificationRequirement,
          timeout: 60000,
        } as PublicKeyCredentialRequestOptionsJSON
      };

      await startAuthentication(options);
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  }
} 