"use client";

import styles from "./Player.module.css";
import { TrackContextType } from "@/context/TrackContext";
import { useTrackContext } from "@/hooks/useTrackContext";
import { useEffect, useRef, useState } from "react";
import Icon from "../Icon/Icon";
import Image from "next/image";
import ProgressBar from "../ProgressBar/ProgressBar";
import { formatTime } from "@/utils/helpers";

function Player() {
  const { currentTrack, isPlaying, setIsPlaying } =
    useTrackContext() as TrackContextType;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isRepeatActive, setIsRepeatActive] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);

  const duration = audioRef.current?.duration || 0;

  useEffect(() => {
    audioRef.current!.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current!.pause();
    }
    if (!isPlaying) {
      audioRef.current!.play();
    }
    // check
    setIsPlaying(isPlaying ? false : true);
  };

  const toggleRepeat = () => {
    setIsRepeatActive((prev) => !prev);
  };

  return (
    <div className={styles.bar}>
      <div className={styles.content}>
        <audio
          ref={audioRef}
          src={currentTrack?.track_file}
          loop={isRepeatActive ? true : false}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        />
        <div className={styles.playerProgress}>
          <ProgressBar
            max={duration}
            value={currentTime}
            step={0.01}
            onChange={(e) =>
              (audioRef.current!.currentTime = Number(e.target.value))
            }
          ></ProgressBar>
        </div>
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
                  <Image
                    src="/img/icon/pause.svg"
                    alt=""
                    width={15}
                    height={19}
                  />
                </div>
              )}

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

              <div className={styles.trackTime}>
                <p className={styles.trackTimeFigures}>
                  {formatTime(currentTime)}
                </p>{" "}
                /{" "}
                <p className={styles.trackTimeFigures}>
                  {formatTime(duration)}
                </p>
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
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
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
