"use client";

import Nav from "../Nav/Nav";
import styles from "./Favorite.module.css";
import CenterBlock from "../CenterBlock/CenterBlock";
import Sidebar from "../Sidebar/Sidebar";
import { getAccessTokenFromLocalStorage } from "@/utils/helpers";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  getFavoriteTracks,
} from "@/store/features/trackSlice";
import { useEffect } from "react";

function Favorite() {
  try {
    const access = getAccessTokenFromLocalStorage();
    const refreshToken = useAppSelector((state) => state.user.tokens?.refresh);
    const dispatch = useAppDispatch();
    const myPlaylistState = useAppSelector((state) => state.track.myPlaylistState);

    useEffect(() => {
      if (access) {
        dispatch(
          getFavoriteTracks({
            access: access,
            refresh: refreshToken ? refreshToken : "",
          })
        );
      }
    }, [dispatch, access]);

    return (
      <main className={styles.main}>
        <Nav />
        <CenterBlock allTracks={myPlaylistState} />
        <Sidebar />
      </main>
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

export default Favorite;
