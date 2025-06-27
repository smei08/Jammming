import React from "react";
import Track from "./Track";

function TrackList({searchResult, addToPlaylist}) {
    console.log('tracklist loading..')
    return (
        <div>
            {
                searchResult.map((track) => 
                    <Track 
                        key={track.title}
                        song={track}
                        addToPlaylist={addToPlaylist}
                    />
                )
            }
        </div>
    );
}

export default TrackList;