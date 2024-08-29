"use client";

import styles from "./TrackItem.module.css";
import Icon from "../Icon/Icon";
import { formatTime } from "@/utils/helpers";
import { TrackItemProps } from "@/types/TrackItemProps.types";
import { useState } from "react";
import { useAppDispatch } from "@/store/store";
import { setPlayingState } from "@/store/features/playingSlice";
import { setTrackState } from "@/store/features/trackSlice";

function TrackItem({ track }: TrackItemProps) {

//   const playingState = useAppSelector((state) => state.playing.playingState);
  const dispatch = useAppDispatch();

  const [isCurrentTrackPlaying, setIsCurrentTrackPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);

  const onClickTrack = () => {
    dispatch(setTrackState(track));
    dispatch(setPlayingState(true));
    setTrackIndex(track._id);
    setIsCurrentTrackPlaying(true);
  };

  return (
    <div className={styles.playlistItem} key={track._id} onClick={onClickTrack}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.imageContainer}>
            <div
              className={
                isCurrentTrackPlaying
                  ? styles.playingDotAnimated
                  : ""
              }
            ></div>
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
