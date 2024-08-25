"use client";

import Icon from "../Icon/Icon";
import styles from "./CenterBlock.module.css";
import { useEffect, useState } from "react";
import { Track } from "@/types/Track.types";
import classNames from "classnames";
import { useTrackContext } from "@/hooks/useTrackContext";
import { TrackContextType } from "@/context/TrackContext";
import { formatTime } from "@/utils/helpers";
import TrackTitle from "../TrackTitle/TrackTitle";

const CenterBlock = ({ allTracks }: { allTracks: Array<Track> }) => {
  const [tracks, setTracks] = useState<Array<Track>>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { setCurrentTrack, setIsPlaying } =
    useTrackContext() as TrackContextType;

  useEffect(() => {
    setTracks(allTracks);
  }, [allTracks, setTracks]);

  const performers: Array<string> = tracks
    .map((track) => track.author)
    .filter((performer: string) => performer !== "-")
    .reduce((acc: Array<string>, performer: string) => {
      return acc.includes(performer) ? acc : [...acc, performer];
    }, []);

  const genres: Array<string> = tracks
    .map((track) => track.genre[0])
    .reduce((acc: Array<string>, genre: string) => {
      return acc.includes(genre) ? acc : [...acc, genre];
    }, []);

  const handleTrackNameClick = ({ id }: { id: number }) => {
    const currentTracks: Array<Track> = tracks.filter(
      (track) => track._id === id
    );
    setCurrentTrack(currentTracks[0]);
    setIsPlaying(true);
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

      <h2 className={styles.title}>Треки</h2>
      <div className={styles.filter}>
        <div className={styles.filterTitle}>Искать по:</div>
        <div
          className={
            activeIndex === 1 ? styles.filterButtonActive : styles.filterButton
          }
          onClick={() =>
            activeIndex === 1 ? setActiveIndex(0) : setActiveIndex(1)
          }
        >
          исполнителю
        </div>
        <div
          className={
            activeIndex === 2 ? styles.filterButtonActive : styles.filterButton
          }
          onClick={() =>
            activeIndex === 2 ? setActiveIndex(0) : setActiveIndex(2)
          }
        >
          году выпуска
        </div>
        <div
          className={
            activeIndex === 3 ? styles.filterButtonActive : styles.filterButton
          }
          onClick={() =>
            activeIndex === 3 ? setActiveIndex(0) : setActiveIndex(3)
          }
        >
          жанру
        </div>
      </div>

      {activeIndex === 1 && (
        <div className={styles.popup}>
          <div
            className={classNames(
              styles.popupContainer,
              styles.popupContainerAuthor
            )}
          >
            <div className={styles.popupBox}>
              <div className={styles.popupContent}>
                {performers.map((performer) => (
                  <p className={styles.popupText} key={performer}>
                    {performer}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeIndex === 2 && (
        <div className={styles.popup}>
          <div
            className={classNames(
              styles.popupContainer,
              styles.popupContainerYear
            )}
          >
            <div className={styles.popupBoxYear}>
              <div className={styles.popupContentYear}>
                <p className={styles.popupText}>По умолчанию</p>
                <p className={styles.popupText}>Сначала новые</p>
                <p className={styles.popupText}>Сначала старые</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeIndex === 3 && (
        <div className={styles.popup}>
          <div
            className={classNames(
              styles.popupContainer,
              styles.popupContainerGenre
            )}
          >
            <div className={styles.popupBox}>
              <div className={styles.popupContent}>
                {genres.map((genre) => (
                  <p className={styles.popupText} key={genre}>
                    {genre}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.content}>
        <TrackTitle />

        <div className={styles.playlistContent}>
          {tracks.map((track: Track) => (
            <div
              className={styles.playlistItem}
              key={track._id}
              onClick={() => handleTrackNameClick({ id: track._id })}
            >
              <div className={styles.playlistTrack}>
                <div className={styles.trackTitle}>
                  <Icon
                    wrapperClass={styles.trackTitleImage}
                    iconClass={styles.trackTitleSvg}
                    name="icon-note"
                  />
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
