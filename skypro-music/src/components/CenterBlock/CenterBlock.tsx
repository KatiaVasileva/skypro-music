"use client";

import { getAllTracks } from "@/api/tracksApi";
import Icon from "../Icon/Icon";
import styles from "./CenterBlock.module.css";
import { useEffect, useState } from "react";
import { Track } from "@/types/Track.types";
import Error from "@/app/error";

function CenterBlock() {
  const classNames = require("classnames");

  const [tracks, setTracks] = useState<Array<Track>>([]);
  const [getAllTracksError, setGetAllTracksError] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    getAllTracks()
      .then((data) => {
        setTracks(data.data);
      })
      .catch(() => {
        setGetAllTracksError(true);
      });
  }, [setTracks]);

  const reset = () => {
    getAllTracks()
      .then((data) => {
        setGetAllTracksError(false);
        setTracks(data.data);
      })
      .catch(() => {
        setGetAllTracksError(true);
      });
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
        <div className={styles.filterButton} onClick={() => setActiveIndex(1)}>
          исполнителю
        </div>
        <div className={styles.filterButton} onClick={() => setActiveIndex(2)}>
          году выпуска
        </div>
        <div className={styles.filterButton} onClick={() => setActiveIndex(3)}>
          жанру
        </div>
      </div>

      {activeIndex === 1 && <div></div>}

      <div className={styles.content}>
        <div className={styles.contentTitle}>
          <div
            className={classNames(
              styles.playlistColumn,
              styles.playlistColumn01
            )}
          >
            Трек
          </div>
          <div
            className={classNames(
              styles.playlistColumn,
              styles.playlistColumn02
            )}
          >
            Исполнитель
          </div>
          <div
            className={classNames(
              styles.playlistColumn,
              styles.playlistColumn03
            )}
          >
            Альбом
          </div>
          <div
            className={classNames(
              styles.playlistColumn,
              styles.playlistColumn04
            )}
          >
            <Icon iconClass={styles.playlistTitleSvg} name="icon-watch" />
          </div>
        </div>

        {getAllTracksError && <Error error="Request failed" reset={reset} />}
        {!getAllTracksError && (
          <div className={styles.playlistContent}>
            {tracks.map((track: Track) => (
              <div className={styles.playlistItem} key={track._id}>
                <div className={styles.playlistTrack}>
                  <div className={styles.trackTitle}>
                    <Icon
                      wrapperClass={styles.trackTitleImage}
                      iconClass={styles.trackTitleSvg}
                      name="icon-note"
                    />
                    <div>
                      <a className={styles.trackTitleLink} href="http://">
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
                      {Math.floor(track.duration_in_seconds / 60)}:
                      {track.duration_in_seconds % 60}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CenterBlock;
