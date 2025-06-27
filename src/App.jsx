import { useState } from 'react'
import './App.css'
import SearchBar from './assets/components/SearchBar';
import Track from './assets/components/Track';
import TrackList from './assets/components/TrackList';

function App() {
  const [songSearch, setSongSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const handleSongSearch = (e) => {
    setSongSearch(e.target.value);
  }

  const handleSearchSubmit = () => {
    console.log('search submitted: ', songSearch);
  };

  const handleSearchResult = (e) => {
    setSearchResult(data.track.items);
  }
  
  const addToPlaylist = (track) => {
    console.log('addded to pkaylist: ', track);
  }


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
          handleSearchSubmit={handleSearchSubmit}
        />
        <hr></hr>
        <TrackList 
          searchResult={searchResult}
          addToPlaylist={addToPlaylist}
        />
        <hr></hr>
        <div>
          <p>Playlist</p>
          <button>-</button>
          <button>export</button>
        </div>
        <hr></hr>
      </div>
    </>
  )
}

export default App
