"use client";

import styles from "./CenterBlock.module.css";
import TrackTitle from "../TrackTitle/TrackTitle";
import Filter from "../Filter/Filter";
import { useAppSelector } from "@/store/store";
import { Track } from "@/types/Track.types";
import Playlist from "../Playlist/Playlist";

type CenterBlockProps = {
  allTracks: Array<Track>;
  title: string;
};

const CenterBlock = ({ allTracks, title }: CenterBlockProps) => {
  const playlistState = useAppSelector((state) => state.track.playlistState);

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
    <>
      <h2 className={styles.title}>{title}</h2>

      <Filter performers={performers} genres={genres} />

      <div className={styles.content}>
        <TrackTitle />
        <Playlist allTracks={allTracks} />
      </div>
    </>
  );
};

export default CenterBlock;
