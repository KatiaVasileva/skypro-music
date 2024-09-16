"use client";

import Icon from "../Icon/Icon";
import styles from "./CenterBlock.module.css";
import { MouseEventHandler, useEffect } from "react";
import { Track } from "@/types/Track.types";
import TrackTitle from "../TrackTitle/TrackTitle";
import Filter from "../Filter/Filter";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setTrackIndexState,
  setTrackState,
  setPlayingState,
  setPlaylistState,
  toggleIsLiked,
  setMyPlaylistState,
  getFavoriteTracks,
  getTracks,
} from "@/store/features/trackSlice";
import { formatTime, getAccessTokenFromLocalStorage } from "@/utils/helpers";
import { addFavorite, getAllTracks, removeFavorite } from "@/api/tracksApi";

const CenterBlock = ({allTracks}: {allTracks: Array<Track>}) => {
  const playlistState = useAppSelector((state) => state.track.playlistState);
  const myPlaylistState = useAppSelector((state) => state.track.myPlaylistState);
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
  const isLikedState = useAppSelector((state) => state.track.isLiked);
  const refreshToken = useAppSelector((state) => state.user.tokens?.refresh);
  const isMyPlaylistClicked = useAppSelector((state) => state.track.isMyPlaylistClicked);

  const dispatch = useAppDispatch();

  const access = getAccessTokenFromLocalStorage();

  let liked : boolean;
  if (trackState) {
    liked = myPlaylistState.includes(trackState);
  }

  console.log(myPlaylistState);

  const performers: Array<string> = playlistState
    .map((track: Track) => track.author)
    .filter((performer: string) => performer !== "-")
    .reduce((acc: Array<string>, performer: string) => {
      return acc.includes(performer) ? acc : [...acc, performer];
    }, []);

  const genres: Array<string> = playlistState
    .map((track: Track) => track.genre[0])
    .reduce((acc: Array<string>, genre: string) => {
      return acc.includes(genre) ? acc : [...acc, genre];
    }, []);

  const handleLikeButton: MouseEventHandler<HTMLElement> = async (event) => {
    event.preventDefault();
    const access = getAccessTokenFromLocalStorage();
    if (!access) {
      alert("Необходимо зарегистрироваться");
      return;
    }
    if (!isLikedState) {
      const data = await addFavorite({
        id: trackState?._id,
        access: access,
        refresh: refreshToken ? refreshToken : "",
      });
      console.log(data);
    } else {
      const data = await removeFavorite({
        id: trackState?._id,
        access: access,
        refresh: refreshToken ? refreshToken : "",
      });
      console.log(data);
    }
    dispatch(toggleIsLiked());
  };

  return (
    <div className={styles.main}>
      <div className={styles.search}>
        <Icon iconClass={styles.searchSvg} name="icon-search" />
        <input
          className={styles.searchText}
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>

      <h2 className={styles.title}>{isMyPlaylistClicked ? "Мои треки" : "Треки"}</h2>
      <Filter performers={performers} genres={genres} />

      <div className={styles.content}>
        <TrackTitle />
        <div className={styles.playlistContent}>
          {allTracks.map((track: Track) => (
            <div
              className={styles.playlistItem}
              key={track._id}
              onClick={() => {
                dispatch(setTrackState(track));
                dispatch(setPlayingState(true));
                dispatch(
                  setTrackIndexState(
                    shuffleActiveState
                      ? shuffledPlaylistState.indexOf(track)
                      : playlistState.indexOf(track)
                  )
                );
              }}
            >
              <div className={styles.playlistTrack}>
                <div className={styles.trackTitle}>
                  <div className={styles.imageContainer}>
                    {!shuffleActiveState &&
                      playlistState.indexOf(track) === trackIndexState && (
                        <div
                          className={
                            playingState
                              ? styles.playingDotAnimated
                              : styles.playingDot
                          }
                        ></div>
                      )}
                    {shuffleActiveState &&
                      shuffledPlaylistState.indexOf(track) ===
                        trackIndexState && (
                        <div
                          className={
                            playingState
                              ? styles.playingDotAnimated
                              : styles.playingDot
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
                      {track.name}{" "}
                      <span className={styles.trackTitleSpan}></span>
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
                  iconClass={
                    liked ? styles.trackLikeSvgActive : styles.trackLikeSvg
                  }
                  name="icon-like"
                  onClick={handleLikeButton}
                />

                {/* {!shuffleActiveState && (
                  <Icon
                    iconClass={
                      isLikedState &&
                      playlistState.indexOf(track) === trackIndexState
                        ? styles.trackLikeSvgActive
                        : styles.trackLikeSvg
                    }
                    name="icon-like"
                    onClick={handleLikeButton}
                  />
                )}
                {shuffleActiveState &&
                  shuffledPlaylistState.indexOf(track) === trackIndexState && (
                    <Icon
                      iconClass={
                        isLikedState
                          ? styles.trackLikeSvgActive
                          : styles.trackLikeSvg
                      }
                      name="icon-like"
                      onClick={handleLikeButton}
                    />
                  )} */}

                <div>
                  <span className={styles.trackTimeText}>
                    {formatTime(track.duration_in_seconds)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CenterBlock;
