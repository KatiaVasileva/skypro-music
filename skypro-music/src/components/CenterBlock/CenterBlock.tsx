"use client";

import Icon from "../Icon/Icon";
import styles from "./CenterBlock.module.css";
import TrackTitle from "../TrackTitle/TrackTitle";
import Filter from "../Filter/Filter";
import { useAppSelector } from "@/store/store";
import TrackItem from "../Track/Track";
import { Track } from "@/types/Track.types";

const CenterBlock = ({allTracks}: {allTracks: Array<Track>}) => {
  const playlistState = useAppSelector((state) => state.track.playlistState);
  const isMyPlaylistClicked = useAppSelector((state) => state.track.isMyPlaylistClicked);

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

      <h2 className={styles.title}>{isMyPlaylistClicked ? "Мои треки" : "Треки"}</h2>
      <Filter performers={performers} genres={genres} />

      <div className={styles.content}>
        <TrackTitle />
        <div className={styles.playlistContent}>
          {allTracks.map((track) => (
            <TrackItem track ={track} key={track._id} tracks={allTracks} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CenterBlock;
