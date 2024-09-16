"use client";

import Icon from "../Icon/Icon";
import styles from "./CenterBlock.module.css";
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
import { useLikeTrack } from "@/hooks/useLikeTracks";
import TrackItem from "../Track/Track";
import { Track } from "@/types/Track.types";

const CenterBlock = ({allTracks}: {allTracks: Array<Track>}) => {
  const playlistState = useAppSelector((state) => state.track.playlistState);
  const trackState = useAppSelector((state) => state.track.trackState);
  const isLikedState = useAppSelector((state) => state.track.isLiked);
  const refreshToken = useAppSelector((state) => state.user.tokens?.refresh);
  const isMyPlaylistClicked = useAppSelector((state) => state.track.isMyPlaylistClicked);

  const {isLiked, handleLike} = useLikeTrack({track: trackState});

  const dispatch = useAppDispatch();

  const access = getAccessTokenFromLocalStorage();

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
