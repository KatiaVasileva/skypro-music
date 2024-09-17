"use client";

import Nav from "../Nav/Nav";
import styles from "./Main.module.css";
import CenterBlock from "../CenterBlock/CenterBlock";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect } from "react";
import { getAccessTokenFromLocalStorage } from "@/utils/helpers";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getFavoriteTracks, getTracks } from "@/store/features/trackSlice";
import { LikeProps, useLikeTrack } from "@/hooks/useLikeTracks";

function Main() {
  const access = getAccessTokenFromLocalStorage();
  const dispatch = useAppDispatch();
  const refreshToken = useAppSelector((state) => state.user.tokens?.refresh);
  const allTracks = useAppSelector((state) => state.track.playlistState);

  useEffect(() => {
    if (!access) {
      dispatch(getTracks());
    }
    if (access) {
      dispatch(getTracks());
      dispatch(
        getFavoriteTracks({
          access: access,
          refresh: refreshToken ? refreshToken : "",
        })
      );
    }
  }, [dispatch, access, refreshToken]);

  return (
    <main className={styles.main}>
      <Nav />
      <CenterBlock allTracks={allTracks}/>
      <Sidebar />
    </main>
  );
}

export default Main;
