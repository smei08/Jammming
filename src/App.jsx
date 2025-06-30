import { use, useEffect, useState } from 'react'
import './App.css'
import SearchBar from './assets/components/SearchBar';
// import Track from './assets/components/Track';
import TrackList from './assets/components/TrackList';
import Playlist from './assets/components/Playlist';
import { redirectToSpotifyLogin } from './redirectToSpotifyLogin';

function App() {
  const [songSearch, setSongSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [token, setToken] = useState('');

  console.log('token state:', token);

  const handleSongSearch = (e) => {
    setSongSearch(e.target.value);
  };

  const handleSearchResult = () => {
    console.log('search submitted: ', songSearch);
    setSearchResult([
      {
        id: '1',
        title: 'Test Song One',
        artist: 'Test Artist A',
        album: 'Test Album A'
      },
      {
        id: '2',
        title: 'Test Song Two',
        artist: 'Test Artist B',
        album: 'Test Album B'
      }
    ]);
  };
  
  const addToPlaylist = (track) => {
    console.log('addded to playlist: ', track);
    setPlaylist((prev) => {
      if((!prev.find((result) => result.id === track.id))) {
        return [...prev, track];
      } 
      return prev;
    })
  };

  const removeFromPlaylist = (track) => {
    setPlaylist((prev) => (
      prev.filter((result) => result.id !== track.id)
    ))
  };

  const exportPlaylist = (playlist) => {
    console.log('playlist exporting...');
  };

  useEffect(() => {
    console.log('useEffect running...');
    
    const storedToken = localStorage.getItem('spotify_token');
    console.log('Stored token:', storedToken);

    // Check if we already have a token stored
    if (storedToken) {
      console.log('🔓 Already logged in!');
      setToken(storedToken);
      return;
    }

    console.log('🔍 Checking for code in URL...');
    console.log('URL full string:', window.location.href);

    // Check if Spotify returned a code in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log('URL code:', code);

    if (!code) {
      console.log('No code in URL — user has not logged in yet.');
      return;
    }

    // Get the PKCE code verifier we saved before redirecting
    const codeVerifier = localStorage.getItem('pkce_code_verifier');

    if (!codeVerifier) {
      console.error('No PKCE code_verifier found in localStorage');
      return;
    }

    // Exchange the code for an access token
    fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams({
    client_id: 'f9421397d4db4d02b5c7041c0b49f247',
    grant_type: 'authorization_code',
    code,
    redirect_uri: 'https://jammtogether.netlify.app/',
    code_verifier: codeVerifier
  })
})
  .then(async response => {
    const data = await response.json();
    console.log('🎉 Token response status:', response.status);
    console.log('🎉 Token response body:', data);

    if (response.ok && data.access_token) {
      localStorage.setItem('spotify_token', data.access_token);
      setToken(data.access_token);
      window.history.replaceState({}, null, window.location.pathname);
    } else {
      console.error('❌ Failed to get access token:', data);
    }
  })
  .catch(error => {
    console.error('❌ Network or code error:', error);
  });

  }, []);



  // Logout: clears the token from memory and localStorage
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('spotify_token');
  };

  return (
    <>
      <h1>Jammming</h1>
      <h3>Search for your favorite songs, make your own playlist, and export to your Spotify</h3>

      <div>
        {
          !token ? (
            <div>
              <p>Please log in to continue</p>
              <button onClick={redirectToSpotifyLogin}>Log in with Spotify</button>
            </div>
          ) : (
            <div className="components">
              <button onClick={handleLogout}>Log Out</button>
              <SearchBar 
                songSearch={songSearch}
                searchUpdate={handleSongSearch}
                handleSearchResult={handleSearchResult}
              />
              <hr></hr>
              <TrackList 
                searchResult={searchResult}
                addToPlaylist={addToPlaylist}
              />
              <hr></hr>
              <Playlist 
                playlist={playlist}
                removeFromPlaylist={removeFromPlaylist}
                exportPlaylist={exportPlaylist}
              />
            </div>
          )
        }
      </div>
    </>
  )
}

export default App;
