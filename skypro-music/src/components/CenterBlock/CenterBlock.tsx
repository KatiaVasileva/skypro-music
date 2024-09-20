"use client";

import Icon from "../Icon/Icon";
import styles from "./CenterBlock.module.css";
import TrackTitle from "../TrackTitle/TrackTitle";
import Filter from "../Filter/Filter";
import { useAppDispatch, useAppSelector } from "@/store/store";
import TrackItem from "../Track/Track";
import { Track } from "@/types/Track.types";
import { useEffect } from "react";
import { setPlaylistState } from "@/store/features/trackSlice";

const CenterBlock = ({ allTracks }: { allTracks: Array<Track> }) => {
  const playlistState = useAppSelector((state) => state.track.playlistState);
  const isMyPlaylistClicked = useAppSelector(
    (state) => state.track.isMyPlaylistClicked
  );
  const isSelectionClicked = useAppSelector(
    (state) => state.track.isSelectionClicked
  );
  const dispatch = useAppDispatch();
  const myPlaylistState = useAppSelector(
    (state) => state.track.myPlaylistState
  );
  const selectedTracks = useAppSelector((state) => state.track.selectedTracks);
  const selectionIdState = useAppSelector(
    (state) => state.track.selectionIdState
  );

  useEffect(() => {
    if (isMyPlaylistClicked) {
      dispatch(setPlaylistState({ tracks: myPlaylistState }));
    } else {
      dispatch(setPlaylistState({ tracks: playlistState }));
    }
    if (isSelectionClicked) {
      dispatch(setPlaylistState({ tracks: selectedTracks }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    allTracks,
    dispatch,
    myPlaylistState,
    isSelectionClicked,
    selectionIdState,
  ]);

  const performers: Array<string> = playlistState
    .map((track) => track.author)
    .filter((performer: string) => performer !== "-")
    .reduce((acc: Array<string>, performer: string) => {
      return acc.includes(performer) ? acc : [...acc, performer];
    }, []);

  const genres: Array<string> = playlistState
    .map((track) => track.genre[0])
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

      <h2 className={styles.title}>
        {isMyPlaylistClicked ? "Мои треки" : "Треки"}
      </h2>
      <Filter performers={performers} genres={genres} />

      <div className={styles.content}>
        <TrackTitle />
        <div className={styles.playlistContent}>
          {allTracks.map((track) => (
            <TrackItem track={track} key={track._id} tracks={allTracks} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CenterBlock;
