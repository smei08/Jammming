import React from "react";

function Playlist({ playlist, removeFromPlaylist, exportPlaylist }) {
    return (
        <div className="playlist">
            <h4>Your Playlist</h4>
            {
                playlist.map(track => (
                    <div key={track.id}>
                        <p>{track.title} -- {track.artist}</p>
                        <button onClick={() => removeFromPlaylist(track)}>-</button>
                    </div>
                ))
            }
            <button onClick={() => exportPlaylist(playlist)}>Export</button>
        </div>
    );
}

export default Playlist;