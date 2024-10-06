"use client";

import styles from "./Player.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "../Icon/Icon";
import Image from "next/image";
import ProgressBar from "../ProgressBar/ProgressBar";
import { formatTime } from "@/utils/helpers";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setNextTrack,
  setPlayingState,
  togglePlaying,
  toggleShuffle,
  setPrevTrack,
  setPlaylistState,
  setTrackCurrentTime,
} from "@/store/features/trackSlice";
import { useLikeTrack } from "@/hooks/useLikeTracks";

function Player() {
  const { trackState, playingState, playlistState, shuffleActiveState } =
    useAppSelector((state) => state.track);

  const dispatch = useAppDispatch();

  const { isLiked, handleLike } = useLikeTrack({ track: trackState });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isRepeatActive, setIsRepeatActive] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);

  const duration = audioRef.current?.duration || 0;

  const handleEnded = useCallback(() => {
    dispatch(setNextTrack());
    dispatch(setTrackCurrentTime(0));
  }, [dispatch]);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      if (trackState) {
        audio.src = trackState.track_file;
      }

      audio.play();
      dispatch(setPlayingState(true));

      audio.addEventListener("ended", handleEnded);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleEnded);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackState, dispatch]);

  useEffect(() => {
    if (audioRef.current) {
      if (playingState) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [playingState]);

  useEffect(() => {
    audioRef.current!.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    if (playingState) {
      audioRef.current!.pause();
    } else {
      audioRef.current!.play();
    }
    dispatch(togglePlaying());
  };

  const toggleRepeat = () => {
    setIsRepeatActive((prevState) => !prevState);
  };

  const toggleShuffleButton = () => {
    dispatch(toggleShuffle());
    dispatch(setPlaylistState({ tracks: playlistState }));
    dispatch(setNextTrack());
    dispatch(setTrackCurrentTime(0));
  };

  const handleButtonNextClick = () => {
    dispatch(setNextTrack());
    dispatch(setTrackCurrentTime(0));
  };

  const handleButtonPrevClick = () => {
    dispatch(setPrevTrack());
    dispatch(setTrackCurrentTime(0));
  };

  const handleLikeButton = async (event: React.MouseEvent<HTMLElement>) => {
    handleLike(event);
  };

  return (
    <div className={styles.bar} data-testid="player-container">
      <div className={styles.content}>
        <audio
          ref={audioRef}
          src={trackState?.track_file}
          loop={isRepeatActive ? true : false}
          onTimeUpdate={(e) => {
            setCurrentTime(e.currentTarget.currentTime);
            dispatch(setTrackCurrentTime(currentTime));
          }}
        />
        <div>
          <ProgressBar
            max={duration}
            value={currentTime}
            step={0.01}
            onChange={(e) => {
              audioRef.current!.currentTime = Number(e.target.value);
            }}
          ></ProgressBar>
        </div>

        <div className={styles.playerBlock}>
          <div className={styles.player}>
            <div className={styles.controls}>
              <Icon
                wrapperClass={styles.buttonPrev}
                iconClass={styles.buttonPrevSvg}
                name="icon-prev"
                onClick={handleButtonPrevClick}
              />
              {!playingState && (
                <Icon
                  data-testid="player-button"
                  wrapperClass={styles.buttonPlay}
                  iconClass={styles.buttonPlaySvg}
                  name="icon-play"
                  onClick={() => {
                    dispatch(setPlayingState(true));
                    audioRef.current!.play();
                  }}
                />
              )}
              {playingState && (
                <div
                  className={styles.buttonPause}
                  onClick={() => {
                    dispatch(setPlayingState(false));
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
                onClick={handleButtonNextClick}
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
                iconClass={
                  shuffleActiveState
                    ? styles.buttonShuffleSvgActive
                    : styles.buttonShuffleSvg
                }
                name="icon-shuffle"
                onClick={toggleShuffleButton}
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
                    {trackState?.name}
                  </a>
                </div>
                <div className={styles.trackPlayAuthor}>
                  <a className={styles.trackPlayAuthorLink} href="#">
                    {trackState?.author}
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
                  iconClass={
                    isLiked
                      ? styles.trackPlayLikeSvgActive
                      : styles.trackPlayLikeSvg
                  }
                  name="icon-like"
                  onClick={handleLikeButton}
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
