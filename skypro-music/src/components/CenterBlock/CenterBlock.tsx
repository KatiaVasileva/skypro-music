"use client";

import styles from "./CenterBlock.module.css";
import TrackTitle from "../TrackTitle/TrackTitle";
import Filter from "../Filter/Filter";
import { useAppSelector } from "@/store/store";
import { Track } from "@/types/Track.types";
import Playlist from "../Playlist/Playlist";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type CenterBlockProps = {
  allTracks: Array<Track>;
  title: string;
};

const CenterBlock = ({ allTracks, title }: CenterBlockProps) => {
  const playlistState = useAppSelector((state) => state.track.playlistState);
  const isLoading = useAppSelector((state) => state.track.isLoading);
  const { searchState, genreState, performerState, dateState } = useAppSelector(
    (state) => state.filter
  );

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

  const years: Array<string> = [
    "По умолчанию",
    "Сначала новые",
    "Сначала старые",
  ];

  return (
    <>
      <h2 className={styles.title}>{isLoading ? <Skeleton /> : title}</h2>

      <Filter performers={performers} genres={genres} years={years} />

      {isLoading ? (
        <Skeleton
          count={20}
          width="100%"
          height={51}
          className={styles.skeleton}
        />
      ) : (
        <div className={styles.content}>
          <TrackTitle />
          {allTracks.length === 0 &&
            (searchState !== "" ||
              dateState.length !== 0 ||
              performerState.length !== 0 ||
              genreState.length !== 0) && (
              <div className={styles.textNotFound}>Треки не найдены</div>
            )}
          <Playlist allTracks={allTracks} />
        </div>
      )}
    </>
  );
};

export default CenterBlock;
