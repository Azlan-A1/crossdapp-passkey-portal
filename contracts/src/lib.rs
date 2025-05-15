#![no_std]
use soroban_sdk::{contractimpl, contracttype, Env, Address, Symbol};

pub struct CrossDappAuth;

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    AuthorizedApp(Address),
}

#[contractimpl]
impl CrossDappAuth {
    pub fn authorize(env: Env, user: Address, app: Address) {
        user.require_auth(); // Only user can authorize
        let key = DataKey::AuthorizedApp(app.clone());
        env.storage().instance().set(&key, &true);
    }

    pub fn is_authorized(env: Env, user: Address, app: Address) -> bool {
        let key = DataKey::AuthorizedApp(app);
        env.storage().instance().get(&key).unwrap_or(false)
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::testutils::Address as _;

    #[test]
    fn test_authorize_and_check() {
        let env = Env::default();
        let contract_id = env.register_contract(None, CrossDappAuth);
        let client = CrossDappAuthClient::new(&env, &contract_id);

        let user = Address::generate(&env);
        let app = Address::generate(&env);

        // Initially not authorized
        assert_eq!(client.is_authorized(&user, &app), false);

        // Authorize the app
        client.authorize(&user, &app);

        // Now should be authorized
        assert_eq!(client.is_authorized(&user, &app), true);
    }
} 