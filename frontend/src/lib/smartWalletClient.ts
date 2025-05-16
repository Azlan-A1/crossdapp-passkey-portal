import { Server, Keypair, Networks, TransactionBuilder, BASE_FEE, xdr } from '@stellar/stellar-sdk';
import { SorobanRpc, ContractSpec, nativeToScVal } from '@stellar/soroban-client';

const server = new Server('https://horizon-testnet.stellar.org');
const rpc = new SorobanRpc.Server('https://soroban-testnet.stellar.org');
const networkPassphrase = Networks.TESTNET;

// User's testnet account
const PUBKEY = 'GDVJFVUTBD6NGLD7V7EUJH2HQJUPZ3XXPS6C555ALB4AC3FMKEJU73AU';
const SECKEY = 'SBV2NTN3XPDCIEJOLVWWVVKPRD7674AHPMBWRQDTB7Y2L3PGWHKN4BGV';
const keypair = Keypair.fromSecret(SECKEY);

// Helper to build and send a Soroban transaction
async function sendSorobanTx(contractId: string, fn: string, args: xdr.ScVal[]) {
  const account = await server.loadAccount(PUBKEY);
  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase,
  })
    .addOperation(
      xdr.Operation.invokeHostFunction(
        new xdr.InvokeHostFunctionOp({
          function: xdr.HostFunction.hostFunctionTypeInvokeContract(),
          parameters: [
            xdr.ScVal.scvObject(xdr.ScObject.scoContractCode(contractId)),
            xdr.ScVal.scvSymbol(fn),
            ...args,
          ],
        })
      )
    )
    .setTimeout(30)
    .build();
  tx.sign(keypair);
  // Use soroban-client to send the transaction
  return rpc.sendTransaction(tx);
}

// Convert JS values to Soroban SCVals (simplified for demo)
function toScVal(val: any): xdr.ScVal {
  if (typeof val === 'string') return nativeToScVal(val, { type: 'string' });
  if (typeof val === 'number') return nativeToScVal(val, { type: 'i128' });
  if (Array.isArray(val)) return xdr.ScVal.scvVec(val.map(toScVal));
  if (typeof val === 'object' && val !== null) {
    // For Transaction struct
    return xdr.ScVal.scvMap(
      Object.entries(val).map(([k, v]) =>
        new xdr.ScMapEntry({
          key: toScVal(k),
          val: toScVal(v),
        })
      )
    );
  }
  throw new Error('Unsupported type for SCVal');
}

export async function initialize(contractId: string, owner: string = PUBKEY) {
  return sendSorobanTx(contractId, 'initialize', [toScVal(owner)]);
}

export async function setPolicy(
  contractId: string,
  owner: string = PUBKEY,
  maxAmount: number = 1000,
  allowedTokens: string[] = ['XLM', 'USDC'],
  allowedRecipients: string[] = [PUBKEY]
) {
  return sendSorobanTx(contractId, 'set_policy', [
    toScVal(owner),
    toScVal(maxAmount),
    toScVal(allowedTokens),
    toScVal(allowedRecipients),
  ]);
}

export async function executeTransaction(
  contractId: string,
  owner: string = PUBKEY,
  transaction: {
    from_token: string;
    to_token: string;
    amount: number;
    recipient: string;
  }
) {
  // Map JS keys to contract struct keys
  const txStruct = {
    from_token: transaction.from_token,
    to_token: transaction.to_token,
    amount: transaction.amount,
    recipient: transaction.recipient,
  };
  return sendSorobanTx(contractId, 'execute_transaction', [
    toScVal(owner),
    toScVal(txStruct),
  ]);
}

/**
 * Usage Example:
 *
 * import { initialize, setPolicy, executeTransaction } from './smartWalletClient';
 *
 * // Initialize contract
 * await initialize('<CONTRACT_ID>');
 *
 * // Set policy
 * await setPolicy('<CONTRACT_ID>', PUBKEY, 1000, ['XLM', 'USDC'], [PUBKEY]);
 *
 * // Execute transaction
 * await executeTransaction('<CONTRACT_ID>', PUBKEY, {
 *   from_token: 'XLM',
 *   to_token: 'USDC',
 *   amount: 500,
 *   recipient: PUBKEY,
 * });
 */ 