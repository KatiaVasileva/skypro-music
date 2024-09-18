"use client";

import { Track } from "@/types/Track.types";
import styles from "./Track.module.css";
import {
  setPlayingState,
  setPlaylistState,
  setTrackIndexState,
  setTrackState,
} from "@/store/features/trackSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import Icon from "../Icon/Icon";
import { useLikeTrack } from "@/hooks/useLikeTracks";
import { formatTime } from "@/utils/helpers";

type TrackItemProps = {
  track: Track;
  tracks: Array<Track>;
};

function TrackItem({ track, tracks }: TrackItemProps) {
  const dispatch = useAppDispatch();
  const playlistState = useAppSelector((state) => state.track.playlistState);
  const myPlaylistState = useAppSelector(
    (state) => state.track.myPlaylistState
  );
  const playingState = useAppSelector((state) => state.track.playingState);
  const trackIndexState = useAppSelector(
    (state) => state.track.trackIndexState
  );
  const shuffleActiveState = useAppSelector(
    (state) => state.track.shuffleActiveState
  );
  const shuffledPlaylistState = useAppSelector(
    (state) => state.track.shuffledPlaylistState
  );
  const trackState = useAppSelector((state) => state.track.trackState);

  const { isLiked, handleLike } = useLikeTrack({ track });

  const handleTracks = () => {
    dispatch(setTrackState(track));
    dispatch(setPlaylistState({ tracks: tracks }));
    dispatch(setPlayingState(true));
    dispatch(
      setTrackIndexState(
        shuffleActiveState
          ? shuffledPlaylistState.indexOf(track)
          : playlistState.indexOf(track)
      )
    );
  };

  const handleLikeButton = async (event: React.MouseEvent<HTMLElement>) => {
    handleLike(event);
  };

  return (
    <div
      className={styles.playlistItem}
      key={track._id}
      onClick={() => {
        handleTracks();
      }}
    >
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.imageContainer}>
            {!shuffleActiveState && trackState &&
              playlistState.indexOf(track) === trackIndexState && (
                <div
                  className={
                    playingState ? styles.playingDotAnimated : styles.playingDot
                  }
                ></div>
              )}
            {shuffleActiveState && trackState &&
              shuffledPlaylistState.indexOf(track) === trackIndexState && (
                <div
                  className={
                    playingState ? styles.playingDotAnimated : styles.playingDot
                  }
                ></div>
              )}

            <Icon
              wrapperClass={styles.trackTitleImage}
              iconClass={styles.trackTitleSvg}
              name="icon-note"
            />
          </div>
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

        <Icon
          iconClass={isLiked ? styles.trackLikeSvgActive : styles.trackLikeSvg}
          name="icon-like"
          onClick={handleLikeButton}
        />

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
