import styles from "./TrackItem.module.css";
import Icon from "../Icon/Icon";
import { formatTime } from "@/utils/helpers";
import { TrackItemProps } from "@/types/TrackItemProps.types";


function TrackItem({ track, setCurrentTrack, setIsPlaying }: TrackItemProps) {
  const onClickTrack = () => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <div className={styles.playlistItem} key={track._id} onClick={onClickTrack}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <Icon
            wrapperClass={styles.trackTitleImage}
            iconClass={styles.trackTitleSvg}
            name="icon-note"
          />
          <div>
            <a className={styles.trackTitleLink} href="#">
              {track.name} <span className={styles.trackTitleSpan}></span>
            </a>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <a className={styles.trackAuthorLink} href="http://">
            {track.author}
          </a>
        </div>
        <div className={styles.trackAlbum}>
          <a className={styles.trackAlbumLink} href="http://">
            {track.album}
          </a>
        </div>
        <Icon iconClass={styles.trackTimeSvg} name="icon-like" />
        <div>
          <span className={styles.trackTimeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TrackItem;
