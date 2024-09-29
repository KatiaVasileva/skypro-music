import { Track } from "@/types/Track.types";
import styles from "./Playlist.module.css";
import TrackItem from "../Track/Track";

function Playlist({allTracks} : {allTracks : Array<Track>}) {
    return (
        <div className={styles.playlistContent}>
        {allTracks.map((track) => (
          <TrackItem track={track} key={track._id} tracks={allTracks} />
        ))}
      </div>
    );
}

export default Playlist;