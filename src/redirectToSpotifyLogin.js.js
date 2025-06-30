import { generateCodeVerifier, generateCodeChallenge } from './pkceUtils';

const clientId = 'f9421397d4db4d02b5c7041c0b49f247'; // your Spotify app's client ID
const redirectUri = 'https://jammtogether.netlify.app/'; // after login, Spotify returns here
const scope = 'playlist-modify-private playlist-modify-public'; // permissions we're asking for

export async function redirectToSpotifyLogin() {
  const codeVerifier = generateCodeVerifier(); // make the secret string
  const codeChallenge = await generateCodeChallenge(codeVerifier); // hash it

  localStorage.setItem('pkce_code_verifier', codeVerifier); // store the secret for later

  // create the full Spotify login URL with all needed query parameters
  const authUrl = `https://accounts.spotify.com/authorize?` +
    `response_type=code&` + // we want a code (not a token)
    `client_id=${clientId}&` +
    `scope=${encodeURIComponent(scope)}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `code_challenge_method=S256&` + // we're using SHA-256 for hashing
    `code_challenge=${codeChallenge}`; // the hashed version

  window.location.href = authUrl; // send the user to Spotify's login page
}
