import { generateCodeVerifier, generateCodeChallenge } from './pkceUtils';

const clientId = 'f9421397d4db4d02b5c7041c0b49f247';
const redirectUri = 'https://jammtogether.netlify.app/'; // Your app URL
const scope = 'playlist-modify-private playlist-modify-public';

export async function redirectToSpotifyLogin() {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  // Save the code verifier in localStorage so we can use it later
  localStorage.setItem('pkce_code_verifier', codeVerifier);

  // Create the full login URL
  const authUrl = `https://accounts.spotify.com/authorize?` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `scope=${encodeURIComponent(scope)}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `code_challenge_method=S256&` +
    `code_challenge=${codeChallenge}`;

  // Redirect to Spotify
  window.location.href = authUrl;
}
