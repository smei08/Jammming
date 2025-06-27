import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Jammming</h1>
      <h3>Search for your favorite songs, make your own playlist, and export to your Spotify</h3>
      <div>
        <button>Login</button> /* only show everything else when user login */
      </div>
      <hr></hr>
      <div className="components">
        <div>
          <p>SearchBar</p>
          <input placeholder='search for song, artist ..'></input>
          <button>Search</button>
        </div>
        <hr></hr>
        <div>
          <p>TrackList</p>
          <button>+</button> /* for each song */
        </div>
        <hr></hr>
        <div>
          <p>Playlist</p>
          <button>-</button> /* for each song */
          <button>export</button>
        </div>
        <hr></hr>
      </div>
    </>
  )
}

export default App
