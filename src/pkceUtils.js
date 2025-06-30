// pkceUtils.js

// This function generates a long random string (the "code verifier")
// This string is saved temporarily and will later be used to confirm our identity
export function generateCodeVerifier(length = 128) {
  const array = new Uint32Array(length); // create an array of random 32-bit integers
  window.crypto.getRandomValues(array);  // fill the array with secure random numbers
  return Array.from(array, dec =>
    ('0' + (dec % 36).toString(36)).slice(-2) // convert each number to a character (a-z, 0-9)
  ).join(''); // join all characters into one long string
}

// This helper function turns binary data into a base64 URL-safe string
function base64urlencode(str) {
  return btoa(String.fromCharCode(...new Uint8Array(str))) // convert binary to base64
    .replace(/\+/g, '-') // make it URL-safe
    .replace(/\//g, '_') // make it URL-safe
    .replace(/=+$/, ''); // remove trailing "=" signs
}

// This creates a hashed version (SHA256) of the code verifier
// This is called the "code challenge", and it's sent to Spotify during login
export async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder(); // converts text to bytes
  const data = encoder.encode(codeVerifier); // encode the string into bytes
  const digest = await window.crypto.subtle.digest('SHA-256', data); // hash it with SHA-256
  return base64urlencode(digest); // return the base64-encoded version
}
