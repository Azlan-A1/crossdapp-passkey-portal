import { useState, useCallback } from 'react';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

export interface PolkadotWalletState {
  accounts: InjectedAccountWithMeta[];
  selectedAddress: string | null;
  isConnecting: boolean;
  error: string | null;
}

export const usePolkadotWallet = () => {
  const [state, setState] = useState<PolkadotWalletState>({
    accounts: [],
    selectedAddress: null,
    isConnecting: false,
    error: null,
  });

  const connect = useCallback(async () => {
    setState(prev => ({ ...prev, isConnecting: true, error: null }));
    
    try {
      // Enable the extension
      const extensions = await web3Enable('OrbitPass');
      if (extensions.length === 0) {
        throw new Error('No Polkadot extension found. Please install Polkadot.js extension.');
      }

      // Get all accounts
      const accounts = await web3Accounts();
      setState(prev => ({
        ...prev,
        accounts,
        isConnecting: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to connect wallet',
        isConnecting: false,
      }));
    }
  }, []);

  const selectAccount = useCallback((address: string) => {
    setState(prev => ({
      ...prev,
      selectedAddress: address,
    }));
  }, []);

  const disconnect = useCallback(() => {
    setState({
      accounts: [],
      selectedAddress: null,
      isConnecting: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    connect,
    selectAccount,
    disconnect,
  };
}; 