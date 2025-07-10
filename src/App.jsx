import { useEffect, useState } from 'react';
import { startLogin, getToken } from './spotifyAuth';
import SearchBar from './assets/components/SearchBar';
import TrackList from './assets/components/TrackList';
import Playlist from './assets/components/Playlist';
import './App.css';

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

      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(songSearch)}&type=track`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) throw new Error('Spotify search failed');

      const songData = await response.json();
      console.log("FULL SPOTIFY RESPONSE:", songData);

      if (!songData.tracks || !songData.tracks.items) {
        throw new Error("Invalid Spotify response structure");
      }

      const tracks = songData.tracks.items.map(item => ({
        id: item.id,
        title: item.name || "Untitled",
        artist: item.artists?.[0]?.name || "Unknown Artist", // Fixed syntax here
        album: item.album?.name || "Unknown Album"  // Fixed syntax here
      }));

      console.log("Processed tracks:", tracks);
      setSearchResult(tracks);
    } catch (error) {
      console.error('Search Error: ', error);
      setSearchResult([]); 
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
      <div className='login-container'>
        <h1 className='login-title'>🔥 JAMMING 🔥</h1>
        <p className='login-message'>{message}</p>
        <button 
          onClick={startLogin}
          className='login-butt'
        >
          LOGIN WITH SPOTIFY
        </button>
      </div>
    );
  }

  return (
    <div className='component-container'>
      <header>
        <h1>oh heyyy! 🎉</h1>
      
        <button className='logout-butt' onClick={() => {
          sessionStorage.clear();
          window.location.reload();
        }}>
          LOGOUT
        </button>
      </header>
      <main className='components'>
        <SearchBar 
          songSearch={songSearch}
          searchUpdate={handleSongSearch}
          handleSearchResult={handleSearchResult}
        />
        <TrackList 
          searchResult={searchResult}
          addToPlaylist={addToPlaylist}
        />
        <Playlist 
          playlist={playlist}
          removeFromPlaylist={removeFromPlaylist}
          // exportPlaylist={exportPlaylist}
        />
      </main>
    </div>
  );
}