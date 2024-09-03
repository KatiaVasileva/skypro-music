"use client";

import Icon from "../Icon/Icon";
import styles from "./CenterBlock.module.css";
import { useEffect, useState } from "react";
import { Track } from "@/types/Track.types";
import TrackTitle from "../TrackTitle/TrackTitle";
import Filter from "../Filter/Filter";
// import TrackItem from "../TrackItem/TrackItem";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setTrackIndexState, setTrackState, setPlayingState, setPlaylistState } from "@/store/features/trackSlice";
import { formatTime } from "@/utils/helpers";

const CenterBlock = ({ allTracks }: { allTracks: Array<Track> }) => {
  const playlistState = useAppSelector((state) => state.track.playlistState);
  const playingState = useAppSelector((state) => state.track.playingState);
  const trackIndexState = useAppSelector((state) => state.track.trackIndexState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPlaylistState(allTracks));
  }, [allTracks, dispatch]);

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

      <h2 className={styles.title}>Треки</h2>
      <Filter performers={performers} genres={genres} />

      <div className={styles.content}>
        <TrackTitle />
        <div className={styles.playlistContent}>
          {playlistState.map((track: Track) => (
            // <TrackItem key={track._id} track={track} />
            <div
              className={styles.playlistItem}
              key={track._id}
              onClick={() => {
                dispatch(setTrackState(track));
                dispatch(setPlayingState(true));
                dispatch(setTrackIndexState(playlistState.indexOf(track)));
              }}
            >
              <div className={styles.playlistTrack}>
                <div className={styles.trackTitle}>
                  <div className={styles.imageContainer}>
                    {playlistState.indexOf(track) === trackIndexState && (
                      <div className={playingState ? styles.playingDotAnimated : styles.playingDot}></div>
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
                <Icon iconClass={styles.trackTimeSvg} name="icon-like" />
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
