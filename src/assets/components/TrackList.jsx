import React from "react";
import Track from "./Track";

function TrackList({searchResult, addToPlaylist}) {
    console.log('tracklist loading..')
    return (
        <div className="searchresult">
            {
                searchResult.map((track) => 
                    <Track 
                        key={track.title}
                        track={track}
                        addToPlaylist={addToPlaylist}
                    />
                )
            }
        </div>
    );
}

export default TrackList;