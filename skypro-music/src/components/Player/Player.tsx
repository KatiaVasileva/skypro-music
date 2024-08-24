"use client";

import styles from "./Player.module.css";
import { TrackContextType } from "@/context/TrackContext";
import { useTrackContext } from "@/hooks/useTrackContext";
import { useRef, useState } from "react";
import Icon from "../Icon/Icon";

function Player() {
  const { currentTrack, isPlaying, setIsPlaying } =
    useTrackContext() as TrackContextType;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isRepeatActive, setIsRepeatActive] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current!.pause();
    }
    if (!isPlaying) {
      audioRef.current!.play();
    }
    setIsPlaying(isPlaying ? false : true);
  };

  const toggleRepeat = () => {
    setIsRepeatActive((prev) => !prev);
  };

  return (
    <div className={styles.bar}>
      <div className={styles.content}>
        <audio
          controls
          ref={audioRef}
          src={currentTrack?.track_file}
          loop={isRepeatActive ? true : false}
        />
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
                <div
                  className={styles.buttonPause}
                  onClick={() => {
                    setIsPlaying(false);
                    audioRef.current!.pause();
                  }}
                >
                  <svg className={styles.buttonPauseSvg}>
                    <use xlinkHref="/img/icon/pause.svg"></use>
                  </svg>
                </div>
              )}

              {/* {isPlaying && (
                <Image
                  className={styles.buttonPause}
                  src="/img/icon-pause.png"
                  alt="pause"
                  width={15}
                  height={19}
                  onClick={() => {
                    setIsPlaying(false);
                    audioRef.current!.pause();
                  }}
                  onClick={() => {
                    setIsPlaying(false);
                    audioRef.current!.pause();
                  }
                />
                <Icon
                  wrapperClass={styles.buttonPause}
                  iconClass={styles.buttonPauseSvg}
                  name="icon-pause"
                  onClick={() => {
                    setIsPlaying(false);
                    audioRef.current!.pause();
                  }}
                />
              )} */}

              <Icon
                wrapperClass={styles.buttonNext}
                iconClass={styles.buttonNextSvg}
                name="icon-next"
              />
              <Icon
                wrapperClass={styles.buttonRepeat}
                iconClass={
                  isRepeatActive
                    ? styles.buttonRepeatSvgActive
                    : styles.buttonRepeatSvg
                }
                name="icon-repeat"
                onClick={toggleRepeat}
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

export default Player;
