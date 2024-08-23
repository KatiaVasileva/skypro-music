"use client";

import { useTrackContext } from "@/hooks/useTrackContext";
import Icon from "../Icon/Icon";
import styles from "./Bar.module.css";
import { TrackContextType } from "@/context/TrackContext";
import { useRef, useState } from "react";

function Bar() {
  const { currentTrack } = useTrackContext() as TrackContextType;

  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const currentTrackSource = currentTrack?.track_file;

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio!.pause();
    } else {
      audio!.play();
    }
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className={styles.bar}>
      <div className={styles.content}>
        <audio ref={audioRef} src={currentTrackSource}></audio>
        <div className={styles.playerProgress}></div>
        <div className={styles.playerBlock}>
          <div className={styles.player}>
            <div className={styles.controls}>
              <Icon
                wrapperClass={styles.buttonPrev}
                iconClass={styles.buttonPrevSvg}
                name="icon-prev"
              />
              {!isPlaying && (
                <Icon
                  wrapperClass={styles.buttonPlay}
                  iconClass={styles.buttonPlaySvg}
                  name="icon-play"
                  onClick={() => {
                    setIsPlaying(true);
                    audioRef.current!.play();
                  }}
                />
              )}
              {isPlaying && (
                <Icon
                  wrapperClass={styles.buttonPause}
                  iconClass={styles.buttonPauseSvg}
                  name="icon-pause"
                  onClick={() => {
                    setIsPlaying(false);
                    audioRef.current!.pause();
                  }}
                />
              )}
              <Icon
                wrapperClass={styles.buttonNext}
                iconClass={styles.buttonNextSvg}
                name="icon-next"
              />
              <Icon
                wrapperClass={styles.buttonRepeat}
                iconClass={styles.buttonRepeatSvg}
                name="icon-repeat"
              />
              <Icon
                wrapperClass={styles.buttonShuffle}
                iconClass={styles.buttonShuffleSvg}
                name="icon-shuffle"
              />
            </div>

            <div className={styles.trackPlay}>
              <div className={styles.trackPlayContainer}>
                <Icon
                  wrapperClass={styles.trackPlayImage}
                  iconClass={styles.trackPlayImageSvg}
                  name="icon-note"
                />
                <div className={styles.trackPlayName}>
                  <a
                    className={styles.trackPlayNameLink}
                    href="#"
                    onClick={togglePlay}
                  >
                    {currentTrack?.name}
                  </a>
                </div>
                <div className={styles.trackPlayAuthor}>
                  <a className={styles.trackPlayAuthorLink} href="#">
                    {currentTrack?.author}
                  </a>
                </div>
              </div>

              <div className={styles.trackPlayLikeDis}>
                <Icon
                  wrapperClass={styles.trackPlayLike}
                  iconClass={styles.trackPlayLikeSvg}
                  name="icon-like"
                />
                <Icon
                  wrapperClass={styles.trackPlayDislike}
                  iconClass={styles.trackPlayDislikeSvg}
                  name="icon-dislike"
                />
              </div>
            </div>
          </div>
          <div className={styles.volumeBlock}>
            <div className={styles.volumeContent}>
              <Icon
                wrapperClass={styles.volumeImage}
                iconClass={styles.volumeSvg}
                name="icon-volume"
              />
              <div className={styles.volumeProgress}>
                <input
                  className={styles.volumeProgressLine}
                  type="range"
                  name="range"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bar;
