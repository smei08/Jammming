import { useEffect, useState } from 'react';
import { startLogin, getToken } from './spotifyAuth';
import SearchBar from './assets/components/SearchBar';
import TrackList from './assets/components/TrackList';
import Playlist from './assets/components/Playlist';

export default function App() {
  const [songSearch, setSongSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [playlist, setPlaylist] = useState([]);
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

  const handleSongSearch = (e) => {
    setSongSearch(e.target.value);
  };

  const handleSearchResult = async () => {
    try {
      const token = sessionStorage.getItem('spotify_token');
      if(!token) throw new Error('Need Authentication');

      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(songSearch)}&type=track`, 
      {headers: { Authorization:`Bearer ${token}`}}
      );

      if (!response.ok) threw new Error('Spotify search failed');

      const songData = await response.json();
      const tracks = songData.tracks.items.map(item => ({
        id: item.id,
        title: item.title,
        artist: item.artist.name,
        album: item.album.name,
      }));

      setSearchResult(tracks);
    } catch (error) {
      console.log('Search Error: ', error);
    }
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
      {/* <p>Token: {token.slice(0, 15)}...</p> */}
      <button onClick={() => {
        sessionStorage.clear();
        window.location.reload();
      }}>
        LOGOUT
      </button>
      <main>
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
          // exportPlaylist={exportPlaylist}
        />
      </main>
    </div>
  );
}