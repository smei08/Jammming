import { use, useEffect, useState } from 'react'
import './App.css'
import SearchBar from './assets/components/SearchBar';
// import Track from './assets/components/Track';
import TrackList from './assets/components/TrackList';
import Playlist from './assets/components/Playlist';
import { AUTH_ENDPOINT } from './SpotifyAuth';

function App() {
  const [songSearch, setSongSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [token, setToken] = useState('');


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

  const handleLogout = () => {
    setToken('');
    window.localStorage.removeItem('spotify_token');
  }

  useEffect(() => {
    const hash = window.location.hash;
    const storedToken = window.localStorage.getItem('spotify_token');

    console.log('storedToken (from localStorage):', storedToken); 
    console.log('hash (from URL):', hash);

    if (!storedToken && hash) {
      const tokenMatch = hash.match(/access_token=([^&]*)/);
      const newToken = tokenMatch && tokenMatch[1];

      console.log('newToken (from URL hash):', newToken); 

      if (newToken) {
        window.localStorage.setItem('spotify_token', newToken);
        setToken(newToken);
        window.location.hash = '';
      }
    } else if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <>
      <h1>Jammming</h1>
      <h3>Search for your favorite songs, make your own playlist, and export to your Spotify</h3>

      <p>Token: {token}</p>

      <p style={{ wordBreak: 'break-all' }}>🧪 Token: {token}</p>
      <div>
        {
          !token ? (
            <div>
              <p>Please log in to continue</p>
              <a href={AUTH_ENDPOINT}>
                <button>log in with Spotify</button>
              </a>
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

export default App
