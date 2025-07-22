import React from "react";

function Track({ track, addToPlaylist }) {
    return (
        <div className="trackContainer">
            <div className="trackInfo">
                <h4>{track.title}</h4>
                <p>{track.artist}</p>
                <p>{track.album}</p> 
            </div>
            <button onClick={() => addToPlaylist(track)}>+</button>
        </div>
    );
}

export default Track;