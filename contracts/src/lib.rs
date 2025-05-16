#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, vec, Address, Env, Symbol, Vec};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Policy {
    pub max_amount: i128,
    pub allowed_tokens: Vec<Symbol>,
    pub allowed_recipients: Vec<Address>,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Transaction {
    pub from_token: Symbol,
    pub to_token: Symbol,
    pub amount: i128,
    pub recipient: Address,
}

#[contract]
pub struct SmartWallet;

#[contractimpl]
impl SmartWallet {
    pub fn initialize(e: &Env, owner: Address) {
        e.storage().instance().set(&symbol_short!("owner"), &owner);
    }

    pub fn set_policy(
        e: &Env,
        owner: Address,
        max_amount: i128,
        allowed_tokens: Vec<Symbol>,
        allowed_recipients: Vec<Address>,
    ) {
        // Verify owner
        let stored_owner: Address = e.storage().instance().get(&symbol_short!("owner")).unwrap();
        assert_eq!(stored_owner, owner, "Only owner can set policy");

        let policy = Policy {
            max_amount,
            allowed_tokens,
            allowed_recipients,
        };

        e.storage().instance().set(&symbol_short!("policy"), &policy);
    }

    pub fn execute_transaction(
        e: &Env,
        owner: Address,
        transaction: Transaction,
    ) -> () {
        // Verify owner
        let stored_owner: Address = e.storage().instance().get(&symbol_short!("owner")).unwrap();
        assert_eq!(stored_owner, owner, "Only owner can execute transactions");

        // Get policy
        let policy: Policy = e.storage().instance().get(&symbol_short!("policy")).unwrap();

        // Verify amount
        if transaction.amount > policy.max_amount {
            panic!("Amount exceeds policy limit");
        }

        // Verify tokens
        if !policy.allowed_tokens.contains(&transaction.from_token)
            || !policy.allowed_tokens.contains(&transaction.to_token)
        {
            panic!("Token not allowed by policy");
        }

        // Verify recipient
        if !policy.allowed_recipients.contains(&transaction.recipient) {
            panic!("Recipient not allowed by policy");
        }

        // In a real implementation, this would execute the actual token swap or transfer
        // For now, we'll just return success
    }

    pub fn get_policy(e: &Env) -> Policy {
        e.storage().instance().get(&symbol_short!("policy")).unwrap()
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::Env;
    use soroban_sdk::testutils::Address as _;

    #[test]
    fn test_initialize() {
        let e = Env::default();
        let owner = Address::generate(&e);
        let contract_id = e.register_contract(None, SmartWallet);
        let contract = SmartWalletClient::new(&e, &contract_id);
        contract.initialize(&owner);
        let stored_owner: Address = e
            .as_contract(&contract_id, || {
                e.storage().instance().get(&symbol_short!("owner"))
            })
            .unwrap();
        assert_eq!(stored_owner, owner);
    }

    #[test]
    fn test_set_policy() {
        let e = Env::default();
        let owner = Address::generate(&e);
        let contract_id = e.register_contract(None, SmartWallet);
        let contract = SmartWalletClient::new(&e, &contract_id);
        contract.initialize(&owner);

        let max_amount = 1000;
        let allowed_tokens = vec![&e, symbol_short!("XLM"), symbol_short!("USDC")];
        let allowed_recipients = vec![&e, Address::generate(&e)];

        contract.set_policy(&owner, &max_amount, &allowed_tokens, &allowed_recipients);

        let policy: Policy = e
            .as_contract(&contract_id, || {
                e.storage().instance().get(&symbol_short!("policy"))
            })
            .unwrap();
        assert_eq!(policy.max_amount, max_amount);
        assert_eq!(policy.allowed_tokens, allowed_tokens);
        assert_eq!(policy.allowed_recipients, allowed_recipients);
    }

    #[test]
    fn test_execute_transaction() {
        let e = Env::default();
        let owner = Address::generate(&e);
        let recipient = Address::generate(&e);
        let contract_id = e.register_contract(None, SmartWallet);
        let contract = SmartWalletClient::new(&e, &contract_id);
        contract.initialize(&owner);

        // Set policy
        let max_amount = 1000;
        let allowed_tokens = vec![&e, symbol_short!("XLM"), symbol_short!("USDC")];
        let allowed_recipients = vec![&e, recipient.clone()];
        contract.set_policy(&owner, &max_amount, &allowed_tokens, &allowed_recipients);

        // Create transaction
        let transaction = Transaction {
            from_token: symbol_short!("XLM"),
            to_token: symbol_short!("USDC"),
            amount: 500,
            recipient: recipient.clone(),
        };

        // Execute transaction
        contract.execute_transaction(&owner, &transaction);
    }

    #[test]
    #[should_panic(expected = "Amount exceeds policy limit")]
    fn test_execute_transaction_exceeds_limit() {
        let e = Env::default();
        let owner = Address::generate(&e);
        let recipient = Address::generate(&e);
        let contract_id = e.register_contract(None, SmartWallet);
        let contract = SmartWalletClient::new(&e, &contract_id);
        contract.initialize(&owner);

        // Set policy
        let max_amount = 1000;
        let allowed_tokens = vec![&e, symbol_short!("XLM"), symbol_short!("USDC")];
        let allowed_recipients = vec![&e, recipient.clone()];
        contract.set_policy(&owner, &max_amount, &allowed_tokens, &allowed_recipients);

        // Create transaction with amount exceeding policy limit
        let transaction = Transaction {
            from_token: symbol_short!("XLM"),
            to_token: symbol_short!("USDC"),
            amount: 1500,
            recipient: recipient.clone(),
        };

        // Execute transaction
        contract.execute_transaction(&owner, &transaction);
    }
} 