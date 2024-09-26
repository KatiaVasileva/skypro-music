"use client";

import { Track } from "@/types/Track.types";
import styles from "./Track.module.css";
import {
  setisTrackClicked,
  setPlayingState,
  setPlaylistState,
  setTrackCurrentTime,
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
  const playingState = useAppSelector((state) => state.track.playingState);
  const shuffleActiveState = useAppSelector(
    (state) => state.track.shuffleActiveState
  );
  const shuffledPlaylistState = useAppSelector(
    (state) => state.track.shuffledPlaylistState
  );
  const trackState = useAppSelector((state) => state.track.trackState);
  const isTrackClicked = useAppSelector((state) => state.track.isTrackClicked);

  const { isLiked, handleLike } = useLikeTrack({ track });  

  const handleTracks = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    dispatch(setTrackState(track));
    dispatch(setPlaylistState({ tracks: tracks }));
    // dispatch(setPlayingState(true));
    // dispatch(
    //   setTrackIndexState(
    //     shuffleActiveState
    //       ? shuffledPlaylistState.indexOf(track)
    //       : playlistState.indexOf(track)
    //   )
    // );
    dispatch(setisTrackClicked(true));
    // dispatch(setTrackCurrentTime(0));
  };

  const handleLikeButton = async (event: React.MouseEvent<HTMLElement>) => {
    // event.stopPropagation();
    handleLike(event);
  };

  return (
    <div className={styles.playlistItem} key={track._id} onClick={handleTracks}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.imageContainer}>
            {!shuffleActiveState &&
              trackState &&
              isTrackClicked &&
              track._id === trackState._id && (
                <div
                  className={
                    playingState ? styles.playingDotAnimated : styles.playingDot
                  }
                ></div>
              )}
            {shuffleActiveState &&
              trackState &&
              isTrackClicked &&
              track._id === trackState._id && (
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
