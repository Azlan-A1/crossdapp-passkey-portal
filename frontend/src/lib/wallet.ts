import { SorobanRpc, Contract } from 'soroban-client';
import { PasskeyAuth } from './passkey';

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'https://soroban-testnet.stellar.org';
const NETWORK_PASSPHRASE = process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015';

export class SmartWallet {
  private rpc: SorobanRpc;
  private contract: Contract;
  private owner: string;

  constructor(contractId: string, owner: string) {
    this.rpc = new SorobanRpc(RPC_URL);
    this.contract = new Contract(contractId);
    this.owner = owner;
  }

  async setPolicy(maxAmount: number, allowedTokens: string[], allowedRecipients: string[]) {
    try {
      const transaction = await this.contract.call(
        'set_policy',
        this.owner,
        maxAmount,
        allowedTokens,
        allowedRecipients
      );

      const result = await this.rpc.sendTransaction(transaction);
      return result;
    } catch (error) {
      console.error('Failed to set policy:', error);
      throw error;
    }
  }

  async executeTransaction(
    fromToken: string,
    toToken: string,
    amount: number,
    recipient: string
  ) {
    try {
      const transaction = await this.contract.call(
        'execute_transaction',
        this.owner,
        {
          from_token: fromToken,
          to_token: toToken,
          amount: amount,
          recipient: recipient,
        }
      );

      const result = await this.rpc.sendTransaction(transaction);
      return result;
    } catch (error) {
      console.error('Failed to execute transaction:', error);
      throw error;
    }
  }

  async getPolicy() {
    try {
      const result = await this.contract.call('get_policy');
      return result;
    } catch (error) {
      console.error('Failed to get policy:', error);
      throw error;
    }
  }
}

export async function createSmartWallet(username: string): Promise<SmartWallet> {
  try {
    // Register passkey
    const { credentialId } = await PasskeyAuth.register(username);

    // In a real app, you would:
    // 1. Deploy the smart wallet contract
    // 2. Initialize it with the owner address
    // 3. Set initial policy
    const contractId = 'demo-contract-id'; // Replace with actual contract ID
    const owner = 'demo-owner-address'; // Replace with actual owner address

    const wallet = new SmartWallet(contractId, owner);

    // Set initial policy
    await wallet.setPolicy(
      1000, // maxAmount
      ['XLM', 'USDC'], // allowedTokens
      [] // allowedRecipients (empty for now)
    );

    return wallet;
  } catch (error) {
    console.error('Failed to create smart wallet:', error);
    throw error;
  }
}

export async function loadSmartWallet(credentialId: string): Promise<SmartWallet> {
  try {
    // In a real app, you would:
    // 1. Verify the passkey
    // 2. Load the contract ID and owner from your backend
    const contractId = 'demo-contract-id'; // Replace with actual contract ID
    const owner = 'demo-owner-address'; // Replace with actual owner address

    return new SmartWallet(contractId, owner);
  } catch (error) {
    console.error('Failed to load smart wallet:', error);
    throw error;
  }
}
