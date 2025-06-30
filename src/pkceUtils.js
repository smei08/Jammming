// pkceUtils.js

// Generate a random string (the secret code verifier)
export function generateCodeVerifier(length = 128) {
  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec => ('0' + (dec % 36).toString(36)).slice(-2)).join('');
}

// Base64 URL encoding (used for the code challenge)
function base64urlencode(str) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Create SHA256 hash of the code verifier to create the code challenge
export async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return base64urlencode(digest);
}
