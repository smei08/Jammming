import { useState } from 'react'
import './App.css'
import SearchBar from './assets/components/SearchBar';

function App() {
  const [songSearch, setSongSearch] = useState('');

  const handleSongSearch = (e) => {
    setSongSearch(e.target.value);
  }

  const handleSearchSubmit = () => {
    console.log('search submitted: ', songSearch);
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
          handleSearchSubmit={handleSearchSubmit}
        />
        <hr></hr>
        <div>
          <p>TrackList</p>
          <button>+</button> 
        </div>
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
