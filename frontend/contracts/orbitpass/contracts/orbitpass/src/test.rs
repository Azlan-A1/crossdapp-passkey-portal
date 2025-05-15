#![cfg(test)]

use super::*;
use soroban_sdk::{Address, Env, String, symbol_short};
use soroban_sdk::testutils::Address as TestAddressTrait;

#[test]
fn test_initialize() {
    let env = Env::default();
    let contract_id = env.register_contract(None, OrbitPass);
    let client = OrbitPassClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    client.initialize(&admin);

    let stored_admin: Address = env.storage().instance().get(&symbol_short!("admin"))
        .unwrap();
    assert_eq!(stored_admin, admin);
}

#[test]
fn test_register_and_verify_passkey() {
    let env = Env::default();
    let contract_id = env.register_contract(None, OrbitPass);
    let client = OrbitPassClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let user = Address::generate(&env);
    client.initialize(&admin);

    let credential = PasskeyCredential {
        public_key: String::from_str(&env, "test_public_key"),
        signature: String::from_str(&env, "test_signature"),
        challenge: String::from_str(&env, "test_challenge"),
    };

    // Register passkey
    client.register_passkey(&user, &credential);

    // Verify passkey
    let is_valid = client.verify_passkey(&user, &credential);
    assert!(is_valid);

    // Get user profile
    let profile = client.get_user_profile(&user);
    assert_eq!(profile.passkey_credentials.len(), 1);
    assert_eq!(profile.passkey_credentials.get_unchecked(0), credential);
}

#[test]
fn test_token_operations() {
    let env = Env::default();
    let contract_id = env.register_contract(None, OrbitPass);
    let client = OrbitPassClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let user = Address::generate(&env);
    let token = Address::generate(&env);
    client.initialize(&admin);

    // Add token
    client.add_token(&user, &token, &100);

    // Check balance
    let balance = client.get_token_balance(&user, &token);
    assert_eq!(balance, 100);

    // Add more tokens
    client.add_token(&user, &token, &50);
    let new_balance = client.get_token_balance(&user, &token);
    assert_eq!(new_balance, 150);
}

#[test]
#[should_panic(expected = "User not found")]
fn test_nonexistent_user() {
    let env = Env::default();
    let contract_id = env.register_contract(None, OrbitPass);
    let client = OrbitPassClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let nonexistent_user = Address::generate(&env);
    client.initialize(&admin);

    // This should panic
    client.get_user_profile(&nonexistent_user);
}
