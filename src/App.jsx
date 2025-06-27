import { use, useState } from 'react'
import './App.css'
import SearchBar from './assets/components/SearchBar';
// import Track from './assets/components/Track';
import TrackList from './assets/components/TrackList';
import Playlist from './assets/components/Playlist';

function App() {
  const [songSearch, setSongSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [playlist, setPlaylist] = useState([]);


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

  return (
    <>
      <h1>Jammming</h1>
      <h3>Search for your favorite songs, make your own playlist, and export to your Spotify</h3>
      <div>
        <button>Login</button> 
      </div>
      <hr></hr>
      <div className="components">
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
        <hr></hr>
      </div>
    </>
  )
}

export default App
