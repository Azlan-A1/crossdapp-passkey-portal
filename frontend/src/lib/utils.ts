

export function storeUserWallet(keyIdBase64: string, contractId: string) {
  localStorage.setItem("userWallet", JSON.stringify({ keyIdBase64, contractId }));
}

export function clearUserWallet() {
  localStorage.removeItem("userWallet");
} 