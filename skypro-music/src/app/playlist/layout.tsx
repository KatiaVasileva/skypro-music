"use client";

import Nav from "@/components/Nav/Nav";
import styles from "./page.module.css";
import Bar from "@/components/Bar/Bar";
import Footer from "@/components/Footer/Footer";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { getAllSelections, getFavoriteTracks, getListOfTracks, getSelectedTracks, getTracks } from "@/store/features/trackSlice";
import Search from "@/components/Search/Search";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function PlaylistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const access = useAppSelector((state) => state.user.tokens.access);
  const refreshToken = useAppSelector((state) => state.user.tokens.refresh);
  const allTracks = useAppSelector((state) => state.track.playlistState);
  const allSelections = useAppSelector(
    (state) => state.track.allSelectionsState
  );
  const selectionIdState = useAppSelector(
    (state) => state.track.selectionIdState
  );
  const isMyPlaylistClicked = useAppSelector(
    (state) => state.track.isMyPlaylistClicked
  );

  useEffect(() => {
    if (!access) {
      dispatch(getTracks());
    //   dispatch(getListOfTracks());
    //   dispatch(getAllSelections());
    //   dispatch(getSelectedTracks(selectionIdState));
    }
    if (access) {
      dispatch(getTracks());
      dispatch(
        getFavoriteTracks({
          access: access,
          refresh: refreshToken,
        })
      );
    //   dispatch(getListOfTracks());
    //   dispatch(getAllSelections());
    //   dispatch(getSelectedTracks(selectionIdState));
    }
  }, [dispatch, access, refreshToken, isMyPlaylistClicked, selectionIdState]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.mainCenterBlock}>
            <Search />
            {children}
          </div>
          {/* <Sidebar /> */}
        </main>
        <Bar />
        <Footer />
      </div>
    </div>
  );
}
