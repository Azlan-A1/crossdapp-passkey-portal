#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, symbol_short, vec, Address, Env, Map, String, Symbol, Vec,
};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct PasskeyCredential {
    pub public_key: String,
    pub signature: String,
    pub challenge: String,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct UserProfile {
    pub passkey_credentials: Vec<PasskeyCredential>,
    pub tokens: Map<Address, i128>,
}

#[contract]
pub struct OrbitPass;

// This is a sample contract. Replace this placeholder with your own contract logic.
// A corresponding test example is available in `test.rs`.
//
// For comprehensive examples, visit <https://github.com/stellar/soroban-examples>.
// The repository includes use cases for the Stellar ecosystem, such as data storage on
// the blockchain, token swaps, liquidity pools, and more.
//
// Refer to the official documentation:
// <https://developers.stellar.org/docs/build/smart-contracts/overview>.
#[contractimpl]
impl OrbitPass {
    pub fn initialize(env: &Env, admin: Address) {
        env.storage().instance().set(&symbol_short!("admin"), &admin);
    }

    pub fn register_passkey(
        env: &Env,
        user: Address,
        credential: PasskeyCredential,
    ) {
        // Verify the admin exists (optional, can be extended)
        let _admin: Address = env.storage().instance().get(&symbol_short!("admin"))
            .unwrap_or_else(|| panic!("Contract not initialized"));
        // Get or create user profile
        let mut profile: UserProfile = env.storage().instance().get(&user)
            .unwrap_or_else(|| UserProfile {
                passkey_credentials: vec![env],
                tokens: Map::new(env),
            });
        // Add new credential
        profile.passkey_credentials.push_back(credential);
        // Save updated profile
        env.storage().instance().set(&user, &profile);
    }

    pub fn verify_passkey(
        env: &Env,
        user: Address,
        credential: PasskeyCredential,
    ) -> bool {
        let profile: UserProfile = env.storage().instance().get(&user)
            .unwrap_or_else(|| panic!("User not found"));
        // Verify the credential against stored credentials
        for stored_cred in profile.passkey_credentials.iter() {
            if stored_cred.public_key == credential.public_key {
                // In a real implementation, we would verify the signature here
                return true;
            }
        }
        false
    }

    pub fn get_user_profile(env: &Env, user: Address) -> UserProfile {
        env.storage().instance().get(&user)
            .unwrap_or_else(|| panic!("User not found"))
    }

    pub fn add_token(
        env: &Env,
        user: Address,
        token: Address,
        amount: i128,
    ) {
        let mut profile: UserProfile = env.storage().instance().get(&user)
            .unwrap_or_else(|| panic!("User not found"));
        let current_amount = profile.tokens.get(token.clone()).unwrap_or(0);
        profile.tokens.set(token, current_amount + amount);
        env.storage().instance().set(&user, &profile);
    }

    pub fn get_token_balance(
        env: &Env,
        user: Address,
        token: Address,
    ) -> i128 {
        let profile: UserProfile = env.storage().instance().get(&user)
            .unwrap_or_else(|| panic!("User not found"));
        profile.tokens.get(token).unwrap_or(0)
    }
}

mod test;
