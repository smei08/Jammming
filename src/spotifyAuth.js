export const clientId = 'f9421397d4db4d02b5c7041c0b49f247';
export const redirectUri = window.location.origin + '/'; // Dynamic URL

export function generateCodeVerifier() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  return Array.from(window.crypto.getRandomValues(new Uint8Array(64)))
    .map(byte => chars[byte % chars.length])
    .join('');
}

export async function generateCodeChallenge(verifier) {
  const hashed = await crypto.subtle.digest('SHA-256', 
    new TextEncoder().encode(verifier));
  return btoa(String.fromCharCode(...new Uint8Array(hashed)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function startLogin() {
  const verifier = generateCodeVerifier();
  sessionStorage.setItem('spotify_verifier', verifier);
  
  const authUrl = new URL('https://accounts.spotify.com/authorize');
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('client_id', clientId);
  authUrl.searchParams.append('scope', 'playlist-modify-private');
  authUrl.searchParams.append('redirect_uri', redirectUri);
  authUrl.searchParams.append('code_challenge_method', 'S256');
  authUrl.searchParams.append('code_challenge', await generateCodeChallenge(verifier));

  window.location.href = authUrl.toString();
}

export async function getToken(code) {
  const verifier = sessionStorage.getItem('spotify_verifier');
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: verifier
    }),
  });
  return await response.json();
}