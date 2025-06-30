import { useEffect, useState } from 'react';
import { startLogin, getToken } from './spotifyAuth';

export default function App() {
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState('Checking auth...');

  useEffect(() => {
    // 1. Check for token in URL after Spotify redirect
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      getToken(code).then(data => {
        if (data.access_token) {
          sessionStorage.setItem('spotify_token', data.access_token);
          setToken(data.access_token);
          window.history.replaceState({}, '', '/'); // Clean URL
        } else {
          setMessage(`Error: ${data.error_description || 'Unknown error'}`);
        }
      });
    } 
    // 2. Check for existing token
    else if (sessionStorage.getItem('spotify_token')) {
      setToken(sessionStorage.getItem('spotify_token'));
    }
    // 3. No token found
    else {
      setMessage('Ready to login');
    }
  }, []);

  if (!token) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>🔥 JAMMING v2 🔥</h1>
        <p>{message}</p>
        <button 
          onClick={startLogin}
          style={{ padding: '10px 20px', fontSize: '1.2rem' }}
        >
          LOGIN WITH SPOTIFY
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>SUCCESS! 🎉</h1>
      <p>Token: {token.slice(0, 15)}...</p>
      <button onClick={() => {
        sessionStorage.clear();
        window.location.reload();
      }}>
        LOGOUT
      </button>
    </div>
  );
}