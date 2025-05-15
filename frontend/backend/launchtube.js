const fetch = require('node-fetch');

/**
 * Submit a Soroban transaction XDR to Launchtube testnet.
 * @param {string} xdr - The signed transaction XDR string.
 * @param {string} jwt - The JWT token from https://testnet.launchtube.xyz/gen
 * @returns {Promise<object>} - The response from Launchtube.
 */
async function submitToLaunchtube(xdr, jwt) {
  const response = await fetch('https://testnet.launchtube.xyz/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ xdr }),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Launchtube error: ${error}`);
  }
  return response.json();
}

module.exports = { submitToLaunchtube }; 