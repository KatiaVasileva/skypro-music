"use client";

import Icon from "../Icon/Icon";
import styles from "./CenterBlock.module.css";
import { useEffect } from "react";
import { Track } from "@/types/Track.types";
import TrackTitle from "../TrackTitle/TrackTitle";
import Filter from "../Filter/Filter";
import TrackItem from "../TrackItem/TrackItem";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setPlaylistState } from "@/store/features/playlistSlice";

const CenterBlock = ({ allTracks }: { allTracks: Array<Track> }) => {

  const playlistState = useAppSelector((state) => state.playlist.playlistState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPlaylistState(allTracks));
  }, [allTracks, setPlaylistState]);

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

      <h2 className={styles.title}>Треки</h2>
      <Filter performers={performers} genres={genres} />

      <div className={styles.content}>
        <TrackTitle />
        <div className={styles.playlistContent}>
          {playlistState.map((track: Track) => (
            <TrackItem key={track._id} track={track} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CenterBlock;
